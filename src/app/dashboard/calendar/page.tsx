"use client"

import { useSearchParams } from "next/navigation"
import { DayView, MonthView, WeekView } from "@/components/calendar-view"


export default function Dashboard() {
    const searchParams = useSearchParams();
    const view = searchParams.get('view') || 'week';
    return (
        <>
            {view === 'month' && <MonthView />}
            {view === 'week' && <WeekView />}
            {view === 'day' && <DayView />}
        </>
    );
}