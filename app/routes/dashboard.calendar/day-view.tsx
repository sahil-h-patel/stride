import { ScrollArea, ScrollBar } from '~/components/ui/scroll-area';
import { getDay, format } from 'date-fns';
import { events, getContrastingTextColor, getEventGridPosition } from "~/lib/formatEvents";
import { cn } from '~/lib/utils';

export default function DayView() {
    const hours = Array.from({ length: 24 }).map((_, index) =>
      format(new Date(0, 0, 0, index), "h a")
    )
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = days[getDay(new Date(2025, 5, 10))];

    const INCREMENTS_PER_HOUR = 12; // 60 mins / 5 min intervals = 12
    const TOTAL_ROWS = 24 * INCREMENTS_PER_HOUR; // 288 rows
    const ROW_HEIGHT_PX = 80 / INCREMENTS_PER_HOUR;

    return (
     <div className="flex flex-col w-[97vw]">
        <div className="flex text-center mx-auto p-2">
            <div className="font-semibold">{today}</div>
        </div>

        <ScrollArea className="h-[85vh] overflow-hidden border rounded-md">
            <div className="grid grid-cols-[auto_1fr] grid-rows-288 relative pt-3"
                 style={{ gridTemplateRows: `repeat(${TOTAL_ROWS}, ${ROW_HEIGHT_PX}px)` }}>
                {/* --- Column 1: Hour Markers --- */}
                {hours.map((hour, i) => (
                    <div
                        key={i}
                        className="row-span-4 text-end pr-2 -mt-3 text-xs text-gray-500"
                        style={{ gridRow: `${i * INCREMENTS_PER_HOUR + 1} / span 12` }}
                    >
                       {hour}
                    </div>
                ))}

                {/* --- Column 2: Grid Lines --- */}
                {Array.from({ length: 24 }).map((_, i) => (
                    <div
                    key={`hour-line-${i}`}
                    className="border-r border-t -z-10" // Use z-index to place lines behind events
                    style={{
                        gridColumn: 2,
                        // Place each line at the start of the appropriate hour
                        gridRow: i * INCREMENTS_PER_HOUR + 1,
                    }}
                    ></div>
                ))}

                {/* --- Render Events on the Grid --- */}
                {events.map((event, i) => {
                    const { gridRow } = getEventGridPosition(event.start, event.end);
                    const durationInMinutes = (event.end.getTime() - event.start.getTime()) / (1000 * 60);
                    const textColorClass = getContrastingTextColor(event.color);

                    return (
                        <div
                            key={i}
                            className={
                                cn("relative w-full px-2 py-0.5 rounded-lg text-xs mx-1 ${event.color}",
                                textColorClass)}
                            style={{
                                backgroundColor: event.color,
                                gridColumnStart: 2,
                                gridRow: gridRow,
                                
                            }}
                        >
                            <p className="font-bold whitespace-nowrap">{event.title}</p>
                            {durationInMinutes > 15 && (
                                <p className="whitespace-nowrap">
                                    {format(event.start, "h:mm a")} - {format(event.end, "h:mm a")}
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>
            <ScrollBar orientation="vertical" />
        </ScrollArea>
      </div>
    );
}