"use client"

import Image from "next/image"
import SearchBar from "@/components/search-bar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import SegmentedSelect from "@/components/segmented-select"
import DynamicCalendar from "@/components/dynamic-calendar"
import CreateMenu from "@/components/create-menu"
const handleSearch = (query: string) => {
    console.log("Search query:", query)
    // Do something with the query: fetch data, filter list, etc.
  }

export default function Dashboard() {
    return (
        <div>
            <div className="flex flex-row justify-between border-b h-[7vh]">
                <div className="flex items-center ml-6">
                    <Image src="/logo.png" alt="Logo" width={30} height={30} />
                </div>
                <div className="flex items-center space-x-4">
                    <CreateMenu></CreateMenu>
                    <SearchBar width={400} searchAction={handleSearch} />
                    <SegmentedSelect/>
                </div>
                <div className="flex items-center mr-6">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"/>
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
            </div>
            <div className="flex flex-row h-[93vh]">
                <DynamicCalendar></DynamicCalendar>
            </div>    
        </div>
    )
}