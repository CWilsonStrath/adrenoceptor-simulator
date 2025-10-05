import React from 'react';
import { FlaskConical } from 'lucide-react';
import { calculateReceptorActivation, getReceptorColor } from '../utils/calculations';

const ReceptorBar = ({ receptor, activation }) => {
  return (
    <div className="mb-1.5">
      <div className="flex items-center justify-between mb-0.5">
        <span className="text-xs font-medium text-gray-700">{receptor}</span>
        <span className="text-xs font-bold text-gray-800">{Math.round(activation)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full transition-all duration-500 ${getReceptorColor(activation)}`}
          style={{ width: `${Math.abs(activation)}%` }}
        />
      </div>
    </div>
  );
};

const PharmacologyPanel = ({ selectedDrug, dose }) => {
  if (!selectedDrug) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-3 flex flex-col items-center justify-center" style={{ minHeight: '120px' }}>
        <FlaskConical className="w-6 h-6 text-gray-400 mb-1" />
        <p className="text-gray-600 text-center text-xs">Select a drug to view receptor activity</p>
      </div>
    );
  }

  const activation = calculateReceptorActivation(selectedDrug, dose);

  return (
    <div className="bg-white rounded-lg shadow-lg p-3">
      <div className="flex items-center gap-1.5 mb-2">
        <FlaskConical className="w-4 h-4 text-green-600" />
        <h2 className="text-sm font-bold text-gray-800">Receptor Activation</h2>
      </div>

      <div className="space-y-1">
        <ReceptorBar receptor="α₁ (Vasoconstriction)" activation={activation.α1} />
        <ReceptorBar receptor="α₂ (Presynaptic Inhibition)" activation={activation.α2} />
        <ReceptorBar receptor="β₁ (Cardiac Stimulation)" activation={activation.β1} />
        <ReceptorBar receptor="β₂ (Bronchodilation)" activation={activation.β2} />
      </div>
    </div>
  );
};

export default PharmacologyPanel;
