// app/dashboard/calendar/page.tsx
"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { DayView, MonthView, WeekView } from "@/components/calendar-view";

export default function Dashboard() {
  return (
    <Suspense fallback={<div>Loading calendar view...</div>}>
      <View />
    </Suspense>
  );
}

function View() {
  const searchParams = useSearchParams();
  const view = searchParams.get("view") || "week";

  return (
    <>
      {view === "month" && <MonthView />}
      {view === "week" && <WeekView />}
      {view === "day" && <DayView />}
    </>
  );
}
