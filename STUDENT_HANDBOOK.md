# Adrenoceptor Pharmacology Simulator
## Student Handbook

**For 3rd Year Undergraduate Medical Students**

---

## Table of Contents

1. [Introduction](#introduction)
2. [Learning Objectives](#learning-objectives)
3. [Pharmacology Background](#pharmacology-background)
4. [Getting Started](#getting-started)
5. [Clinical Scenarios](#clinical-scenarios)
6. [Understanding Drug Selection](#understanding-drug-selection)
7. [Interpreting Results](#interpreting-results)
8. [Self-Study Activities](#self-study-activities)
9. [Assessment Criteria](#assessment-criteria)
10. [Frequently Asked Questions](#frequently-asked-questions)
11. [Further Reading](#further-reading)

---

## Introduction

Welcome to the Adrenoceptor Pharmacology Simulator! This interactive tool has been designed to help you develop a deep understanding of adrenergic pharmacology through hands-on clinical simulation. Rather than memorising drug names and effects, you'll learn to **apply pharmacological principles** to real clinical scenarios.

### Why This Simulator?

Adrenergic drugs are among the most important medications in emergency and critical care medicine. Understanding how they work - and more importantly, *why* certain drugs are chosen for specific conditions - is essential for safe, effective clinical practice.

This simulator allows you to:
- Experiment with different drugs in safe, virtual clinical scenarios
- See real-time effects of receptor activation on vital signs
- Understand the relationship between receptor selectivity and clinical outcomes
- Learn from detailed, educational feedback
- Develop clinical reasoning skills for drug selection

---

## Learning Objectives

By the end of your work with this simulator, you should be able to:

### Knowledge
1. **Classify adrenergic receptors** (α1, α2, β1, β2) and describe their primary locations and physiological effects
2. **Explain receptor-drug interactions** using concepts of agonism, antagonism, selectivity, EC₅₀, and Emax
3. **Predict the hemodynamic effects** of selective and non-selective adrenergic agonists and antagonists
4. **Describe the signalling pathways** activated by different adrenoceptor subtypes (Gq, Gs, Gi)

### Skills
5. **Select appropriate adrenergic drugs** for common emergency scenarios based on pathophysiology
6. **Adjust drug dosing** to achieve therapeutic goals while minimising adverse effects
7. **Interpret vital sign changes** in response to adrenergic drug administration
8. **Recognise dangerous drug-disease interactions** (e.g., β-blockers in cocaine toxicity)

### Clinical Reasoning
9. **Justify drug selection** using receptor selectivity, pathophysiology, and evidence-based guidelines
10. **Evaluate treatment quality** by integrating multiple clinical parameters (MAP, HR, SpO₂, CO)
11. **Apply pharmacological principles** to novel clinical situations

---

## Pharmacology Background

### Adrenoceptor Subtypes

#### α1-Adrenoceptors
- **Location**: Vascular smooth muscle (arterioles, veins)
- **Signalling**: Gq → ↑ IP₃/DAG → ↑ intracellular Ca²⁺
- **Effects**:
  - Vasoconstriction → ↑ SVR → ↑ MAP
  - ↑ Venous return → ↑ preload
- **Clinical use**: Hypotension, shock

#### α2-Adrenoceptors
- **Location**: CNS (brainstem), presynaptic nerve terminals
- **Signalling**: Gi → ↓ cAMP
- **Effects**:
  - Central: ↓ sympathetic outflow → ↓ BP, ↓ HR
  - Peripheral: Presynaptic autoreceptor → ↓ norepinephrine release
- **Clinical use**: Hypertension, opioid/alcohol withdrawal (agonists)

#### β1-Adrenoceptors
- **Location**: Heart (SA node, AV node, myocardium)
- **Signalling**: Gs → ↑ cAMP → ↑ PKA
- **Effects**:
  - ↑ Heart rate (chronotropy)
  - ↑ Contractility (inotropy)
  - ↑ Conduction velocity (dromotropy)
  - ↑ Cardiac output
- **Clinical use**: Cardiogenic shock, bradycardia (agonists); hypertension, tachyarrhythmias (antagonists)

#### β2-Adrenoceptors
- **Location**: Bronchial smooth muscle, peripheral vasculature, uterus
- **Signalling**: Gs → ↑ cAMP → ↑ PKA
- **Effects**:
  - Bronchodilation
  - Peripheral vasodilation → ↓ SVR
  - Uterine relaxation
- **Clinical use**: Asthma, COPD, preterm labour (agonists)

### Receptor Selectivity

**Selectivity** refers to how preferentially a drug acts on one receptor subtype versus others:

- **Non-selective**: Activates/blocks multiple receptor subtypes (e.g., epinephrine, propranolol)
- **Selective**: Preferentially acts on one subtype (e.g., albuterol for β2, metoprolol for β1)

**Clinical significance**: Selectivity allows us to target specific physiological effects while minimising unwanted side effects. For example:
- β2-selective agonists (albuterol) → bronchodilation without excessive tachycardia
- β1-selective antagonists (metoprolol) → reduced cardiac work without bronchoconstriction

### Key Pharmacodynamic Concepts

#### EC₅₀ (Half-Maximal Effective Concentration)
The drug concentration producing 50% of maximal effect. **Lower EC₅₀ = higher potency**.

#### Emax (Maximal Efficacy)
The maximum effect a drug can produce, regardless of dose.
- **Full agonist**: Emax = 100% (e.g., epinephrine at β-receptors)
- **Partial agonist**: Emax < 100% (e.g., dobutamine at β2-receptors)

#### Dose-Response Relationships
The simulator displays dose-response curves showing how receptor activation changes with drug dose. Steep curves indicate a narrow therapeutic range; flat curves indicate a wide range.

---

## Getting Started

### Accessing the Simulator

1. Open the simulator in your web browser
2. You'll see a selection of clinical scenarios
3. Read the scenario description and pathophysiology
4. Select a scenario to begin

### Interface Overview

Once you select a scenario, you'll see:

#### 1. Patient Monitor (Left Panel)
- **Vital Signs Display**: Real-time HR, BP (SBP/DBP/MAP), RR, SpO₂
- **Hemodynamic Parameters**: SVR (systemic vascular resistance), CO (cardiac output)
- **Bronchodilation Status**: 0% (severe bronchospasm) to 100% (fully dilated)
- **Receptor Activation Bars**: Visual representation of α1, α2, β1, β2 activation
  - Green/yellow/red = agonist activity (increasing intensity)
  - Purple/blue = antagonist activity (blockade)

#### 2. Treatment Strategy Panel (Top Right)
- Select your therapeutic goal(s) for the scenario
- See which drugs match your chosen strategy
- Helps guide evidence-based drug selection

#### 3. Drug Selector (Right Panel)
- Scroll through available drugs
- View drug class, receptor profile, and indications
- Select a drug and adjust the dose using the slider
- **Highlighted drugs** match your selected treatment strategy

#### 4. Treatment Assessment (Bottom)
- **Score**: 0-100 based on vital signs normalisation, receptor targeting, and drug appropriateness
- **Grade**: Excellent (80+), Good (60-79), Fair (40-59), Poor (<40)
- **Feedback Messages**:
  - Green = successful aspects of treatment
  - Yellow = suboptimal but not dangerous
  - Red = dangerous choices or critical problems

#### 5. Advanced Pharmacology Analysis (Collapsible)
- EC₅₀ and Emax values for each receptor
- Dose-response curves showing relationship between dose and receptor activation
- Detailed pharmacological parameters

#### 6. Signalling Pathways Reference (Collapsible)
- Visual diagrams of Gq, Gs, and Gi pathways
- Second messenger cascades
- Physiological outcomes

### Basic Workflow

1. **Select a scenario** → Read the pathophysiology
2. **Review baseline vitals** → Identify what needs correcting
3. **Choose treatment strategy** → What are your therapeutic goals?
4. **Select a drug** → Consider receptor selectivity and scenario pathophysiology
5. **Adjust dose** → Start with typical dose, then titrate
6. **Observe effects** → Watch vital signs and receptor activation
7. **Review assessment** → Read feedback carefully - this is where learning happens!
8. **Experiment** → Try different drugs/doses to understand *why* certain choices are better
9. **Reset** → Try again with a different approach

---

## Clinical Scenarios

The simulator includes eight clinical scenarios representing common emergency and critical care situations:

### 1. Anaphylaxis
**Pathophysiology**: Massive histamine release → vasodilation, ↑ capillary permeability, bronchospasm
**Clinical features**: Severe hypotension (SBP 70 mmHg), tachycardia, hypoxia (SpO₂ 88%), low SVR
**Target receptors**: α1 (vasoconstriction), β1 (inotropy), β2 (bronchodilation)
**Optimal drug**: **Epinephrine** - non-selective agonist addresses all three pathophysiological mechanisms

**Key learning points**:
- Why selective agents (e.g., albuterol alone) are inadequate
- The importance of multi-receptor activation in life-threatening allergic reactions
- IM vs IV administration routes

### 2. Septic Shock
**Pathophysiology**: Systemic inflammation → profound vasodilation, ↑ capillary permeability
**Clinical features**: Severe hypotension (MAP ~53 mmHg), tachycardia, high CO, very low SVR
**Target receptors**: α1 (restore vascular tone), β1 (inotropic support)
**Optimal drug**: **Norepinephrine** - predominantly α1 with some β1 activity

**Key learning points**:
- Distributive shock requires vasoconstriction (↑ SVR)
- Why norepinephrine > dopamine (evidence-based guidelines)
- Role of pure α-agonists (phenylephrine) vs mixed α/β agonists

### 3. Acute Asthma Exacerbation
**Pathophysiology**: Airway inflammation + smooth muscle constriction
**Clinical features**: Severe bronchospasm (bronchodilation 25%), hypoxia (SpO₂ 86%), tachypnea
**Target receptors**: β2 (bronchodilation)
**Optimal drug**: **Albuterol** - selective β2 agonist

**Key learning points**:
- Receptor selectivity reduces cardiac side effects
- Why non-selective β-agonists (isoproterenol) are no longer used routinely
- When to use epinephrine (life-threatening asthma/anaphylaxis)

### 4. Cardiogenic Shock
**Pathophysiology**: Myocardial dysfunction → inadequate cardiac output
**Clinical features**: Hypotension (MAP ~63 mmHg), low CO (3.0 L/min), high SVR (compensatory)
**Target receptors**: β1 (inotropy without excessive vasoconstriction)
**Optimal drug**: **Dobutamine** - selective β1 agonist

**Key learning points**:
- Failing heart needs inotropy, not vasoconstriction
- Why pure vasoconstrictors worsen cardiogenic shock (↑ afterload)
- Role of phosphodiesterase inhibitors (milrinone)

### 5. Symptomatic Bradycardia
**Pathophysiology**: Decreased HR → inadequate cardiac output
**Clinical features**: Severe bradycardia (HR 35), hypotension, low CO
**Target receptors**: β1 (↑ HR), β2 (↑ HR, modest ↓ SVR)
**Optimal drug**: **Isoproterenol** - non-selective β agonist

**Key learning points**:
- Pure β-agonism increases HR without vasoconstriction
- When temporary pacing is preferred over pharmacology
- Atropine as first-line (not included in simulator)

### 6. Spinal Anesthesia Hypotension
**Pathophysiology**: Sympathetic blockade → vasodilation + bradycardia
**Clinical features**: Hypotension (SBP 70 mmHg), bradycardia (HR 55), low SVR
**Target receptors**: α1 (vasoconstriction to restore SVR)
**Optimal drug**: **Phenylephrine** - selective α1 agonist

**Key learning points**:
- Pure vasoconstriction without tachycardia (reflex bradycardia actually occurs)
- Why phenylephrine is preferred over ephedrine in obstetrics
- Fluid loading as adjunct therapy

### 7. Cocaine Overdose
**Pathophysiology**: Blocks catecholamine reuptake → excessive α and β stimulation
**Clinical features**: Severe hypertension (SBP 220 mmHg), tachycardia (HR 155)
**Target receptors**: Benzodiazepines (first-line), then α-blockade ± β-blockade
**Optimal drug**: **Midazolam** (first-line) or **Labetalol** (combined α/β-blocker)
**CONTRAINDICATED**: **Pure β-blockers** (propranolol, metoprolol, esmolol)

**Key learning points**:
- **CRITICAL**: Why pure β-blockers are dangerous (unopposed α-stimulation)
- Mechanism of unopposed α-vasoconstriction → coronary vasospasm, stroke
- Correct sequencing: benzodiazepines first, then combined α/β-blockade if needed
- This is a **patient safety critical** learning point

### 8. Thyroid Storm
**Pathophysiology**: Excessive thyroid hormone → hypermetabolic state, ↑ catecholamine sensitivity
**Clinical features**: Severe tachycardia (HR 165), hypertension, hyperthermia
**Target receptors**: β-blockade (controls sympathetic symptoms)
**Optimal drug**: **Propranolol** - also blocks T4→T3 conversion

**Key learning points**:
- Symptomatic management while addressing underlying thyrotoxicosis
- Why propranolol preferred over selective β1-blockers
- Multi-modal management (not just β-blockade)

---

## Understanding Drug Selection

### Approach to Drug Selection

When faced with a clinical scenario, use this systematic approach:

#### Step 1: Identify the Pathophysiology
What is the underlying mechanism causing the problem?
- Vasodilation? → Need α1 agonist
- Bronchospasm? → Need β2 agonist
- Low cardiac output? → Need β1 agonist or reduce afterload
- Excessive sympathetic activation? → Need β-blocker

#### Step 2: Define Your Therapeutic Goals
What vital signs need correcting? Prioritise:
1. Life-threatening abnormalities first (severe hypoxia, MAP <65)
2. Secondary goals (optimise HR, normalise CO)

#### Step 3: Match Receptors to Pathophysiology
- **Hypotension with low SVR** (sepsis, anaphylaxis, spinal) → α1 agonist
- **Hypotension with low CO** (cardiogenic shock, bradycardia) → β1 agonist
- **Hypotension with bronchospasm** (anaphylaxis) → α1 + β1 + β2 (multi-receptor)
- **Bronchospasm alone** (asthma) → β2-selective
- **Hypertension/tachycardia** → β-blocker ± α-blocker

#### Step 4: Consider Selectivity
- Do you need multi-receptor activation? (e.g., anaphylaxis)
- Or do you want to minimise off-target effects? (e.g., asthma → β2-selective)

#### Step 5: Check for Contraindications
- β-blockers in severe asthma/COPD (↓ bronchodilation)
- **Pure β-blockers in cocaine toxicity (DANGEROUS)**
- Vasoconstrictors in cardiogenic shock (↑ afterload)

### Available Drugs in the Simulator

#### Adrenergic Agonists

| Drug | Receptors | Primary Use | Key Features |
|------|-----------|-------------|--------------|
| **Epinephrine** | α1, α2, β1, β2 (non-selective) | Anaphylaxis, cardiac arrest | Multi-receptor activation |
| **Norepinephrine** | α1 +++, β1 ++, β2 + | Septic shock | First-line vasopressor |
| **Isoproterenol** | β1, β2 (β-selective) | Bradycardia, heart block | Pure β-agonist |
| **Phenylephrine** | α1 (selective) | Spinal hypotension, SVT | Pure vasoconstrictor |
| **Dobutamine** | β1 +++, β2 +, α1 + | Cardiogenic shock | Inotrope with minimal vasoconstriction |
| **Albuterol** | β2 (selective) | Asthma, COPD | Selective bronchodilator |
| **Dopamine** | Dose-dependent (α, β, dopaminergic) | Shock (historical) | Less predictable than norepinephrine |
| **Ephedrine** | Indirect sympathomimetic (α, β) | Hypotension | Releases stored norepinephrine |
| **Clonidine** | α2 (central) | Hypertensive emergency, withdrawal | Central sympatholytic |

#### Adrenergic Antagonists (Blockers)

| Drug | Receptors | Primary Use | Key Features |
|------|-----------|-------------|--------------|
| **Propranolol** | β1, β2 (non-selective blocker) | Thyroid storm, hypertension | Also blocks T4→T3 conversion |
| **Metoprolol** | β1 (selective blocker) | Acute MI, hypertension | Cardioselective |
| **Esmolol** | β1 (selective blocker) | Perioperative tachycardia | Ultra-short acting (t½ 9 min) |
| **Labetalol** | α1, β1, β2 (combined blocker) | Hypertensive emergency, cocaine | α:β ratio ~1:7 |
| **Phentolamine** | α1, α2 (non-selective α-blocker) | Pheochromocytoma, cocaine | Causes reflex tachycardia |
| **Prazosin** | α1 (selective blocker) | Hypertension, BPH | Selective α1 antagonist |

#### Non-Adrenergic Drugs

| Drug | Mechanism | Primary Use | Key Features |
|------|-----------|-------------|--------------|
| **Vasopressin** | V1 receptor agonist | Septic shock, cardiac arrest | Non-adrenergic vasopressor |
| **Milrinone** | PDE-3 inhibitor | Heart failure, cardiogenic shock | ↑ cAMP (bypasses β-receptors) |
| **Midazolam** | Benzodiazepine | Cocaine toxicity (first-line), sedation | Reduces sympathetic outflow |

---

## Interpreting Results

### Vital Signs Parameters

#### Mean Arterial Pressure (MAP)
- **Normal**: 70-100 mmHg
- **Target**: ≥65 mmHg (minimum for organ perfusion)
- **Formula**: DBP + (SBP - DBP)/3

**Clinical significance**: MAP is the driving pressure for organ perfusion. MAP <65 mmHg → inadequate perfusion → organ dysfunction.

#### Heart Rate (HR)
- **Normal**: 60-100 bpm
- **Bradycardia**: <60 bpm
- **Tachycardia**: >100 bpm (severe >120 bpm)

**Clinical significance**: Excessive tachycardia ↑ myocardial O₂ demand and ↓ diastolic filling time.

#### Systemic Vascular Resistance (SVR)
- **Normal**: 800-1200 dynes·s/cm⁵
- **Low**: <800 (vasodilation - sepsis, anaphylaxis, spinal)
- **High**: >1200 (vasoconstriction - cardiogenic shock, cocaine)

**Clinical significance**:
- Low SVR → distributive shock → need vasoconstrictors (α1 agonists)
- High SVR → ↑ afterload → ↑ cardiac work

#### Cardiac Output (CO)
- **Normal**: 4.0-8.0 L/min
- **Low**: <4.0 L/min (cardiogenic shock, severe bradycardia)
- **High**: >8.0 L/min (sepsis - compensatory)

**Clinical significance**: CO = HR × SV. Low CO → inadequate tissue perfusion.

#### Oxygen Saturation (SpO₂)
- **Normal**: ≥94%
- **Mild hypoxia**: 90-93%
- **Severe hypoxia**: <90%

**Clinical significance**: In the simulator, SpO₂ depends on bronchodilation and cardiac output.

#### Bronchodilation
- **0%**: Complete bronchospasm
- **100%**: Fully dilated airways

**Clinical significance**: Low bronchodilation → ↓ airflow → hypoxia.

### Receptor Activation Display

The coloured bars show the degree of receptor activation (or blockade):

- **Green**: Low-level agonist activity (0-25%)
- **Yellow**: Moderate agonist activity (25-50%)
- **Orange**: High agonist activity (50-75%)
- **Red**: Very high agonist activity (≥75%)
- **Purple/Blue**: Antagonist activity (blockade)
- **Grey**: No activity

**How to use this**:
- Check which receptors are being activated
- Correlate with expected physiological effects
- Verify that drug effects match its receptor profile

### Treatment Quality Score

The simulator calculates a score (0-100) based on:

1. **Drug appropriateness** (40 points)
   - Optimal drug choice (+20)
   - Correct receptor targeting (+20)
   - Contraindicated drug (-50)

2. **Vital signs normalisation** (60 points)
   - MAP 65-110 mmHg (+25)
   - HR 60-100 bpm (+20)
   - SpO₂ ≥94% (+15)
   - CO 4.0-8.0 L/min (+10)

**Grading**:
- **80-100**: Excellent - optimal drug choice and vital signs normalised
- **60-79**: Good - appropriate drug, mostly corrected vitals
- **40-59**: Fair - suboptimal choice or incomplete correction
- **<40**: Poor - inappropriate drug or dangerous choice

### Understanding Feedback Messages

The feedback is the **most important learning tool** in the simulator. Read it carefully!

#### Success Messages (Green)
- Highlight what you did correctly
- Explain *why* your choice was appropriate
- Provide detailed mechanism of action
- Include clinical pearls and guidelines

#### Warning Messages (Yellow)
- Point out suboptimal (but not dangerous) choices
- Explain why an alternative drug would be better
- Teach you about receptor selectivity and clinical decision-making

#### Danger Messages (Red)
- Alert you to dangerous or contraindicated choices
- Explain the serious consequences
- Teach critical patient safety principles (e.g., β-blockers in cocaine)

**Learning tip**: Deliberately try "wrong" drugs to understand *why* they're wrong. The feedback will teach you important safety principles.

---

## Self-Study Activities

### Activity 1: Receptor Selectivity Explorer

**Objective**: Understand how receptor selectivity affects clinical outcomes

1. Select the **Acute Asthma** scenario
2. Try each of these drugs and compare:
   - Albuterol (β2-selective)
   - Isoproterenol (non-selective β)
   - Epinephrine (non-selective α/β)
3. For each drug, note:
   - Which receptors are activated?
   - What happens to HR? (β1 effect)
   - What happens to bronchodilation? (β2 effect)
   - What happens to BP? (α1 and β2 effects)

**Questions**:
- Why is albuterol preferred for routine asthma?
- When would you use epinephrine instead?
- What are the downsides of non-selective β-agonists?

### Activity 2: Shock State Differentiation

**Objective**: Learn to match drug selection to shock pathophysiology

| Scenario | SVR | CO | Pathophysiology | Required Drug Effect |
|----------|-----|----|-----------------|--------------------|
| Septic shock | ? | ? | ? | ? |
| Cardiogenic shock | ? | ? | ? | ? |
| Anaphylaxis | ? | ? | ? | ? |

1. Fill in the table by examining each scenario's baseline vitals
2. Based on pathophysiology, predict which receptors to target
3. Test your predictions in the simulator

**Questions**:
- Why do sepsis and cardiogenic shock need different drugs despite both causing hypotension?
- What happens if you give a pure vasoconstrictor (phenylephrine) in cardiogenic shock?

### Activity 3: Dose-Response Relationships

**Objective**: Understand dose-response curves and therapeutic windows

1. Select **Septic Shock** scenario
2. Choose **Norepinephrine**
3. Start with minimum dose (0.05 mcg/kg/min)
4. Gradually increase dose and record:

| Dose | MAP | HR | SVR | Treatment Score |
|------|-----|----|----|----------------|
| 0.05 | | | | |
| 0.5 | | | | |
| 1.0 | | | | |
| 2.0 | | | | |
| 3.0 | | | | |

5. Open **Advanced Pharmacology Analysis** to see dose-response curves

**Questions**:
- At what dose is MAP normalised?
- What happens if you give too much norepinephrine?
- How does the dose-response curve relate to clinical titration?

### Activity 4: Critical Safety Scenario

**Objective**: Learn dangerous drug-disease interactions

1. Select **Cocaine Overdose** scenario
2. Review baseline vitals (severe hypertension, tachycardia)
3. **Try these drugs and carefully read the feedback**:
   - Propranolol (pure β-blocker) - **CONTRAINDICATED**
   - Labetalol (combined α/β-blocker) - **SAFE**
   - Midazolam (benzodiazepine) - **FIRST-LINE**

**Questions**:
- What happens if you give propranolol? Why is this dangerous?
- What is "unopposed α-stimulation"?
- Why is labetalol safe when propranolol isn't?
- Why are benzodiazepines first-line in cocaine toxicity?

**Clinical pearl**: This is a **high-stakes clinical scenario**. Knowing this can prevent serious patient harm.

### Activity 5: Multi-Drug Comparison

**Objective**: Compare drugs within the same class

Choose a scenario and compare drugs from the same class:

**Example: β1-Selective Agonists in Cardiogenic Shock**
- Dobutamine
- Isoproterenol
- Norepinephrine (has β1 activity)

**Example: Vasopressors in Septic Shock**
- Norepinephrine
- Epinephrine
- Phenylephrine
- Dopamine
- Vasopressin

For each comparison, note differences in:
- Receptor selectivity
- Effects on HR, BP, CO, SVR
- Treatment score
- Feedback messages

### Activity 6: Create Your Own Case

**Challenge**: Apply your knowledge to explain drug selection

1. Choose a scenario you understand well
2. Write a brief case presentation (2-3 sentences)
3. Justify your drug choice with:
   - Pathophysiology
   - Target receptors
   - Expected effects
   - Why alternatives are inferior
4. Test your reasoning in the simulator

**Example**:
> "A 45-year-old woman develops severe bronchospasm and hypotension 5 minutes after eating shellfish. HR 125, BP 75/40, SpO₂ 86%. I would give **epinephrine** because anaphylaxis requires multi-receptor activation: α1 for vasoconstriction (↑BP), β1 for inotropy (↑CO), and β2 for bronchodilation (↑SpO₂). Selective agents like albuterol or phenylephrine would only address one aspect of the pathophysiology."

---

## Assessment Criteria

### Formative Self-Assessment

Use these criteria to evaluate your understanding:

#### Level 1: Basic Understanding
- [ ] I can identify the four adrenoceptor subtypes (α1, α2, β1, β2)
- [ ] I can describe basic effects (α1 = vasoconstriction, β2 = bronchodilation, etc.)
- [ ] I can select the correct drug for common scenarios when given options

#### Level 2: Intermediate Application
- [ ] I can predict hemodynamic effects of selective vs non-selective agonists
- [ ] I can explain *why* certain drugs are chosen based on pathophysiology
- [ ] I can interpret vital sign changes and adjust drug dosing appropriately
- [ ] I can recognise dangerous drug-disease interactions

#### Level 3: Advanced Integration
- [ ] I can justify drug selection using receptor pharmacology, signalling pathways, and clinical evidence
- [ ] I can compare drugs within the same class and explain advantages/disadvantages
- [ ] I can apply principles to novel scenarios not explicitly covered
- [ ] I understand EC₅₀, Emax, and dose-response relationships

### Recommended Competency Checklist

Before your exams/OSCEs, ensure you can:

**Core Knowledge**
- [ ] Classify adrenergic drugs by receptor selectivity
- [ ] Describe signalling pathways (Gq, Gs, Gi) for each receptor
- [ ] List clinical indications for major adrenergic drugs
- [ ] Identify contraindications for adrenergic drugs

**Clinical Skills**
- [ ] Select appropriate drugs for anaphylaxis, septic shock, and acute asthma
- [ ] Explain why epinephrine is used in anaphylaxis (not albuterol or phenylephrine)
- [ ] Explain why norepinephrine is first-line in septic shock (not dopamine)
- [ ] Explain why pure β-blockers are contraindicated in cocaine toxicity
- [ ] Describe the rationale for β2-selective agonists in asthma

**Advanced Concepts**
- [ ] Interpret dose-response curves
- [ ] Understand partial vs full agonism (e.g., dobutamine at β2)
- [ ] Explain receptor desensitisation and tachyphylaxis
- [ ] Discuss combination therapy (e.g., norepinephrine + vasopressin in sepsis)

---

## Frequently Asked Questions

### General Questions

**Q: How much time should I spend with the simulator?**
A: Plan for 3-4 hours total:
- 30 minutes: Familiarisation and background reading (this handbook)
- 90 minutes: Working through all 8 scenarios
- 60-90 minutes: Self-study activities and deliberate practice

**Q: Should I try to memorise all the drug receptor profiles?**
A: No! Focus on understanding **patterns and principles**:
- Selective vs non-selective
- Why selectivity matters clinically
- Matching receptors to pathophysiology
The specific numbers (e.g., "epinephrine has α1=100, β1=100") are less important than understanding "epinephrine is non-selective".

**Q: What if I get a low score?**
A: **Low scores are learning opportunities!** Read the feedback carefully - it explains what went wrong and why. Then try a different drug and compare. The goal is understanding, not getting 100/100 on the first try.

**Q: Should I work through scenarios in order?**
A: Start with the "core three":
1. **Anaphylaxis** (teaches multi-receptor activation)
2. **Septic shock** (teaches vasopressors)
3. **Acute asthma** (teaches selectivity)

Then explore the others based on interest.

### Technical Questions

**Q: Why doesn't the simulator include [specific drug]?**
A: The simulator includes the most important adrenergic drugs for your curriculum. If you think a drug is missing, discuss with your tutor.

**Q: Are the dose ranges realistic?**
A: Yes, they're based on standard clinical dosing. However, remember this is a **simplified model** - real patients are more complex!

**Q: What do the colours on the receptor bars mean?**
A:
- Green/yellow/orange/red = agonist activity (increasing intensity)
- Purple/blue = antagonist activity (blockade)
- Grey = no activity

**Q: The score seems harsh - I got 40/100 but the patient isn't dead!**
A: The scoring rewards **optimal** drug selection and vital signs normalisation. A score of 40-60 means your choice was "Fair" - not dangerous, but suboptimal. Read the feedback to understand how to improve.

### Clinical Questions

**Q: In real life, would you only give one drug?**
A: Often no - many scenarios require **combination therapy** (e.g., norepinephrine + vasopressin in sepsis). The simulator simplifies to single drugs for teaching purposes. However, the principles you learn (receptor targeting, selectivity) apply to combination therapy.

**Q: What about atropine for bradycardia?**
A: Atropine (muscarinic antagonist) is first-line for bradycardia in real practice. The simulator focuses on **adrenergic** drugs, so atropine isn't included. The bradycardia scenario is designed to teach β-agonist effects.

**Q: Why is dopamine included if it's no longer first-line?**
A: Good question! Dopamine is still used in some settings, and understanding its **dose-dependent effects** and **why norepinephrine is superior** is valuable learning. Try both in septic shock and compare!

**Q: How do I know which vital signs to prioritise?**
A: In general:
1. **Oxygenation** (SpO₂) - if severely low, address immediately
2. **Perfusion** (MAP ≥65) - needed for organ function
3. **Cardiac output** - ensure adequate tissue delivery
4. **Heart rate** - optimise efficiency (not too slow or fast)

**Q: Can I use the simulator to study for exams?**
A: Absolutely! It's designed to complement your lectures and textbooks. Use it for active learning - test yourself, compare drugs, and read the detailed feedback.

---

## Further Reading

### Essential Resources

#### Textbooks
- **Rang & Dale's Pharmacology** (9th Edition)
  - Chapter 14: Noradrenergic transmission
  - Chapter 22: The heart
  - Chapter 28: The respiratory system

- **Goodman & Gilman's Pharmacological Basis of Therapeutics** (14th Edition)
  - Chapter 12: Adrenergic agonists and antagonists

- **BNF (British National Formulary)**
  - Section 2.7: Sympathomimetics
  - Always check for current dosing and indications

#### Guidelines

- **Resuscitation Council UK**: Guidelines for anaphylaxis management
- **Surviving Sepsis Campaign**: Hemodynamic support guidelines
- **BTS/SIGN**: British guideline on the management of asthma

#### Online Resources

- **Life in the Fast Lane (LITFL)**: Excellent clinical summaries of vasopressors and inotropes
- **Deranged Physiology**: Detailed explanation of adrenergic pharmacology
- **EMCrit**: Podcast and blog on critical care pharmacology

### Key Review Articles

- Overgaard CB, Dzavik V. "Inotropes and vasopressors: review of physiology and clinical use in cardiovascular disease." *Circulation* 2008;118:1047-1056.

- Gamboa JL, et al. "Comparative effectiveness of vasopressors in septic shock: a systematic review." *Crit Care Med* 2021;49:e1004-e1014.

- Russell JA. "Vasopressor therapy in critically ill patients with shock." *Intensive Care Med* 2019;45:1503-1517.

### Revision Tips

1. **Draw receptor diagrams**: Create your own table of drug-receptor profiles
2. **Make comparison charts**: Group drugs by class and compare
3. **Use the simulator actively**: Don't just watch - predict, test, reflect
4. **Teach others**: Explain your reasoning to peers (best way to consolidate)
5. **Link to clinical cases**: When you see patients on ICU/A&E, ask why specific drugs were chosen

---

## Conclusion

The Adrenoceptor Pharmacology Simulator is designed to transform your understanding from **memorisation** to **application**. By working through clinical scenarios, experimenting with different drugs, and carefully reading the educational feedback, you'll develop the clinical reasoning skills needed for safe, effective prescribing.

Remember:
- **Focus on principles** (receptor selectivity, pathophysiology matching), not just drug names
- **Learn from mistakes** - try "wrong" drugs to understand why they're inappropriate
- **Read the feedback** - it contains detailed teaching points and clinical pearls
- **Apply to practice** - when you encounter these drugs clinically, recall what you learned here

Most importantly: **adrenergic pharmacology is clinically important**. These drugs save lives in emergency medicine, critical care, and anaesthesia. Understanding them deeply will make you a better, safer doctor.

Good luck with your studies!

---

**Version 1.0**
*For questions or feedback about this handbook, please contact your module coordinator.*
