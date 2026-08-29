'use client';

import React from 'react';

export default function EngineeringBackground() {
  const videoSrc = '/assets/video/engineering-background.mp4';
  const [videoError, setVideoError] = React.useState(false);

  return (
    <div className="eng-bg" aria-hidden="true">
      {/* Engineering grid lines */}
      <div className="eng-bg__fallback" />
      <div className="eng-bg__grid" />
      <div className="eng-bg__grid-fine" />

      {/* SVG gear decorations */}
      <svg
        style={{ position: 'absolute', right: '5%', top: '15%', opacity: 0.06, width: 220, height: 220 }}
        viewBox="0 0 100 100"
        fill="none"
      >
        <GearPath />
      </svg>
      <svg
        style={{ position: 'absolute', left: '3%', bottom: '20%', opacity: 0.05, width: 140, height: 140 }}
        viewBox="0 0 100 100"
        fill="none"
      >
        <GearPath />
      </svg>
      <svg
        style={{ position: 'absolute', right: '18%', bottom: '35%', opacity: 0.04, width: 90, height: 90 }}
        viewBox="0 0 100 100"
        fill="none"
      >
        <GearPath teeth={8} />
      </svg>

      {/* Blueprint annotation cross marks */}
      <CrossMark style={{ top: '28%', left: '8%', opacity: 0.09 }} />
      <CrossMark style={{ top: '65%', right: '12%', opacity: 0.07 }} />
      <CrossMark style={{ top: '45%', left: '45%', opacity: 0.05 }} />

      {/* Video (if available) */}
      {!videoError && (
        <video
          autoPlay
          muted
          loop
          playsInline
          onError={() => setVideoError(true)}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.45, mixBlendMode: 'multiply' }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}

      {/* Light translucent overlay for readability */}
      <div className="eng-bg__overlay" />
    </div>
  );
}
  
function GearPath({ teeth = 12 }: { teeth?: number }) {
  const outerR = 44, innerR = 32, toothH = 8, holeR = 12;
  const points: string[] = [];
  for (let i = 0; i < teeth; i++) {
    const a1 = (i / teeth) * Math.PI * 2 - Math.PI / 2;
    const a2 = a1 + (0.35 / teeth) * Math.PI * 2;
    const a3 = a1 + (0.65 / teeth) * Math.PI * 2;
    const a4 = a1 + (1 / teeth) * Math.PI * 2;
    const cx = 50, cy = 50;
    const p = (r: number, a: number) => `${(cx + r * Math.cos(a)).toFixed(4)},${(cy + r * Math.sin(a)).toFixed(4)}`;
    if (i === 0) points.push(`M ${p(innerR, a1)}`);
    else points.push(`L ${p(innerR, a1)}`);
    points.push(`L ${p(outerR + toothH, a2)} L ${p(outerR + toothH, a3)} L ${p(innerR, a4)}`);
  }
  points.push('Z');
  return (
    <>
      <path d={points.join(' ')} fill="#607984" />
      <circle cx="50" cy="50" r={holeR} fill="none" stroke="#607984" strokeWidth="2" />
    </>
  );
}

function CrossMark({ style }: { style: React.CSSProperties }) {
  return (
    <svg
      style={{ position: 'absolute', width: 24, height: 24, ...style }}
      viewBox="0 0 24 24"
      fill="none"
    >
      <line x1="0" y1="12" x2="24" y2="12" stroke="#607984" strokeWidth="1" />
      <line x1="12" y1="0" x2="12" y2="24" stroke="#607984" strokeWidth="1" />
      <circle cx="12" cy="12" r="2" fill="none" stroke="#607984" strokeWidth="0.75" />
    </svg>
  );
}
