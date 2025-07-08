import { Outlet, useLocation } from "react-router";
import { SidebarProvider, useSidebar } from "~/components/ui/sidebar"; 
import { AppSidebar as Sidebar } from "~/components/app-sidebar";
import { cn } from "~/lib/utils"; 
import { CalendarHeader } from "~/components/calendar-header";

// This inner component can access the context from SidebarProvider
function Layout() {
  const location = useLocation();
  const { open, isMobile } = useSidebar();
  const isCalendarRoute = location.pathname.includes('/calendar');
  const gridLayout = !isMobile && open ? "md:grid-cols-[16rem_1fr]" : "md:grid-cols-[3rem_1fr]";

  return (
    <div className={cn("grid min-h-screen w-full transition-[grid-template-columns] duration-200", gridLayout)}>
      <Sidebar/>
      <div className="flex flex-col overflow-hidden">
        <main className="flex flex-1 flex-col overflow-auto">
          {isCalendarRoute && <CalendarHeader />}
          <Outlet/>
        </main>
      </div>
    </div>
  );
}

// The main layout component now wraps the inner component with the provider.
export default function DashboardLayout() {

  return ( 
    <SidebarProvider>
      <Layout />
    </SidebarProvider>
  );
}


