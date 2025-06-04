// app/dashboard/calendar/page.tsx
import { Suspense } from "react";
import { DayView, MonthView, WeekView } from "@/components/calendar-view";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// Server component that handles async searchParams
export default async function Dashboard({ 
  searchParams 
}: { 
  searchParams: Promise<{ view?: string }> 
}) {
  const params = await searchParams;
  const view = params.view || "week";

  return (
    <Suspense fallback={<div>Loading calendar view...</div>}>
      {view === "month" && <MonthView />}
      {view === "week" && <WeekView />}
      {view === "day" && <DayView />}
    </Suspense>
  );
}