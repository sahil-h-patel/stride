import { ScrollArea, ScrollBar } from '~/components/ui/scroll-area';
import { addDays, format, isToday, startOfWeek } from 'date-fns';

export default function WeekView() {
    const hours = Array.from({ length: 24 }).map((_, index) =>
      format(new Date(0, 0, 0, index), "h a")
    )
    const start = startOfWeek(new Date(), { weekStartsOn: 0 }); // Sunday
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
                <div className="grid grid-cols-7 grid-rows-24 w-full h-full border-t border-l">
                    {Array.from({length: 168}).map((_, index) => (
                        <div
                        key={index}
                        className="border-r border-b h-14"
                        >
                        </div>
                    ))}
                </div>
            </div>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
      </div>
    );
}
