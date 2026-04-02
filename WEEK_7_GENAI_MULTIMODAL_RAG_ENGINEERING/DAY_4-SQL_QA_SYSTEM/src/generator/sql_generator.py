"""
Better SQL extraction to handle LLM verbosity
ReDoS fix: hard input cap + atomic-safe extraction replaces unbounded .+? with re.DOTALL
"""
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline
from pathlib import Path
import yaml
from typing import Dict, Optional
import re
import sys

sys.path.insert(0, str(Path(__file__).parent.parent.parent))
from src.utils.schema_loader import SchemaLoader

# Maximum characters of LLM output we will ever run a regex over.
# Anything beyond this is truncated before matching — eliminates the
# pathological O(n^2) backtracking case on inputs with no semicolon.
_MAX_REGEX_INPUT = 4_000


class SQLGenerator:
    """Generate SQL queries from natural language using LLM"""

    def __init__(self, config_path: str = 'src/config/config.yaml'):
        with open(config_path) as f:
            self.config = yaml.safe_load(f)

        llm_config = self.config['llm']
        sql_config = self.config['sql_generation']

        print(f"🤖 Loading LLM: {llm_config['model_name']}...")

        self.tokenizer = AutoTokenizer.from_pretrained(llm_config['model_name'])
        self.model = AutoModelForCausalLM.from_pretrained(
            llm_config['model_name'],
            torch_dtype=torch.float16 if torch.cuda.is_available() else torch.float32,
            device_map=llm_config['device']
        )

        self.pipe = pipeline(
            "text-generation",
            model=self.model,
            tokenizer=self.tokenizer,
            max_new_tokens=llm_config['max_new_tokens'],
            temperature=llm_config['temperature'],
            do_sample=llm_config['do_sample']
        )

        self.schema_loader = SchemaLoader(config_path)
        self.max_retries = sql_config['max_retries']
        self.include_schema = sql_config['include_schema']

        print("✅ SQL Generator ready!")

    def _build_prompt(self, question: str) -> str:
        """Build improved prompt"""
        tables = self.schema_loader.get_tables()

        schema_context = ""
        if self.include_schema:
            schema_context = "AVAILABLE TABLES:\n\n"
            for table in tables:
                columns = self.schema_loader.get_columns(table)
                col_names = [col['name'] for col in columns]
                schema_context += f"{table}: {', '.join(col_names)}\n"

        prompt = f"""Generate ONLY a SQL SELECT query. No explanations.
{schema_context}
Question: {question}
SQL:"""
        return prompt

    def generate(self, question: str) -> Dict:
        """Generate SQL query from question"""
        try:
            prompt = self._build_prompt(question)
            outputs = self.pipe(prompt)
            generated_text = outputs[0]['generated_text']
            sql = self._extract_clean_sql(generated_text, prompt)

            if not sql:
                return {'success': False, 'sql': None, 'error': 'Failed to extract valid SQL'}

            return {'success': True, 'sql': sql, 'error': None}

        except Exception as e:
            return {'success': False, 'sql': None, 'error': str(e)}

    def _extract_clean_sql(self, generated_text: str, prompt: str) -> Optional[str]:
        """
        Extract ONLY the SQL query, removing all LLM preamble and explanation.

        ReDoS fix
        ---------
        The original pattern  r'(SELECT\s+.+?;)'  with re.DOTALL is vulnerable:
        on a long string with no semicolon the engine tries every possible length
        for .+? before giving up — O(n²) backtracking.

        Mitigation applied:
          1. Hard-cap the string to _MAX_REGEX_INPUT chars before any regex runs.
          2. Replace .+? (lazy-any) with [^;]+ (greedy-but-excluded).
             A character class that explicitly excludes the terminator cannot
             backtrack past it, so the match is O(n) in all cases.
        """
        # Strip the echoed prompt so we only inspect new tokens
        if prompt in generated_text:
            sql_part = generated_text.split(prompt)[-1]
        else:
            sql_part = generated_text

        sql_part = sql_part.strip()

        # ── Hard cap: never run a regex over more than _MAX_REGEX_INPUT chars ──
        sql_part = sql_part[:_MAX_REGEX_INPUT]

        # ── Method 1: safe regex ──────────────────────────────────────────────
        # [^;]+ matches any character except ';', so it terminates as soon as
        # a semicolon is found — no backtracking is possible.
        select_match = re.search(
            r'(SELECT\s+[^;]+;)',
            sql_part,
            re.IGNORECASE
        )

        if select_match:
            sql = select_match.group(1)

            # Guard: keep only the first statement
            if ';' in sql:
                sql = sql.split(';')[0] + ';'

            # Strip trailing explanation text that crept in before the semicolon
            for separator in ['\n\n', 'Explanation:', 'Example:', 'Output:', 'Question:', '  ']:
                if separator in sql:
                    sql = sql.split(separator)[0].strip()
                    if not sql.endswith(';'):
                        sql += ';'

            return self._clean_sql(sql)

        # ── Method 2: line-by-line fallback (no regex risk) ──────────────────
        lines = sql_part.split('\n')
        sql_lines = []

        for line in lines:
            line = line.strip()

            if any(kw in line for kw in ['Explanation:', 'Example:', 'Output:', 'Question:', 'Expected']):
                break

            if 'SELECT' in line.upper() or sql_lines:
                sql_lines.append(line)
                if ';' in line:
                    break

        if sql_lines:
            sql = ' '.join(sql_lines)
            sql = self._clean_sql(sql)
            if not sql.endswith(';'):
                sql += ';'
            return sql

        return None

    def _clean_sql(self, sql: str) -> str:
        """Normalise whitespace, strip comments, ensure single trailing semicolon."""
        sql = re.sub(r'\s+', ' ', sql)
        sql = re.sub(r'--[^\n]*', '', sql)         # strip inline comments
        sql = sql.rstrip(';').strip() + ';'
        # Keep only first statement
        if sql.count(';') > 1:
            sql = sql.split(';')[0] + ';'
        return sql.strip()

    def generate_with_retry(self, question: str) -> Dict:
        """Generate SQL with retry logic"""
        for attempt in range(self.max_retries):
            result = self.generate(question)

            if result['success']:
                sql = result['sql']
                if any(word in sql for word in ['Explanation', 'Example', 'Output', 'Expected']):
                    print(f"⚠️  Attempt {attempt + 1}: SQL contains explanation text, retrying...")
                    continue
                result['attempt'] = attempt + 1
                return result

            print(f"⚠️  Attempt {attempt + 1} failed: {result['error']}")

        result['attempt'] = self.max_retries
        return result


if __name__ == "__main__":
    print("Testing SQL Generator...\n")

    generator = SQLGenerator()

    test_questions = [
        "Show all artists",
        "Count rows in artists",
        "Show first 5 rows from artists",
    ]

    for question in test_questions:
        print(f"\n❓ Question: {question}")
        result = generator.generate(question)

        if result['success']:
            print(f"✅ SQL: {result['sql']}")
        else:
            print(f"❌ Error: {result['error']}")
