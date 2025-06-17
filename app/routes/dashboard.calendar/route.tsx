import { type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { DayView, MonthView, WeekView } from "~/routes/dashboard/navbar/calendar-view-select/view";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const view = url.searchParams.get("view") || "week";
  return view
}

export default function CalendarView(){
    const view = useLoaderData<typeof loader>(); // Infer type from loader

    return (
        <>
          {view === "month" && <MonthView />}
          {view === "week" && <WeekView />}
          {view === "day" && <DayView />}
        </>
    )
}