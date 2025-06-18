import { format, getDay as getDayOfWeek } from "date-fns";
import { cn } from "~/lib/utils";

export const mockEvents = [
  {
    title: "Standup",
    start: new Date(2025, 5, 18, 9, 0),
    end: new Date(2025, 5, 18, 9, 15),
    color: "#bfdbfe", // Equivalent to bg-blue-200
  },
  {
    title: "Design Review",
    start: new Date(2025, 5, 18, 10, 15),
    end: new Date(2025, 5, 18, 11, 45),
    color: "#bbf7d0", // Equivalent to bg-green-200
  },
  {
    title: "Quick Sync",
    start: new Date(2025, 5, 18, 13, 40),
    end: new Date(2025, 5, 18, 14, 30),
    color: "#fde68a", // Equivalent to bg-amber-200
  },
  {
    title: "Planning",
    start: new Date(2025, 5, 18, 9, 30),
    end: new Date(2025, 5, 18, 10, 0),
    color: "#fecaca", // Equivalent to bg-rose-200
  },
];

// --- Type Definition for an Event ---
type CalendarEvent = {
  title: string;
  start: Date;
  end: Date;
  color: string;
};

export function getContrastingTextColor(hex: string): "text-black" | "text-white" {
  if (!hex) return "text-black";
  const cleanHex = hex.startsWith("#") ? hex.slice(1) : hex;
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "text-black" : "text-white";
}

export function getRow(start: Date, end: Date) {
  const MINUTES_PER_ROW = 5;
  const startTotalMinutes = start.getHours() * 60 + start.getMinutes();
  const endTotalMinutes = end.getHours() * 60 + end.getMinutes();

  const startRow = Math.floor(startTotalMinutes / MINUTES_PER_ROW) + 1;
  const endRow = Math.ceil(endTotalMinutes / MINUTES_PER_ROW) + 1;

  if (startRow >= endRow) {
    return { gridRow: `${startRow} / ${startRow + 1}` };
  }
  return { gridRow: `${startRow} / ${endRow}` };
}

export function getCol(start: Date) {
  let gridCol = start.getDay()+1;
  if (gridCol == 0) gridCol = 7;
  return {gridCol}
}

// --- The Event Component ---

interface EventProps {
  event: CalendarEvent;
}

export default function Event({ event }: EventProps) {
  // All the logic for a single event is now encapsulated here.
  const { gridRow } = getRow(event.start, event.end);
//   const { gridCol } = getCol(event.start)
  const textColorClass = getContrastingTextColor(event.color);
  const gridColumnStart = getDayOfWeek(event.start) + 1;
  const durationInMinutes = (event.end.getTime() - event.start.getTime()) / (1000 * 60);

  return (
    <div
      className={cn(
        "relative w-[calc(100%-0.25rem)] px-2 py-1 rounded-lg text-xs mx-0.5 overflow-hidden",
        textColorClass
      )}
      style={{
        backgroundColor: event.color,
        gridRow: gridRow,
        gridColumn: gridColumnStart,
      }}
    >
      <p className="font-bold whitespace-nowrap">{event.title}</p>
      {/* Conditionally render the time only if the event is long enough */}
      {durationInMinutes > 20 && (
        <p className="whitespace-nowrap">
          {format(event.start, "h:mm a")}
        </p>
      )}
    </div>
  );
}
