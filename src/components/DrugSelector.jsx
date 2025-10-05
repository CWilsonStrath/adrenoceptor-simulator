import React, { useState } from 'react';
import { Pill, Plus, Minus } from 'lucide-react';
import { formatDose } from '../utils/calculations';

const DrugSelector = ({ drugs, selectedDrug, dose, onSelectDrug, onDoseChange }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDrugs = drugs.filter((drug) =>
    drug.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    drug.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const adjustDose = (amount) => {
    if (!selectedDrug) return;
    const newDose = Math.max(
      selectedDrug.dose.min,
      Math.min(selectedDrug.dose.max, dose + amount)
    );
    onDoseChange(newDose);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-3 h-full flex flex-col overflow-hidden">
      <div className="flex items-center gap-1.5 mb-2 flex-shrink-0">
        <Pill className="w-4 h-4 text-purple-600" />
        <h2 className="text-sm font-bold text-gray-800">Drug Selection</h2>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search drugs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-2 py-1.5 mb-2 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent flex-shrink-0"
      />

      {/* Drug List */}
      <div className="grid grid-cols-1 gap-1 mb-2 flex-1 overflow-y-auto">
        {filteredDrugs.map((drug) => (
          <button
            key={drug.id}
            onClick={() => onSelectDrug(drug)}
            className={`p-1.5 rounded border-2 text-left transition-all ${
              selectedDrug?.id === drug.id
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-200 hover:border-purple-300 bg-white'
            }`}
          >
            <h3 className="font-semibold text-gray-800 text-xs leading-tight">{drug.name}</h3>
            <p className="text-xs text-gray-600 mt-0.5 leading-tight">{drug.class}</p>
          </button>
        ))}
      </div>

      {/* Dose Control */}
      {selectedDrug && (
        <div className="border-t pt-2 flex-shrink-0">
          <h3 className="font-semibold text-gray-800 mb-1.5 text-xs">Dose Adjustment</h3>
          <div className="flex items-center gap-2 mb-2">
            <button
              onClick={() => adjustDose(-0.1)}
              className="p-1.5 bg-gray-200 hover:bg-gray-300 rounded transition-colors"
            >
              <Minus className="w-3 h-3" />
            </button>
            <div className="flex-1 text-center">
              <div className="text-base font-bold text-gray-800">{formatDose(selectedDrug, dose)}</div>
            </div>
            <button
              onClick={() => adjustDose(0.1)}
              className="p-1.5 bg-gray-200 hover:bg-gray-300 rounded transition-colors"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          {/* Dose Slider */}
          <input
            type="range"
            min={selectedDrug.dose.min}
            max={selectedDrug.dose.max}
            step={(selectedDrug.dose.max - selectedDrug.dose.min) / 100}
            value={dose}
            onChange={(e) => onDoseChange(parseFloat(e.target.value))}
            className="w-full mb-2"
          />

          {/* Drug Info */}
          <div className="p-2 bg-purple-50 rounded">
            <div className="text-xs text-gray-600">
              <strong>{selectedDrug.dose.route}</strong> • {selectedDrug.halfLife} min half-life
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DrugSelector;
