import { SidebarProvider} from "@/components/ui/sidebar"
import SettingsSidebar from "@/components/settings-sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <SettingsSidebar />
      <main>
        {children}
      </main>
    </SidebarProvider>
  )
}
