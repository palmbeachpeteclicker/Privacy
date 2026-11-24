import type { BuildConfig } from "../data/catalog";
import {
  bodyPathForShape,
  finishColor,
  hardwareColor,
  woodColor,
} from "../lib/bodyPaths";

interface Props {
  config: BuildConfig;
  compact?: boolean;
}

export function InstrumentPreview({ config, compact }: Props) {
  const bodyFill = finishColor(config.finish, config.customFinish, config.coreWood);
  const hasTop = config.topWood !== "none";
  const isNatural = config.finish === "natural";
  const topFill = hasTop ? woodColor(config.topWood) : bodyFill;
  const neckFill = woodColor(config.neckWood, "#e8d4a8");
  const fbFill = woodColor(config.fingerboard, "#4a2c1a");
  const hw = hardwareColor(config.hardwareFinish);
  const bodyPath = bodyPathForShape(config.shape, config.customBody);
  const stringCount = Number(config.strings) || 4;
  const isBass = config.family === "bass";

  const sheenOpacity =
    config.sheen === "gloss" ? 0.35 : config.sheen === "satin" ? 0.12 : 0.2;

  return (
    <div className={`preview ${compact ? "preview--compact" : ""}`}>
      <svg
        viewBox="0 0 200 520"
        className="preview__svg"
        role="img"
        aria-label={`${config.name} instrument preview`}
      >
        <defs>
          <linearGradient id="bodySheen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff" stopOpacity={sheenOpacity} />
            <stop offset="45%" stopColor="#fff" stopOpacity="0" />
            <stop offset="100%" stopColor="#000" stopOpacity="0.25" />
          </linearGradient>
          <linearGradient id="neckGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#000" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#fff" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#000" stopOpacity="0.18" />
          </linearGradient>
          <filter id="softShadow" x="-20%" y="-10%" width="140%" height="120%">
            <feDropShadow dx="0" dy="8" stdDeviation="10" floodOpacity="0.45" />
          </filter>
        </defs>

        {/* Neck-through core peek */}
        {config.construction === "neck-through" && (
          <rect
            x="88"
            y="200"
            width="24"
            height="220"
            rx="2"
            fill={neckFill}
            opacity="0.55"
          />
        )}

        {/* Body: core → optional figured top → finish tint → sheen */}
        <g filter="url(#softShadow)">
          <path d={bodyPath} fill={isNatural ? bodyFill : woodColor(config.coreWood)} />
          {hasTop && (
            <path
              d={bodyPath}
              fill={topFill}
              opacity={isNatural ? 0.85 : 0.45}
            />
          )}
          {!isNatural && (
            <path d={bodyPath} fill={bodyFill} opacity={hasTop ? 0.72 : 1} />
          )}
          <path d={bodyPath} fill="url(#bodySheen)" />
        </g>

        {/* Neck */}
        <g>
          <rect x="90" y="48" width="20" height="175" rx="2" fill={neckFill} />
          <rect x="90" y="48" width="20" height="175" rx="2" fill="url(#neckGrad)" />
          {/* Fingerboard */}
          <rect x="92" y="52" width="16" height="168" rx="1" fill={fbFill} />
          {/* Frets */}
          {Array.from({ length: Math.min(Number(config.frets) || 20, 24) }).map(
            (_, i) => {
              const y = 58 + i * (160 / 24);
              return (
                <line
                  key={i}
                  x1="92"
                  y1={y}
                  x2="108"
                  y2={y}
                  stroke={hw}
                  strokeWidth="0.6"
                  opacity="0.7"
                />
              );
            },
          )}
          {/* Inlays */}
          {config.inlays !== "none" &&
            [3, 5, 7, 9, 12, 15].map((f) => {
              const y = 58 + (f - 1) * (160 / 24);
              if (config.inlays === "blocks" || config.inlays === "trapezoid") {
                return (
                  <rect
                    key={f}
                    x="96"
                    y={y - 2}
                    width="8"
                    height="4"
                    rx="0.5"
                    fill="#e8dcc8"
                    opacity="0.75"
                  />
                );
              }
              return (
                <circle
                  key={f}
                  cx="100"
                  cy={y}
                  r="1.4"
                  fill="#e8dcc8"
                  opacity="0.8"
                />
              );
            })}
          {/* Headstock */}
          <path
            d={
              isBass
                ? "M88 48 L88 18 C88 10 92 6 100 6 C108 6 112 10 112 18 L112 48 Z"
                : "M90 48 L86 22 C84 10 90 4 100 4 C110 4 116 10 114 22 L110 48 Z"
            }
            fill={neckFill}
          />
          <path
            d={
              isBass
                ? "M88 48 L88 18 C88 10 92 6 100 6 C108 6 112 10 112 18 L112 48 Z"
                : "M90 48 L86 22 C84 10 90 4 100 4 C110 4 116 10 114 22 L110 48 Z"
            }
            fill="url(#neckGrad)"
          />
          {/* Tuners */}
          {Array.from({ length: Math.min(stringCount, 6) }).map((_, i) => {
            const side = i % 2 === 0 ? -1 : 1;
            const row = Math.floor(i / 2);
            const cx = 100 + side * 14;
            const cy = 14 + row * 10;
            return (
              <g key={i}>
                <circle cx={cx} cy={cy} r="3.2" fill={hw} />
                <circle cx={cx} cy={cy} r="1.2" fill="#222" opacity="0.5" />
              </g>
            );
          })}
        </g>

        {/* Nut */}
        <rect x="91" y="48" width="18" height="3" fill={hw} opacity="0.9" />

        {/* Bridge */}
        <rect
          x="86"
          y={isBass ? 400 : 390}
          width="28"
          height={isBass ? 14 : 10}
          rx="1.5"
          fill={hw}
        />

        {/* Pickups */}
        <PickupLayout
          family={config.family}
          pickups={config.pickups}
          hardware={hw}
        />

        {/* Bolt-on plate / set neck heel cue */}
        {config.construction === "bolt-on" && (
          <rect
            x="93"
            y="198"
            width="14"
            height="18"
            rx="1"
            fill={hw}
            opacity="0.85"
          />
        )}
        {config.construction === "set-neck" && (
          <path
            d="M90 200 C90 215 95 225 100 228 C105 225 110 215 110 200 Z"
            fill={neckFill}
            opacity="0.9"
          />
        )}
      </svg>
    </div>
  );
}

function PickupLayout({
  family,
  pickups,
  hardware,
}: {
  family: string;
  pickups: string;
  hardware: string;
}) {
  if (family === "bass") {
    if (pickups === "split-p") {
      return (
        <>
          <rect x="78" y="320" width="18" height="28" rx="2" fill={hardware} />
          <rect x="104" y="320" width="18" height="28" rx="2" fill={hardware} />
        </>
      );
    }
    if (pickups === "jj") {
      return (
        <>
          <rect x="88" y="300" width="24" height="12" rx="2" fill={hardware} />
          <rect x="88" y="350" width="24" height="12" rx="2" fill={hardware} />
        </>
      );
    }
    if (pickups === "pj") {
      return (
        <>
          <rect x="78" y="300" width="18" height="24" rx="2" fill={hardware} />
          <rect x="104" y="300" width="18" height="24" rx="2" fill={hardware} />
          <rect x="88" y="350" width="24" height="12" rx="2" fill={hardware} />
        </>
      );
    }
    if (pickups === "mm-humbucker" || pickups === "soapbar") {
      return (
        <>
          <rect x="82" y="310" width="36" height="18" rx="3" fill={hardware} />
          {pickups === "soapbar" && (
            <rect x="82" y="350" width="36" height="18" rx="3" fill={hardware} />
          )}
        </>
      );
    }
    return <rect x="88" y="360" width="24" height="8" rx="2" fill={hardware} />;
  }

  // Guitar
  if (pickups === "sss") {
    return (
      <>
        <rect x="88" y="290" width="24" height="10" rx="2" fill={hardware} />
        <rect x="88" y="320" width="24" height="10" rx="2" fill={hardware} />
        <rect x="88" y="350" width="24" height="10" rx="2" fill={hardware} />
      </>
    );
  }
  if (pickups === "hss") {
    return (
      <>
        <rect x="84" y="290" width="32" height="16" rx="2" fill={hardware} />
        <rect x="88" y="325" width="24" height="10" rx="2" fill={hardware} />
        <rect x="88" y="350" width="24" height="10" rx="2" fill={hardware} />
      </>
    );
  }
  if (pickups === "hh" || pickups === "emg-active") {
    return (
      <>
        <rect x="84" y="300" width="32" height="16" rx="2" fill={hardware} />
        <rect x="84" y="345" width="32" height="16" rx="2" fill={hardware} />
      </>
    );
  }
  return (
    <>
      <rect x="84" y="305" width="32" height="14" rx="3" fill={hardware} />
      <rect x="84" y="345" width="32" height="14" rx="3" fill={hardware} />
    </>
  );
}
