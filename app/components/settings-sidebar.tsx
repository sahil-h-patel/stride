"use client"
import { Calendar, List, Settings, LogOut } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar"
import SearchBar from "./search-bar"

// Menu items.
const items = [
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Tasks",
    url: "#",
    icon: List,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
  {
    title: "Logout",
    url: "#",
    icon: LogOut,
  },
]

const handleSearch = (query: string) => {
    console.log("Search query:", query)
    // Do something with the query: fetch data, filter list, etc.
  }

export default function SettingsSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Stride</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SearchBar width={100} searchAction={handleSearch}/>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
