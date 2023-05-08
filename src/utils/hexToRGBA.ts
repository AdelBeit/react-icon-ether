/**
 * Hex: hex color code, e.g. #ffffff
 * Opacity: opacity value, e.g. 0.5
 */
function hexToRGBA(hex: string, opacity: number) {
  const hexRegex = /^#[0-9A-Fa-f]{6}$/;

  if (!hexRegex.test(hex)) throw new Error("Invalid hex color code");
  if (opacity < 0 || opacity > 1) throw new Error("Invalid opacity value");

  hex = hex.replace("#", "");
  var r = parseInt(hex.substring(0, 2), 16);
  var g = parseInt(hex.substring(2, 4), 16);
  var b = parseInt(hex.substring(4, 6), 16);

  return "rgba(" + r + ", " + g + ", " + b + ", " + opacity + ")";
}

export default hexToRGBA;
