import { Link, useSearchParams } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

// 1. Define the view options in a configuration array.
// This makes it easy to add or remove views in the future.
const views = [
  { value: "month", label: "Month" },
  { value: "week", label: "Week" },
  { value: "day", label: "Day" },
];

export default function CalendarViewSelect() {
  const [searchParams] = useSearchParams();
  const currentView = searchParams.get("view") || "month";

  return (
    <div className="flex border border-muted rounded-md">
       {views.map((option, index) => (
        <Button
          key={option.value}
          asChild
          className={cn(
            "w-24 transition-all duration-200",
            index===0 ? "rounded-r-none" : index === views.length - 1 ? "rounded-l-none" : "rounded-none",
            currentView === option.value
              ? "bg-primary text-white shadow-sm" // Active style
              : "bg-transparent text-white hover:bg-white/10" // Inactive style
          )}
        >
          <Link
            to={`/dashboard/calendar?view=${option.value}`}
            // The `prefetch="intent"` prop will preload the data on hover for a faster user experience.
            prefetch="intent"
          >
            {option.label}
          </Link>
        </Button>
      ))}
    </div>
  );
}
