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
        message: `⚠️ DANGEROUS: Selective β-blockade with elevated endogenous catecholamines`
      });
      feedback.push({
        type: 'danger',
        message: `Pharmacological mechanism: Cocaine blocks noradrenaline reuptake transporters → ↑synaptic catecholamines → simultaneous activation of α1, β1, and β2 receptors. Selective β-antagonism blocks β2-mediated vasodilation (Gs → ↓cAMP in vascular smooth muscle) while leaving α1-vasoconstriction (Gq → ↑IP₃/Ca²⁺) unopposed.`
      });
      feedback.push({
        type: 'danger',
        message: `Unopposed α1-stimulation: Loss of β2-mediated vasodilatory balance → severe α1-mediated vasoconstriction → extreme peripheral resistance and coronary vasospasm. This illustrates a critical principle: blocking one receptor subtype can unmask effects of other activated subtypes.`
      });
      feedback.push({
        type: 'warning',
        message: `Receptor-based solution: Combined α/β-blockade (e.g., labetalol) or α-blockade first, then β-blockade. This prevents unopposed α1 activation by ensuring balanced antagonism across receptor subtypes.`
      });
    } else if (scenario.id === 'anaphylaxis' && (drug.id === 'propranolol' || drug.id === 'metoprolol' || drug.id === 'esmolol')) {
      // Special educational feedback for anaphylaxis + beta-blocker
      feedback.push({
        type: 'danger',
        message: `⚠️ DANGEROUS: β-antagonism blocks compensatory adrenergic responses`
      });
      feedback.push({
        type: 'danger',
        message: `Pharmacological mechanism: Anaphylaxis requires both β1 (cardiac Gs → ↑cAMP → ↑inotropy/chronotropy) and β2 (bronchial Gs → ↑cAMP → smooth muscle relaxation) receptor activation. Competitive β-antagonism blocks endogenous adrenaline from accessing these receptors, preventing compensatory cardiovascular and bronchial responses.`
      });
      feedback.push({
        type: 'danger',
        message: `Receptor blockade consequences: β2-antagonism → prevents cAMP-mediated bronchial smooth muscle relaxation → refractory bronchospasm. β1-antagonism → prevents compensatory cardiac output increase → worsening shock. This demonstrates how antagonists prevent agonist-receptor binding even when endogenous agonist levels are elevated.`
      });
      feedback.push({
        type: 'warning',
        message: `Receptor-based solution: Non-selective adrenergic agonist with high efficacy at α1, β1, and β2 receptors needed. In chronic β-blocker patients, higher agonist doses may be required to overcome competitive antagonism, or alternative signaling pathways (e.g., glucagon → bypasses β-receptors) may be needed.`
      });
    } else {
      // Generic contraindication message for other scenarios
      feedback.push({
        type: 'danger',
        message: `⚠️ CONTRAINDICATED: ${drug.name} is dangerous in ${scenario.name}`
      });
    }
  }

  // Special handling for Normal Physiology scenario - focus on educational exploration
  if (scenario.id === 'normal' && drug) {
    const drugReceptors = drug.receptors || {};
    const activationDetails = [];

    // Describe receptor activation pattern
    if (drugReceptors.α1 > 50) {
      activationDetails.push(`Strong α1 activation → Gq → ↑IP₃/Ca²⁺ → vasoconstriction → ↑BP/SVR`);
    } else if (drugReceptors.α1 > 20) {
      activationDetails.push(`Moderate α1 activation → Gq signaling → vasoconstriction`);
    }

    if (drugReceptors.β1 > 50) {
      activationDetails.push(`Strong β1 activation → Gs → ↑cAMP → ↑HR, ↑contractility, ↑CO`);
    } else if (drugReceptors.β1 > 20) {
      activationDetails.push(`Moderate β1 activation → Gs signaling → cardiac stimulation`);
    }

    if (drugReceptors.β2 > 50) {
      activationDetails.push(`Strong β2 activation → Gs → ↑cAMP → bronchodilation, vasodilation`);
    } else if (drugReceptors.β2 > 20) {
      activationDetails.push(`Moderate β2 activation → Gs signaling → smooth muscle relaxation`);
    }

    // Handle antagonists
    if (drugReceptors.β1 < -50 || drugReceptors.β2 < -50) {
      activationDetails.push(`β-Antagonism → blocks endogenous catecholamine binding → ↓HR, ↓contractility`);
    }
    if (drugReceptors.α1 < -50) {
      activationDetails.push(`α1-Antagonism → blocks endogenous α1 tone → vasodilation`);
    }

    if (activationDetails.length > 0) {
      feedback.push({
        type: 'success',
        message: `Receptor pharmacology in normal state:`
      });
      activationDetails.forEach(detail => {
        feedback.push({
          type: 'success',
          message: detail
        });
      });
      feedback.push({
        type: 'success',
        message: `Observe how receptor activation translates to physiological effects. Compare EC₅₀ values and selectivity ratios in the Advanced Analysis section.`
      });
      score += 20;
    }
  }

  // Check receptor targeting (skip for normal scenario)
  if (drug && scenario.targetReceptors && scenario.id !== 'normal') {
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

  // Check if using optimal drug - provide detailed educational feedback (skip for normal scenario)
  if (drug && scenario.optimalDrug === drug.id && scenario.id !== 'normal') {
    score += 20;

    // Scenario-specific educational feedback
    if (scenario.id === 'cocaine-od' && drug.id === 'labetalol') {
      feedback.push({ type: 'success', message: 'Excellent receptor profile match: Combined α1/β antagonist' });
      feedback.push({
        type: 'success',
        message: `Receptor pharmacology: Competitive antagonist at α1 (Kd ~75nM), β1 (Kd ~19nM), and β2 (Kd ~45nM) receptors. Blocks both α1-mediated vasoconstriction and β-mediated cardiac effects simultaneously. The α:β blockade ratio (~1:7) means β-blockade predominates, but sufficient α1-antagonism prevents unopposed α-stimulation that occurs with selective β-blockers.`
      });
      feedback.push({
        type: 'success',
        message: `Competitive antagonism principle: Labetalol competes with endogenous catecholamines for receptor binding sites. In cocaine toxicity, elevated synaptic norepinephrine activates both α and β receptors - blocking both receptor subtypes addresses the full spectrum of adrenergic overstimulation.`
      });
    } else if (scenario.id === 'anaphylaxis' && drug.id === 'adrenaline') {
      feedback.push({ type: 'success', message: 'Excellent receptor profile match: Non-selective adrenergic agonist' });
      feedback.push({
        type: 'success',
        message: `Receptor pharmacology: Full agonist at α1, β1, and β2 receptors (Emax ~100% at all three). α1 activation → Gq coupling → ↑IP₃/Ca²⁺ → vascular smooth muscle contraction. β1 activation → Gs coupling → ↑cAMP → ↑cardiac contractility and rate. β2 activation → Gs coupling → ↑cAMP → bronchial smooth muscle relaxation.`
      });
      feedback.push({
        type: 'success',
        message: `Multi-receptor advantage: Non-selective binding addresses all three pathophysiological mechanisms simultaneously. High affinity at all subtypes (Kd values: α1≈30nM, β1≈25nM, β2≈20nM) ensures effective receptor occupancy at therapeutic doses.`
      });
      feedback.push({
        type: 'success',
        message: `Selectivity consideration: Selective agonists (e.g., β2-selective agents) would only address bronchospasm, leaving hypotension untreated. This demonstrates why non-selectivity is sometimes therapeutically advantageous despite increased side effects.`
      });
    } else if (scenario.id === 'septic-shock' && drug.id === 'noradrenaline') {
      feedback.push({ type: 'success', message: 'Excellent receptor profile match: Predominantly α1 with modest β1 activity' });
      feedback.push({
        type: 'success',
        message: `Receptor selectivity: Full agonist at α1 (Emax 100%, EC₅₀ ~45nM) and β1 (Emax 100%, EC₅₀ ~35nM), but weak activity at β2 (Emax 25%, EC₅₀ ~200nM). This selective profile produces predominantly α1-mediated vasoconstriction (Gq → ↑IP₃/Ca²⁺) with supportive β1 inotropy (Gs → ↑cAMP), while avoiding β2-mediated vasodilation.`
      });
      feedback.push({
        type: 'success',
        message: `Dose-response advantage: Predictable linear relationship between dose and α1-mediated vasoconstriction. Unlike dopamine (dose-dependent receptor switching), noradrenaline maintains consistent α1 > β1 selectivity across therapeutic dose range.`
      });
      feedback.push({
        type: 'success',
        message: `Selectivity rationale: Pure α1 agonists (e.g., phenylephrine) lack beneficial β1 cardiac effects. Non-selective agents (e.g., adrenaline) cause problematic β2-mediated vasodilation and arrhythmias. Noradrenaline's α1 + β1 profile optimally balances these effects.`
      });
    } else if (scenario.id === 'asthma' && drug.id === 'albuterol') {
      feedback.push({ type: 'success', message: 'Excellent receptor profile match: Selective β2 agonist' });
      feedback.push({
        type: 'success',
        message: `Receptor selectivity: Full agonist at β2 (Emax 100%, EC₅₀ ~12nM) with minimal β1 activity (Emax 12%, EC₅₀ ~350nM) and no α activity. This ~29-fold selectivity ratio means therapeutic bronchodilation occurs at doses that produce minimal cardiac effects. β2 activation → Gs coupling → ↑cAMP → PKA phosphorylation → myosin light chain kinase inhibition → bronchial smooth muscle relaxation.`
      });
      feedback.push({
        type: 'success',
        message: `Therapeutic index advantage: β2 receptors are abundant in bronchial smooth muscle, while β1 receptors predominate in cardiac tissue. Selective β2 agonism achieves desired bronchodilation (therapeutic effect) while minimizing tachycardia and arrhythmias (adverse effects), improving the therapeutic index.`
      });
      feedback.push({
        type: 'success',
        message: `Selectivity comparison: Non-selective β agonists (e.g., isoproterenol) have equal activity at β1 and β2, causing unwanted cardiac stimulation. This demonstrates the pharmacological advantage of receptor subtype selectivity - maximizing desired effects while minimizing off-target actions.`
      });
    } else {
      feedback.push({ type: 'success', message: 'Excellent drug choice for this scenario!' });
    }
  } else if (drug && scenario.optimalDrug && scenario.id !== 'normal') {
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
        feedback.push({ type: 'warning', message: `Suboptimal choice. Consider: benzodiazepines to reduce sympathetic tone, or combined α/β-blockade to safely manage both hypertension and tachycardia` });
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
          message: `What's needed: Simultaneous α1 + β1 + β2 activation to address all three life threats: hypotension (α1), cardiovascular collapse (β1), and bronchospasm (β2). Consider a non-selective adrenergic agonist.`
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
          message: `What's needed: Multi-receptor activation (α1 + β1 + β2) to address both cardiovascular collapse AND respiratory failure simultaneously. Consider a non-selective adrenergic agonist.`
        });
      } else if (drug.id === 'noradrenaline') {
        score += 10;
        feedback.push({
          type: 'warning',
          message: `Nearly adequate: Noradrenaline (α1 + β1) improves hemodynamics but has minimal β2 activity`
        });
        feedback.push({
          type: 'warning',
          message: `Why suboptimal: Strong α1 + β1 effects improve MAP and cardiac output, but weak β2 activity provides inadequate bronchodilation. In severe anaphylaxis with significant bronchospasm, robust β2 activation is critical.`
        });
        feedback.push({
          type: 'warning',
          message: `What's needed: Balanced multi-receptor activation (α1 + β1 + β2). Consider a non-selective adrenergic agonist with strong activity at all three receptors.`
        });
      } else {
        feedback.push({ type: 'warning', message: `Suboptimal choice. This scenario requires multi-receptor activation: α1 (vasoconstriction), β1 (inotropy), and β2 (bronchodilation). Consider a non-selective adrenergic agonist.` });
      }
    } else if (scenario.id === 'septic-shock') {
      // Educational feedback for suboptimal choices in septic shock
      if (drug.id === 'dopamine') {
        score += 10;
        feedback.push({
          type: 'warning',
          message: `Suboptimal choice: Dopamine can increase MAP but has significant drawbacks`
        });
        feedback.push({
          type: 'warning',
          message: `Why suboptimal: Dose-dependent effects (dopaminergic at low dose → β at medium → α at high) make response unpredictable. More arrhythmogenic. Causes more tachycardia (↑myocardial O₂ demand). Current guidelines recommend more selective agents.`
        });
        feedback.push({
          type: 'warning',
          message: `What's needed: More predictable α1 vasoconstriction with modest β1 inotropy. Consider a predominantly α1 agonist with some β1 activity.`
        });
      } else if (drug.id === 'phenylephrine') {
        score += 5;
        feedback.push({
          type: 'warning',
          message: `Suboptimal choice: Phenylephrine (pure α1 agonist) increases MAP but lacks beneficial β1 inotropy`
        });
        feedback.push({
          type: 'warning',
          message: `Why suboptimal: Pure α1 vasoconstriction increases SVR and MAP, but lacks modest β1 inotropic support. In septic shock with some degree of myocardial depression, combined α1 + β1 activity is beneficial.`
        });
        feedback.push({
          type: 'warning',
          message: `What's needed: Predominantly α1 vasoconstriction with modest β1 inotropy. Consider an agent with balanced α1 + β1 activity.`
        });
      } else if (drug.id === 'adrenaline') {
        score += 10;
        feedback.push({
          type: 'warning',
          message: `Alternative agent: Adrenaline can be effective but typically reserved for refractory shock`
        });
        feedback.push({
          type: 'warning',
          message: `Why not first-line: Non-selective α/β agonism → strong vasoconstriction + strong inotropy, but β2-mediated vasodilation in some vascular beds and more tachycardia/arrhythmia risk. Usually reserved for refractory shock.`
        });
        feedback.push({
          type: 'warning',
          message: `What's preferred: Predominantly α1 activity with modest β1 support provides more predictable hemodynamic profile for first-line management. Consider an α1-predominant agent.`
        });
      } else {
        feedback.push({ type: 'warning', message: `Suboptimal choice. This distributive shock requires predominantly α1 vasoconstriction with modest β1 inotropy. Consider an α1-predominant agonist.` });
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
          message: `Selectivity principle: β2-selective agents provide bronchodilation with minimal β1 cardiac effects. This is a key example of how receptor selectivity reduces side effects while maintaining therapeutic efficacy.`
        });
      } else if (drug.id === 'adrenaline') {
        score += 15;
        feedback.push({
          type: 'warning',
          message: `Effective but reserved for severe asthma: Adrenaline (non-selective α/β agonist) provides bronchodilation but is not first-line`
        });
        feedback.push({
          type: 'warning',
          message: `Why not first-line: β2 activation provides bronchodilation, but non-selective profile also activates β1 (tachycardia, tremor) and α1 (vasoconstriction, HTN). More side effects than β2-selective agents.`
        });
        feedback.push({
          type: 'warning',
          message: `Clinical indication: Non-selective adrenergic agonists are reserved for life-threatening asthma or anaphylaxis with bronchospasm, where multi-receptor effects are needed. For routine acute asthma, β2-selective agents provide better therapeutic index.`
        });
      } else {
        feedback.push({ type: 'warning', message: `Suboptimal choice. This scenario requires selective β2 agonism for bronchodilation with minimal cardiac side effects. Consider a β2-selective agonist.` });
      }
    } else {
      feedback.push({ type: 'warning', message: `Suboptimal choice. Consider other agents that better match the pathophysiology and target receptor profile for this scenario.` });
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
