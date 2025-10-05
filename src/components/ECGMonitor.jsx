import React, { useEffect, useRef } from 'react';

const ECGMonitor = ({ heartRate, isActive = true }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const audioContextRef = useRef(null);
  const xOffsetRef = useRef(0);

  // Generate ECG waveform points
  const generateECGWaveform = () => {
    const points = [];
    const segments = [
      { duration: 0.08, amplitude: 0 },      // P wave start
      { duration: 0.08, amplitude: 0.15 },   // P wave
      { duration: 0.04, amplitude: 0 },      // PR segment
      { duration: 0.04, amplitude: -0.1 },   // Q wave
      { duration: 0.04, amplitude: 1.0 },    // R wave
      { duration: 0.04, amplitude: -0.25 },  // S wave
      { duration: 0.08, amplitude: 0 },      // ST segment
      { duration: 0.16, amplitude: 0.25 },   // T wave
      { duration: 0.12, amplitude: 0 },      // End
    ];

    let totalDuration = segments.reduce((sum, seg) => sum + seg.duration, 0);
    let currentTime = 0;

    segments.forEach(segment => {
      const steps = Math.max(2, Math.floor(segment.duration * 100));
      for (let i = 0; i < steps; i++) {
        const t = i / steps;
        const smoothed = segment.amplitude * Math.sin(t * Math.PI);
        points.push({
          x: (currentTime + t * segment.duration) / totalDuration,
          y: smoothed
        });
      }
      currentTime += segment.duration;
    });

    return points;
  };

  const waveformRef = useRef(generateECGWaveform());

  // Play beep sound
  const playBeep = () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }

      const audioContext = audioContextRef.current;

      // Resume context if suspended (browser autoplay policy)
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }

      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = 880;
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.08);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.08);
    } catch (e) {
      console.log('Audio playback failed:', e);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerY = height * 0.65; // Lower the baseline
    const amplitude = height * 0.4; // Slightly larger amplitude

    const waveformWidth = width * 0.25; // Each heartbeat takes 25% of screen
    const scrollSpeed = (heartRate / 60) * 2.5;
    const beatInterval = 60000 / heartRate; // milliseconds per beat

    // Local variable to track last beep time for this animation loop
    let localLastBeepTime = 0;

    const animate = (timestamp) => {
      if (localLastBeepTime === 0) {
        localLastBeepTime = timestamp;
      }

      // Clear canvas completely
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      // Draw subtle grid
      ctx.strokeStyle = 'rgba(0, 100, 0, 0.2)';
      ctx.lineWidth = 0.5;

      // Vertical lines every 40px
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = 0; y < height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw center line
      ctx.strokeStyle = 'rgba(0, 150, 0, 0.3)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.stroke();

      // Update scroll position
      xOffsetRef.current = (xOffsetRef.current + scrollSpeed) % width;

      // Draw ECG waveform - bright and clear
      ctx.strokeStyle = '#00ff00';
      ctx.lineWidth = 3;
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#00ff00';

      const waveform = waveformRef.current;
      const beatsToShow = Math.ceil(width / waveformWidth) + 2;

      for (let beat = -1; beat < beatsToShow; beat++) {
        ctx.beginPath();
        let lastX = null;

        waveform.forEach((point, i) => {
          const rawX = beat * waveformWidth + point.x * waveformWidth - xOffsetRef.current;
          const x = ((rawX % width) + width) % width;
          const y = centerY - point.y * amplitude;

          // Check if we're wrapping around (line would jump across screen)
          if (lastX !== null && Math.abs(x - lastX) > width / 2) {
            // Don't draw the connecting line, start a new path
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x, y);
          } else if (lastX === null) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }

          lastX = x;
        });

        ctx.stroke();
      }

      // Time-based beeping - beep at regular intervals matching heart rate
      const timeSinceLastBeep = timestamp - localLastBeepTime;
      if (isActive && timeSinceLastBeep >= beatInterval) {
        playBeep();
        localLastBeepTime = timestamp;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [heartRate, isActive]);

  return (
    <div className="relative bg-black rounded-lg overflow-hidden border-2 border-green-900">
      <canvas
        ref={canvasRef}
        width={800}
        height={120}
        className="w-full"
        style={{ imageRendering: 'crisp-edges', height: '100px' }}
      />
      <div className="absolute top-2 left-2 text-green-400 font-mono text-xs">
        ECG - Lead II
      </div>
      <div className="absolute top-2 right-2 text-green-400 font-mono text-sm font-bold">
        {Math.round(heartRate)} bpm
      </div>
    </div>
  );
};

export default ECGMonitor;
