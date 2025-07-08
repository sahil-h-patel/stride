import { useSearchParams, useLoaderData } from "react-router";
import { type LoaderFunctionArgs } from "react-router";
import { startOfDay, endOfDay, format, isToday } from 'date-fns';
import { cn } from '~/lib/utils';
import { requireUserId } from '~/lib/auth.server';
import { prisma } from '~/lib/prisma';
import { CalendarGrid } from "~/components/calendar-grid";
import { useOptimisticEvents } from "~/hooks/use-optimistic-events";

// --- LOADER ---
export async function loader({ request }: LoaderFunctionArgs) {
    const userId = await requireUserId(request);
    
    const url = new URL(request.url);
    const dateParam = url.searchParams.get('date');
    const currentDate = dateParam ? new Date(dateParam) : new Date();

    const dayStartDate = startOfDay(currentDate);
    const dayEndDate = endOfDay(currentDate);

    const events = await prisma.event.findMany({
        where: {
            userId: userId,
            startTime: { lt: dayEndDate },
            endTime: { gte: dayStartDate },
        },
        select: {
            id: true,
            title: true,
            startTime: true,
            endTime: true,
            color: true,
        }
    });

    return { events };
}

// --- HEADER COMPONENT ---
function DayHeader({ date }: { date: Date }) {
    return (
        <div className="flex pl-12 sticky top-14 bg-background/95 backdrop-blur z-20">
            <div className="flex-1 text-center p-2 border-l">
                <div className="text-xs font-semibold uppercase text-muted-foreground">{format(date, "eeee")}</div>
                <div className={cn("text-2xl font-bold", isToday(date) && "text-primary")}>
                    {format(date, "d")}
                </div>
            </div>
        </div>
    );
}

// --- MAIN COMPONENT ---
export default function DayView() {
    const { events } = useLoaderData<typeof loader>();

    const [searchParams] = useSearchParams();
    const currentDate = new Date(searchParams.get('date') || new Date());
    const optimisticEvents = useOptimisticEvents()

    const allEvents = [...events, ...optimisticEvents];

    return (
      <div className="flex flex-col w-full h-full">
            <DayHeader date={currentDate} />
            <CalendarGrid 
                view="day" 
                events={allEvents} 
                currentDate={currentDate} 
            />
        </div>
    );
}

