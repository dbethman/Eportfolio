import React, {useMemo, useState} from 'react';
import {SchematicType} from '../data/portfolioData';

interface SchematicProps {
  type: SchematicType;
  interactive?: boolean;
}

function computeNaca2412(numPoints = 48): {
  upper: [number, number][];
  lower: [number, number][];
  camber: [number, number][];
} {
  const m = 0.02;
  const p = 0.4;
  const t = 0.12;
  const upper: [number, number][] = [];
  const lower: [number, number][] = [];
  const camber: [number, number][] = [];

  for (let i = 0; i <= numPoints; i++) {
    const beta = (i / numPoints) * Math.PI;
    const x = 0.5 * (1 - Math.cos(beta));
    const yt =
      5 *
      t *
      (0.2969 * Math.sqrt(x) -
        0.126 * x -
        0.3516 * x * x +
        0.2843 * Math.pow(x, 3) -
        0.1015 * Math.pow(x, 4));

    let yc = 0;
    let dycDx = 0;
    if (x < p) {
      yc = (m / (p * p)) * (2 * p * x - x * x);
      dycDx = ((2 * m) / (p * p)) * (p - x);
    } else {
      yc = (m / ((1 - p) * (1 - p))) * (1 - 2 * p + 2 * p * x - x * x);
      dycDx = ((2 * m) / ((1 - p) * (1 - p))) * (p - x);
    }

    const theta = Math.atan(dycDx);
    upper.push([x - yt * Math.sin(theta), yc + yt * Math.cos(theta)]);
    lower.push([x + yt * Math.sin(theta), yc - yt * Math.cos(theta)]);
    camber.push([x, yc]);
  }
  return {upper, lower, camber};
}

export const ProjectSchematic: React.FC<SchematicProps> = ({type, interactive = false}) => {
  const [alphaDeg, setAlphaDeg] = useState(6);
  const [wingView, setWingView] = useState<'section' | 'moment'>('section');

  const nacaData = useMemo(() => computeNaca2412(44), []);

  if (type === 'naca-structure') {
    const mapX = (x: number) => 24 + x * 272;
    const mapY = (y: number) => 98 - y * 272;
    const upperPath = nacaData.upper
      .map((p, i) => `${i === 0 ? 'M' : 'L'} ${mapX(p[0]).toFixed(1)} ${mapY(p[1]).toFixed(1)}`)
      .join(' ');
    const lowerPath = [...nacaData.lower]
      .reverse()
      .map((p) => `L ${mapX(p[0]).toFixed(1)} ${mapY(p[1]).toFixed(1)}`)
      .join(' ');
    const camberPath = nacaData.camber
      .map((p, i) => `${i === 0 ? 'M' : 'L'} ${mapX(p[0]).toFixed(1)} ${mapY(p[1]).toFixed(1)}`)
      .join(' ');

    return (
      <div className="flex flex-col h-full w-full">
        {interactive && (
          <div className="flex items-center justify-between px-4 py-2 border-b border-line bg-subtle/50">
            <span className="text-xs font-mono text-ink-muted">NACA 2412 · 28.09 N/wing @ n = 1.743</span>
            <div className="flex items-center gap-1 p-0.5 bg-subtle rounded-md border border-line">
              <button
                type="button"
                onClick={() => setWingView('section')}
                className={`px-2 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                  wingView === 'section' ? 'bg-surface text-ink shadow-xs' : 'text-ink-muted hover:text-ink'
                }`}
              >
                Idealized Section
              </button>
              <button
                type="button"
                onClick={() => setWingView('moment')}
                className={`px-2 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                  wingView === 'moment' ? 'bg-surface text-ink shadow-xs' : 'text-ink-muted hover:text-ink'
                }`}
              >
                Bending Moment M(y)
              </button>
            </div>
          </div>
        )}
        <svg viewBox="0 0 320 175" className="w-full h-full flex-1" role="img" aria-label="NACA 2412 wing structural cross-section">
          {wingView === 'section' ? (
            <>
              <line x1="24" y1="98" x2="296" y2="98" stroke="var(--schematic-muted)" strokeWidth="1" strokeDasharray="3 3" />
              <path d={camberPath} fill="none" stroke="var(--schematic-muted)" strokeWidth="1" strokeDasharray="2 2" />
              <path d={`${upperPath} ${lowerPath} Z`} fill="var(--schematic-fill)" stroke="var(--schematic-ink)" strokeWidth="1.75" />
              <line x1={mapX(0.2)} y1={mapY(0.072)} x2={mapX(0.2)} y2={mapY(-0.04)} stroke="var(--schematic-accent)" strokeWidth="2.5" />
              <line x1={mapX(0.65)} y1={mapY(0.056)} x2={mapX(0.65)} y2={mapY(-0.025)} stroke="var(--schematic-accent)" strokeWidth="2.2" />
              {[
                [0.2, 0.072],
                [0.2, -0.04],
                [0.425, 0.068],
                [0.425, -0.036],
                [0.65, 0.056],
                [0.65, -0.025],
              ].map(([bx, by], idx) => (
                <circle key={idx} cx={mapX(bx)} cy={mapY(by)} r="3.2" fill="var(--schematic-accent)" stroke="var(--schematic-plate)" strokeWidth="1" />
              ))}
              <line x1="92" y1="154" x2="92" y2="118" stroke="var(--schematic-danger)" strokeWidth="1.5" />
              <polygon points="92,112 88.5,120 95.5,120" fill="var(--schematic-danger)" />
              <text x="99" y="148" fontSize="9" fontFamily="IBM Plex Mono, monospace" fill="var(--schematic-danger)">
                Lift = 28.09 N/wing (c/4)
              </text>
              <text x="24" y="28" fontSize="9.5" fontFamily="IBM Plex Mono, monospace" fill="var(--schematic-muted)">
                NACA 2412 · Two-Spar Three-Cell Wing Box
              </text>
            </>
          ) : (
            <>
              <line x1="36" y1="138" x2="292" y2="138" stroke="var(--schematic-ink)" strokeWidth="1.2" />
              <line x1="36" y1="28" x2="36" y2="145" stroke="var(--schematic-ink)" strokeWidth="1.2" />
              <path d="M 36 42 Q 110 118 286 138" fill="none" stroke="var(--schematic-accent)" strokeWidth="2.2" />
              <path d="M 36 42 Q 110 118 286 138 L 36 138 Z" fill="var(--schematic-fill)" />
              <line x1="36" y1="96" x2="286" y2="138" stroke="var(--schematic-secondary)" strokeWidth="1.5" strokeDasharray="4 3" />
              <text x="44" y="34" fontSize="9.5" fontFamily="IBM Plex Mono, monospace" fill="var(--schematic-accent)">
                M_root = 8.43 N·m
              </text>
              <text x="44" y="90" fontSize="9" fontFamily="IBM Plex Mono, monospace" fill="var(--schematic-secondary)">
                T_root = 1.76 N·m
              </text>
              <text x="200" y="154" fontSize="9" fontFamily="IBM Plex Mono, monospace" fill="var(--schematic-muted)">
                Semi-span 0 → 600 mm
              </text>
            </>
          )}
        </svg>
      </div>
    );
  }

  if (type === 'airfoil-testing') {
    const alphaToX = (a: number) => 42 + ((a + 4) / 20) * 252;
    const clToY = (cl: number) => 142 - ((cl + 0.3) / 2.1) * 112;

    const tatPoints: string[] = [];
    const xfoilPoints: string[] = [];
    for (let a = -4; a <= 16; a += 0.5) {
      const aRad = ((a + 2.08) * Math.PI) / 180;
      const clTat = 2 * Math.PI * aRad;
      const stallDrop = a > 12.5 ? 0.042 * Math.pow(a - 12.5, 2.1) : 0;
      const clViscous = 0.92 * clTat - stallDrop;
      tatPoints.push(`${a === -4 ? 'M' : 'L'} ${alphaToX(a).toFixed(1)} ${clToY(clTat).toFixed(1)}`);
      xfoilPoints.push(`${a === -4 ? 'M' : 'L'} ${alphaToX(a).toFixed(1)} ${clToY(clViscous).toFixed(1)}`);
    }

    const activeRad = ((alphaDeg + 2.08) * Math.PI) / 180;
    const activeTat = 2 * Math.PI * activeRad;
    const activeViscous = 0.92 * activeTat - (alphaDeg > 12.5 ? 0.042 * Math.pow(alphaDeg - 12.5, 2.1) : 0);

    return (
      <div className="flex flex-col h-full w-full">
        <svg viewBox="0 0 320 175" className="w-full h-full flex-1" role="img" aria-label="NACA Airfoil lift coefficient curve">
          <line x1="42" y1="24" x2="42" y2="146" stroke="var(--schematic-muted)" strokeWidth="1" />
          <line x1="38" y1={clToY(0)} x2="298" y2={clToY(0)} stroke="var(--schematic-muted)" strokeWidth="1" />
          <path d={tatPoints.join(' ')} fill="none" stroke="var(--schematic-muted)" strokeWidth="1.5" strokeDasharray="4 3" />
          <path d={xfoilPoints.join(' ')} fill="none" stroke="var(--schematic-accent)" strokeWidth="2.2" />
          <line x1={alphaToX(alphaDeg)} y1="26" x2={alphaToX(alphaDeg)} y2="146" stroke="var(--schematic-accent)" strokeOpacity="0.35" strokeWidth="1" />
          <circle cx={alphaToX(alphaDeg)} cy={clToY(activeViscous)} r="4" fill="var(--schematic-accent)" />
          <circle cx={alphaToX(alphaDeg)} cy={clToY(activeTat)} r="3" fill="var(--schematic-muted)" />
          <text x="50" y="34" fontSize="9.5" fontFamily="IBM Plex Mono, monospace" fill="var(--schematic-accent)">
            — XFOIL Viscous (Cl = {activeViscous.toFixed(2)})
          </text>
          <text x="50" y="48" fontSize="9.5" fontFamily="IBM Plex Mono, monospace" fill="var(--schematic-muted)">
            -- Thin Airfoil Theory (Cl = {activeTat.toFixed(2)})
          </text>
          <text x="230" y="160" fontSize="9" fontFamily="IBM Plex Mono, monospace" fill="var(--schematic-muted)">
            α = {alphaDeg.toFixed(1)}°
          </text>
        </svg>
        {interactive && (
          <div className="flex items-center justify-between gap-4 px-4 py-2.5 border-t border-line bg-subtle/50">
            <label htmlFor="alpha-slider" className="flex items-center gap-3 text-xs text-ink-secondary flex-1">
              <span className="font-medium whitespace-nowrap">Angle of Attack (α)</span>
              <input
                id="alpha-slider"
                type="range"
                min={-4}
                max={16}
                step={0.5}
                value={alphaDeg}
                onChange={(e) => setAlphaDeg(parseFloat(e.target.value))}
                className="w-full accent-accent cursor-pointer"
              />
            </label>
            <span className="text-xs font-mono tabular-nums text-ink-muted shrink-0">{alphaDeg.toFixed(1)}°</span>
          </div>
        )}
      </div>
    );
  }

  if (type === 'alternator-diagnostics') {
    return (
      <svg viewBox="0 0 320 175" className="w-full h-full" role="img" aria-label="Ignition coil and alternator circuit diagnostic schematic">
        <text x="24" y="30" fontSize="9.5" fontFamily="IBM Plex Mono, monospace" fill="var(--schematic-muted)">
          Ignition Coil Continuity &amp; Resistance Spec
        </text>
        <rect x="34" y="48" width="108" height="84" rx="6" fill="var(--schematic-fill)" stroke="var(--color-line-strong)" strokeWidth="1.2" />
        <path d="M 54 78 Q 62 64 70 78 Q 78 64 86 78 Q 94 64 102 78 Q 110 64 118 78" fill="none" stroke="var(--schematic-accent)" strokeWidth="2" />
        <text x="48" y="106" fontSize="9.5" fontFamily="IBM Plex Mono, monospace" fill="var(--schematic-ink)">
          Primary: 0.7 Ω
        </text>
        <line x1="156" y1="54" x2="156" y2="126" stroke="var(--schematic-ink)" strokeWidth="2.5" />
        <line x1="163" y1="54" x2="163" y2="126" stroke="var(--schematic-ink)" strokeWidth="2.5" />
        <rect x="176" y="48" width="112" height="84" rx="6" fill="var(--schematic-secondary-fill)" stroke="var(--color-line-strong)" strokeWidth="1.2" />
        <path
          d="M 192 78 Q 198 62 204 78 Q 210 62 216 78 Q 222 62 228 78 Q 234 62 240 78 Q 246 62 252 78 Q 258 62 264 78 Q 270 62 276 78"
          fill="none"
          stroke="var(--schematic-secondary)"
          strokeWidth="1.8"
        />
        <text x="188" y="106" fontSize="9.5" fontFamily="IBM Plex Mono, monospace" fill="var(--schematic-ink)">
          Secondary: 12.6 kΩ
        </text>
        <text x="34" y="156" fontSize="9" fontFamily="IBM Plex Mono, monospace" fill="var(--schematic-muted)">
          Alternator Rectifier · Bearings · Brushes Replaced
        </text>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 320 175" className="w-full h-full" role="img" aria-label="Coilover strut and ventilated brake rotor assembly">
      <line x1="88" y1="24" x2="88" y2="148" stroke="var(--schematic-ink)" strokeWidth="4" />
      <path
        d="M 74 44 L 102 52 L 74 60 L 102 68 L 74 76 L 102 84 L 74 92 L 102 100"
        fill="none"
        stroke="var(--schematic-accent)"
        strokeWidth="2.2"
      />
      <rect x="78" y="102" width="20" height="34" fill="var(--color-subtle)" stroke="var(--schematic-ink)" strokeWidth="1.5" />
      <text x="42" y="162" fontSize="9" fontFamily="IBM Plex Mono, monospace" fill="var(--schematic-muted)">
        Megan Racing Coilover
      </text>
      <circle cx="222" cy="86" r="46" fill="var(--schematic-fill)" stroke="var(--schematic-ink)" strokeWidth="1.8" />
      <circle cx="222" cy="86" r="24" fill="var(--schematic-plate)" stroke="var(--schematic-muted)" strokeWidth="1.4" />
      <path d="M 248 44 A 48 48 0 0 1 268 92 L 248 92 A 28 28 0 0 0 236 58 Z" fill="var(--schematic-danger-fill)" stroke="var(--schematic-danger)" strokeWidth="1.6" />
      <text x="180" y="162" fontSize="9" fontFamily="IBM Plex Mono, monospace" fill="var(--schematic-muted)">
        Upgraded Rotor &amp; Pads
      </text>
    </svg>
  );
};
