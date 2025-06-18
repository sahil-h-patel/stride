export const events = [
  {
    title: "Standup",
    start: new Date(2025, 5, 10, 9, 0),
    end: new Date(2025, 5, 10, 9, 15),
    color: "#bfdbfe", // Equivalent to bg-blue-200
  },
  {
    title: "Design Review",
    start: new Date(2025, 5, 10, 10, 15),
    end: new Date(2025, 5, 10, 11, 45),
    color: "#bbf7d0", // Equivalent to bg-green-200
  },
  {
    title: "Quick Sync",
    start: new Date(2025, 5, 10, 13, 40),
    end: new Date(2025, 5, 10, 14, 30),
    color: "#fde68a", // Equivalent to bg-amber-200
  },
  {
    title: "Planning",
    start: new Date(2025, 5, 10, 9, 30),
    end: new Date(2025, 5, 10, 10, 0),
    color: "#fecaca", // Equivalent to bg-rose-200
  },
];


export function getContrastingTextColor(hex: string): 'text-black' | 'text-white' {
  if (!hex) return 'text-black';

  // Remove the '#' if present
  const cleanHex = hex.startsWith('#') ? hex.slice(1) : hex;
  
  // Convert hex to RGB
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);

  // Calculate luminance using the standard formula
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Use a threshold to decide on black or white text
  return luminance > 0.5 ? 'text-black' : 'text-white';
}

export function getEventGridPosition(start: Date, end: Date) {
  const MINUTES_PER_ROW = 5;

  // Calculate start time in minutes from the beginning of the day.
  const startTotalMinutes = start.getHours() * 60 + start.getMinutes();
  
  // Calculate end time in minutes from the beginning of the day.
  let endTotalMinutes = end.getHours() * 60 + end.getMinutes();

  // Handle midnight-ending events correctly
  if (end.getHours() === 0 && end.getMinutes() === 0 && start < end) {
    endTotalMinutes = 24 * 60;
  }

  // Determine which 5-minute row the event starts and ends on.
  // The `+ 1` is because CSS grid rows are 1-indexed.
  const startRow = Math.floor(startTotalMinutes / MINUTES_PER_ROW) + 1;
  const endRow = Math.ceil(endTotalMinutes / MINUTES_PER_ROW) + 1;

  // Ensure an event always spans at least one row
  if (startRow >= endRow) {
    return { gridRow: `${startRow} / ${startRow + 1}` };
  }

  return { gridRow: `${startRow} / ${endRow}` };
}
