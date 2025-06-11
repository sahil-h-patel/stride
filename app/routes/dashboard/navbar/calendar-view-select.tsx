import { useSearchParams, useNavigate } from "@remix-run/react";
import { Button } from "~/components/ui/button";

const views = [
  { label: "Month", value: "month" },
  { label: "Week", value: "week" },
  { label: "Day", value: "day" },
];

export default function CalendarViewSelect() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const currentView = searchParams.get("view") || "week";

   const handleViewChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newView = e.currentTarget.value;
    const params = new URLSearchParams(searchParams.toString());
    params.set("view", newView);
    navigate(`?${params.toString()}`, { relative: "path" });
  };


  return (
    <div className="flex border border-muted rounded-md">
      {views.map((view, index) => (
        <Button
          key={view.value}
          value={view.value}
          className={`
            ${index === 0 ? "rounded-r-none" : index === views.length - 1 ? "rounded-l-none" : "rounded-none"}
            bg-background text-foreground ${currentView === view.value ? "bg-primary text-white" : ""}
          `}
          onClick={handleViewChange}
        >
          {view.label}
        </Button>
      ))}
    </div>
  );
}