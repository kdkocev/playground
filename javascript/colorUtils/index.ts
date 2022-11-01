type HEXColor = string;
type RGBColor = { r: number; g: number; b: number };
type RGBAColor = RGBColor & { a: number };

export const setOpacity = (color: RGBColor, opacity: number): RGBAColor => {
  return { ...color, a: opacity };
};

export const hexToRgb = (color: HEXColor): RGBColor => {
  const rhex = color.substring(1, 3);
  const ghex = color.substring(3, 5);
  const bhex = color.substring(5, 7);

  const r = parseInt(rhex, 16);
  const g = parseInt(ghex, 16);
  const b = parseInt(bhex, 16);

  return { r, g, b };
};

export const hexToRgba = (color: HEXColor): RGBAColor => {
  const rhex = color.substring(1, 3);
  const ghex = color.substring(3, 5);
  const bhex = color.substring(5, 7);
  const ahex = color.substring(7, 9);

  const r = parseInt(rhex, 16);
  const g = parseInt(ghex, 16);
  const b = parseInt(bhex, 16);
  const a = parseInt(ahex, 16);

  return { r, g, b, a };
};

export const rgbToHex = (color: RGBColor): HEXColor => {
  const r = color.r.toString(16);
  const g = color.g.toString(16);
  const b = color.b.toString(16);

  return `#${r}${g}${b}`;
};

export const rgbaToHex = (color: RGBAColor): HEXColor => {
  const r = color.r.toString(16);
  const g = color.g.toString(16);
  const b = color.b.toString(16);
  const a = color.a.toString(16);

  return `#${r}${g}${b}${a}`;
};

export const rgbToRgba = (color: RGBColor): RGBAColor => {
  return { ...color, a: 1 };
};

export const rgbToString = (color: RGBColor): string => {
  const { r, g, b } = color;
  return `rgb(${r}, ${g}, ${b})`;
};

export const rgbaToString = (color: RGBAColor): string => {
  const { r, g, b, a } = color;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

export const rgbaToRgb = (color: RGBAColor): RGBColor => {
  return {
    r: color.r * color.a,
    g: color.g * color.a,
    b: color.b * color.a,
  };
};
