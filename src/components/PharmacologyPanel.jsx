import React from 'react';
import { FlaskConical } from 'lucide-react';
import { calculateReceptorActivation, getReceptorColor } from '../utils/calculations';

const ReceptorBar = ({ receptor, activation }) => {
  return (
    <div className="mb-3">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{receptor}</span>
        <span className="text-sm font-bold text-gray-800">{Math.round(activation)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className={`h-4 rounded-full transition-all duration-500 ${getReceptorColor(activation)}`}
          style={{ width: `${activation}%` }}
        />
      </div>
    </div>
  );
};

const PharmacologyPanel = ({ selectedDrug, dose }) => {
  if (!selectedDrug) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-3 flex flex-col items-center justify-center" style={{ minHeight: '200px' }}>
        <FlaskConical className="w-8 h-8 text-gray-400 mb-2" />
        <p className="text-gray-600 text-center text-sm">Select a drug to view receptor activity</p>
      </div>
    );
  }

  const activation = calculateReceptorActivation(selectedDrug, dose);

  return (
    <div className="bg-white rounded-lg shadow-lg p-3">
      <div className="flex items-center gap-2 mb-3">
        <FlaskConical className="w-5 h-5 text-green-600" />
        <h2 className="text-lg font-bold text-gray-800">Receptor Activation</h2>
      </div>

      <div className="space-y-2">
        <ReceptorBar receptor="α₁ (Vasoconstriction)" activation={activation.α1} />
        <ReceptorBar receptor="α₂ (Presynaptic Inhibition)" activation={activation.α2} />
        <ReceptorBar receptor="β₁ (Cardiac Stimulation)" activation={activation.β1} />
        <ReceptorBar receptor="β₂ (Bronchodilation)" activation={activation.β2} />
      </div>
    </div>
  );
};

export default PharmacologyPanel;
