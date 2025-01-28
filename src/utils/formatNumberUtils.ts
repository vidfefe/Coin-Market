export function formatNumber(value: number): string {
  const isNegative = value < 0;
  const absValue = Math.abs(value);

  let formattedValue: string;

  if (absValue >= 1e9) {
    formattedValue = `${(absValue / 1e9).toFixed(2)}b`;
  } else if (absValue >= 1e6) {
    formattedValue = `${(absValue / 1e6).toFixed(2)}m`;
  } else if (absValue >= 1e3) {
    formattedValue = `${(absValue / 1e3).toFixed(2)}k`;
  } else if (absValue < 1e3) {
    formattedValue = absValue.toFixed(2);
  } else {
    formattedValue = "N/A";
  }

  return isNegative ? `-${formattedValue}` : formattedValue;
}
