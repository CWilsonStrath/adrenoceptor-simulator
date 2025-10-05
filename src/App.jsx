import React, { useState, useEffect } from 'react';
import { RefreshCw, ArrowLeft, BookOpen, ChevronDown, ChevronUp, TrendingUp, FlaskConical } from 'lucide-react';
import ScenarioSelector from './components/ScenarioSelector';
import ScenarioInfo from './components/ScenarioInfo';
import PatientMonitor from './components/PatientMonitor';
import DrugSelector from './components/DrugSelector';
import PharmacologyPanel from './components/PharmacologyPanel';
import PharmacologyAnalysis from './components/PharmacologyAnalysis';
import PharmacologicalStrategy from './components/PharmacologicalStrategy';
import PathwayVisualizer from './components/PathwayVisualizer';
import { scenarios } from './data/scenarios';
import { drugs } from './data/drugs';
import { pathways } from './data/pathways';
import { calculateDrugEffect, assessTreatmentQuality } from './utils/calculations';

function App() {
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [selectedDrug, setSelectedDrug] = useState(null);
  const [dose, setDose] = useState(0);
  const [currentVitals, setCurrentVitals] = useState(null);
  const [showPathways, setShowPathways] = useState(false);
  const [showPharmacology, setShowPharmacology] = useState(false);
  const [strategyMatchingDrugs, setStrategyMatchingDrugs] = useState([]);

  const handleStrategyChange = (strategyData) => {
    setStrategyMatchingDrugs(strategyData.matchingDrugs || []);
  };

  // Initialize vitals when scenario changes
  useEffect(() => {
    if (selectedScenario) {
      const baselineWithMAP = {
        ...selectedScenario.baseline,
        map: Math.round(selectedScenario.baseline.dbp + (selectedScenario.baseline.sbp - selectedScenario.baseline.dbp) / 3)
      };
      setCurrentVitals(baselineWithMAP);
      setSelectedDrug(null);
      setDose(0);
    }
  }, [selectedScenario]);

  // Update vitals when drug or dose changes
  useEffect(() => {
    if (selectedScenario && selectedDrug) {
      const newVitals = calculateDrugEffect(selectedDrug, dose, selectedScenario.baseline, selectedScenario);
      setCurrentVitals(newVitals);
    }
  }, [selectedDrug, dose, selectedScenario]);

  const handleSelectDrug = (drug) => {
    setSelectedDrug(drug);
    setDose(drug.dose.typical);
  };

  const handleReset = () => {
    if (selectedScenario) {
      const baselineWithMAP = {
        ...selectedScenario.baseline,
        map: Math.round(selectedScenario.baseline.dbp + (selectedScenario.baseline.sbp - selectedScenario.baseline.dbp) / 3)
      };
      setCurrentVitals(baselineWithMAP);
      setSelectedDrug(null);
      setDose(0);
    }
  };

  const handleChangeScenario = () => {
    setSelectedScenario(null);
    setSelectedDrug(null);
    setDose(0);
    setCurrentVitals(null);
  };

  // Scenario Selection Screen
  if (!selectedScenario) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <header className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-gray-800">Adrenoceptor Pharmacology Simulator</h1>
            <p className="text-gray-600 mt-1">Select a clinical scenario to begin</p>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-12">
          <ScenarioSelector
            scenarios={scenarios}
            selectedScenario={selectedScenario}
            onSelectScenario={setSelectedScenario}
          />

          {/* Educational Info */}
          <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">How to Use This Simulator</h2>
            <ol className="space-y-3 text-gray-700">
              <li className="flex gap-3">
                <span className="font-bold text-blue-600">1.</span>
                <span>Choose a clinical scenario from the options above</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-blue-600">2.</span>
                <span>Review the patient's vital signs and pathophysiology</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-blue-600">3.</span>
                <span>Select an adrenergic drug and adjust the dose</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-blue-600">4.</span>
                <span>Observe real-time changes in vital signs and receptor activation</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-blue-600">5.</span>
                <span>Review treatment assessment and learn about signaling pathways</span>
              </li>
            </ol>
          </div>
        </main>

        <footer className="bg-white border-t border-gray-200 mt-12">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <p className="text-center text-gray-600 text-sm">
              Educational tool for understanding adrenergic pharmacology. Not for clinical decision making.
            </p>
          </div>
        </footer>
      </div>
    );
  }

  // Simulation Screen
  if (!currentVitals) {
    return <div className="h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
      <div className="text-gray-600">Loading...</div>
    </div>;
  }

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-white shadow-md flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={handleChangeScenario}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                title="Change scenario"
              >
                <ArrowLeft className="w-4 h-4 text-gray-600" />
              </button>
              <div>
                <h1 className="text-lg font-bold text-gray-800">{selectedScenario.name}</h1>
                <p className="text-gray-600 text-xs">{selectedScenario.description}</p>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="text-xs">Reset</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 py-3">
          {/* Scenario Info */}
          <ScenarioInfo scenario={selectedScenario} />

          {/* Top Row - Patient Monitor and Drug Selection */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-3">
            {/* Patient Monitor */}
            <div className="h-[calc(100vh-280px)]">
              <PatientMonitor vitals={currentVitals} baseline={selectedScenario.baseline} />
            </div>

            {/* Drug Selection */}
            <div className="h-[calc(100vh-280px)] flex flex-col gap-2 overflow-hidden">
              {/* Pharmacological Strategy */}
              <div className="flex-shrink-0">
                <PharmacologicalStrategy
                  drugs={drugs}
                  onStrategyChange={handleStrategyChange}
                />
              </div>

              {/* Drug Selector */}
              <div className="flex-1 min-h-0">
                <DrugSelector
                  drugs={drugs}
                  selectedDrug={selectedDrug}
                  dose={dose}
                  onSelectDrug={handleSelectDrug}
                  onDoseChange={setDose}
                  strategyMatchingDrugs={strategyMatchingDrugs}
                />
              </div>
            </div>
          </div>

          {/* Bottom Row - Pharmacology and Assessment */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-3">
            {/* Pharmacology */}
            <div>
              <PharmacologyPanel
                selectedDrug={selectedDrug}
                dose={dose}
              />
            </div>

            {/* Assessment is inside PharmacologyPanel, but we can split if needed */}
            <div className="bg-white rounded-lg shadow-lg p-3">
              <div className="flex items-center gap-1.5 mb-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <h2 className="text-sm font-bold text-gray-800">Treatment Assessment</h2>
              </div>
              {selectedDrug && selectedScenario ? (
                (() => {
                  const assessment = assessTreatmentQuality(selectedScenario, currentVitals, selectedDrug);
                  return (
                    <>
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-xl font-bold text-gray-800">{assessment.score}/100</div>
                        <div className="text-sm text-gray-600">{assessment.grade}</div>
                      </div>
                      <div className="space-y-1">
                        {assessment.feedback.map((item, idx) => (
                          <div
                            key={idx}
                            className={`p-1.5 rounded text-xs ${
                              item.type === 'success'
                                ? 'bg-green-50 text-green-800 border border-green-200'
                                : item.type === 'warning'
                                ? 'bg-yellow-50 text-yellow-800 border border-yellow-200'
                                : 'bg-red-50 text-red-800 border border-red-200'
                            }`}
                          >
                            {item.message}
                          </div>
                        ))}
                      </div>
                    </>
                  );
                })()
              ) : (
                <p className="text-gray-600 text-center py-4 text-xs">Select a drug to view treatment assessment</p>
              )}
            </div>
          </div>

          {/* Pharmacology Analysis - Collapsible */}
          <div className="mb-3">
            <button
              onClick={() => setShowPharmacology(!showPharmacology)}
              className="w-full bg-white rounded-lg shadow-lg p-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <FlaskConical className="w-5 h-5 text-indigo-600" />
                <h2 className="text-lg font-bold text-gray-800">Advanced Pharmacology Analysis</h2>
                <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded">EC₅₀, Emax, Dose-Response</span>
              </div>
              {showPharmacology ? (
                <ChevronUp className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600" />
              )}
            </button>
            {showPharmacology && (
              <div className="mt-3">
                <PharmacologyAnalysis selectedDrug={selectedDrug} dose={dose} />
              </div>
            )}
          </div>

          {/* Pathway Visualizer - Collapsible */}
          <div className="mb-3">
            <button
              onClick={() => setShowPathways(!showPathways)}
              className="w-full bg-white rounded-lg shadow-lg p-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-600" />
                <h2 className="text-lg font-bold text-gray-800">Signaling Pathways Reference</h2>
              </div>
              {showPathways ? (
                <ChevronUp className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600" />
              )}
            </button>
            {showPathways && (
              <div className="mt-3 bg-white rounded-lg shadow-lg p-3">
                <PathwayVisualizer pathways={pathways} />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
