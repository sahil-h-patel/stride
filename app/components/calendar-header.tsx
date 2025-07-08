import { Link, useLocation, useSearchParams } from "react-router";
import { Button } from "~/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format, addMonths, subMonths, addDays, subDays, addWeeks, subWeeks } from 'date-fns';

export function CalendarHeader() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const currentView = location.pathname.split('/').pop() || 'week';
  const currentDate = new Date(searchParams.get('date') || new Date());

  // FIX: This dynamically creates the base path for your links, e.g., "/username/calendar"
  const basePath = location.pathname.substring(0, location.pathname.lastIndexOf('/'));

  const handleDateChange = (newDate: Date) => {
    setSearchParams({ date: format(newDate, 'yyyy-MM-dd') }, { replace: true });
  };

  const handlePrev = () => {
    let newDate;
    if (currentView === 'month') newDate = subMonths(currentDate, 1);
    else if (currentView === 'week') newDate = subWeeks(currentDate, 1);
    else newDate = subDays(currentDate, 1);
    handleDateChange(newDate);
  };

  const handleNext = () => {
    let newDate;
    if (currentView === 'month') newDate = addMonths(currentDate, 1);
    else if (currentView === 'week') newDate = addWeeks(currentDate, 1);
    else newDate = addDays(currentDate, 0);
    handleDateChange(newDate);
  };
  
  const handleToday = () => {
    handleDateChange(new Date());
  };

  const title = currentView === 'month' 
    ? format(currentDate, 'MMMM yyyy')
    : format(currentDate, 'MMMM d, yyyy');

  return (
    // This header will stick to the top of the main scrolling container
    <div className="flex items-center justify-between p-2 sticky top-0 bg-background/95 backdrop-blur z-30 border-b">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-bold min-w-[200px]">{title}</h2>
        <Button variant="outline" size="icon" onClick={handlePrev}>
            <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={handleNext}>
            <ChevronRight className="h-4 w-4" />
        </Button>
        <Button variant="outline" onClick={handleToday}>Today</Button>
      </div>

      <div className="flex items-center gap-1 rounded-md bg-muted p-1">
        <Button 
          variant={currentView === 'month' ? 'secondary' : 'ghost'} 
          size="sm" 
          asChild
        >
          {/* FIX: The link now uses the constructed base path */}
          <Link to={`${basePath}/month`} replace prefetch="intent" state={{ from: location.pathname }}>Month</Link>
        </Button>
        <Button 
          variant={currentView === 'week' ? 'secondary' : 'ghost'} 
          size="sm" 
          asChild
        >
          <Link to={`${basePath}/week`} replace prefetch="intent" state={{ from: location.pathname }}>Week</Link>
        </Button>
        <Button 
          variant={currentView === 'day' ? 'secondary' : 'ghost'} 
          size="sm" 
          asChild
        >
          <Link to={`${basePath}/day`} replace prefetch="intent" state={{ from: location.pathname }}>Day</Link>
        </Button>
      </div>
    </div>
  );
}
