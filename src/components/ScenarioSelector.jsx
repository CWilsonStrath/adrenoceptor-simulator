import React from 'react';
import { Activity } from 'lucide-react';

const ScenarioSelector = ({ scenarios, selectedScenario, onSelectScenario }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800">Clinical Scenario</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {scenarios.map((scenario) => (
          <button
            key={scenario.id}
            onClick={() => onSelectScenario(scenario)}
            className={`p-4 rounded-lg border-2 text-left transition-all ${
              selectedScenario?.id === scenario.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300 bg-white'
            }`}
          >
            <h3 className="font-semibold text-gray-800 mb-1">{scenario.name}</h3>
            <p className="text-sm text-gray-600">{scenario.description}</p>
          </button>
        ))}
      </div>

      {selectedScenario && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="font-semibold text-gray-800 mb-2">Pathophysiology</h3>
          <p className="text-sm text-gray-700 mb-3">{selectedScenario.pathophysiology}</p>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-medium text-gray-600">Target Receptors:</span>
            {selectedScenario.targetReceptors.map((receptor) => (
              <span
                key={receptor}
                className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium"
              >
                {receptor}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ScenarioSelector;
