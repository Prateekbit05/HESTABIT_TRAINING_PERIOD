import pandas as pd
import json
import jsonlines
import secrets
import random
from tqdm import tqdm
import os


class InstructionDatasetBuilder:
    """
    Build instruction tuning dataset from customers and people CSV files.
    Includes: QA, Reasoning, Extraction tasks.
    """

    def __init__(self, customers_path: str, people_path: str):
        print("📂 Loading datasets...")
        if not os.path.exists(customers_path):
            raise FileNotFoundError(f"❌ File not found: {customers_path}")
        if not os.path.exists(people_path):
            raise FileNotFoundError(f"❌ File not found: {people_path}")

        self.customers = pd.read_csv(customers_path).dropna()
        self.people = pd.read_csv(people_path).dropna()

        print(f"✅ Loaded {len(self.customers)} customers")
        print(f"✅ Loaded {len(self.people)} people")
        print(f"\n📋 Customer columns: {list(self.customers.columns)}")
        print(f"📋 People columns:   {list(self.people.columns)}")

        self.instructions = []

    # ─────────────────────────── helpers ────────────────────────────

    def _sample_row(self):
        """Randomly sample one row from either dataset."""
        df = self.customers if secrets.randbelow(2) else self.people
        return df.sample(1).iloc[0]

    @staticmethod
    def _col(cols, *keywords):
        """Return the first column whose name contains any of the keywords."""
        for kw in keywords:
            match = next((c for c in cols if kw in c.lower()), None)
            if match:
                return match
        return None

    # ─────────────────────────── QA ─────────────────────────────────

    def generate_qa_samples(self, n_samples: int = 500):
        print("\n🔹 Generating QA samples...")
        samples = []

        question_starters = [
            ("What is",           "is"),
            ("Can you tell me",   "is"),
            ("I need to know",    "is"),
            ("Please provide",    "is"),
            ("Could you share",   "is"),
            ("Who is",            "is"),
            ("Where is",          "is located in"),
            ("How can I contact", "can be contacted at"),
            ("Which company does","works for"),
            ("Do you have",       "Yes, it is"),
        ]

        for _ in tqdm(range(n_samples)):
            row      = self._sample_row()
            cols     = row.index.tolist()
            name_col = self._col(cols, "name") or cols[0]
            qa_type  = secrets.choice(["email", "phone", "location",
                                        "company", "age", "job"])
            starter, verb = secrets.choice(question_starters)

            try:
                if qa_type == "email":
                    col = self._col(cols, "email")
                    if not col:
                        continue
                    q = f"{starter} the email for {row[name_col]}?"
                    a = f"The email {verb} {row[col]}."

                elif qa_type == "phone":
                    col = self._col(cols, "phone")
                    if not col:
                        continue
                    q = f"{starter} {row[name_col]}'s phone number?"
                    a = f"The phone number {verb} {row[col]}."

                elif qa_type == "location":
                    city_col    = self._col(cols, "city")
                    country_col = self._col(cols, "country")
                    if not (city_col and country_col):
                        continue
                    q = f"{starter} where {row[name_col]} is based?"
                    a = f"{row[name_col]} {verb} {row[city_col]}, {row[country_col]}."

                elif qa_type == "company":
                    col = self._col(cols, "company")
                    if not col:
                        continue
                    q = f"{starter} which organization {row[name_col]} represents?"
                    a = f"{row[name_col]} represents {row[col]}."

                elif qa_type == "age":
                    col = self._col(cols, "age")
                    if not col:
                        continue
                    q = f"{starter} the age of {row[name_col]}?"
                    a = f"{row[name_col]} {verb} {row[col]} years old."

                elif qa_type == "job":
                    col = self._col(cols, "job", "title")
                    if not col:
                        continue
                    q = f"{starter} {row[name_col]}'s role?"
                    a = f"Their role {verb} {row[col]}."

                else:
                    continue

                samples.append({"instruction": q, "input": "", "output": a})

            except Exception:
                continue

        self.instructions.extend(samples)
        print(f"✅ Generated {len(samples)} QA samples")

    # ─────────────────────────── Reasoning ──────────────────────────

    def generate_reasoning_samples(self, n_samples: int = 500):
        print("\n🔹 Generating Reasoning samples...")
        samples = []

        for _ in tqdm(range(n_samples)):
            row      = self._sample_row()
            cols     = row.index.tolist()
            name_col = self._col(cols, "name") or cols[0]
            try:
                samples.append({
                    "instruction": f"Provide insights about {row[name_col]}.",
                    "input": "",
                    "output": (
                        f"{row[name_col]} appears to be a professional "
                        "suitable for business engagement."
                    ),
                })
            except Exception:
                continue

        self.instructions.extend(samples)
        print(f"✅ Generated {len(samples)} Reasoning samples")

    # ─────────────────────────── Extraction ─────────────────────────

    def generate_extraction_samples(self, n_samples: int = 500):
        print("\n🔹 Generating Extraction samples...")
        samples = []

        for _ in tqdm(range(n_samples)):
            row      = self._sample_row()
            cols     = row.index.tolist()
            name_col = self._col(cols, "name") or cols[0]
            text     = f"{row[name_col]} is a professional."
            samples.append({
                "instruction": "Extract the name from the text.",
                "input":       text,
                "output":      json.dumps({"name": row[name_col]}, indent=2),
            })

        self.instructions.extend(samples)
        print(f"✅ Generated {len(samples)} Extraction samples")

    # ─────────────────────────── Clean ──────────────────────────────

    def clean_and_validate(self):
        print("\n🧹 Cleaning dataset...")
        initial_count = len(self.instructions)

        self.instructions = [s for s in self.instructions if s["output"].strip()]

        seen, cleaned = set(), []
        for sample in self.instructions:
            key = (sample["instruction"], sample["output"])
            if key not in seen:
                seen.add(key)
                cleaned.append(sample)
        self.instructions = cleaned

        print(f"✅ Cleaned: {initial_count} → {len(self.instructions)} samples")

    # ─────────────────────────── Save ───────────────────────────────

    def save_datasets(self, train_ratio: float = 0.8):
        print("\n💾 Saving datasets...")

        # nosec B311 - random.Random is intentional: fixed seed (42) guarantees
        # reproducible train/val splits across runs. No security context here —
        # shuffle order is not sensitive and does not need to be unpredictable.
        rng = random.Random(42)  # nosec
        rng.shuffle(self.instructions)

        split_idx  = int(len(self.instructions) * train_ratio)
        train_data = self.instructions[:split_idx]
        val_data   = self.instructions[split_idx:]

        os.makedirs("data", exist_ok=True)
        with jsonlines.open("data/train.jsonl", "w") as f:
            f.write_all(train_data)
        with jsonlines.open("data/val.jsonl", "w") as f:
            f.write_all(val_data)

        print(f"✅ Train: {len(train_data)} samples")
        print(f"✅ Val:   {len(val_data)} samples")
        return train_data, val_data


# ─────────────────────────────── main ───────────────────────────────────────

if __name__ == "__main__":
    builder = InstructionDatasetBuilder(
        customers_path="data/customers-100000.csv",
        people_path="data/people-100000.csv",
    )

    builder.generate_qa_samples(500)
    builder.generate_reasoning_samples(500)
    builder.generate_extraction_samples(500)
    builder.clean_and_validate()
    train_data, val_data = builder.save_datasets()

    print("\n" + "=" * 50)
    print("✅ DATASET CREATION COMPLETE")
    print("=" * 50)
    print(f"📊 Train: {len(train_data)}")
    print(f"📊 Val:   {len(val_data)}")
    print(f"📊 Total: {len(train_data) + len(val_data)}")
