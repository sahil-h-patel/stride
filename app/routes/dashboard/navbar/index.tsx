import { Link, useLocation } from "@remix-run/react";
import CreateMenu from "./create-menu";
import SearchBar from "./search-bar";
import CalendarViewSelect from "./calendar-view-select";
import { 
    DropdownMenu, 
    DropdownMenuTrigger, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuLabel, 
    DropdownMenuSeparator } from "~/components/ui/dropdown-menu";
import { Calendar, List, Settings, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

const handleSearch = (query: string) => {
    console.log("Search query:", query)
    // Do something with the query: fetch data, filter list, etc.
}

function Navbar() {
    const location = useLocation();

    return (
    <div className="flex flex-row justify-between border-b h-[7vh]">
        <div className="flex items-center ml-6">
            <img src="/logo.png" alt="Logo" width={30} height={30} />
        </div>
        <div className="flex items-center space-x-4">
            <CreateMenu></CreateMenu>
            <SearchBar width={400} searchAction={handleSearch} />
{                   location.pathname !== "/dashboard/tasks" && <CalendarViewSelect />}               
        </div>
        <div className="flex items-center mr-6">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"/>
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>            
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <User/>
                        Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled>
                        <Calendar/>
                        <Link to="/dashboard/calendar">Calendar</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <List/>
                        <Link to="/dashboard/tasks">Tasks</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Settings/>
                        Settings
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </div>
    );
}

export default Navbar;