import {
  bridges,
  constructions,
  coreWoods,
  electronics,
  fingerboards,
  finishes,
  fretMaterials,
  fretCounts,
  hardwareFinishes,
  inlays,
  neckProfiles,
  neckWoods,
  nuts,
  optionLabel,
  pickupsBass,
  pickupsGuitar,
  radii,
  scaleLengths,
  sheens,
  shapesForFamily,
  topWoods,
  tuners,
  type BuildConfig,
} from "../data/catalog";

interface Props {
  config: BuildConfig;
  onNameChange: (name: string) => void;
}

export function BuildSheet({ config, onNameChange }: Props) {
  const pickups = config.family === "bass" ? pickupsBass : pickupsGuitar;
  const rows: [string, string][] = [
    ["Instrument", `${config.family} · ${config.strings}-string`],
    ["Body silhouette", optionLabel(shapesForFamily(config.family), config.shape)],
    ["Construction", optionLabel(constructions, config.construction)],
    ["Core wood", optionLabel(coreWoods, config.coreWood)],
    ["Top wood", optionLabel(topWoods, config.topWood)],
    ["Back wood", optionLabel(topWoods, config.backWood)],
    ["Neck wood", optionLabel(neckWoods, config.neckWood)],
    ["Fingerboard", optionLabel(fingerboards, config.fingerboard)],
    ["Neck profile", optionLabel(neckProfiles, config.neckProfile)],
    ["Fingerboard radius", optionLabel(radii, config.radius)],
    ["Scale length", optionLabel(scaleLengths[config.family], config.scale)],
    ["Frets", `${optionLabel(fretCounts, config.frets)} · ${optionLabel(fretMaterials, config.fretMaterial)}`],
    ["Inlays", optionLabel(inlays, config.inlays)],
    ["Pickups", optionLabel(pickups, config.pickups)],
    ["Electronics", optionLabel(electronics, config.electronics)],
    ["Bridge", optionLabel(bridges[config.family], config.bridge)],
    ["Tuners", optionLabel(tuners, config.tuners)],
    ["Nut", optionLabel(nuts, config.nut)],
    [
      "Finish",
      config.finish === "custom-color"
        ? `Custom ${config.customFinish}`
        : optionLabel(finishes, config.finish),
    ],
    ["Sheen", optionLabel(sheens, config.sheen)],
    ["Hardware", optionLabel(hardwareFinishes, config.hardwareFinish)],
  ];

  function copySheet() {
    const text = [
      config.name,
      "— Grainline build sheet —",
      ...rows.map(([k, v]) => `${k}: ${v}`),
      "",
      "Silhouettes are original outlines inspired by classic industry forms. Not affiliated with any manufacturer.",
    ].join("\n");
    void navigator.clipboard?.writeText(text);
  }

  function downloadJson() {
    const blob = new Blob([JSON.stringify(config, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${config.name.replace(/\s+/g, "-").toLowerCase() || "build"}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="build-sheet">
      <label className="field">
        <span>Build name</span>
        <input
          type="text"
          value={config.name}
          onChange={(e) => onNameChange(e.target.value)}
          maxLength={60}
          placeholder="Name your dream instrument"
        />
      </label>

      <dl className="spec-list">
        {rows.map(([k, v]) => (
          <div key={k} className="spec-list__row">
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>

      <p className="legal-note">
        Body shapes use original silhouettes inspired by familiar industry
        contours (P-style, J-style, Ray-style, Crestline, etc.). Grainline is
        not affiliated with, endorsed by, or connected to any guitar or bass
        manufacturer. Trademarks remain with their owners.
      </p>

      <div className="build-sheet__actions">
        <button type="button" className="btn btn--primary" onClick={copySheet}>
          Copy build sheet
        </button>
        <button type="button" className="btn btn--ghost" onClick={downloadJson}>
          Download JSON
        </button>
      </div>
    </div>
  );
}
