import { ScrollArea, ScrollBar } from '~/components/ui/scroll-area';
import { getDay, format } from 'date-fns';

export default function DayView() {
    const hours = Array.from({ length: 24 }).map((_, index) =>
      format(new Date(0, 0, 0, index), "h a")
    )
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = days[getDay(new Date(2025, 5, 10))];

    return (
     <div className="flex flex-col w-[97vw]">
        <div className="flex text-center mx-auto p-2">
            <div className="font-semibold">{today}</div>
        </div>

        <ScrollArea className="h-[85vh] overflow-hidden border rounded-md">
            <div className="grid grid-cols-[auto_1fr] grid-rows-96 relative pt-3">
                {/* --- Column 1: Hour Markers --- */}
                {hours.map((hour, i) => (
                    <div
                        key={i}
                        className="row-span-4 text-end pr-2 -mt-3 text-xs text-gray-500"
                        style={{ gridRowStart: i * 4 + 1 }}
                    >
                       {hour}
                    </div>
                ))}

                {/* --- Column 2: Grid Lines --- */}
                {Array.from({ length: 96 }).map((_, index) => (
                    <div
                        key={index}
                        className={`h-5 border-r ${ index % 4 === 0 ? 'border-t' : ''}`}
                    ></div>
                ))}

                {/* --- Render Events on the Grid --- */}
                {/* {events.map((event, i) => {
                    const { gridRow } = getEventGridPosition(event.start, event.end);
                    return (
                        <div
                            key={i}
                            className={`absolute w-full p-2 rounded-lg text-xs mx-1 ${event.color}`}
                            style={{
                                gridColumnStart: 2,
                                gridRow: gridRow,
                            }}
                        >
                            <p className="font-bold">{event.title}</p>
                            <p>{format(event.start, 'h:mm a')} - {format(event.end, 'h:mm a')}</p>
                        </div>
                    );
                })} */}
            </div>
            <ScrollBar orientation="vertical" />
        </ScrollArea>
      </div>
    );
}