import type { CustomBodyParams } from "../data/catalog";

const sliders: { key: keyof CustomBodyParams; label: string }[] = [
  { key: "upperBout", label: "Upper bout" },
  { key: "waist", label: "Waist" },
  { key: "lowerBout", label: "Lower bout" },
  { key: "hornLength", label: "Horn length" },
  { key: "hornSpread", label: "Horn spread" },
  { key: "cutaway", label: "Cutaway depth" },
];

interface Props {
  value: CustomBodyParams;
  onChange: (next: CustomBodyParams) => void;
}

export function CustomBodyEditor({ value, onChange }: Props) {
  return (
    <div className="custom-body">
      <p className="panel__hint">
        Sculpt a one-off silhouette. Drag each control — the preview updates live.
      </p>
      {sliders.map(({ key, label }) => (
        <label key={key} className="slider">
          <span className="slider__meta">
            <span>{label}</span>
            <span>{value[key]}</span>
          </span>
          <input
            type="range"
            min={0}
            max={100}
            value={value[key]}
            onChange={(e) =>
              onChange({ ...value, [key]: Number(e.target.value) })
            }
          />
        </label>
      ))}
    </div>
  );
}
