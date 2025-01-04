type HexColor = string;
type RGBColor = [r: number, g: number, b: number];
type Color = HexColor | RGBColor;

function hexToRgb(hex: string): RGBColor {
  // Remove hash if present
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((x) => x + x)
      .join("");
  }
  const bigint = parseInt(hex, 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}

function calculateLuminance([r, g, b]: [r: number, g: number, b: number]) {
  const linearize = (channel: number) => {
    const normalized = channel / 255;
    return normalized <= 0.04045
      ? normalized / 12.92
      : Math.pow((normalized + 0.055) / 1.055, 2.4);
  };
  const rLin = linearize(r);
  const gLin = linearize(g);
  const bLin = linearize(b);
  return 0.2126 * rLin + 0.7152 * gLin + 0.0722 * bLin;
}

export function getLightest(color1: Color, color2: Color) {
  // Convert HEX to RGB if needed
  const rgb1 = Array.isArray(color1) ? color1 : hexToRgb(color1);
  const rgb2 = Array.isArray(color2) ? color2 : hexToRgb(color2);

  const luminance1 = calculateLuminance(rgb1);
  const luminance2 = calculateLuminance(rgb2);

  return luminance1 > luminance2 ? color1 : color2;
}
