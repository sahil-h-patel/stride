import { Link, Outlet } from "@remix-run/react";
import { Calendar, List } from "lucide-react";
import Navbar from "./navbar";

export default function DashboardLayout() {
  return ( 
         <div> 
            <Navbar/>
            <div className="flex flex-row h-[93vh]">
                <div className="border-accent mt-2 border-r-1 w-[3vw]">
                    <div className="flex flex-col gap-2 ml-0.5">
                        <Link className="p-2 w-max rounded-full hover:bg-accent items-center" to="/dashboard/tasks"><List className=""/></Link>
                        <Link className="p-2 w-max rounded-full hover:bg-accent items-center" to="/dashboard/calendar"><Calendar/></Link>
                    </div>
                </div>
                <Outlet/>
            </div>    
        </div>
  );
}