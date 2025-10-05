import React, { useState } from 'react';
import { GitBranch, ChevronDown, ChevronUp } from 'lucide-react';

const PathwayCard = ({ pathway, isExpanded, onToggle }) => {
  return (
    <div className="border border-gray-200 rounded-lg mb-3 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full p-4 bg-white hover:bg-gray-50 flex items-center justify-between transition-colors"
      >
        <div className="flex items-center gap-3">
          <GitBranch className="w-5 h-5 text-indigo-600" />
          <div className="text-left">
            <h3 className="font-semibold text-gray-800">{pathway.name}</h3>
            <p className="text-xs text-gray-600">{pathway.gProtein} → {pathway.secondMessenger}</p>
          </div>
        </div>
        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>

      {isExpanded && (
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          {/* Location */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-1">Location</h4>
            <p className="text-sm text-gray-600">{pathway.location}</p>
          </div>

          {/* Mechanism */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Signal Transduction</h4>
            <ol className="space-y-1">
              {pathway.mechanism.map((step, idx) => (
                <li key={idx} className="text-xs text-gray-600 flex gap-2">
                  <span className="text-indigo-600 font-semibold min-w-[20px]">{idx + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Effects */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Primary Effects</h4>
            <div className="flex flex-wrap gap-2">
              {pathway.primaryEffects.map((effect, idx) => (
                <span key={idx} className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs">
                  {effect}
                </span>
              ))}
            </div>
          </div>

          {/* Clinical Significance */}
          <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-200">
            <h4 className="text-sm font-semibold text-gray-700 mb-1">Clinical Significance</h4>
            <p className="text-xs text-gray-700">{pathway.clinicalSignificance}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const PathwayVisualizer = ({ pathways }) => {
  const [expandedPathway, setExpandedPathway] = useState(null);

  return (
    <div>
      <p className="text-sm text-gray-600 mb-4">
        Explore the molecular mechanisms of adrenergic receptor signaling
      </p>

      <div className="space-y-3">
        {pathways.map((pathway) => (
          <PathwayCard
            key={pathway.id}
            pathway={pathway}
            isExpanded={expandedPathway === pathway.id}
            onToggle={() => setExpandedPathway(expandedPathway === pathway.id ? null : pathway.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default PathwayVisualizer;
