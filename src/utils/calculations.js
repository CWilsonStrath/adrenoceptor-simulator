// Pharmacodynamic calculations for adrenergic drugs

export const calculateDrugEffect = (drug, dose, baseline, scenario) => {
  if (!drug || dose <= 0) {
    return {
      ...baseline,
      map: Math.round(baseline.dbp + (baseline.sbp - baseline.dbp) / 3)
    };
  }

  const doseRatio = (dose - drug.dose.min) / (drug.dose.max - drug.dose.min);
  const potency = Math.min(Math.max(doseRatio, 0), 1);

  const newVitals = { ...baseline };

  // Calculate heart rate effect
  const hrChange = drug.effects.hr.min + (drug.effects.hr.max - drug.effects.hr.min) * potency;
  newVitals.hr = Math.max(30, Math.min(200, baseline.hr + hrChange));

  // Calculate blood pressure effects
  const sbpChange = drug.effects.sbp.min + (drug.effects.sbp.max - drug.effects.sbp.min) * potency;
  const dbpChange = drug.effects.dbp.min + (drug.effects.dbp.max - drug.effects.dbp.min) * potency;
  newVitals.sbp = Math.max(50, Math.min(250, baseline.sbp + sbpChange));
  newVitals.dbp = Math.max(30, Math.min(150, baseline.dbp + dbpChange));

  // Calculate SVR effect
  const svrChange = drug.effects.svr.min + (drug.effects.svr.max - drug.effects.svr.min) * potency;
  newVitals.svr = Math.max(200, Math.min(3000, baseline.svr + svrChange));

  // Calculate cardiac output effect
  const coChange = drug.effects.co.min + (drug.effects.co.max - drug.effects.co.min) * potency;
  newVitals.co = Math.max(2.0, Math.min(15.0, baseline.co + coChange));

  // Calculate bronchodilation effect
  const bronchChange = drug.effects.bronchodilation.min +
    (drug.effects.bronchodilation.max - drug.effects.bronchodilation.min) * potency;
  newVitals.bronchodilation = Math.max(0, Math.min(100, baseline.bronchodilation + bronchChange));

  // Calculate SpO2 based on bronchodilation and cardiac output
  const oxygenationFactor = (newVitals.bronchodilation / 100) * (newVitals.co / 5.0);
  newVitals.spo2 = Math.max(70, Math.min(100, 75 + oxygenationFactor * 25));

  // Calculate MAP
  newVitals.map = Math.round(newVitals.dbp + (newVitals.sbp - newVitals.dbp) / 3);

  return newVitals;
};

export const calculateReceptorActivation = (drug, dose) => {
  if (!drug || dose <= 0) return { α1: 0, α2: 0, β1: 0, β2: 0 };

  const doseRatio = (dose - drug.dose.min) / (drug.dose.max - drug.dose.min);
  const potency = Math.min(Math.max(doseRatio, 0), 1);

  return {
    α1: (drug.receptors.α1 || 0) * potency,
    α2: (drug.receptors.α2 || 0) * potency,
    β1: (drug.receptors.β1 || 0) * potency,
    β2: (drug.receptors.β2 || 0) * potency,
  };
};

export const assessTreatmentQuality = (scenario, vitals, drug) => {
  let score = 0;
  const feedback = [];

  // Check for contraindicated drugs - provide detailed educational feedback
  if (drug && scenario.contraindicated && scenario.contraindicated.includes(drug.id)) {
    score -= 50;

    // Special educational feedback for cocaine + beta-blocker
    if (scenario.id === 'cocaine-od' && (drug.id === 'propranolol' || drug.id === 'metoprolol' || drug.id === 'esmolol')) {
      feedback.push({
        type: 'danger',
        message: `⚠️ DANGEROUS CHOICE: Pure β-blocker in cocaine toxicity`
      });
      feedback.push({
        type: 'danger',
        message: `Mechanism: Cocaine blocks catecholamine reuptake → both α and β receptors are activated. Blocking only β-receptors removes β2-mediated vasodilation while α1-vasoconstriction continues unopposed.`
      });
      feedback.push({
        type: 'danger',
        message: `Consequence: Unopposed α1 stimulation → severe peripheral vasoconstriction → extreme hypertension, coronary vasospasm, end-organ ischaemia. This can precipitate MI, stroke, or acute limb ischaemia.`
      });
      feedback.push({
        type: 'warning',
        message: `Correct approach: (1) Benzodiazepines first to reduce sympathetic tone, then (2) combined α/β-blocker (e.g., labetalol) OR α-blocker first (e.g., phentolamine) followed by β-blocker only if needed.`
      });
    } else {
      // Generic contraindication message for other scenarios
      feedback.push({
        type: 'danger',
        message: `⚠️ CONTRAINDICATED: ${drug.name} is dangerous in ${scenario.name}`
      });
    }
  }

  // Check receptor targeting
  if (drug && scenario.targetReceptors) {
    const drugReceptors = drug.receptors || {};
    const activeReceptors = [];

    // Identify which receptors the drug activates/blocks significantly
    Object.keys(drugReceptors).forEach(receptor => {
      const activity = Math.abs(drugReceptors[receptor]);
      if (activity > 20) {
        activeReceptors.push(receptor);
      }
    });

    // Check if drug targets appropriate receptors for scenario
    const targetedCorrectly = scenario.targetReceptors.some(target =>
      activeReceptors.some(active => target.includes(active))
    );

    if (targetedCorrectly) {
      score += 20;
      feedback.push({
        type: 'success',
        message: `Good receptor targeting! This scenario benefits from targeting: ${scenario.targetReceptors.join(', ')}`
      });
    } else {
      feedback.push({
        type: 'warning',
        message: `Consider drugs targeting: ${scenario.targetReceptors.join(', ')}`
      });
    }
  }

  // Check if using optimal drug - provide detailed educational feedback
  if (drug && scenario.optimalDrug === drug.id) {
    score += 20;

    // Scenario-specific educational feedback
    if (scenario.id === 'cocaine-od' && drug.id === 'labetalol') {
      feedback.push({ type: 'success', message: 'Excellent choice: Labetalol is a combined α/β-blocker' });
      feedback.push({
        type: 'success',
        message: `Why this works: Labetalol blocks α1 (reduces vasoconstriction/HTN) AND β (reduces HR/cardiac work) simultaneously. The α-blockade prevents unopposed α-stimulation that occurs with pure β-blockers.`
      });
      feedback.push({
        type: 'success',
        message: `Clinical pearl: α:β blockade ratio is ~1:7, providing sufficient α-blockade to prevent coronary vasospasm while controlling tachycardia and myocardial oxygen demand.`
      });
    } else if (scenario.id === 'anaphylaxis' && drug.id === 'epinephrine') {
      feedback.push({ type: 'success', message: 'Excellent choice: Epinephrine is first-line for anaphylaxis' });
      feedback.push({
        type: 'success',
        message: `Why this works: Non-selective agonist activating α1 (vasoconstriction → reverses hypotension), β1 (inotropy/chronotropy → improves cardiac output), and β2 (bronchodilation → relieves airway obstruction).`
      });
      feedback.push({
        type: 'success',
        message: `Multi-receptor activation addresses all three life-threatening features: hypotension, bronchospasm, and cardiovascular collapse.`
      });
    } else if (scenario.id === 'septic-shock' && drug.id === 'norepinephrine') {
      feedback.push({ type: 'success', message: 'Excellent choice: Norepinephrine is first-line for septic shock' });
      feedback.push({
        type: 'success',
        message: `Why this works: Predominantly α1 agonist (vasoconstriction → increases SVR → restores MAP) with some β1 activity (modest inotropy). Addresses the pathophysiology of distributive shock: profound vasodilation.`
      });
      feedback.push({
        type: 'success',
        message: `Superior to dopamine: More predictable dose-response, less tachycardia/arrhythmia risk, preferred in current sepsis guidelines.`
      });
    } else if (scenario.id === 'asthma' && drug.id === 'albuterol') {
      feedback.push({ type: 'success', message: 'Excellent choice: Albuterol is first-line for acute asthma' });
      feedback.push({
        type: 'success',
        message: `Why this works: Selective β2 agonist → relaxes bronchial smooth muscle → bronchodilation → improved airflow → increased SpO₂. Minimal β1 activity reduces cardiac side effects (tachycardia, tremor).`
      });
      feedback.push({
        type: 'success',
        message: `Selectivity advantage: Non-selective β agonists (like isoproterenol) also cause bronchodilation but produce unwanted β1 effects (tachycardia). β2-selectivity provides therapeutic benefit with fewer side effects.`
      });
    } else {
      feedback.push({ type: 'success', message: 'Excellent drug choice for this scenario!' });
    }
  } else if (drug && scenario.optimalDrug) {
    // Provide helpful suggestions for cocaine scenario
    if (scenario.id === 'cocaine-od') {
      if (drug.id === 'midazolam') {
        score += 25;
        feedback.push({
          type: 'success',
          message: `Excellent first-line choice: Benzodiazepines are the foundation of cocaine toxicity management`
        });
        feedback.push({
          type: 'success',
          message: `Mechanism: Reduces central sympathetic outflow and controls agitation/seizures. Often sufficient alone for mild-moderate toxicity. If severe HTN persists, add labetalol or phentolamine.`
        });
        feedback.push({
          type: 'success',
          message: `Clinical approach: Benzodiazepines first → reassess → add α/β blockade if needed. Never β-blockers alone.`
        });
      } else if (drug.id === 'phentolamine') {
        score += 15;
        feedback.push({
          type: 'success',
          message: `Good choice: Phentolamine (α-blocker) safely reduces hypertension without causing unopposed α-stimulation. Best used after benzodiazepines. Combined α/β-blocker (labetalol) may also be effective.`
        });
      } else if (drug.id === 'carvedilol') {
        score += 15;
        feedback.push({
          type: 'success',
          message: `Good choice: Carvedilol is also a combined α/β-blocker, similar mechanism to labetalol. Best used after benzodiazepines.`
        });
      } else {
        feedback.push({ type: 'warning', message: `Consider benzodiazepines first-line, then labetalol (combined α/β-blocker) if needed` });
      }
    } else {
      feedback.push({ type: 'warning', message: `${scenario.optimalDrug} may be more effective` });
    }
  }

  // Blood pressure assessment
  if (vitals.map >= 65 && vitals.map <= 110) {
    score += 25;
    feedback.push({ type: 'success', message: 'MAP within target range (65-110 mmHg)' });
  } else if (vitals.map < 65) {
    feedback.push({ type: 'danger', message: 'MAP too low - inadequate perfusion!' });
  } else {
    feedback.push({ type: 'warning', message: 'MAP elevated - risk of end-organ damage' });
  }

  // Heart rate assessment
  if (vitals.hr >= 60 && vitals.hr <= 100) {
    score += 20;
    feedback.push({ type: 'success', message: 'Heart rate within normal range' });
  } else if (vitals.hr < 60) {
    feedback.push({ type: 'warning', message: 'Bradycardia present' });
  } else if (vitals.hr > 120) {
    feedback.push({ type: 'danger', message: 'Severe tachycardia - increased myocardial O2 demand!' });
  }

  // Oxygenation assessment
  if (vitals.spo2 >= 94) {
    score += 15;
    feedback.push({ type: 'success', message: 'Adequate oxygenation' });
  } else if (vitals.spo2 >= 90) {
    feedback.push({ type: 'warning', message: 'Mild hypoxemia' });
  } else {
    feedback.push({ type: 'danger', message: 'Severe hypoxemia - critical!' });
  }

  // Cardiac output assessment
  if (vitals.co >= 4.0 && vitals.co <= 8.0) {
    score += 10;
    feedback.push({ type: 'success', message: 'Cardiac output adequate' });
  } else if (vitals.co < 4.0) {
    feedback.push({ type: 'danger', message: 'Low cardiac output - inadequate tissue perfusion' });
  } else {
    feedback.push({ type: 'warning', message: 'High cardiac output state' });
  }

  return {
    score: Math.min(100, score),
    feedback,
    grade: score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : score >= 40 ? 'Fair' : 'Poor',
  };
};

export const getReceptorColor = (activation) => {
  // Negative values = blockade (purple/blue)
  if (activation <= -75) return 'bg-purple-600';
  if (activation <= -50) return 'bg-purple-500';
  if (activation <= -25) return 'bg-purple-400';
  if (activation < 0) return 'bg-purple-300';

  // Positive values = agonism (green/yellow/red)
  if (activation >= 75) return 'bg-red-500';
  if (activation >= 50) return 'bg-orange-500';
  if (activation >= 25) return 'bg-yellow-500';
  if (activation > 0) return 'bg-green-500';

  return 'bg-gray-300';
};

export const formatDose = (drug, dose) => {
  if (!drug) return '';
  return `${dose.toFixed(2)} ${drug.dose.unit}`;
};
