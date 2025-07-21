export function toNumber(value: string): number {
  const num = Number(value);
  return isNaN(num) ? 0 : num;
}

export function formatDuration(seconds: number): string {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  const padded = (n: number) => String(n).padStart(2, '0');
  return `${padded(hrs)}:${padded(mins)}:${padded(secs)}`;
}
