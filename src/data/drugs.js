export const drugs = [
  {
    id: 'epinephrine',
    name: 'Epinephrine',
    class: 'Non-selective adrenergic agonist',
    receptors: {
      α1: 100,
      α2: 80,
      β1: 100,
      β2: 100,
    },
    pharmacology: {
      α1: { ec50: 50, emax: 100, kd: 30, hillCoeff: 1.0 }, // nM
      α2: { ec50: 80, emax: 90, kd: 50, hillCoeff: 1.0 },
      β1: { ec50: 40, emax: 100, kd: 25, hillCoeff: 1.0 },
      β2: { ec50: 30, emax: 100, kd: 20, hillCoeff: 1.0 },
    },
    dose: {
      min: 0.01,
      max: 1.0,
      typical: 0.3,
      unit: 'mg',
      route: 'IV/IM',
    },
    effects: {
      hr: { min: 10, max: 40 },
      sbp: { min: 30, max: 80 },
      dbp: { min: 20, max: 50 },
      svr: { min: 200, max: 600 },
      co: { min: 1.0, max: 3.0 },
      bronchodilation: { min: 50, max: 70 },
    },
    indications: ['Anaphylaxis', 'Cardiac arrest', 'Severe bronchospasm'],
    halfLife: 2, // minutes
  },
  {
    id: 'norepinephrine',
    name: 'Norepinephrine',
    class: 'α and β1 agonist',
    receptors: {
      α1: 100,
      α2: 90,
      β1: 100,
      β2: 20,
    },
    pharmacology: {
      α1: { ec50: 45, emax: 100, kd: 28, hillCoeff: 1.0 }, // Full agonist
      α2: { ec50: 60, emax: 95, kd: 40, hillCoeff: 1.0 },  // Full agonist
      β1: { ec50: 35, emax: 100, kd: 22, hillCoeff: 1.0 }, // Full agonist
      β2: { ec50: 200, emax: 25, kd: 150, hillCoeff: 1.0 }, // Weak agonist
    },
    dose: {
      min: 0.05,
      max: 3.0,
      typical: 0.1,
      unit: 'mcg/kg/min',
      route: 'IV infusion',
    },
    effects: {
      hr: { min: -5, max: 10 },
      sbp: { min: 40, max: 100 },
      dbp: { min: 30, max: 70 },
      svr: { min: 400, max: 900 },
      co: { min: 0.5, max: 1.5 },
      bronchodilation: { min: 0, max: 5 },
    },
    indications: ['Septic shock', 'Neurogenic shock', 'Hypotension'],
    halfLife: 2,
  },
  {
    id: 'isoproterenol',
    name: 'Isoproterenol',
    class: 'Non-selective β agonist',
    receptors: {
      α1: 0,
      α2: 0,
      β1: 100,
      β2: 100,
    },
    pharmacology: {
      α1: { ec50: 0, emax: 0, kd: 10000, hillCoeff: 1.0 }, // No activity
      α2: { ec50: 0, emax: 0, kd: 10000, hillCoeff: 1.0 },
      β1: { ec50: 15, emax: 100, kd: 10, hillCoeff: 1.0 }, // Full agonist
      β2: { ec50: 10, emax: 100, kd: 8, hillCoeff: 1.0 },  // Full agonist
    },
    dose: {
      min: 0.02,
      max: 0.2,
      typical: 0.05,
      unit: 'mcg/kg/min',
      route: 'IV infusion',
    },
    effects: {
      hr: { min: 20, max: 60 },
      sbp: { min: -10, max: 20 },
      dbp: { min: -30, max: -10 },
      svr: { min: -600, max: -200 },
      co: { min: 2.0, max: 4.0 },
      bronchodilation: { min: 40, max: 60 },
    },
    indications: ['Bradycardia', 'Heart block', 'Torsades de pointes'],
    halfLife: 2,
  },
  {
    id: 'phenylephrine',
    name: 'Phenylephrine',
    class: 'Selective α1 agonist',
    receptors: {
      α1: 100,
      α2: 10,
      β1: 0,
      β2: 0,
    },
    pharmacology: {
      α1: { ec50: 55, emax: 100, kd: 35, hillCoeff: 1.0 }, // Selective full agonist
      α2: { ec50: 450, emax: 15, kd: 320, hillCoeff: 1.0 }, // Minimal activity
      β1: { ec50: 0, emax: 0, kd: 10000, hillCoeff: 1.0 },  // No activity
      β2: { ec50: 0, emax: 0, kd: 10000, hillCoeff: 1.0 },  // No activity
    },
    dose: {
      min: 0.5,
      max: 3.0,
      typical: 1.0,
      unit: 'mcg/kg/min',
      route: 'IV infusion',
    },
    effects: {
      hr: { min: -15, max: -5 },
      sbp: { min: 30, max: 70 },
      dbp: { min: 25, max: 60 },
      svr: { min: 300, max: 800 },
      co: { min: -0.5, max: 0.5 },
      bronchodilation: { min: 0, max: 0 },
    },
    indications: ['Hypotension during anesthesia', 'Supraventricular tachycardia'],
    halfLife: 3,
  },
  {
    id: 'dobutamine',
    name: 'Dobutamine',
    class: 'Selective β1 agonist',
    receptors: {
      α1: 10,
      α2: 5,
      β1: 100,
      β2: 50,
    },
    pharmacology: {
      α1: { ec50: 300, emax: 15, kd: 200, hillCoeff: 1.0 }, // Weak
      α2: { ec50: 500, emax: 10, kd: 350, hillCoeff: 1.0 },
      β1: { ec50: 25, emax: 100, kd: 18, hillCoeff: 1.0 }, // Full agonist
      β2: { ec50: 80, emax: 60, kd: 50, hillCoeff: 1.0 },  // Partial agonist!
    },
    dose: {
      min: 2.5,
      max: 20,
      typical: 5.0,
      unit: 'mcg/kg/min',
      route: 'IV infusion',
    },
    effects: {
      hr: { min: 5, max: 20 },
      sbp: { min: 10, max: 30 },
      dbp: { min: -10, max: 10 },
      svr: { min: -200, max: 0 },
      co: { min: 1.5, max: 3.5 },
      bronchodilation: { min: 5, max: 15 },
    },
    indications: ['Cardiogenic shock', 'Heart failure', 'Stress echocardiography'],
    halfLife: 2,
  },
  {
    id: 'albuterol',
    name: 'Albuterol',
    class: 'Selective β2 agonist',
    receptors: {
      α1: 0,
      α2: 0,
      β1: 10,
      β2: 100,
    },
    pharmacology: {
      α1: { ec50: 0, emax: 0, kd: 10000, hillCoeff: 1.0 },  // No activity
      α2: { ec50: 0, emax: 0, kd: 10000, hillCoeff: 1.0 },  // No activity
      β1: { ec50: 350, emax: 12, kd: 250, hillCoeff: 1.0 }, // Minimal activity
      β2: { ec50: 12, emax: 100, kd: 9, hillCoeff: 1.0 },   // Selective full agonist
    },
    dose: {
      min: 2.5,
      max: 5.0,
      typical: 2.5,
      unit: 'mg',
      route: 'Nebulized',
    },
    effects: {
      hr: { min: 5, max: 20 },
      sbp: { min: -5, max: 5 },
      dbp: { min: -10, max: -5 },
      svr: { min: -100, max: 0 },
      co: { min: 0.2, max: 0.8 },
      bronchodilation: { min: 50, max: 75 },
    },
    indications: ['Asthma', 'COPD', 'Hyperkalemia'],
    halfLife: 240, // 4 hours
  },
  {
    id: 'dopamine',
    name: 'Dopamine',
    class: 'Dose-dependent adrenergic agonist',
    receptors: {
      α1: 60,
      α2: 40,
      β1: 80,
      β2: 30,
    },
    pharmacology: {
      α1: { ec50: 120, emax: 70, kd: 85, hillCoeff: 1.0 },  // Moderate agonist
      α2: { ec50: 180, emax: 50, kd: 130, hillCoeff: 1.0 }, // Moderate agonist
      β1: { ec50: 60, emax: 85, kd: 42, hillCoeff: 1.0 },   // Strong agonist
      β2: { ec50: 220, emax: 35, kd: 160, hillCoeff: 1.0 }, // Weak agonist
    },
    dose: {
      min: 5,
      max: 20,
      typical: 10,
      unit: 'mcg/kg/min',
      route: 'IV infusion',
    },
    effects: {
      hr: { min: 10, max: 30 },
      sbp: { min: 20, max: 50 },
      dbp: { min: 15, max: 40 },
      svr: { min: 100, max: 400 },
      co: { min: 1.0, max: 2.5 },
      bronchodilation: { min: 5, max: 10 },
    },
    indications: ['Shock', 'Hypotension', 'Bradycardia'],
    halfLife: 2,
  },
  {
    id: 'ephedrine',
    name: 'Ephedrine',
    class: 'Indirect-acting sympathomimetic',
    receptors: {
      α1: 50,
      α2: 30,
      β1: 60,
      β2: 40,
    },
    pharmacology: {
      α1: { ec50: 180, emax: 60, kd: 130, hillCoeff: 1.0 }, // Moderate partial agonist
      α2: { ec50: 280, emax: 40, kd: 200, hillCoeff: 1.0 }, // Weak partial agonist
      β1: { ec50: 140, emax: 70, kd: 100, hillCoeff: 1.0 }, // Moderate partial agonist
      β2: { ec50: 190, emax: 50, kd: 140, hillCoeff: 1.0 }, // Weak partial agonist
    },
    dose: {
      min: 5,
      max: 25,
      typical: 10,
      unit: 'mg',
      route: 'IV',
    },
    effects: {
      hr: { min: 5, max: 15 },
      sbp: { min: 15, max: 40 },
      dbp: { min: 10, max: 30 },
      svr: { min: 100, max: 300 },
      co: { min: 0.5, max: 1.5 },
      bronchodilation: { min: 10, max: 20 },
    },
    indications: ['Hypotension', 'Anesthesia-induced hypotension'],
    halfLife: 180, // 3 hours
  },
  {
    id: 'vasopressin',
    name: 'Vasopressin',
    class: 'Non-adrenergic vasopressor',
    receptors: {
      α1: 0,
      α2: 0,
      β1: 0,
      β2: 0,
      V1: 100, // Vasopressin receptor
    },
    pharmacology: {
      α1: { ec50: 0, emax: 0, kd: 10000, hillCoeff: 1.0 }, // No activity
      α2: { ec50: 0, emax: 0, kd: 10000, hillCoeff: 1.0 }, // No activity
      β1: { ec50: 0, emax: 0, kd: 10000, hillCoeff: 1.0 }, // No activity
      β2: { ec50: 0, emax: 0, kd: 10000, hillCoeff: 1.0 }, // No activity
    },
    dose: {
      min: 0.01,
      max: 0.04,
      typical: 0.03,
      unit: 'units/min',
      route: 'IV infusion',
    },
    effects: {
      hr: { min: -5, max: 0 },
      sbp: { min: 20, max: 50 },
      dbp: { min: 15, max: 40 },
      svr: { min: 300, max: 700 },
      co: { min: -0.5, max: 0.5 },
      bronchodilation: { min: 0, max: 0 },
    },
    indications: ['Septic shock', 'Cardiac arrest', 'Vasodilatory shock'],
    halfLife: 10,
  },
  {
    id: 'milrinone',
    name: 'Milrinone',
    class: 'Phosphodiesterase-3 inhibitor',
    receptors: {
      α1: 0,
      α2: 0,
      β1: 0,
      β2: 0,
      PDE3: 100, // Not adrenergic
    },
    pharmacology: {
      α1: { ec50: 0, emax: 0, kd: 10000, hillCoeff: 1.0 }, // No activity
      α2: { ec50: 0, emax: 0, kd: 10000, hillCoeff: 1.0 }, // No activity
      β1: { ec50: 0, emax: 0, kd: 10000, hillCoeff: 1.0 }, // No activity
      β2: { ec50: 0, emax: 0, kd: 10000, hillCoeff: 1.0 }, // No activity
    },
    dose: {
      min: 0.375,
      max: 0.75,
      typical: 0.5,
      unit: 'mcg/kg/min',
      route: 'IV infusion',
    },
    effects: {
      hr: { min: 5, max: 15 },
      sbp: { min: -10, max: 10 },
      dbp: { min: -15, max: -5 },
      svr: { min: -400, max: -100 },
      co: { min: 1.0, max: 2.5 },
      bronchodilation: { min: 0, max: 5 },
    },
    indications: ['Heart failure', 'Cardiogenic shock', 'Post-cardiac surgery'],
    halfLife: 150, // 2.5 hours
  },
  {
    id: 'propranolol',
    name: 'Propranolol',
    class: 'Non-selective β-blocker',
    receptors: {
      α1: 0,
      α2: 0,
      β1: -100, // Blockade
      β2: -100, // Blockade
    },
    pharmacology: {
      α1: { ec50: 0, emax: 0, kd: 10000, hillCoeff: 1.0 },
      α2: { ec50: 0, emax: 0, kd: 10000, hillCoeff: 1.0 },
      β1: { ec50: 12, emax: 0, kd: 8, hillCoeff: 1.0 },  // Competitive antagonist
      β2: { ec50: 10, emax: 0, kd: 7, hillCoeff: 1.0 },  // Competitive antagonist
    },
    dose: {
      min: 0.5,
      max: 3.0,
      typical: 1.0,
      unit: 'mg',
      route: 'IV',
    },
    effects: {
      hr: { min: -40, max: -15 },
      sbp: { min: -30, max: -10 },
      dbp: { min: -20, max: -5 },
      svr: { min: 0, max: 100 },
      co: { min: -2.0, max: -0.5 },
      bronchodilation: { min: -30, max: -10 }, // Bronchoconstriction risk
    },
    indications: ['Thyroid storm', 'Tachyarrhythmias', 'Hypertension'],
    halfLife: 240, // 4 hours
  },
  {
    id: 'metoprolol',
    name: 'Metoprolol',
    class: 'Selective β1-blocker',
    receptors: {
      α1: 0,
      α2: 0,
      β1: -100, // Blockade
      β2: -20, // Minimal at therapeutic doses
    },
    pharmacology: {
      α1: { ec50: 0, emax: 0, kd: 10000, hillCoeff: 1.0 },
      α2: { ec50: 0, emax: 0, kd: 10000, hillCoeff: 1.0 },
      β1: { ec50: 18, emax: 0, kd: 12, hillCoeff: 1.0 },  // Selective β1 antagonist
      β2: { ec50: 320, emax: 0, kd: 240, hillCoeff: 1.0 }, // Weak β2 antagonist
    },
    dose: {
      min: 2.5,
      max: 15,
      typical: 5,
      unit: 'mg',
      route: 'IV',
    },
    effects: {
      hr: { min: -35, max: -10 },
      sbp: { min: -25, max: -10 },
      dbp: { min: -15, max: -5 },
      svr: { min: 0, max: 50 },
      co: { min: -1.5, max: -0.3 },
      bronchodilation: { min: -10, max: 0 }, // Less bronchospasm than propranolol
    },
    indications: ['Acute MI', 'Hypertension', 'Atrial fibrillation'],
    halfLife: 180, // 3 hours
  },
  {
    id: 'esmolol',
    name: 'Esmolol',
    class: 'Ultra-short acting β1-blocker',
    receptors: {
      α1: 0,
      α2: 0,
      β1: -100, // Blockade
      β2: -15,
    },
    pharmacology: {
      α1: { ec50: 0, emax: 0, kd: 10000, hillCoeff: 1.0 },
      α2: { ec50: 0, emax: 0, kd: 10000, hillCoeff: 1.0 },
      β1: { ec50: 22, emax: 0, kd: 15, hillCoeff: 1.0 },  // Selective β1 antagonist
      β2: { ec50: 420, emax: 0, kd: 310, hillCoeff: 1.0 }, // Weak β2 antagonist
    },
    dose: {
      min: 50,
      max: 300,
      typical: 100,
      unit: 'mcg/kg/min',
      route: 'IV infusion',
    },
    effects: {
      hr: { min: -30, max: -10 },
      sbp: { min: -20, max: -5 },
      dbp: { min: -15, max: -5 },
      svr: { min: 0, max: 30 },
      co: { min: -1.2, max: -0.2 },
      bronchodilation: { min: -5, max: 0 },
    },
    indications: ['Perioperative tachycardia', 'Hypertensive emergency', 'Thyroid storm'],
    halfLife: 9, // 9 minutes
  },
  {
    id: 'labetalol',
    name: 'Labetalol',
    class: 'Combined α/β-blocker',
    receptors: {
      α1: -30, // Alpha blockade
      α2: -20,
      β1: -100, // Beta blockade
      β2: -60,
    },
    pharmacology: {
      α1: { ec50: 110, emax: 0, kd: 75, hillCoeff: 1.0 },  // α1 antagonist
      α2: { ec50: 180, emax: 0, kd: 130, hillCoeff: 1.0 }, // Weak α2 antagonist
      β1: { ec50: 28, emax: 0, kd: 19, hillCoeff: 1.0 },   // β1 antagonist
      β2: { ec50: 65, emax: 0, kd: 45, hillCoeff: 1.0 },   // β2 antagonist
    },
    dose: {
      min: 5,
      max: 40,
      typical: 20,
      unit: 'mg',
      route: 'IV',
    },
    effects: {
      hr: { min: -20, max: -5 },
      sbp: { min: -40, max: -15 },
      dbp: { min: -30, max: -10 },
      svr: { min: -200, max: -50 }, // Alpha blockade reduces SVR
      co: { min: -0.5, max: 0.5 },
      bronchodilation: { min: -10, max: 0 },
    },
    indications: ['Hypertensive emergency', 'Cocaine toxicity', 'Preeclampsia'],
    halfLife: 300, // 5 hours
  },
  {
    id: 'phentolamine',
    name: 'Phentolamine',
    class: 'Non-selective α-blocker',
    receptors: {
      α1: -100, // Alpha blockade
      α2: -100,
      β1: 0,
      β2: 0,
    },
    pharmacology: {
      α1: { ec50: 32, emax: 0, kd: 22, hillCoeff: 1.0 }, // Non-selective α antagonist
      α2: { ec50: 28, emax: 0, kd: 19, hillCoeff: 1.0 }, // Non-selective α antagonist
      β1: { ec50: 0, emax: 0, kd: 10000, hillCoeff: 1.0 },
      β2: { ec50: 0, emax: 0, kd: 10000, hillCoeff: 1.0 },
    },
    dose: {
      min: 0.5,
      max: 5.0,
      typical: 2.0,
      unit: 'mg',
      route: 'IV',
    },
    effects: {
      hr: { min: 10, max: 30 }, // Reflex tachycardia
      sbp: { min: -50, max: -20 },
      dbp: { min: -40, max: -15 },
      svr: { min: -600, max: -200 },
      co: { min: 0.5, max: 1.5 },
      bronchodilation: { min: 0, max: 0 },
    },
    indications: ['Pheochromocytoma crisis', 'Cocaine toxicity', 'Extravasation injury'],
    halfLife: 19, // 19 minutes
  },
  {
    id: 'prazosin',
    name: 'Prazosin',
    class: 'Selective α1-blocker',
    receptors: {
      α1: -100, // Alpha-1 blockade
      α2: 0,
      β1: 0,
      β2: 0,
    },
    pharmacology: {
      α1: { ec50: 15, emax: 0, kd: 10, hillCoeff: 1.0 }, // Selective α1 antagonist (high affinity)
      α2: { ec50: 0, emax: 0, kd: 10000, hillCoeff: 1.0 },
      β1: { ec50: 0, emax: 0, kd: 10000, hillCoeff: 1.0 },
      β2: { ec50: 0, emax: 0, kd: 10000, hillCoeff: 1.0 },
    },
    dose: {
      min: 0.5,
      max: 2.0,
      typical: 1.0,
      unit: 'mg',
      route: 'PO',
    },
    effects: {
      hr: { min: 5, max: 15 }, // Mild reflex tachycardia
      sbp: { min: -30, max: -10 },
      dbp: { min: -25, max: -10 },
      svr: { min: -400, max: -100 },
      co: { min: 0.2, max: 0.8 },
      bronchodilation: { min: 0, max: 0 },
    },
    indications: ['Hypertension', 'BPH', 'PTSD nightmares'],
    halfLife: 180, // 2-3 hours
  },
  {
    id: 'clonidine',
    name: 'Clonidine',
    class: 'Central α2-agonist',
    receptors: {
      α1: 0,
      α2: 100, // Central α2 agonism
      β1: 0,
      β2: 0,
    },
    pharmacology: {
      α1: { ec50: 0, emax: 0, kd: 10000, hillCoeff: 1.0 },
      α2: { ec50: 25, emax: 100, kd: 18, hillCoeff: 1.0 }, // Selective α2 full agonist (high affinity)
      β1: { ec50: 0, emax: 0, kd: 10000, hillCoeff: 1.0 },
      β2: { ec50: 0, emax: 0, kd: 10000, hillCoeff: 1.0 },
    },
    dose: {
      min: 0.05,
      max: 0.3,
      typical: 0.15,
      unit: 'mg',
      route: 'IV/PO',
    },
    effects: {
      hr: { min: -20, max: -5 },
      sbp: { min: -40, max: -15 },
      dbp: { min: -30, max: -10 },
      svr: { min: -300, max: -100 },
      co: { min: -0.5, max: 0 },
      bronchodilation: { min: 0, max: 0 },
    },
    indications: ['Hypertensive emergency', 'Opioid/alcohol withdrawal', 'ADHD'],
    halfLife: 720, // 12 hours
  },
  {
    id: 'midazolam',
    name: 'Midazolam',
    class: 'Benzodiazepine',
    receptors: {
      α1: 0,
      α2: 0,
      β1: 0,
      β2: 0,
    },
    pharmacology: {
      α1: { ec50: 0, emax: 0, kd: 10000, hillCoeff: 1.0 },
      α2: { ec50: 0, emax: 0, kd: 10000, hillCoeff: 1.0 },
      β1: { ec50: 0, emax: 0, kd: 10000, hillCoeff: 1.0 },
      β2: { ec50: 0, emax: 0, kd: 10000, hillCoeff: 1.0 },
    },
    dose: {
      min: 1,
      max: 10,
      typical: 5,
      unit: 'mg',
      route: 'IV',
    },
    effects: {
      hr: { min: -15, max: -5 },
      sbp: { min: -30, max: -10 },
      dbp: { min: -20, max: -5 },
      svr: { min: -200, max: -50 },
      co: { min: -0.5, max: 0 },
      bronchodilation: { min: 0, max: 0 },
    },
    indications: ['Cocaine toxicity (first-line)', 'Sedation', 'Seizures', 'Agitation'],
    halfLife: 120, // 2 hours
  },
];
