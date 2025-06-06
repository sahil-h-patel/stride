"use client"

import Link from "next/link";
import Image from "next/image";
import CalendarViewSelect from "@/components/calendar-view-select";
import CreateMenu from "@/components/create-menu";
import SearchBar from "@/components/search-bar";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { User, Calendar, List, Settings } from "lucide-react";
import { usePathname } from "next/navigation";

const handleSearch = (query: string) => {
    console.log("Search query:", query)
    // Do something with the query: fetch data, filter list, etc.
  }

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const pathname = usePathname();
  return ( 
         <div>
            <div className="flex flex-row justify-between border-b h-[7vh]">
                <div className="flex items-center ml-6">
                    <Image src="/logo.png" alt="Logo" width={30} height={30} />
                </div>
                <div className="flex items-center space-x-4">
                    <CreateMenu></CreateMenu>
                    <SearchBar width={400} searchAction={handleSearch} />
{                   pathname !== "/dashboard/tasks" && <CalendarViewSelect />}               
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
                                <Link href="/dashboard/calendar">Calendar</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <List/>
                                <Link href="/dashboard/tasks">Tasks</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Settings/>
                                Settings
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div className="flex flex-row h-[93vh]">
                <div className="border-accent mt-2 border-r-1 w-[3vw]">
                    <div className="flex flex-col gap-2 ml-0.5">
                        <Link className="p-2 w-max rounded-full hover:bg-accent items-center" href="/dashboard/tasks"><List className=""/></Link>
                        <Link className="p-2 w-max rounded-full hover:bg-accent items-center" href="/dashboard/calendar"><Calendar/></Link>
                    </div>
                </div>
                {children}
            </div>    
        </div>
  );
}