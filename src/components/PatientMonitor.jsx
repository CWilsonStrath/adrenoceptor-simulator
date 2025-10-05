import React, { useEffect, useState } from 'react';
import { Heart, Activity, Wind, Droplet, Volume2, VolumeX } from 'lucide-react';
import ECGMonitor from './ECGMonitor';

const VitalSign = ({ icon: Icon, label, value, unit, status, animate = false }) => {
  const statusColors = {
    normal: 'bg-green-50 border-green-300',
    warning: 'bg-yellow-50 border-yellow-300',
    danger: 'bg-red-50 border-red-300',
  };

  const textColors = {
    normal: 'text-green-700',
    warning: 'text-yellow-700',
    danger: 'text-red-700',
  };

  return (
    <div className={`p-2 rounded border-2 transition-all duration-300 ${statusColors[status] || 'bg-gray-50 border-gray-300'}`}>
      <div className="flex items-center gap-1 mb-0.5">
        <Icon className={`w-3 h-3 ${animate ? 'animate-pulse' : ''} ${textColors[status] || 'text-gray-600'}`} />
        <span className="text-xs font-medium text-gray-600">{label}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className={`text-lg font-bold transition-colors duration-300 ${textColors[status] || 'text-gray-800'}`}>
          {value}
        </span>
        <span className="text-xs text-gray-600">{unit}</span>
      </div>
    </div>
  );
};

const PatientMonitor = ({ vitals, baseline }) => {
  const [soundEnabled, setSoundEnabled] = useState(false);

  const getHRStatus = (hr) => {
    if (hr < 60 || hr > 100) return hr < 50 || hr > 120 ? 'danger' : 'warning';
    return 'normal';
  };

  const getBPStatus = (sbp, dbp) => {
    const map = dbp + (sbp - dbp) / 3;
    if (map < 65 || map > 110) return map < 60 || map > 130 ? 'danger' : 'warning';
    return 'normal';
  };

  const getSpo2Status = (spo2) => {
    if (spo2 < 94) return spo2 < 90 ? 'danger' : 'warning';
    return 'normal';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-3 h-full flex flex-col overflow-hidden">
      <div className="flex items-center justify-between mb-2 flex-shrink-0">
        <h2 className="text-sm font-bold text-gray-800">Patient Monitor</h2>
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="p-1.5 hover:bg-gray-100 rounded transition-colors"
          title={soundEnabled ? 'Mute sound' : 'Enable sound'}
        >
          {soundEnabled ? (
            <Volume2 className="w-4 h-4 text-green-600" />
          ) : (
            <VolumeX className="w-4 h-4 text-gray-400" />
          )}
        </button>
      </div>

      {/* ECG Monitor */}
      <div className="mb-2 flex-shrink-0">
        <ECGMonitor heartRate={vitals.hr} isActive={soundEnabled} />
      </div>

      <div className="grid grid-cols-3 gap-2 mb-2 flex-shrink-0">
        <VitalSign
          icon={Heart}
          label="Heart Rate"
          value={Math.round(vitals.hr)}
          unit="bpm"
          status={getHRStatus(vitals.hr)}
          animate={getHRStatus(vitals.hr) === 'danger'}
        />
        <VitalSign
          icon={Activity}
          label="Blood Pressure"
          value={`${Math.round(vitals.sbp)}/${Math.round(vitals.dbp)}`}
          unit="mmHg"
          status={getBPStatus(vitals.sbp, vitals.dbp)}
          animate={getBPStatus(vitals.sbp, vitals.dbp) === 'danger'}
        />
        <VitalSign
          icon={Wind}
          label="SpO₂"
          value={Math.round(vitals.spo2)}
          unit="%"
          status={getSpo2Status(vitals.spo2)}
          animate={getSpo2Status(vitals.spo2) === 'danger'}
        />
        <VitalSign
          icon={Activity}
          label="MAP"
          value={Math.round(vitals.map)}
          unit="mmHg"
          status={vitals.map < 65 ? 'danger' : vitals.map > 110 ? 'warning' : 'normal'}
          animate={vitals.map < 65}
        />
        <VitalSign
          icon={Heart}
          label="Cardiac Output"
          value={vitals.co.toFixed(1)}
          unit="L/min"
          status={vitals.co < 4.0 ? 'danger' : vitals.co > 8.0 ? 'warning' : 'normal'}
          animate={vitals.co < 4.0}
        />
        <VitalSign
          icon={Droplet}
          label="SVR"
          value={Math.round(vitals.svr)}
          unit="dyn·s/cm⁵"
          status={vitals.svr < 800 ? 'warning' : vitals.svr > 1200 ? 'warning' : 'normal'}
        />
      </div>

      {/* Respiratory Status */}
      <div className="p-2 bg-gray-50 rounded flex-shrink-0">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium text-gray-600">Bronchodilation</span>
          <span className="text-xs font-bold text-gray-800">{Math.round(vitals.bronchodilation)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-500 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${vitals.bronchodilation}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default PatientMonitor;
