import { type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import DayView from "./day-view";
import WeekView from "./week-view";
import MonthView from "./month-view";

const viewComponents = {
  day: DayView,
  week: WeekView,
  month: MonthView,
};

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  let view = url.searchParams.get("view") as keyof typeof viewComponents;
  if (!view || !Object.keys(viewComponents).includes(view)) {
    view = "month";
  }
  return { view };
}


export default function CalendarView(){
    const { view } = useLoaderData<typeof loader>(); // Destructure view from loader data
    const CalendarComponent = viewComponents[view];
    return <CalendarComponent />;
}