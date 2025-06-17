export const events = [
  {
    title: 'Standup',
    start: new Date(2025, 5, 10, 9, 0),
    end: new Date(2025, 5, 10, 9, 15),
    color: 'bg-blue-200 border-blue-400',
  },
  {
    title: 'Design Review',
    start: new Date(2025, 5, 10, 10, 15),
    end: new Date(2025, 5, 10, 11, 45),
    color: 'bg-green-200 border-green-400',
  },
  {
    title: 'Quick Sync',
    start: new Date(2025, 5, 10, 13, 40), // 1:40 PM
    end: new Date(2025, 5, 10, 14, 30),  // 2:30 PM (50 minute duration)
    color: 'bg-amber-200 border-amber-400',
  },
  {
    title: 'Planning',
    start: new Date(2025, 5, 10, 9, 30),
    end: new Date(2025, 5, 10, 10, 0), // Ends exactly on the hour
    color: 'bg-rose-200 border-rose-400',
  },
];


export function getEventGridPosition(start: Date, end: Date) {
  const startTotalMinutes = start.getHours() * 60 + start.getMinutes();
  let endTotalMinutes = end.getHours() * 60 + end.getMinutes();

  if (end.getHours() === 0 && end.getMinutes() === 0) {
      endTotalMinutes = 24 * 60;
  }

  const startRow = Math.floor(startTotalMinutes / 15) + 1;
  const endRow = Math.ceil(endTotalMinutes / 15) + 1;

  if (startRow >= endRow) {
    return { gridRow: `${startRow} / ${startRow + 1}` };
  }

  return { gridRow: `${startRow} / ${endRow}` };
}