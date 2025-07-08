import { Link, useLocation } from "react-router";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

interface MultiSelectProps {
  options: string[];
}

export default function MultiSelect({ options }: MultiSelectProps) {
  const location = useLocation();
  const currentView = location.pathname.split('/')[3]
  return (
    <div className="flex border border-muted rounded-md">
       {options.map((option, index) => (
        <Button
          key={option.toLowerCase()}
          asChild
          className={cn(
            "w-24 transition-all duration-200",
            index===0 ? "rounded-r-none" : index === options.length - 1 ? "rounded-l-none" : "rounded-none",
            currentView === option.toLowerCase()
              ? "bg-primary text-white shadow-sm" // Active style
              : "bg-transparent text-white hover:bg-white/10" // Inactive style
          )}
        >
          <Link
            to={`/dashboard/calendar/${option.toLowerCase()}`}
            // The `prefetch="intent"` prop will preload the data on hover for a faster user experience.
            className="flex items-center justify-center h-full w-full"
            prefetch="intent"
          >
            {option}
          </Link>
        </Button>
      ))}
    </div>
  );
}
