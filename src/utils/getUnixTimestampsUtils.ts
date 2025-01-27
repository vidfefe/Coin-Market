export function getUnixTimestamps(interval: "h1" | "m30" | "m5") {
  const now = Date.now();
  const hoursAgo = interval === "h1" ? 24 : interval === "m30" ? 12 : 1;
  const start = now - hoursAgo * 60 * 60 * 1000;
  const end = now;
  return { start, end };
}
