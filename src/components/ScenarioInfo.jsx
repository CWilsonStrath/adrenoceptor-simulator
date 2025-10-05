import React from 'react';
import { AlertCircle } from 'lucide-react';

const ScenarioInfo = ({ scenario }) => {
  if (!scenario) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-2 mb-2">
      <div className="flex items-center gap-1.5 mb-1.5">
        <AlertCircle className="w-4 h-4 text-orange-600" />
        <h2 className="text-sm font-bold text-gray-800">Clinical Situation</h2>
      </div>

      {/* Pathophysiology */}
      <div className="p-2 bg-orange-50 border border-orange-200 rounded">
        <p className="text-xs text-gray-700">{scenario.pathophysiology}</p>
      </div>
    </div>
  );
};

export default ScenarioInfo;
