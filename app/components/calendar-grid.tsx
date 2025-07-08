import {
  addDays,
  format,
  getDate,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { Event as EventComponent, EventItemProps } from "~/components/event";
import { cn } from "~/lib/utils";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";

// --- PROPS INTERFACE ---
interface CalendarGridProps {
  view: "day" | "week" | "month";
  events: EventItemProps[];
  currentDate: Date;
}

// --- TIME GRID (for Day/Week Views) ---
function TimeGrid({
  numberOfDays,
  events,
}: {
  numberOfDays: 1 | 7;
  events: EventItemProps[];
}) {
  const hours = Array.from({ length: 24 }).map((_, index) =>
    format(new Date(0, 0, 0, index), "h a")
  );
  const TOTAL_GRID_ROWS = 24 * 12; // 5-minute intervals

  return (
    <ScrollArea className="flex-1 overflow-auto">
      <div className="flex">
        {/* Time Column */}
        <div className="flex flex-col w-12 text-xs text-right text-muted-foreground z-10 bg-background">
          {hours.map((hour, i) => (
            <div key={i} className="h-[60px] pr-1">
              <span className="inline-block pt-1">{hour}</span>
            </div>
          ))}
        </div>

        {/* Grid and Events Container */}
        <div
          className="flex-1 relative"
          style={{ height: `${24 * 60}px` }}
        >
          {/* Background Grid Lines */}
          <div className={`grid grid-cols-${numberOfDays} absolute inset-0 z-0`}>
            {Array.from({ length: numberOfDays }).map((_, dayIndex) => (
              <div key={dayIndex} className="border-l">
                {Array.from({ length: 24 }).map((_, hourIndex) => (
                  <div key={hourIndex} className="h-[60px] border-t"></div>
                ))}
              </div>
            ))}
          </div>

          {/* Event Rendering Layer */}
          <div
            className={`grid grid-cols-${numberOfDays} absolute inset-0 z-10`}
            style={{
              gridTemplateRows: `repeat(${TOTAL_GRID_ROWS}, minmax(0, 1fr))`,
            }}
          >
            {events.map((event, i) => (
              <EventComponent key={event.id || i} {...event} />
            ))}
          </div>
        </div>
      </div>
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
}

// --- MONTH GRID (for Month View) ---
function MonthGrid({
  events,
  currentDate,
}: {
  events: EventItemProps[];
  currentDate: Date;
}) {
  const startMonth = startOfMonth(currentDate);
  const startDay = startOfWeek(startMonth, { weekStartsOn: 0 });

  return (
    <>
      {/* Day names header */}
      <div className="grid grid-cols-7 border-t border-l">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-center p-2 border-r text-sm font-semibold text-muted-foreground"
          >
            {day}
          </div>
        ))}
      </div>
      {/* Calendar days grid */}
      <div className="grid grid-cols-7 grid-rows-5 flex-1 border-l">
        {Array.from({ length: 35 }).map((_, index) => {
          const currentDay = addDays(startDay, index);
          const isCurrentMonthDay = isSameMonth(currentDay, currentDate);
          const eventsForThisDay = events.filter((event) =>
            isSameDay(event.startTime, currentDay)
          );

          return (
            <div
              key={index}
              className={cn(
                "border-r border-t p-1 flex flex-col gap-1 overflow-hidden",
                isCurrentMonthDay ? "bg-background" : "bg-muted/50"
              )}
            >
              <span
                className={cn(
                  "text-sm",
                  isToday(currentDay) && "font-bold text-primary"
                )}
              >
                {getDate(currentDay)}
              </span>
              <div className="flex flex-col gap-1">
                {eventsForThisDay.map((event) => (
                  <div
                    key={event.id}
                    style={{ backgroundColor: event.color }}
                    className={cn(
                      "p-1 rounded text-white text-xs truncate",
                      event.id.startsWith("optimistic") && "opacity-60"
                    )}
                  >
                    {event.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

// --- UNIFIED CALENDAR GRID COMPONENT ---
export function CalendarGrid({ view, events, currentDate }: CalendarGridProps) {
  if (view === "month") {
    return <MonthGrid events={events} currentDate={currentDate} />;
  }

  // Default to Day or Week view
  const numberOfDays = view === "week" ? 7 : 1;
  return <TimeGrid events={events} numberOfDays={numberOfDays} />;
}
