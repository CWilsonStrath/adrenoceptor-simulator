import React, { useState } from 'react';
import { Target, Lightbulb, Filter } from 'lucide-react';

const PharmacologicalStrategy = ({ drugs, onStrategyChange }) => {
  const [targetReceptors, setTargetReceptors] = useState([]);
  const [drugType, setDrugType] = useState('any');
  const [selectivity, setSelectivity] = useState('any');

  const receptorOptions = [
    { id: 'α1', name: 'α1', pathway: 'Gq → ↑IP3/Ca²⁺ → vasoconstriction' },
    { id: 'α2', name: 'α2', pathway: 'Gi → ↓cAMP → ↓sympathetic outflow' },
    { id: 'β1', name: 'β1', pathway: 'Gs → ↑cAMP → ↑inotropy/chronotropy' },
    { id: 'β2', name: 'β2', pathway: 'Gs → ↑cAMP → bronchodilation/vasodilation' },
  ];

  const toggleReceptor = (receptorId) => {
    setTargetReceptors(prev =>
      prev.includes(receptorId)
        ? prev.filter(r => r !== receptorId)
        : [...prev, receptorId]
    );
  };

  // Filter drugs based on strategy
  React.useEffect(() => {
    if (targetReceptors.length === 0) {
      onStrategyChange({ matchingDrugs: drugs, criteria: null });
      return;
    }

    const matchingDrugs = drugs.filter(drug => {
      if (!drug.pharmacology) return false;

      // Check if drug has activity at target receptors
      const hasTargetActivity = targetReceptors.some(receptor => {
        const pharm = drug.pharmacology[receptor];
        if (!pharm) return false;

        // Check drug type
        if (drugType === 'agonist' && pharm.emax <= 0) return false;
        if (drugType === 'antagonist' && pharm.emax > 0) return false;
        if (drugType === 'partial' && (pharm.emax <= 0 || pharm.emax >= 90)) return false;

        // Check if has meaningful activity (not just trace)
        const hasActivity = pharm.emax > 10 || (pharm.emax === 0 && pharm.kd < 1000);
        return hasActivity;
      });

      if (!hasTargetActivity) return false;

      // Check selectivity
      if (selectivity === 'selective') {
        // Count how many receptors have significant activity
        const activeReceptors = Object.keys(drug.pharmacology).filter(r => {
          const pharm = drug.pharmacology[r];
          return pharm && (pharm.emax > 20 || (pharm.emax === 0 && pharm.kd < 100));
        });
        // Selective = active at 1-2 receptors only
        if (activeReceptors.length > 2) return false;
      } else if (selectivity === 'nonselective') {
        // Non-selective = active at 3+ receptors
        const activeReceptors = Object.keys(drug.pharmacology).filter(r => {
          const pharm = drug.pharmacology[r];
          return pharm && (pharm.emax > 20 || (pharm.emax === 0 && pharm.kd < 100));
        });
        if (activeReceptors.length < 3) return false;
      }

      return true;
    });

    onStrategyChange({
      matchingDrugs,
      criteria: { targetReceptors, drugType, selectivity }
    });
  }, [targetReceptors, drugType, selectivity, drugs, onStrategyChange]);

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg border-2 border-indigo-200 p-2 max-h-[220px] overflow-y-auto">
      <div className="flex items-center gap-1.5 mb-2">
        <Lightbulb className="w-4 h-4 text-indigo-600" />
        <h3 className="text-xs font-bold text-gray-800">Pharmacological Treatment Strategy</h3>
      </div>

      {/* Step 1: Target Receptors */}
      <div className="mb-2">
        <div className="flex items-center gap-1 mb-1.5">
          <Target className="w-3.5 h-3.5 text-indigo-600" />
          <label className="text-xs font-semibold text-gray-700">
            1. Target receptor(s)?
          </label>
        </div>
        <div className="grid grid-cols-2 gap-1">
          {receptorOptions.map(receptor => (
            <button
              key={receptor.id}
              onClick={() => toggleReceptor(receptor.id)}
              className={`p-1.5 rounded border-2 text-left transition-all ${
                targetReceptors.includes(receptor.id)
                  ? 'border-indigo-500 bg-indigo-100'
                  : 'border-gray-300 bg-white hover:border-indigo-300'
              }`}
            >
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={targetReceptors.includes(receptor.id)}
                  onChange={() => {}}
                  className="w-3 h-3"
                />
                <span className="font-bold text-gray-800 text-xs">{receptor.name}</span>
              </div>
              <div className="text-xs text-gray-600 mt-0.5 leading-tight">{receptor.pathway}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Step 2: Drug Type */}
      <div className="mb-2">
        <label className="text-xs font-semibold text-gray-700 mb-1 block">
          2. Drug type?
        </label>
        <div className="grid grid-cols-2 gap-1">
          <button
            onClick={() => setDrugType('agonist')}
            className={`p-1.5 rounded border-2 text-xs transition-all ${
              drugType === 'agonist'
                ? 'border-green-500 bg-green-100'
                : 'border-gray-300 bg-white hover:border-green-300'
            }`}
          >
            <div className="font-semibold text-gray-800">Agonist</div>
          </button>
          <button
            onClick={() => setDrugType('antagonist')}
            className={`p-1.5 rounded border-2 text-xs transition-all ${
              drugType === 'antagonist'
                ? 'border-purple-500 bg-purple-100'
                : 'border-gray-300 bg-white hover:border-purple-300'
            }`}
          >
            <div className="font-semibold text-gray-800">Antagonist</div>
          </button>
          <button
            onClick={() => setDrugType('partial')}
            className={`p-1.5 rounded border-2 text-xs transition-all ${
              drugType === 'partial'
                ? 'border-yellow-500 bg-yellow-100'
                : 'border-gray-300 bg-white hover:border-yellow-300'
            }`}
          >
            <div className="font-semibold text-gray-800">Partial</div>
          </button>
          <button
            onClick={() => setDrugType('any')}
            className={`p-1.5 rounded border-2 text-xs transition-all ${
              drugType === 'any'
                ? 'border-gray-500 bg-gray-100'
                : 'border-gray-300 bg-white hover:border-gray-400'
            }`}
          >
            <div className="font-semibold text-gray-800">Any</div>
          </button>
        </div>
      </div>

      {/* Step 3: Selectivity */}
      <div className="mb-2">
        <label className="text-xs font-semibold text-gray-700 mb-1 block">
          3. Selectivity?
        </label>
        <div className="grid grid-cols-3 gap-1">
          <button
            onClick={() => setSelectivity('selective')}
            className={`p-1.5 rounded border-2 text-xs transition-all ${
              selectivity === 'selective'
                ? 'border-blue-500 bg-blue-100'
                : 'border-gray-300 bg-white hover:border-blue-300'
            }`}
          >
            <div className="font-semibold text-gray-800">Selective</div>
          </button>
          <button
            onClick={() => setSelectivity('nonselective')}
            className={`p-1.5 rounded border-2 text-xs transition-all ${
              selectivity === 'nonselective'
                ? 'border-orange-500 bg-orange-100'
                : 'border-gray-300 bg-white hover:border-orange-300'
            }`}
          >
            <div className="font-semibold text-gray-800">Non-selective</div>
          </button>
          <button
            onClick={() => setSelectivity('any')}
            className={`p-1.5 rounded border-2 text-xs transition-all ${
              selectivity === 'any'
                ? 'border-gray-500 bg-gray-100'
                : 'border-gray-300 bg-white hover:border-gray-400'
            }`}
          >
            <div className="font-semibold text-gray-800">Any</div>
          </button>
        </div>
      </div>

      {/* Results Summary */}
      {targetReceptors.length > 0 && (
        <div className="mt-3 p-2 bg-white rounded border border-indigo-200">
          <div className="flex items-center gap-1.5 mb-1">
            <Filter className="w-3 h-3 text-indigo-600" />
            <span className="text-xs font-semibold text-gray-800">Your Strategy:</span>
          </div>
          <div className="text-xs text-gray-700 space-y-0.5">
            <div>• Targeting: <span className="font-semibold">{targetReceptors.join(', ')}</span></div>
            <div>• Drug type: <span className="font-semibold">{drugType === 'any' ? 'Any' : drugType}</span></div>
            <div>• Selectivity: <span className="font-semibold">{selectivity === 'any' ? 'Any' : selectivity}</span></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PharmacologicalStrategy;
