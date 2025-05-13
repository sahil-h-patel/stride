"use client"

import { ScrollArea, ScrollBar } from "./ui/scroll-area";

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


function TimeSlots() {
    return (
        <div className="grid grid-cols-7 grid-rows-24 w-full h-full border-t border-l">
            {Array.from({length: 168}).map((_, index) => (
                <div
                key={index}
                className="border-r border-b h-12"
                >
                </div>
            ))}
        </div>
    );
}

function Days() {
    return (
    <div className="flex w-full h-fit">
      {days.map((day, index) => (
        <div
          key={index}
          className="flex-1/7 text-center p-2"
        >
          {day}
        </div>
      ))}
    </div>
  );
}

export default function DynamicCalendar() {
  return (
    <div className="flex flex-col">
        <Days/>
        <ScrollArea className="w-screen overflow-hidden">
                <TimeSlots/>
            <ScrollBar orientation="vertical" />
        </ScrollArea>
    </div>
  );
}
