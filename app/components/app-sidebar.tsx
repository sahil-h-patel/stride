import { Calendar, SquareCheckBig, MessageCircle, Settings, ListPlus, CalendarPlus, PanelLeftClose, User as UserIcon, LogOut, Plus } from "lucide-react"
import { Form, Link, useOutletContext } from "react-router";

import {
  Sidebar,
  SidebarHeader,
  SidebarTrigger,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
  SidebarFooter,
} from "~/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { User } from "@prisma/client";
// Menu items.
const app_items = [
  {
    title: "Calendar",
    url: "/calendar",
    icon: Calendar,
  },
  {
    title: "Tasks",
    url: "/tasks",
    icon: SquareCheckBig,
  },
  {
    title: "Chat",
    url: "/chat",
    icon: MessageCircle,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]


export function AppSidebar() {
  const { open } = useSidebar();
  const user = useOutletContext<User>();
  console.log(user)
  return (
    <Sidebar collapsible="icon">
        <SidebarHeader className="flex flex-row items-center justify-between p-2">
            <span className="text-lg font-semibold group-data-[collapsible=icon]:hidden">
                Stride
            </span>
            <SidebarTrigger>
                {open ? <PanelLeftClose className="size-5" /> : <img alt="Logo" src="/logo.png" className="size-5" />}
            </SidebarTrigger> 
        </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
            <SidebarGroupContent>
                <SidebarMenu>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Create"> 
                            <Plus className="size-5" ></Plus>
                            <span>Create</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-auto mb-2" align="end" forceMount>
                      <DropdownMenuGroup>
                        <DropdownMenuItem>
                          <Link to={`/${user.username}/event/new`} className="flex flex-row items-center">                      
                            <CalendarPlus className="mr-2 h-4 w-4" />
                            <span>New Event</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link to={`/${user.username}/task/new`} className="flex flex-row items-center">                      
                            <ListPlus className="mr-2 h-4 w-4" />
                            <span>New Task</span>
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>                    
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator></SidebarSeparator>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {app_items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link to={`/${user.username}${item.url}`}>                      
                      <item.icon className="size-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {/* Add SidebarGroup for folder hierarchy for tasks and deselecting and selecting calendar*/}
        <SidebarFooter>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton tooltip={user.username} className="mt-auto group-data-[collapsible=icon]:justify-center">
                <Avatar className="size-5">
                    {/* Using a placeholder avatar service */}
                    <AvatarImage src={`https://avatar.vercel.sh/${user.username}.png`} alt={user.username} />
                    <AvatarFallback>{user.username?.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="group-data-[collapsible=icon]:hidden">{user.username}</span>
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-auto mb-2" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.username}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <UserIcon className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              {/* Use a Remix Form for the logout action */}
              <Form action="/logout" method="post">
                <DropdownMenuItem asChild>
                    <button type="submit" className="w-full">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                    </button>
                </DropdownMenuItem>
              </Form>
            </DropdownMenuContent>
          </DropdownMenu>
      </SidebarFooter>
      </SidebarContent>
    </Sidebar>    
  )
}
