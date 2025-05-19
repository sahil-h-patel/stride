"use client"

import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { addDays, format, getDate, getDay, getMonth, isSameMonth, isToday, startOfMonth, startOfWeek} from "date-fns";
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const today = days[getDay(Date.now())];
const month = months[getMonth(Date.now())]
const hours = Array.from({ length: 24 }).map((_, index) =>
  format(new Date(0, 0, 0, index), "h a")
)

type CalendarViewProps = {
    viewType: "W" | "M" | "D";
}

function TimeSlots({viewType}: CalendarViewProps) {
  switch(viewType) {
    case "M":
      const today = new Date();
      const startMonth = startOfMonth(today);
      const startDay = startOfWeek(startMonth, { weekStartsOn: 0 }); 
      return (
        <div className="grid grid-cols-7 grid-rows-5 w-full h-full border-t border-l">
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
        );
    case "W":
      return (
        <div className="flex w-full h-full">
          <div className="flex flex-col w-16 text-xs text-gray-500 border-r">
            {hours.map((hour, i) => (
              <div key={i} className="h-10 flex items-start justify-end pr-1 pt-1">
                {hour}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 grid-rows-24 w-full h-full border-t border-l">
              {Array.from({length: 168}).map((_, index) => (
                  <div
                  key={index}
                  className="border-r border-b h-10"
                  >
                  </div>
              ))}
          </div>
        </div>
      );
    case "D":
      return (
        <div className="flex w-full h-full">
          <div className="flex flex-col w-16 text-xs text-gray-500 border-r">
            {hours.map((hour, i) => (
              <div key={i} className="h-30 flex items-start justify-end pr-1 pt-1">
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
        
      );
  }
    
}

function Days({viewType}: CalendarViewProps) {
  switch (viewType) {
    case "M":
      return (
        <div className="flex mx-auto text-center p-2">
            <div className="font-semibold">{month}</div>
        </div>
      );
    case "W":
      const start = startOfWeek(new Date(), { weekStartsOn: 0 }); // Sunday
      return (
        <div className="flex pl-16 w-full h-fit">
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
      );
    case "D":
      return (
        <div className="flex text-center mx-auto p-2">
            <div className="font-semibold">{today}</div>
        </div>
      );
  }
    
}

export default function CalendarView({viewType}: CalendarViewProps) {
    return (
      <div className="flex flex-col">
          <Days viewType={viewType}/>
          <ScrollArea className="w-screen overflow-hidden">
                  <TimeSlots viewType={viewType}/>
              <ScrollBar orientation="vertical" />
          </ScrollArea>
      </div>
    );
}
