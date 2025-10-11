import React from 'react';

const DoseResponseCurve = ({ curveData, currentConcentration, receptorName, drugName, ec50, emax, currentResponse }) => {
  if (!curveData || curveData.length === 0) return null;

  const width = 300;
  const height = 200;
  const padding = { top: 20, right: 20, bottom: 40, left: 50 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Get data ranges
  const xMin = Math.min(...curveData.map(d => d.logConcentration));
  const xMax = Math.max(...curveData.map(d => d.logConcentration));
  const yMin = 0;
  const yMax = Math.max(100, emax || 100);

  // Scale functions
  const xScale = (logConc) => {
    return padding.left + ((logConc - xMin) / (xMax - xMin)) * chartWidth;
  };

  const yScale = (response) => {
    return padding.top + chartHeight - (response / yMax) * chartHeight;
  };

  // Generate path for dose-response curve
  const pathData = curveData.map((point, i) => {
    const x = xScale(point.logConcentration);
    const y = yScale(point.response);
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  // Current concentration marker
  const currentLogConc = currentConcentration > 0 ? Math.log10(currentConcentration) : null;

  // EC50 marker
  const ec50LogConc = Math.log10(ec50);

  return (
    <div className="relative">
      <svg width={width} height={height} className="border border-gray-200 rounded bg-white">
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map(y => (
          <g key={`grid-${y}`}>
            <line
              x1={padding.left}
              y1={yScale(y)}
              x2={width - padding.right}
              y2={yScale(y)}
              stroke="#e5e7eb"
              strokeWidth="1"
            />
            <text
              x={padding.left - 5}
              y={yScale(y) + 4}
              textAnchor="end"
              fontSize="10"
              fill="#6b7280"
            >
              {y}
            </text>
          </g>
        ))}

        {/* Axes */}
        <line
          x1={padding.left}
          y1={padding.top}
          x2={padding.left}
          y2={height - padding.bottom}
          stroke="#374151"
          strokeWidth="2"
        />
        <line
          x1={padding.left}
          y1={height - padding.bottom}
          x2={width - padding.right}
          y2={height - padding.bottom}
          stroke="#374151"
          strokeWidth="2"
        />

        {/* Dose-response curve */}
        <path
          d={pathData}
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
        />

        {/* EC50 line */}
        {ec50 > 0 && ec50LogConc >= xMin && ec50LogConc <= xMax && (
          <g>
            <line
              x1={xScale(ec50LogConc)}
              y1={padding.top}
              x2={xScale(ec50LogConc)}
              y2={height - padding.bottom}
              stroke="#f59e0b"
              strokeWidth="1"
              strokeDasharray="4,2"
            />
            <line
              x1={padding.left}
              y1={yScale(emax / 2)}
              x2={width - padding.right}
              y2={yScale(emax / 2)}
              stroke="#f59e0b"
              strokeWidth="1"
              strokeDasharray="4,2"
            />
          </g>
        )}

        {/* Current concentration marker */}
        {currentLogConc !== null && currentLogConc >= xMin && currentLogConc <= xMax && (
          <g>
            <circle
              cx={xScale(currentLogConc)}
              cy={yScale(currentResponse)}
              r="4"
              fill="#ef4444"
              stroke="white"
              strokeWidth="2"
            />
            <line
              x1={xScale(currentLogConc)}
              y1={height - padding.bottom}
              x2={xScale(currentLogConc)}
              y2={yScale(currentResponse)}
              stroke="#ef4444"
              strokeWidth="1"
              strokeDasharray="2,2"
            />
          </g>
        )}

        {/* Axis labels */}
        <text
          x={width / 2}
          y={height - 5}
          textAnchor="middle"
          fontSize="12"
          fill="#374151"
          fontWeight="500"
        >
          log [Drug] (nM)
        </text>
        <text
          x={-height / 2}
          y={15}
          textAnchor="middle"
          fontSize="12"
          fill="#374151"
          fontWeight="500"
          transform={`rotate(-90, 15, ${height / 2})`}
        >
          Response (%)
        </text>

        {/* Title */}
        <text
          x={width / 2}
          y={12}
          textAnchor="middle"
          fontSize="11"
          fill="#374151"
          fontWeight="600"
        >
          {drugName} at {receptorName}
        </text>
      </svg>

      {/* Legend */}
      <div className="text-xs mt-1 space-y-0.5">
        <div className="flex items-center gap-1">
          <div className="w-3 h-0.5 bg-amber-500"></div>
          <span className="text-gray-600">EC₅₀ = {ec50.toFixed(1)} nM</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-0.5 bg-blue-500"></div>
          <span className="text-gray-600">Emax = {emax.toFixed(0)}%</span>
        </div>
        {currentConcentration > 0 && (
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <span className="text-gray-600">Current: {currentConcentration.toFixed(1)} nM ({currentResponse.toFixed(1)}% response)</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoseResponseCurve;
