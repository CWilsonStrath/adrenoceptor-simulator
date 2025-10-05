import React from 'react';
import { AlertCircle, Target } from 'lucide-react';

const ScenarioInfo = ({ scenario }) => {
  if (!scenario) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-2 mb-2">
      <div className="flex items-center gap-1.5 mb-1.5">
        <AlertCircle className="w-4 h-4 text-orange-600" />
        <h2 className="text-sm font-bold text-gray-800">Clinical Situation</h2>
      </div>

      <div className="space-y-1.5">
        {/* Pathophysiology */}
        <div className="p-2 bg-orange-50 border border-orange-200 rounded">
          <p className="text-xs text-gray-700">{scenario.pathophysiology}</p>
        </div>

        {/* Target Receptors and Optimal Drug in one line */}
        <div className="flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5">
            <Target className="w-3 h-3 text-blue-600 flex-shrink-0" />
            <div className="flex flex-wrap gap-1">
              {scenario.targetReceptors.map((receptor) => (
                <span
                  key={receptor}
                  className="px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-medium"
                >
                  {receptor}
                </span>
              ))}
            </div>
          </div>

          {/* Optimal Drug */}
          {scenario.optimalDrug && (
            <span className="text-xs text-green-700 whitespace-nowrap">
              <strong>Pearl:</strong> {scenario.optimalDrug}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScenarioInfo;
