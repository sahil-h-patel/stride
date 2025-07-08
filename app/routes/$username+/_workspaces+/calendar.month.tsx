import { useSearchParams, useLoaderData } from "react-router";
import { type LoaderFunctionArgs } from "react-router";
import { format, startOfMonth, endOfMonth } from 'date-fns';
import { requireUserId } from '~/lib/auth.server';
import { prisma } from '~/lib/prisma';
import { CalendarGrid } from "~/components/calendar-grid";
import { useOptimisticEvents } from "~/hooks/use-optimistic-events";

export async function loader({ request }: LoaderFunctionArgs) {
    const userId = await requireUserId(request);
    
    const url = new URL(request.url);
    const dateParam = url.searchParams.get('date');
    const currentDate = dateParam ? new Date(dateParam) : new Date();

    const monthStartDate = startOfMonth(currentDate);
    const monthEndDate = endOfMonth(currentDate);

    const events = await prisma.event.findMany({
        where: {
            userId: userId,
            startTime: { lt: monthEndDate },
            endTime: { gte: monthStartDate },
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

// --- MAIN COMPONENT ---
export default function MonthView() {
    const { events } = useLoaderData<typeof loader>();
    const [searchParams] = useSearchParams();

    const currentDate = new Date(searchParams.get('date') || new Date());
    const optimisticEvents = useOptimisticEvents()

    const allEvents = [...events, ...optimisticEvents];

    return (
        <div className="flex flex-col w-full h-full">
           <div className="flex mx-auto text-center p-2">
                <div className="text-2xl font-bold">{format(currentDate, 'MMMM yyyy')}</div>
            </div>
           <CalendarGrid view='month' events={allEvents} currentDate={currentDate}></CalendarGrid>
        </div>
    );
}
