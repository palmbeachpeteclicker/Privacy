import type { CustomBodyParams } from "../data/catalog";

/** ViewBox: 0 0 200 520 — body centered around y=280–420, neck up */

export function bodyPathForShape(shapeId: string, custom: CustomBodyParams): string {
  if (shapeId === "custom") return customBodyPath(custom);

  switch (shapeId) {
    case "p-contour":
      return "M100 210 C118 210 132 220 138 240 C148 268 155 295 152 330 C148 380 140 420 118 445 C108 455 100 458 100 458 C100 458 92 455 82 445 C60 420 52 380 48 330 C45 295 52 268 62 240 C68 220 82 210 100 210 Z";
    case "j-contour":
      return "M100 205 C122 205 140 218 146 245 C155 280 158 310 152 350 C145 400 130 435 108 455 C102 458 100 458 100 458 C98 458 92 455 85 448 C55 420 42 370 45 320 C48 280 55 250 72 228 C80 215 90 205 100 205 Z";
    case "ray-contour":
      return "M105 208 C128 208 145 225 150 255 C158 295 160 330 148 375 C138 410 125 438 100 455 C95 458 92 452 78 440 C50 415 40 360 48 310 C55 270 62 240 78 220 C88 210 96 208 105 208 Z";
    case "crestline":
      return "M100 200 C115 200 125 210 130 230 L145 250 C155 270 160 300 155 340 C148 390 130 430 100 450 C70 430 52 390 45 340 C40 300 45 270 55 250 L70 230 C75 210 85 200 100 200 Z";
    case "tele-slab":
      return "M100 215 C125 215 145 235 148 270 C152 320 150 370 140 415 C130 445 115 455 100 455 C85 455 70 445 60 415 C50 370 48 320 52 270 C55 235 75 215 100 215 Z";
    case "double-cut":
      return "M100 200 C120 200 135 215 140 240 C150 275 152 310 148 350 C142 400 125 435 100 455 C75 435 58 400 52 350 C48 310 50 275 60 240 C65 215 80 200 100 200 Z";
    case "single-cut-arch":
      return "M100 215 C130 215 150 240 152 280 C155 330 150 385 135 430 C120 455 100 458 100 458 C85 455 65 440 55 410 C45 370 48 310 55 270 C60 235 75 215 100 215 Z";
    case "explorer-angle":
      return "M110 200 L155 250 L150 320 L160 400 L100 460 L40 390 L55 300 L45 240 Z";
    default:
      return bodyPathForShape("j-contour", custom);
  }
}

export function customBodyPath(p: CustomBodyParams): string {
  const cx = 100;
  const top = 205;
  const bottom = 455;
  const midY = 320;

  // Keep silhouette inside the 200-wide viewBox at max slider values
  const upper = 24 + (p.upperBout / 100) * 28;
  const waist = 16 + (p.waist / 100) * 24;
  const lower = 30 + (p.lowerBout / 100) * 32;
  const horn = 8 + (p.hornLength / 100) * 28;
  const spread = 8 + (p.hornSpread / 100) * 22;
  const cut = (p.cutaway / 100) * 20;

  const hy = top + horn;
  // Cutaway pulls the treble horn in; shift whole outline so neck stays centered
  const bias = cut * 0.35;

  return [
    `M${cx} ${top}`,
    `C${cx + 12} ${top} ${cx + spread + bias} ${top + 5} ${cx + spread + bias} ${hy}`,
    `C${cx + upper + bias} ${hy + 20} ${cx + upper + bias + 4} ${midY - 40} ${cx + upper + bias} ${midY - 20}`,
    `C${cx + waist + bias + 6} ${midY} ${cx + waist + bias} ${midY + 20} ${cx + lower + bias - cut * 0.2} ${midY + 40}`,
    `C${cx + lower + bias} ${midY + 80} ${cx + lower + bias - 4} ${bottom - 40} ${cx + 14} ${bottom}`,
    `C${cx + 4} ${bottom + 3} ${cx - 4} ${bottom + 3} ${cx - 14} ${bottom}`,
    `C${cx - lower + bias + 4} ${bottom - 40} ${cx - lower + bias} ${midY + 80} ${cx - lower + bias + cut * 0.2} ${midY + 40}`,
    `C${cx - waist + bias} ${midY + 20} ${cx - waist + bias - 6} ${midY} ${cx - upper + bias} ${midY - 20}`,
    `C${cx - upper + bias - 4} ${midY - 40} ${cx - upper + bias} ${hy + 20} ${cx - spread + bias - cut * 0.5} ${hy}`,
    `C${cx - spread + bias - cut * 0.5} ${top + 5} ${cx - 12} ${top} ${cx} ${top}`,
    "Z",
  ].join(" ");
}

export function woodColor(id: string, fallback = "#8b6b4a"): string {
  const map: Record<string, string> = {
    alder: "#8b6b4a",
    ash: "#c4a574",
    mahogany: "#5c2e1f",
    basswood: "#d4c4a0",
    walnut: "#4a3428",
    okoume: "#a67c52",
    korina: "#b8956c",
    "maple-flame": "#e8c88a",
    "maple-quilt": "#d4a574",
    "maple-spalted": "#c9b896",
    buckeye: "#7a6b4e",
    koa: "#8b5a2b",
    "ebony-cap": "#1a1a1a",
    "walnut-burl": "#6b4423",
    maple: "#e8d4a8",
    "roasted-maple": "#c4a06a",
    "mahogany-neck": "#5c2e1f",
    wenge: "#3d2b1f",
    "walnut-neck": "#4a3428",
    purpleheart: "#5a2d4a",
    rosewood: "#4a2c1a",
    ebony: "#121212",
    "maple-fb": "#f0e0b8",
    "pau-ferro": "#6b4423",
    richlite: "#1c1c1c",
    "roasted-fb": "#c4a06a",
    none: "transparent",
  };
  return map[id] ?? fallback;
}

export function finishColor(id: string, custom: string, coreWood: string): string {
  if (id === "natural") return woodColor(coreWood);
  if (id === "custom-color") return custom;
  const map: Record<string, string> = {
    sunburst: "#6b3a1f",
    black: "#0c0c0c",
    olympic: "#f2ebe0",
    seafoam: "#7fb9a8",
    burgundy: "#6b2d4a",
    "candy-apple": "#b22222",
    "transparent-blue": "#2a4a6b",
  };
  return map[id] ?? woodColor(coreWood);
}

export function hardwareColor(id: string): string {
  const map: Record<string, string> = {
    chrome: "#d8d8d8",
    nickel: "#b8b4a8",
    gold: "#d4af37",
    "black-hw": "#2a2a2a",
    "raw-brass": "#b5a642",
  };
  return map[id] ?? "#d8d8d8";
}
