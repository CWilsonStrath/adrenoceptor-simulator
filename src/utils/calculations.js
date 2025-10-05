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

  // Check for contraindicated drugs
  if (drug && scenario.contraindicated && scenario.contraindicated.includes(drug.id)) {
    score -= 50;
    feedback.push({
      type: 'danger',
      message: `⚠️ CONTRAINDICATED! ${drug.name} in ${scenario.name} causes unopposed α-stimulation → severe HTN/coronary vasoconstriction!`
    });
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

  // Check if using optimal drug
  if (drug && scenario.optimalDrug === drug.id) {
    score += 20;
    feedback.push({ type: 'success', message: 'Excellent drug choice for this scenario!' });
  } else if (drug && scenario.optimalDrug) {
    feedback.push({ type: 'warning', message: `${scenario.optimalDrug} may be more effective` });
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
