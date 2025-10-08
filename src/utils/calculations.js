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

    // Check if drug targets appropriate receptors for scenario
    let targetedCorrectly = false;

    scenario.targetReceptors.forEach(target => {
      // Check if target requires blockade (antagonist)
      const needsBlockade = target.toLowerCase().includes('blocker') || target.toLowerCase().includes('blockade');

      // Check for specific receptor targeting
      Object.keys(drugReceptors).forEach(receptor => {
        const activity = drugReceptors[receptor];

        if (needsBlockade) {
          // Target requires antagonism - check for negative values
          if (target.includes(receptor) && activity < -20) {
            targetedCorrectly = true;
          }
        } else {
          // Target requires agonism - check for positive values
          if (target.includes(receptor) && activity > 20) {
            targetedCorrectly = true;
          }
        }
      });

      // For non-receptor-specific targets (like "Benzodiazepines")
      if (target === 'Benzodiazepines' && drug.class === 'Benzodiazepine') {
        targetedCorrectly = true;
      }
      if (target === 'Combined α/β-blocker' && drug.class === 'Combined α/β-blocker') {
        targetedCorrectly = true;
      }
    });

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
        message: `Pathophysiology correlation: Massive histamine release causes vasodilation (↓SVR), increased capillary permeability (↓preload), and bronchospasm. Epinephrine addresses all three mechanisms simultaneously.`
      });
      feedback.push({
        type: 'success',
        message: `Clinical pearl: IM administration (0.3-0.5mg of 1:1000) preferred for initial management. Can repeat every 5-15 minutes. IV route reserved for refractory shock. Multi-receptor activation is essential - selective agents (e.g., albuterol alone) won't reverse hypotension.`
      });
    } else if (scenario.id === 'septic-shock' && drug.id === 'norepinephrine') {
      feedback.push({ type: 'success', message: 'Excellent choice: Norepinephrine is first-line for septic shock' });
      feedback.push({
        type: 'success',
        message: `Why this works: Predominantly α1 agonist (vasoconstriction → increases SVR → restores MAP) with some β1 activity (modest inotropy). Addresses the pathophysiology of distributive shock: profound vasodilation.`
      });
      feedback.push({
        type: 'success',
        message: `Pathophysiology correlation: Systemic inflammation causes endothelial dysfunction and nitric oxide release → loss of vascular tone → ↓SVR despite ↑CO. Norepinephrine restores vascular tone without excessive tachycardia.`
      });
      feedback.push({
        type: 'success',
        message: `Clinical pearl: Superior to dopamine (more predictable dose-response, less arrhythmogenic, less tachycardia). Surviving Sepsis guidelines recommend norepinephrine as first-line vasopressor. Target MAP ≥65 mmHg. Pure α1 agonists (phenylephrine) lack the beneficial β1 inotropy.`
      });
    } else if (scenario.id === 'asthma' && drug.id === 'albuterol') {
      feedback.push({ type: 'success', message: 'Excellent choice: Albuterol is first-line for acute asthma' });
      feedback.push({
        type: 'success',
        message: `Why this works: Selective β2 agonist → activates Gs-coupled receptors → ↑cAMP → PKA activation → smooth muscle relaxation. Bronchodilation → improved airflow → ↑SpO₂. Minimal β1 activity reduces cardiac side effects.`
      });
      feedback.push({
        type: 'success',
        message: `Pathophysiology correlation: Airway inflammation + smooth muscle contraction → bronchoconstriction. β2 receptors are abundant in bronchial smooth muscle. Activation directly opposes bronchoconstriction via cAMP-mediated relaxation.`
      });
      feedback.push({
        type: 'success',
        message: `Selectivity advantage: Non-selective β agonists (isoproterenol) cause bronchodilation but produce unwanted β1 cardiac effects (tachycardia, tremor, ↑O₂ demand). β2-selectivity provides therapeutic benefit with fewer side effects. Epinephrine reserved for anaphylaxis or life-threatening asthma where multi-receptor effects needed.`
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
    } else if (scenario.id === 'anaphylaxis') {
      // Educational feedback for suboptimal choices in anaphylaxis
      if (drug.id === 'albuterol') {
        score += 5;
        feedback.push({
          type: 'warning',
          message: `Partial solution: Albuterol (β2 agonist) addresses bronchospasm but NOT hypotension`
        });
        feedback.push({
          type: 'warning',
          message: `Why incomplete: β2 activation → bronchodilation (helpful) but lacks α1 (vasoconstriction) and β1 (inotropy) needed to reverse shock. Patient remains hypotensive (MAP ${Math.round(vitals.map)} mmHg).`
        });
        feedback.push({
          type: 'warning',
          message: `Correct approach: Epinephrine provides simultaneous α1 + β1 + β2 activation to address all three life threats: hypotension, bronchospasm, and cardiovascular collapse.`
        });
      } else if (drug.id === 'phenylephrine') {
        score += 5;
        feedback.push({
          type: 'warning',
          message: `Partial solution: Phenylephrine (selective α1 agonist) improves blood pressure but NOT bronchospasm`
        });
        feedback.push({
          type: 'warning',
          message: `Why incomplete: α1 activation → vasoconstriction → improves MAP, but lacks β2 (bronchodilation) needed for airway obstruction. Patient remains hypoxic (SpO₂ ${Math.round(vitals.spo2)}%).`
        });
        feedback.push({
          type: 'warning',
          message: `Correct approach: Epinephrine's multi-receptor profile (α1 + β1 + β2) addresses both cardiovascular collapse AND respiratory failure simultaneously.`
        });
      } else if (drug.id === 'norepinephrine') {
        score += 10;
        feedback.push({
          type: 'warning',
          message: `Nearly adequate: Norepinephrine (α1 + β1) improves hemodynamics but has minimal β2 activity`
        });
        feedback.push({
          type: 'warning',
          message: `Why suboptimal: Strong α1 + β1 effects improve MAP and cardiac output, but weak β2 activity provides inadequate bronchodilation. In severe anaphylaxis with significant bronchospasm, epinephrine's robust β2 effect is critical.`
        });
        feedback.push({
          type: 'warning',
          message: `Clinical note: Norepinephrine may be used as adjunct for refractory hypotension AFTER epinephrine, but epinephrine remains first-line for its balanced multi-receptor activation.`
        });
      } else {
        feedback.push({ type: 'warning', message: `Epinephrine is first-line for anaphylaxis - provides essential multi-receptor activation (α1 + β1 + β2)` });
      }
    } else if (scenario.id === 'septic-shock') {
      // Educational feedback for suboptimal choices in septic shock
      if (drug.id === 'dopamine') {
        score += 10;
        feedback.push({
          type: 'warning',
          message: `Suboptimal choice: Dopamine can increase MAP but has significant drawbacks vs. norepinephrine`
        });
        feedback.push({
          type: 'warning',
          message: `Why suboptimal: Dose-dependent effects (dopaminergic at low dose → β at medium → α at high) make response unpredictable. More arrhythmogenic. Causes more tachycardia (↑myocardial O₂ demand). Surviving Sepsis guidelines recommend norepinephrine over dopamine.`
        });
        feedback.push({
          type: 'warning',
          message: `Mechanism comparison: Both increase SVR, but norepinephrine provides more predictable α1 vasoconstriction with less β1-mediated tachycardia than dopamine at equivalent pressor doses.`
        });
      } else if (drug.id === 'phenylephrine') {
        score += 5;
        feedback.push({
          type: 'warning',
          message: `Suboptimal choice: Phenylephrine (pure α1 agonist) increases MAP but lacks beneficial β1 inotropy`
        });
        feedback.push({
          type: 'warning',
          message: `Why suboptimal: Pure α1 vasoconstriction increases SVR and MAP, but lacks the modest β1 inotropic support that norepinephrine provides. In septic shock with some degree of myocardial depression, the β1 component is beneficial.`
        });
        feedback.push({
          type: 'warning',
          message: `Clinical note: Phenylephrine may be used if tachycardia is problematic, but norepinephrine's balanced α1 + β1 profile is generally preferred. Consider adding inotrope (dobutamine) if cardiac output remains low.`
        });
      } else if (drug.id === 'epinephrine') {
        score += 10;
        feedback.push({
          type: 'warning',
          message: `Alternative agent: Epinephrine can be effective but typically reserved for refractory shock`
        });
        feedback.push({
          type: 'warning',
          message: `Why not first-line: Non-selective α/β agonism → strong vasoconstriction + strong inotropy, but β2-mediated vasodilation in some vascular beds and more tachycardia/arrhythmia risk than norepinephrine. Usually added when norepinephrine alone insufficient.`
        });
        feedback.push({
          type: 'warning',
          message: `Sepsis guidelines: Norepinephrine first-line, epinephrine as second-line adjunct or alternative if norepinephrine unavailable. Both increase MAP, but norepinephrine has more predictable hemodynamic profile.`
        });
      } else {
        feedback.push({ type: 'warning', message: `Norepinephrine is first-line for septic shock - provides predominantly α1 vasoconstriction with beneficial β1 inotropy` });
      }
    } else if (scenario.id === 'asthma') {
      // Educational feedback for suboptimal choices in asthma
      if (drug.id === 'isoproterenol') {
        score += 10;
        feedback.push({
          type: 'warning',
          message: `Effective but non-selective: Isoproterenol (non-selective β agonist) causes bronchodilation but has excessive cardiac effects`
        });
        feedback.push({
          type: 'warning',
          message: `Why suboptimal: Activates both β1 (cardiac) and β2 (bronchial) equally. While β2 activation provides desired bronchodilation, β1 activation causes tachycardia, tremor, and ↑myocardial O₂ demand - unwanted side effects.`
        });
        feedback.push({
          type: 'warning',
          message: `Selectivity principle: β2-selective agents (albuterol, salbutamol) provide bronchodilation with minimal β1 cardiac effects. This is a key example of how receptor selectivity reduces side effects while maintaining therapeutic efficacy.`
        });
      } else if (drug.id === 'epinephrine') {
        score += 15;
        feedback.push({
          type: 'warning',
          message: `Effective but reserved for severe asthma: Epinephrine (non-selective α/β agonist) provides bronchodilation but is not first-line`
        });
        feedback.push({
          type: 'warning',
          message: `Why not first-line: β2 activation provides bronchodilation, but non-selective profile also activates β1 (tachycardia, tremor) and α1 (vasoconstriction, HTN). More side effects than β2-selective agents.`
        });
        feedback.push({
          type: 'warning',
          message: `Clinical indication: Epinephrine reserved for life-threatening asthma exacerbations or anaphylaxis with bronchospasm, where multi-receptor effects are needed. For routine acute asthma, β2-selective agents (albuterol) provide better therapeutic index.`
        });
      } else {
        feedback.push({ type: 'warning', message: `Albuterol (β2-selective agonist) is first-line for acute asthma - provides bronchodilation with minimal cardiac effects` });
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
