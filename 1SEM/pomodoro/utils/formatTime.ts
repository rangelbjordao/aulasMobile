export function formatTime(timeInSeconds: number): string {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;

  return `${padNumber(minutes)}:${padNumber(seconds)}`;
}

function padNumber(time: number): string {
  return time.toString().padStart(2, "0");
}
