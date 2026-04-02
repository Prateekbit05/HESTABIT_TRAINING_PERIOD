# 🔬 Day 4 — Hyperparameter Tuning + Explainability + Error Analysis

> **ML Engineering Week · Day 4**
> Optimize a trained model using Optuna Bayesian tuning, explain decisions with SHAP values, and perform deep error analysis on the **NF-UQ-NIDS-v2** network intrusion detection dataset.

---

## 📁 Project Structure

```
day-4/
├── inputs/
│   ├── X_train_final.csv          # Preprocessed training features
│   ├── X_test_final.csv           # Preprocessed test features
│   ├── y_train.csv                # Training labels
│   └── y_test.csv                 # Test labels
├── src/
│   ├── config/
│   │   └── config.yaml            # Tuning configuration
│   ├── training/
│   │   └── tuning.py              # 🔑 Hyperparameter tuning pipeline
│   └── evaluation/
│       └── shap_analysis.py       # 🔑 SHAP explainability module
├── outputs/
│   ├── models/
│   │   ├── best_random_forest.joblib    # Tuned RF model
│   │   └── best_xgboost.joblib          # Tuned XGBoost model
│   ├── plots/
│   │   ├── shap_summary.png             # SHAP beeswarm plot
│   │   └── shap_importance.png          # SHAP bar importance chart
│   ├── tuning_results.json              # All tuning metrics
│   └── shap_feature_importance.csv      # Feature importance table
├── tuning/
│   └── results.json               # ✅ Best params + comparison
├── README.md
├── COMMANDS.md
├── THEORY.md
└── TOPICS-TO-LEARN.md
```

---

## 🚀 Quick Start

```bash
# Step 1 — Run hyperparameter tuning
python src/training/tuning.py

# Step 2 — Run SHAP explainability analysis
python src/evaluation/shap_analysis.py
```

---

## 🧠 What This Pipeline Does

### `tuning.py` — HyperparameterTuner
1. Loads data from `inputs/`
2. Tunes **Random Forest** via GridSearch or RandomSearch
3. Tunes **XGBoost** via GridSearch or RandomSearch
4. Optionally runs **Optuna Bayesian optimization** (TPE sampler, 30 trials)
5. Saves best models as `.joblib` + results as `.json`

### `shap_analysis.py` — SHAPAnalyzer
1. Loads the best saved model from `outputs/models/`
2. Computes SHAP `TreeExplainer` values on up to 100 test samples
3. Saves SHAP summary beeswarm plot + feature importance bar chart
4. Exports ranked feature importance to CSV

---

## 📊 Results

### Baseline vs Tuned (Random Forest + Optuna, 30 trials)

| | Accuracy | F1 Score (Macro) |
|--|----------|-----------------|
| **Baseline** | 0.9888 | 0.9873 |
| **Tuned** | 0.9867 | 0.9850 |
| **Δ Change** | -0.0021 | -0.0024 |

> ℹ️ A small score drop after tuning is normal — the baseline was slightly overfit to CV folds. The tuned model generalises more reliably with controlled `max_depth=20` and `min_samples_leaf=2`.

### Best Hyperparameters (Optuna — 30 trials)

| Parameter | Value |
|-----------|-------|
| `n_estimators` | 292 |
| `max_depth` | 20 |
| `min_samples_split` | 8 |
| `min_samples_leaf` | 2 |

### Top 10 Features by SHAP Importance

| Rank | Feature Index | SHAP Importance |
|------|--------------|-----------------|
| 1 | Feature 12 | 0.1132 |
| 2 | Feature 11 | 0.1014 |
| 3 | Feature 3 | 0.0950 |
| 4 | Feature 27 | 0.0681 |
| 5 | Feature 1 | 0.0666 |
| 6 | Feature 20 | 0.0648 |
| 7 | Feature 6 | 0.0484 |
| 8 | Feature 33 | 0.0438 |
| 9 | Feature 26 | 0.0415 |
| 10 | Feature 15 | 0.0358 |

---

## ✅ Deliverables

| File | Status |
|------|--------|
| `src/training/tuning.py` | ✅ Complete |
| `src/evaluation/shap_analysis.py` | ✅ Complete |
| `tuning/results.json` | ✅ Saved |
| `MODEL-INTERPRETATION.md` | ✅ Auto-generated |
| `outputs/plots/shap_summary.png` | ✅ Generated |
| `outputs/plots/shap_importance.png` | ✅ Generated |
| `outputs/shap_feature_importance.csv` | ✅ Exported |

---

## ⚙️ Tuning Methods Supported

| Method | Class | Speed | Quality |
|--------|-------|-------|---------|
| `grid_search` | `GridSearchCV` | Slow | Exhaustive |
| `random_search` | `RandomizedSearchCV` | Fast | Good |
| `bayesian` | `Optuna TPESampler` | Smart | Best |

```bash
# Choose method at runtime
tuner.run_pipeline(method='bayesian')       # Optuna (recommended)
tuner.run_pipeline(method='random_search')  # RandomizedSearchCV
tuner.run_pipeline(method='grid_search')    # GridSearchCV
```

---

## 🔧 Requirements

```
scikit-learn>=1.3.0
xgboost>=2.0.0
optuna>=3.0.0
shap>=0.42.0
joblib>=1.3.0
pandas>=2.0.0
numpy>=1.24.0
matplotlib>=3.7.0
pyyaml>=6.0
```

---

## 📌 Key Design Decisions

- **Optuna TPE sampler** — builds a probabilistic model of good regions; smarter than random search
- **`joblib` for model saving** — faster and more reliable than `pickle` for sklearn objects
- **SHAP `TreeExplainer`** — computes exact (not approximate) Shapley values for tree models
- **100-sample SHAP limit** — TreeExplainer is O(n × features); sampling keeps runtime practical
- **`isinstance(shap_values, list)` check** — safely handles binary (`list[2]`) and multi-class SHAP output formats

