import { useSearchParams, LoaderFunctionArgs, useLoaderData } from 'react-router';
import { startOfWeek, addDays, format, isToday, endOfWeek } from 'date-fns';
import { cn } from '~/lib/utils';
import { requireUserId } from '~/lib/auth.server';
import { prisma } from '~/lib/prisma';
import { CalendarGrid } from '~/components/calendar-grid';
import { useOptimisticEvents } from '~/hooks/use-optimistic-events';

export async function loader({ request }: LoaderFunctionArgs) {
    const userId = await requireUserId(request);
    const url = new URL(request.url);
    const dateParam = url.searchParams.get('date');
    const currentDate = dateParam ? new Date(dateParam) : new Date();

    // 2. Calculate the start and end of the week on the server
    const weekStartDate = startOfWeek(currentDate, { weekStartsOn: 0 });
    const weekEndDate = endOfWeek(currentDate, { weekStartsOn: 0 });

    // 3. Fetch only the events that fall within that week
    const events = await prisma.event.findMany({
        where: {
            userId: userId,
            startTime: { lt: weekEndDate },
            endTime: { gte: weekStartDate },
        },
        select: {
            id: true,
            title: true,
            startTime: true,
            endTime: true,
            color: true
        }
    });

    return {events}
}


function WeekHeader({ startDate }: { startDate: Date }) {
    return (
        // This header sticks below the main CalendarHeader (top-14 assumes a 56px header height)
        <div className="flex sticky top-14 bg-background/95 backdrop-blur z-20">
            <div className="w-12 shrink-0 border-r" /> {/* Spacer for time column */}
            {Array.from({ length: 7 }).map((_, index) => {
                const currentDay = addDays(startDate, index);
                const today = isToday(currentDay);
                return (
                    <div key={index} className="flex-1 text-center p-2 border-l">
                        <div className="text-xs font-semibold uppercase text-muted-foreground">{format(currentDay, "eee")}</div>
                        <div className={cn("text-2xl font-bold", today && "text-primary")}>
                            {format(currentDay, "d")}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default function WeekView() {
    const {events} = useLoaderData<typeof loader>();
    const [searchParams] = useSearchParams();
    const currentDate = new Date(searchParams.get('date') || new Date());
    const weekStartDate = startOfWeek(currentDate, { weekStartsOn: 0 }); 
    const optimisticEvents = useOptimisticEvents()

    const allEvents = [...events, ...optimisticEvents];
    
    return (
        <div className="flex flex-col w-full h-full">
            <WeekHeader startDate={weekStartDate} />
            <CalendarGrid view='week' events={allEvents} currentDate={currentDate}/>
        </div>
    );
}
