export function roundNumber(num, decimalPlaces = 0) {
  if (num < 0) return -round(-num, decimalPlaces);
  num = Math.round(num + "e" + decimalPlaces);
  return Number(num + "e" + -decimalPlaces);
}
