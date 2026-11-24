import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BuildSheet } from "./components/BuildSheet";
import { CustomBodyEditor } from "./components/CustomBodyEditor";
import { InstrumentPreview } from "./components/InstrumentPreview";
import { OptionGrid } from "./components/OptionGrid";
import {
  bridges,
  categories,
  constructions,
  coreWoods,
  defaultConfig,
  electronics,
  families,
  fingerboards,
  finishes,
  fretCounts,
  fretMaterials,
  hardwareFinishes,
  inlays,
  neckProfiles,
  neckWoods,
  nuts,
  pickupsBass,
  pickupsGuitar,
  radii,
  scaleLengths,
  sheens,
  shapesForFamily,
  stringCounts,
  topWoods,
  tuners,
  type BuildConfig,
  type CategoryId,
  type InstrumentFamily,
} from "./data/catalog";

const STORAGE_KEY = "grainline-build-v1";

function loadConfig(): BuildConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultConfig;
    return { ...defaultConfig, ...JSON.parse(raw) };
  } catch {
    return defaultConfig;
  }
}

export default function App() {
  const [config, setConfig] = useState<BuildConfig>(loadConfig);
  const [category, setCategory] = useState<CategoryId>("instrument");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  }, [config]);

  const patch = <K extends keyof BuildConfig>(key: K, value: BuildConfig[K]) => {
    setConfig((c) => ({ ...c, [key]: value }));
  };

  const setFamily = (family: InstrumentFamily) => {
    setConfig((c) => {
      const strings = stringCounts[family][0].id;
      const shape = shapesForFamily(family)[0].id;
      const scale = scaleLengths[family].find((s) =>
        family === "bass" ? s.id === "34" : s.id === "25.5",
      )?.id ?? scaleLengths[family][0].id;
      const pickups =
        family === "bass" ? pickupsBass[2].id : pickupsGuitar[2].id;
      const bridge = bridges[family][0].id;
      return {
        ...c,
        family,
        strings,
        shape: shapesForFamily(family).some((s) => s.id === c.shape)
          ? c.shape
          : shape,
        scale,
        pickups,
        bridge,
      };
    });
  };

  const catIndex = categories.findIndex((c) => c.id === category);

  const go = (dir: -1 | 1) => {
    const next = categories[catIndex + dir];
    if (next) setCategory(next.id);
  };

  const panel = useMemo(() => {
    switch (category) {
      case "instrument":
        return (
          <>
            <h2 className="panel__title">What are we building?</h2>
            <p className="panel__hint">Choose the family and string count.</p>
            <OptionGrid
              options={families}
              value={config.family}
              onChange={(id) => setFamily(id as InstrumentFamily)}
            />
            <h3 className="panel__sub">Strings</h3>
            <OptionGrid
              options={stringCounts[config.family]}
              value={config.strings}
              onChange={(id) => patch("strings", id)}
            />
          </>
        );
      case "body":
        return (
          <>
            <h2 className="panel__title">Body silhouette</h2>
            <p className="panel__hint">
              Original outlines inspired by classic industry forms — trademark-safe
              names, no brand affiliation.
            </p>
            <OptionGrid
              options={shapesForFamily(config.family)}
              value={config.shape}
              onChange={(id) => patch("shape", id)}
            />
            {config.shape === "custom" && (
              <CustomBodyEditor
                value={config.customBody}
                onChange={(customBody) => patch("customBody", customBody)}
              />
            )}
          </>
        );
      case "construction":
        return (
          <>
            <h2 className="panel__title">How the neck meets the body</h2>
            <OptionGrid
              options={constructions}
              value={config.construction}
              onChange={(id) => patch("construction", id)}
            />
          </>
        );
      case "woods":
        return (
          <>
            <h2 className="panel__title">Tone woods</h2>
            <h3 className="panel__sub">Core / body</h3>
            <OptionGrid
              options={coreWoods}
              value={config.coreWood}
              onChange={(id) => patch("coreWood", id)}
              showSwatch
            />
            <h3 className="panel__sub">Top</h3>
            <OptionGrid
              options={topWoods}
              value={config.topWood}
              onChange={(id) => patch("topWood", id)}
              showSwatch
            />
            <h3 className="panel__sub">Back</h3>
            <OptionGrid
              options={topWoods}
              value={config.backWood}
              onChange={(id) => patch("backWood", id)}
              showSwatch
            />
            <h3 className="panel__sub">Neck</h3>
            <OptionGrid
              options={neckWoods}
              value={config.neckWood}
              onChange={(id) => patch("neckWood", id)}
              showSwatch
            />
            <h3 className="panel__sub">Fingerboard</h3>
            <OptionGrid
              options={fingerboards}
              value={config.fingerboard}
              onChange={(id) => patch("fingerboard", id)}
              showSwatch
            />
          </>
        );
      case "neck":
        return (
          <>
            <h2 className="panel__title">Neck geometry</h2>
            <h3 className="panel__sub">Profile</h3>
            <OptionGrid
              options={neckProfiles}
              value={config.neckProfile}
              onChange={(id) => patch("neckProfile", id)}
            />
            <h3 className="panel__sub">Radius</h3>
            <OptionGrid
              options={radii}
              value={config.radius}
              onChange={(id) => patch("radius", id)}
            />
            <h3 className="panel__sub">Scale length</h3>
            <OptionGrid
              options={scaleLengths[config.family]}
              value={config.scale}
              onChange={(id) => patch("scale", id)}
            />
            <h3 className="panel__sub">Fret count</h3>
            <OptionGrid
              options={fretCounts}
              value={config.frets}
              onChange={(id) => patch("frets", id)}
            />
            <h3 className="panel__sub">Fret material</h3>
            <OptionGrid
              options={fretMaterials}
              value={config.fretMaterial}
              onChange={(id) => patch("fretMaterial", id)}
            />
            <h3 className="panel__sub">Inlays</h3>
            <OptionGrid
              options={inlays}
              value={config.inlays}
              onChange={(id) => patch("inlays", id)}
            />
          </>
        );
      case "electronics":
        return (
          <>
            <h2 className="panel__title">Pickups & wiring</h2>
            <h3 className="panel__sub">Pickup layout</h3>
            <OptionGrid
              options={config.family === "bass" ? pickupsBass : pickupsGuitar}
              value={config.pickups}
              onChange={(id) => patch("pickups", id)}
            />
            <h3 className="panel__sub">Electronics</h3>
            <OptionGrid
              options={electronics}
              value={config.electronics}
              onChange={(id) => patch("electronics", id)}
            />
          </>
        );
      case "hardware":
        return (
          <>
            <h2 className="panel__title">Hardware</h2>
            <h3 className="panel__sub">Bridge</h3>
            <OptionGrid
              options={bridges[config.family]}
              value={config.bridge}
              onChange={(id) => patch("bridge", id)}
            />
            <h3 className="panel__sub">Tuners</h3>
            <OptionGrid
              options={tuners}
              value={config.tuners}
              onChange={(id) => patch("tuners", id)}
            />
            <h3 className="panel__sub">Nut</h3>
            <OptionGrid
              options={nuts}
              value={config.nut}
              onChange={(id) => patch("nut", id)}
            />
            <h3 className="panel__sub">Hardware finish</h3>
            <OptionGrid
              options={hardwareFinishes}
              value={config.hardwareFinish}
              onChange={(id) => patch("hardwareFinish", id)}
              showSwatch
            />
          </>
        );
      case "finish":
        return (
          <>
            <h2 className="panel__title">Color & sheen</h2>
            <OptionGrid
              options={finishes}
              value={config.finish}
              onChange={(id) => patch("finish", id)}
              showSwatch
            />
            {config.finish === "custom-color" && (
              <label className="field">
                <span>Custom color</span>
                <input
                  type="color"
                  value={config.customFinish}
                  onChange={(e) => patch("customFinish", e.target.value)}
                />
              </label>
            )}
            <h3 className="panel__sub">Sheen</h3>
            <OptionGrid
              options={sheens}
              value={config.sheen}
              onChange={(id) => patch("sheen", id)}
            />
          </>
        );
      case "summary":
        return (
          <BuildSheet
            config={config}
            onNameChange={(name) => patch("name", name)}
          />
        );
      default:
        return null;
    }
  }, [category, config]);

  if (!started) {
    return (
      <div className="landing">
        <div className="landing__atmosphere" aria-hidden />
        <header className="landing__brand">
          <p className="brand-mark">Grainline</p>
          <h1 className="landing__headline">Build the bass or guitar in your head.</h1>
          <p className="landing__lede">
            Pick industry-inspired silhouettes within legal bounds, sculpt a custom
            body, and dial every wood, joint, pickup, and finish — then walk away
            with a build sheet.
          </p>
          <div className="landing__cta">
            <button
              type="button"
              className="btn btn--primary btn--lg"
              onClick={() => setStarted(true)}
            >
              Start configuring
            </button>
          </div>
        </header>
        <div className="landing__stage" aria-hidden>
          <InstrumentPreview config={config} />
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="topbar">
        <button
          type="button"
          className="brand-mark brand-mark--btn"
          onClick={() => setStarted(false)}
        >
          Grainline
        </button>
        <span className="topbar__meta">
          {config.family} · {config.strings}-string
        </span>
      </header>

      <div className="workspace">
        <aside className="stage">
          <InstrumentPreview config={config} />
          <p className="stage__caption">{config.name}</p>
        </aside>

        <section className="console">
          <nav className="cat-nav" aria-label="Build categories">
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                className={`cat-nav__item ${category === c.id ? "is-active" : ""}`}
                onClick={() => setCategory(c.id)}
              >
                {c.label}
              </button>
            ))}
          </nav>

          <AnimatePresence mode="wait">
            <motion.div
              key={category}
              className="panel"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              {panel}
            </motion.div>
          </AnimatePresence>

          <div className="console__footer">
            <button
              type="button"
              className="btn btn--ghost"
              disabled={catIndex === 0}
              onClick={() => go(-1)}
            >
              Back
            </button>
            <button
              type="button"
              className="btn btn--primary"
              disabled={catIndex === categories.length - 1}
              onClick={() => go(1)}
            >
              Next
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
