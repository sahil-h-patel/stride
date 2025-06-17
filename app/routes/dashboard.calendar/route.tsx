import { type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { DayView, MonthView, WeekView } from "~/routes/dashboard/navbar/calendar-view-select/views";

const viewComponents = {
  day: DayView,
  week: WeekView,
  month: MonthView,
};

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const view = url.searchParams.get("view") as keyof typeof viewComponents;
  return { view };
}


export default function CalendarView(){
    const { view } = useLoaderData<typeof loader>(); // Destructure view from loader data
    const CalendarComponent = viewComponents[view];
    return <CalendarComponent />;
}