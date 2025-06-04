import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { getDay, format } from 'date-fns';
import * as React from 'react'

export default function DayView() {
    const hours = Array.from({ length: 24 }).map((_, index) =>
      format(new Date(0, 0, 0, index), "h a")
    )
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = days[getDay(Date.now())];

    return (
     <div className="flex flex-col w-[97vw]">
        <div className="flex text-center mx-auto p-2">
            <div className="font-semibold">{today}</div>
        </div>
          <ScrollArea className="w-[97vw] overflow-hidden">
            <div className="flex w-full h-full">
                <div className="flex flex-col w-16 text-xs text-gray-500 border-r">
                    {hours.map((hour, i) => (
                    <div key={i} className="h-30 text-end pt-1 pr-1">
                        {hour}
                    </div>
                    ))}
                </div>
                <div className="grid-rows-24 w-full h-full border-t border-l">
                    {Array.from({length: 24}).map((_, index) => (
                        <div
                        key={index}
                        className="border-r border-b h-30"
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
