import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function SegmentedSelect() {
  const [selected, setSelected] = useState<string>("Month");

  const handleClick = (option: string) => {
    setSelected(option);
  };

  return (
    <div className="flex border border-muted rounded-md">
      <Button
        className={`rounded-r-none bg-background ${selected === "Month" ? "bg-primary text-white" : ""}`}
        onClick={() => handleClick("Month")}
      >
        Month
      </Button>
      <Button
        className={`rounded-none bg-background ${selected === "Week" ? "bg-primary text-white" : ""}`}
        onClick={() => handleClick("Week")}
      >
        Week
      </Button>
      <Button
        className={`rounded-l-none bg-background ${selected === "Day" ? "bg-primary text-white" : ""}`}
        onClick={() => handleClick("Day")}
      >
        Day
      </Button>
    </div>
  );
}
