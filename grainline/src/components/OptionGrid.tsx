import type { Option } from "../data/catalog";

interface Props {
  options: Option[];
  value: string;
  onChange: (id: string) => void;
  showSwatch?: boolean;
}

export function OptionGrid({ options, value, onChange, showSwatch }: Props) {
  return (
    <div className="option-grid" role="listbox">
      {options.map((opt) => {
        const selected = opt.id === value;
        return (
          <button
            key={opt.id}
            type="button"
            role="option"
            aria-selected={selected}
            className={`option ${selected ? "option--selected" : ""}`}
            onClick={() => onChange(opt.id)}
          >
            {showSwatch && opt.swatch && opt.swatch !== "transparent" && (
              <span
                className="option__swatch"
                style={{ background: opt.swatch }}
                aria-hidden
              />
            )}
            {showSwatch && opt.swatch === "transparent" && (
              <span className="option__swatch option__swatch--none" aria-hidden />
            )}
            <span className="option__label">{opt.label}</span>
            {opt.blurb && <span className="option__blurb">{opt.blurb}</span>}
          </button>
        );
      })}
    </div>
  );
}
