import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import {
  LayoutDashboard,
  FileText,
  Search,
  Newspaper,
  Settings,
} from "lucide-react"

interface SidebarProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Document Analysis",
    href: "/document-analysis",
    icon: FileText,
  },
  {
    title: "Case Law Search",
    href: "/case-search",
    icon: Search,
  },
  {
    title: "Legal News",
    href: "/legal-news",
    icon: Newspaper,
  },
  {
    title: "Settings",
    href: "/profile",
    icon: Settings,
  },
]

export function Sidebar({ open, onOpenChange }: SidebarProps) {
  const location = useLocation()

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center border-b px-6">
        <h2 className="text-lg font-semibold">Navigation</h2>
      </div>
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-2 py-4">
          {sidebarItems.map((item) => (
            <Button
              key={item.href}
              variant={location.pathname === item.href ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start",
                location.pathname === item.href && "bg-secondary"
              )}
              asChild
            >
              <Link to={item.href}>
                <item.icon className="mr-2 h-4 w-4" />
                {item.title}
              </Link>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  )

  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="left" className="p-0 w-64">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex h-full w-64 flex-col border-r bg-sidebar">
        <SidebarContent />
      </aside>
    </>
  )
}