import { ScrollArea, ScrollBar } from '~/components/ui/scroll-area';
import { addDays } from 'date-fns/addDays';
import { getDate } from 'date-fns/getDate';
import { getMonth } from 'date-fns/getMonth';
import { isSameMonth } from 'date-fns/isSameMonth';
import { startOfMonth } from 'date-fns/startOfMonth';
import { startOfWeek } from 'date-fns/startOfWeek';

export default function MonthView() {
    const months = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const month = months[getMonth(Date.now())]
    const today = new Date();
    const startMonth = startOfMonth(today);
    const startDay = startOfWeek(startMonth, { weekStartsOn: 0 }); 
    return (
        <div className="flex flex-col w-[97vw]">
            <div className="flex mx-auto text-center p-2">
                <div className="font-semibold">{month}</div>
            </div>            
            <ScrollArea className="overflow-hidden">
                <div className="grid grid-cols-7 grid-rows-5 w-[97vw] h-[93vh] border-t border-l">
                    {Array.from({ length: 35}).map((_, index) => {
                    const currentDay = addDays(startDay, index);
                    const isCurrentMonth = isSameMonth(currentDay, today);
                    return (
                        <div
                        key={index}
                        className={`border-r border-b h-42 p-1 text-xs ${
                            isCurrentMonth ? "bg-background" : "bg-muted"
                        }`}
                        >
                        <div className="text-left">{getDate(currentDay)}</div>
                        </div>
                    );
                    })}
                </div>
                <ScrollBar orientation="vertical" />
            </ScrollArea>
        </div>
      
    );
}
