import { Button } from "@/components/ui/button";

type CalendarViewSelectorProps = {
  selected: "W" | "M" | "D";
  onSelect: (view: "W" | "M" | "D") => void;
};

export default function CalendarViewSelect({selected, onSelect}: CalendarViewSelectorProps) {

  return (
    <div className="flex border border-muted rounded-md">
      <Button
        className={`rounded-r-none bg-background ${selected === "M" ? "bg-primary text-white" : ""}`}
        onClick={() => onSelect("M")}
      >
        Month
      </Button>
      <Button
        className={`rounded-none bg-background ${selected === "W" ? "bg-primary text-white" : ""}`}
        onClick={() => onSelect("W")}
      >
        Week
      </Button>
      <Button
        className={`rounded-l-none bg-background ${selected === "D" ? "bg-primary text-white" : ""}`}
        onClick={() => onSelect("D")}
      >
        Day
      </Button>
    </div>
  );
}
