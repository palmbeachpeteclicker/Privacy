/** Trademark-safe silhouette labels — inspired by classic industry forms, not affiliated with any brand. */

export type InstrumentFamily = "bass" | "guitar";

export interface Option {
  id: string;
  label: string;
  blurb?: string;
  /** CSS color or wood grain hint for preview */
  swatch?: string;
  family?: InstrumentFamily | "both";
}

export const families: Option[] = [
  { id: "bass", label: "Bass", blurb: "Low-end foundations, 4–6 strings" },
  { id: "guitar", label: "Guitar", blurb: "Six-plus strings, from jazz boxes to shred machines" },
];

export const stringCounts: Record<InstrumentFamily, Option[]> = {
  bass: [
    { id: "4", label: "4-string" },
    { id: "5", label: "5-string" },
    { id: "6", label: "6-string" },
  ],
  guitar: [
    { id: "6", label: "6-string" },
    { id: "7", label: "7-string" },
    { id: "8", label: "8-string" },
  ],
};

export const bodyShapes: Option[] = [
  {
    id: "p-contour",
    label: "P Contour",
    blurb: "Classic split-pickup silhouette with a balanced lower bout",
    family: "bass",
  },
  {
    id: "j-contour",
    label: "J Contour",
    blurb: "Offset waist, slender horns — the modern jazz silhouette",
    family: "bass",
  },
  {
    id: "ray-contour",
    label: "Ray Contour",
    blurb: "Sculpted forearm cut and aggressive lower horn",
    family: "bass",
  },
  {
    id: "crestline",
    label: "Crestline",
    blurb: "Sharp crest horns and a deep cutaway — Ric-inspired outline",
    family: "both",
  },
  {
    id: "tele-slab",
    label: "Slab Single-Cut",
    blurb: "Straight edge, single cutaway — workhorse tele silhouette",
    family: "guitar",
  },
  {
    id: "double-cut",
    label: "Double-Cut Contour",
    blurb: "Twin horns, balanced access — Strat-inspired outline",
    family: "guitar",
  },
  {
    id: "single-cut-arch",
    label: "Arched Single-Cut",
    blurb: "Rounded lower bout with a carved-top vibe",
    family: "both",
  },
  {
    id: "explorer-angle",
    label: "Angular Explorer",
    blurb: "Hard lines and a pointed lower horn",
    family: "both",
  },
  {
    id: "custom",
    label: "Custom Shape",
    blurb: "Sculpt your own outline with parametric controls",
    family: "both",
  },
];

export const constructions: Option[] = [
  {
    id: "bolt-on",
    label: "Bolt-on",
    blurb: "Neck fastened with screws — snappy attack, easy service",
  },
  {
    id: "set-neck",
    label: "Set neck",
    blurb: "Glued joint — warm sustain and seamless heel access",
  },
  {
    id: "neck-through",
    label: "Neck-through",
    blurb: "Neck runs the full length — maximum resonance and access",
  },
];

export const coreWoods: Option[] = [
  { id: "alder", label: "Alder", blurb: "Balanced, clear midrange", swatch: "#8b6b4a" },
  { id: "ash", label: "Swamp ash", blurb: "Open, snappy highs", swatch: "#c4a574" },
  { id: "mahogany", label: "Mahogany", blurb: "Warm, thick fundamental", swatch: "#5c2e1f" },
  { id: "basswood", label: "Basswood", blurb: "Light, mid-forward", swatch: "#d4c4a0" },
  { id: "walnut", label: "Walnut", blurb: "Focused, articulate", swatch: "#4a3428" },
  { id: "okoume", label: "Okoumé", blurb: "Lightweight resonance", swatch: "#a67c52" },
  { id: "korina", label: "Korina", blurb: "Airy with strong mids", swatch: "#b8956c" },
];

export const topWoods: Option[] = [
  { id: "none", label: "None (solid)", swatch: "transparent" },
  { id: "maple-flame", label: "Flame maple", swatch: "#e8c88a" },
  { id: "maple-quilt", label: "Quilt maple", swatch: "#d4a574" },
  { id: "maple-spalted", label: "Spalted maple", swatch: "#c9b896" },
  { id: "buckeye", label: "Buckeye burl", swatch: "#7a6b4e" },
  { id: "koa", label: "Koa", swatch: "#8b5a2b" },
  { id: "ebony-cap", label: "Ebony", swatch: "#1a1a1a" },
  { id: "walnut-burl", label: "Walnut burl", swatch: "#6b4423" },
];

export const neckWoods: Option[] = [
  { id: "maple", label: "Maple", swatch: "#e8d4a8" },
  { id: "roasted-maple", label: "Roasted maple", swatch: "#c4a06a" },
  { id: "mahogany-neck", label: "Mahogany", swatch: "#5c2e1f" },
  { id: "wenge", label: "Wenge", swatch: "#3d2b1f" },
  { id: "walnut-neck", label: "Walnut", swatch: "#4a3428" },
  { id: "purpleheart", label: "Purpleheart", swatch: "#5a2d4a" },
];

export const fingerboards: Option[] = [
  { id: "rosewood", label: "Rosewood", swatch: "#4a2c1a" },
  { id: "ebony", label: "Ebony", swatch: "#121212" },
  { id: "maple-fb", label: "Maple", swatch: "#f0e0b8" },
  { id: "pau-ferro", label: "Pau ferro", swatch: "#6b4423" },
  { id: "richlite", label: "Richlite", swatch: "#1c1c1c" },
  { id: "roasted-fb", label: "Roasted maple", swatch: "#c4a06a" },
];

export const neckProfiles: Option[] = [
  { id: "c", label: "Modern C", blurb: "Comfortable all-rounder" },
  { id: "d", label: "D shape", blurb: "Flat shoulders, fast feel" },
  { id: "u", label: "U shape", blurb: "Full vintage handful" },
  { id: "v", label: "Soft V", blurb: "Vintage carve with a ridge" },
  { id: "asym", label: "Asymmetric", blurb: "Thinner treble side" },
];

export const radii: Option[] = [
  { id: "7.25", label: '7.25" vintage' },
  { id: "9.5", label: '9.5" modern' },
  { id: "12", label: '12" flat' },
  { id: "16", label: '16" shred' },
  { id: "compound", label: "Compound 10–16\"" },
];

export const scaleLengths: Record<InstrumentFamily, Option[]> = {
  bass: [
    { id: "30", label: '30" short' },
    { id: "32", label: '32" medium' },
    { id: "34", label: '34" standard' },
    { id: "35", label: '35" extended' },
    { id: "multi", label: "Multi-scale fanned" },
  ],
  guitar: [
    { id: "24.75", label: '24.75" Gibson-scale' },
    { id: "25", label: '25" PRS-scale' },
    { id: "25.5", label: '25.5" Fender-scale' },
    { id: "26.5", label: '26.5" baritone-lean' },
    { id: "multi-g", label: "Multi-scale fanned" },
  ],
};

export const fretCounts: Option[] = [
  { id: "20", label: "20 frets" },
  { id: "21", label: "21 frets" },
  { id: "22", label: "22 frets" },
  { id: "24", label: "24 frets" },
];

export const fretMaterials: Option[] = [
  { id: "nickel", label: "Nickel silver" },
  { id: "stainless", label: "Stainless steel" },
  { id: "ewan", label: "Evo gold" },
];

export const inlays: Option[] = [
  { id: "dots", label: "Pearloid dots" },
  { id: "blocks", label: "Blocks" },
  { id: "trapezoid", label: "Trapezoids" },
  { id: "none", label: "None (side dots only)" },
  { id: "custom-inlay", label: "Custom motif" },
];

export const pickupsBass: Option[] = [
  { id: "split-p", label: "Split P", blurb: "Classic thump" },
  { id: "jj", label: "Dual J singles", blurb: "Growl and clarity" },
  { id: "pj", label: "P/J combo", blurb: "Best of both" },
  { id: "mm-humbucker", label: "Large humbucker", blurb: "Punchy soapbar energy" },
  { id: "soapbar", label: "Dual soapbars", blurb: "Thick modern grind" },
  { id: "piezo-only", label: "Piezo bridge", blurb: "Acoustic-electric hybrid" },
];

export const pickupsGuitar: Option[] = [
  { id: "sss", label: "SSS singles", blurb: "Classic sparkle" },
  { id: "hss", label: "HSS", blurb: "Versatile hybrid" },
  { id: "hh", label: "HH humbuckers", blurb: "Power and warmth" },
  { id: "p90s", label: "P-90s", blurb: "Midrange bark" },
  { id: "filtertron", label: "Filter-style", blurb: "Twang with body" },
  { id: "emg-active", label: "Active set", blurb: "High-output clarity" },
];

export const electronics: Option[] = [
  { id: "passive-vol-tone", label: "Passive volume + tone" },
  { id: "passive-blend", label: "Passive blend / stack" },
  { id: "active-2band", label: "Active 2-band EQ" },
  { id: "active-3band", label: "Active 3-band EQ" },
  { id: "active-pre-push", label: "Active preamp + push-pull" },
];

export const bridges: Record<InstrumentFamily, Option[]> = {
  bass: [
    { id: "standard-bass", label: "Standard 4/5-saddle" },
    { id: "hipshot-a", label: "Single-string adjustable" },
    { id: "badass", label: "High-mass bridge" },
    { id: "piezo-bridge", label: "Piezo-loaded bridge" },
  ],
  guitar: [
    { id: "fixed-hardtail", label: "Hardtail fixed" },
    { id: "tune-o-matic", label: "Tune-o-matic + stop" },
    { id: "tremolo-2pt", label: "2-point tremolo" },
    { id: "floyd", label: "Double-locking trem" },
    { id: "bigsby", label: "Vibrato tailpiece" },
  ],
};

export const tuners: Option[] = [
  { id: "open-gear", label: "Open-gear vintage" },
  { id: "sealed", label: "Sealed die-cast" },
  { id: "locking", label: "Locking tuners" },
  { id: "hipshot-ultralite", label: "Ultralight sealed" },
];

export const nuts: Option[] = [
  { id: "bone", label: "Bone" },
  { id: "tusq", label: "Graphite / Tusq" },
  { id: "brass", label: "Brass" },
  { id: "locking-nut", label: "Locking nut" },
];

export const finishes: Option[] = [
  { id: "natural", label: "Natural / clear", swatch: "#d4a574" },
  { id: "sunburst", label: "Tobacco sunburst", swatch: "#8b4513" },
  { id: "black", label: "Gloss black", swatch: "#0a0a0a" },
  { id: "olympic", label: "Olympic white", swatch: "#f5f0e6" },
  { id: "seafoam", label: "Seafoam green", swatch: "#7fb9a8" },
  { id: "burgundy", label: "Burgundy mist", swatch: "#6b2d4a" },
  { id: "candy-apple", label: "Candy apple red", swatch: "#b22222" },
  { id: "transparent-blue", label: "Transparent blue", swatch: "#2a4a6b" },
  { id: "custom-color", label: "Custom color", swatch: "#fac738" },
];

export const sheens: Option[] = [
  { id: "gloss", label: "High gloss" },
  { id: "satin", label: "Satin / matte" },
  { id: "nitro", label: "Thin nitro" },
  { id: "relic", label: "Relic / worn" },
];

export const hardwareFinishes: Option[] = [
  { id: "chrome", label: "Chrome", swatch: "#c0c0c0" },
  { id: "nickel", label: "Nickel", swatch: "#aaa899" },
  { id: "gold", label: "Gold", swatch: "#d4af37" },
  { id: "black-hw", label: "Black", swatch: "#1a1a1a" },
  { id: "raw-brass", label: "Raw brass", swatch: "#b5a642" },
];

export const categories = [
  { id: "instrument", label: "Instrument" },
  { id: "body", label: "Body" },
  { id: "construction", label: "Construction" },
  { id: "woods", label: "Woods" },
  { id: "neck", label: "Neck" },
  { id: "electronics", label: "Electronics" },
  { id: "hardware", label: "Hardware" },
  { id: "finish", label: "Finish" },
  { id: "summary", label: "Build sheet" },
] as const;

export type CategoryId = (typeof categories)[number]["id"];

export interface CustomBodyParams {
  upperBout: number;
  waist: number;
  lowerBout: number;
  hornLength: number;
  hornSpread: number;
  cutaway: number;
}

export interface BuildConfig {
  family: InstrumentFamily;
  strings: string;
  shape: string;
  customBody: CustomBodyParams;
  construction: string;
  coreWood: string;
  topWood: string;
  backWood: string;
  neckWood: string;
  fingerboard: string;
  neckProfile: string;
  radius: string;
  scale: string;
  frets: string;
  fretMaterial: string;
  inlays: string;
  pickups: string;
  electronics: string;
  bridge: string;
  tuners: string;
  nut: string;
  finish: string;
  customFinish: string;
  sheen: string;
  hardwareFinish: string;
  name: string;
}

export const defaultConfig: BuildConfig = {
  family: "bass",
  strings: "4",
  shape: "j-contour",
  customBody: {
    upperBout: 55,
    waist: 42,
    lowerBout: 68,
    hornLength: 55,
    hornSpread: 50,
    cutaway: 60,
  },
  construction: "bolt-on",
  coreWood: "alder",
  topWood: "none",
  backWood: "none",
  neckWood: "maple",
  fingerboard: "rosewood",
  neckProfile: "c",
  radius: "9.5",
  scale: "34",
  frets: "20",
  fretMaterial: "nickel",
  inlays: "dots",
  pickups: "pj",
  electronics: "passive-vol-tone",
  bridge: "standard-bass",
  tuners: "sealed",
  nut: "bone",
  finish: "natural",
  customFinish: "#c45c26",
  sheen: "gloss",
  hardwareFinish: "chrome",
  name: "Untitled build",
};

export function optionLabel(list: Option[], id: string): string {
  return list.find((o) => o.id === id)?.label ?? id;
}

export function shapesForFamily(family: InstrumentFamily): Option[] {
  return bodyShapes.filter((s) => s.family === family || s.family === "both");
}
