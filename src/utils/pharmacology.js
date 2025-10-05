// Advanced pharmacology calculations

/**
 * Hill Equation - calculates response based on concentration
 * E = (Emax × [Drug]^n) / (EC50^n + [Drug]^n)
 * @param {number} concentration - Drug concentration (nM)
 * @param {number} ec50 - Half-maximal effective concentration (nM)
 * @param {number} emax - Maximal efficacy (0-100 for agonists, 0 for antagonists)
 * @param {number} hillCoeff - Hill coefficient (cooperativity)
 * @returns {number} Response (0-100)
 */
export const hillEquation = (concentration, ec50, emax, hillCoeff = 1) => {
  if (concentration <= 0 || ec50 <= 0) return 0;
  const numerator = emax * Math.pow(concentration, hillCoeff);
  const denominator = Math.pow(ec50, hillCoeff) + Math.pow(concentration, hillCoeff);
  return numerator / denominator;
};

/**
 * Law of Mass Action - calculates receptor occupancy
 * Occupancy = [Drug] / (Kd + [Drug])
 * @param {number} concentration - Drug concentration (nM)
 * @param {number} kd - Dissociation constant (nM)
 * @returns {number} Fractional receptor occupancy (0-1)
 */
export const receptorOccupancy = (concentration, kd) => {
  if (concentration <= 0) return 0;
  return concentration / (kd + concentration);
};

/**
 * Convert dose to plasma concentration (simplified)
 * This is a rough approximation - real pharmacokinetics would be more complex
 * @param {number} dose - Administered dose
 * @param {object} doseInfo - Drug dose information
 * @returns {number} Estimated plasma concentration (nM)
 */
export const doseToConcentration = (dose, doseInfo) => {
  // Normalize to 0-1 range within dose limits
  const normalizedDose = (dose - doseInfo.min) / (doseInfo.max - doseInfo.min);
  // Convert to nM range (arbitrary scaling for educational purposes)
  // Typical therapeutic range: 1-1000 nM
  return Math.max(0, normalizedDose * 500); // 0-500 nM range
};

/**
 * Calculate dose-response curve data points
 * @param {object} pharmacology - Receptor pharmacology data (ec50, emax, kd, hillCoeff)
 * @param {number} points - Number of data points to generate
 * @returns {array} Array of {concentration, response, occupancy} objects
 */
export const generateDoseResponseCurve = (pharmacology, points = 50) => {
  const { ec50, emax, kd, hillCoeff } = pharmacology;
  const curve = [];

  // Generate log-spaced concentrations from 0.01 × EC50 to 100 × EC50
  const minConc = Math.max(0.01, ec50 * 0.01);
  const maxConc = ec50 * 100;

  for (let i = 0; i <= points; i++) {
    const logMin = Math.log10(minConc);
    const logMax = Math.log10(maxConc);
    const concentration = Math.pow(10, logMin + (i / points) * (logMax - logMin));

    const response = hillEquation(concentration, ec50, emax, hillCoeff);
    const occupancy = receptorOccupancy(concentration, kd) * 100; // Convert to percentage

    curve.push({
      concentration,
      response,
      occupancy,
      logConcentration: Math.log10(concentration),
    });
  }

  return curve;
};

/**
 * Calculate pEC50 (negative log of EC50)
 * Higher pEC50 = higher potency
 * @param {number} ec50 - EC50 value in nM
 * @returns {number} pEC50 value
 */
export const calculatePEC50 = (ec50) => {
  if (ec50 <= 0) return 0;
  return -Math.log10(ec50 * 1e-9); // Convert nM to M, then take -log
};

/**
 * Calculate dose ratio for competitive antagonism
 * Dose ratio = 1 + [Antagonist]/Kb
 * @param {number} antagonistConc - Antagonist concentration (nM)
 * @param {number} kb - Antagonist dissociation constant (nM)
 * @returns {number} Dose ratio
 */
export const calculateDoseRatio = (antagonistConc, kb) => {
  return 1 + (antagonistConc / kb);
};

/**
 * Calculate apparent EC50 in presence of competitive antagonist
 * EC50' = EC50 × dose_ratio
 * @param {number} ec50 - Agonist EC50 without antagonist (nM)
 * @param {number} antagonistConc - Antagonist concentration (nM)
 * @param {number} kb - Antagonist dissociation constant (nM)
 * @returns {number} Apparent EC50 (nM)
 */
export const calculateApparentEC50 = (ec50, antagonistConc, kb) => {
  const doseRatio = calculateDoseRatio(antagonistConc, kb);
  return ec50 * doseRatio;
};
