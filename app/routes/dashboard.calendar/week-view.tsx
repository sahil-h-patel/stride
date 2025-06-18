import { ScrollArea, ScrollBar } from '~/components/ui/scroll-area';
import { addDays, format, isToday, startOfWeek } from 'date-fns';
import { mockEvents, getContrastingTextColor, getCol, getRow } from './event';
import { cn } from '~/lib/utils';

export default function WeekView() {
    const hours = Array.from({ length: 24 }).map((_, index) =>
      format(new Date(0, 0, 0, index), "h a")
    )
    const start = startOfWeek(new Date(), { weekStartsOn: 0 }); // Sunday

    const INCREMENTS_PER_HOUR = 12; // 60 mins / 5 min intervals = 12
    const TOTAL_ROWS = 24 * INCREMENTS_PER_HOUR; // 288 rows
    const ROW_HEIGHT_PX = 56 / INCREMENTS_PER_HOUR;

    return (
     <div className="flex flex-col w-[97vw]">
        <div className="flex pl-16 h-fit">
          {Array.from({ length: 7 }).map((_, index) => {
            const currentDay = addDays(start, index);
            const today = isToday(currentDay);
            return (
              <div key={index} className="flex-1 text-center p-2">
                <div
                  className={`inline-block px-3 py-1 rounded-full ${
                    today ? "bg-primary text-white" : ""
                  }`}
                >
                <div className="font-semibold">{format(currentDay, "EEEE")}</div>
                <div className={`text-sm ${today ? "text-white" : "text-gray-500"}`}>{format(currentDay, "MMM d")}</div>
                </div>
              </div>
            );
          })}
        </div>          
        <ScrollArea className="w-fit overflow-hidden">
            <div className="flex w-[97vw] h-full">
                <div className="flex flex-col w-16 text-xs text-gray-500 border-r">
                    {hours.map((hour, i) => (
                    <div key={i} className="flex-grow h-14 text-end pt-1 pr-1">
                        {hour}
                    </div>
                    ))}
                </div>
                <div className="grid grid-cols-7 grid-rows-288 w-full h-full border-t border-l"
                    style={{ gridTemplateRows: `repeat(${TOTAL_ROWS}, ${ROW_HEIGHT_PX}px)`}}>
                      {Array.from({length: 7 * TOTAL_ROWS}).map((_, i) => {
                        const colIndex = i % 7 + 1
                        const rowIndex = Math.floor(i / 7)+1;
                        return (
                          <div
                          key={i}
                          className={cn(
                            "border-r",
                            // Add a top border for every hour mark
                            rowIndex % INCREMENTS_PER_HOUR === 0 && "border-b"
                          )}
                          style={{
                            gridColumn: colIndex,
                            gridRow: rowIndex,
                            height: ROW_HEIGHT_PX
                          }}
                          >
                          </div>
                        );      
                    })}

                    {mockEvents.map((event, i) => {
                        const { gridRow } = getRow(event.start, event.end);
                        const { gridCol } = getCol(event.start)
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
                                    gridColumnStart: gridCol,
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
            </div>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
      </div>
    );
}
