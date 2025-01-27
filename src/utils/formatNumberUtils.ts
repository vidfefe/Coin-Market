export function formatNumber(value: number): string {
  if (value >= 1e9) return `${(value / 1e9).toFixed(2)}b`;
  else if (value >= 1e6) return `${(value / 1e6).toFixed(2)}m`;
  else if (value >= 1e3) return `${(value / 1e3).toFixed(2)}k`;
  else return Number(value).toFixed(2);
}
