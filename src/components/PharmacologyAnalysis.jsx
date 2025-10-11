import React from 'react';
import { FlaskConical, Info } from 'lucide-react';
import DoseResponseCurve from './DoseResponseCurve';
import {
  doseToConcentration,
  generateDoseResponseCurve,
  receptorOccupancy,
  hillEquation,
  calculatePEC50,
} from '../utils/pharmacology';

const PharmacologyAnalysis = ({ selectedDrug, dose }) => {
  if (!selectedDrug || !selectedDrug.pharmacology) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <FlaskConical className="w-5 h-5 text-indigo-600" />
          <h2 className="text-lg font-bold text-gray-800">Pharmacology Analysis</h2>
        </div>
        <p className="text-sm text-gray-600 text-center py-8">
          Select a drug with pharmacological data to view dose-response curves and receptor binding analysis
        </p>
      </div>
    );
  }

  // Calculate current concentration from dose
  const currentConcentration = doseToConcentration(dose, selectedDrug.dose);

  // Get receptor data
  const receptors = ['α1', 'α2', 'β1', 'β2'];
  const activeReceptors = receptors.filter(r => {
    const pharm = selectedDrug.pharmacology[r];
    return pharm && (pharm.emax > 0 || pharm.kd < 1000);
  });

  const getAgonistType = (emax) => {
    if (emax === 0) return { type: 'Antagonist', color: 'text-purple-600', bg: 'bg-purple-50' };
    if (emax >= 90) return { type: 'Full Agonist', color: 'text-green-600', bg: 'bg-green-50' };
    if (emax >= 40) return { type: 'Partial Agonist', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    return { type: 'Weak Agonist', color: 'text-orange-600', bg: 'bg-orange-50' };
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <FlaskConical className="w-5 h-5 text-indigo-600" />
        <h2 className="text-lg font-bold text-gray-800">Pharmacology Analysis: {selectedDrug.name}</h2>
      </div>

      {/* Current drug concentration */}
      <div className="mb-4 p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
        <div className="flex items-start gap-2">
          <Info className="w-4 h-4 text-indigo-600 mt-0.5" />
          <div className="text-sm text-indigo-800">
            <strong>Estimated Plasma Concentration:</strong> {currentConcentration.toFixed(1)} nM
            <p className="text-xs mt-1 text-indigo-600">
              (Simplified conversion from dose: {dose.toFixed(2)} {selectedDrug.dose.unit})
            </p>
          </div>
        </div>
      </div>

      {/* Receptor Analysis Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {activeReceptors.map(receptor => {
          const pharm = selectedDrug.pharmacology[receptor];
          const curveData = generateDoseResponseCurve(pharm);
          const occupancy = receptorOccupancy(currentConcentration, pharm.kd) * 100;
          const response = hillEquation(currentConcentration, pharm.ec50, pharm.emax, pharm.hillCoeff);
          const pEC50 = calculatePEC50(pharm.ec50);
          const agonistInfo = getAgonistType(pharm.emax);

          return (
            <div key={receptor} className="border-2 border-gray-200 rounded-lg p-3">
              <h3 className="font-bold text-gray-800 mb-2">{receptor} Receptor</h3>

              {/* Dose-response curve */}
              <div className="mb-3">
                <DoseResponseCurve
                  curveData={curveData}
                  currentConcentration={currentConcentration}
                  receptorName={receptor}
                  drugName={selectedDrug.name}
                  ec50={pharm.ec50}
                  emax={pharm.emax}
                  currentResponse={response}
                />
              </div>

              {/* Pharmacological parameters */}
              <div className="space-y-2 text-xs">
                <div className={`p-2 rounded ${agonistInfo.bg}`}>
                  <span className={`font-semibold ${agonistInfo.color}`}>
                    {agonistInfo.type}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 bg-gray-50 rounded">
                    <div className="text-gray-600">EC₅₀</div>
                    <div className="font-bold text-gray-800">{pharm.ec50.toFixed(1)} nM</div>
                  </div>
                  <div className="p-2 bg-gray-50 rounded">
                    <div className="text-gray-600">pEC₅₀</div>
                    <div className="font-bold text-gray-800">{pEC50.toFixed(2)}</div>
                  </div>
                  <div className="p-2 bg-gray-50 rounded">
                    <div className="text-gray-600">Emax</div>
                    <div className="font-bold text-gray-800">{pharm.emax.toFixed(0)}%</div>
                  </div>
                  <div className="p-2 bg-gray-50 rounded">
                    <div className="text-gray-600">Kd</div>
                    <div className="font-bold text-gray-800">{pharm.kd.toFixed(1)} nM</div>
                  </div>
                </div>

                {/* Current values */}
                <div className="p-2 bg-blue-50 border border-blue-200 rounded">
                  <div className="text-blue-800 font-semibold mb-1">Current State:</div>
                  <div className="text-blue-700">
                    <div>Occupancy: <span className="font-bold">{occupancy.toFixed(1)}%</span></div>
                    <div>Response: <span className="font-bold">{response.toFixed(1)}%</span></div>
                  </div>
                </div>

                {/* Explanation */}
                <div className="text-xs text-gray-600 italic">
                  {pharm.emax === 0 && "Competitive antagonist - binds but produces no response"}
                  {pharm.emax > 0 && pharm.emax < 90 && `Partial agonist - maximal response only ${pharm.emax.toFixed(0)}% of full agonist`}
                  {pharm.emax >= 90 && "Full agonist - capable of maximal receptor activation"}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Educational Notes */}
      <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
        <h3 className="font-semibold text-amber-900 mb-2 text-sm">Key Pharmacological Concepts:</h3>
        <ul className="text-xs text-amber-800 space-y-1 list-disc list-inside">
          <li><strong>EC₅₀:</strong> Concentration producing 50% of maximal response (potency)</li>
          <li><strong>Emax:</strong> Maximal efficacy - distinguishes full vs partial agonists</li>
          <li><strong>Kd:</strong> Dissociation constant - measure of affinity (lower = higher affinity)</li>
          <li><strong>pEC₅₀:</strong> -log₁₀(EC₅₀) - higher values indicate greater potency</li>
          <li><strong>Occupancy ≠ Response:</strong> Partial agonists show this dissociation</li>
          <li><strong>Hill Coefficient:</strong> Cooperativity (= 1 for simple binding)</li>
        </ul>
      </div>
    </div>
  );
};

export default PharmacologyAnalysis;
