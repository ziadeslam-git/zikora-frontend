/**
 * Calculates relative luminance of a color.
 * Formula from WCAG 2.0: https://www.w3.org/TR/WCAG20/#relativeluminancedef
 */
function getLuminance(hex: string): number {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return 0;
  
  const rgb = {
    r: parseInt(result[1]!, 16),
    g: parseInt(result[2]!, 16),
    b: parseInt(result[3]!, 16)
  };

  const mapColor = (val: number) => {
    const v = val / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };

  const r = mapColor(rgb.r);
  const g = mapColor(rgb.g);
  const b = mapColor(rgb.b);

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Checks if the contrast ratio between brandColor and background is at least 3:1.
 * 
 * @param brandColorHex e.g. "#FF0000"
 * @param backgroundHex e.g. "#FFFFFF"
 * @returns boolean
 */
export function hasEnoughContrast(brandColorHex: string, backgroundHex: string): boolean {
  if (!brandColorHex || !backgroundHex) return false;
  
  const l1 = getLuminance(brandColorHex);
  const l2 = getLuminance(backgroundHex);
  
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  
  const contrastRatio = (lighter + 0.05) / (darker + 0.05);
  
  return contrastRatio >= 3;
}
