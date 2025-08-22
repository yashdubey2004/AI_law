import { useState } from "react"
import { useLocation } from "react-router-dom"
import { Header } from "./Header"
import { Sidebar } from "./Sidebar"
import { Footer } from "./Footer"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  // Don't show sidebar on public pages
  const isPublicPage = ["/", "/login", "/signup"].includes(location.pathname)
  const showFooter = location.pathname === "/"

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header onMenuClick={() => setSidebarOpen(true)} />
      
      <div className="flex flex-1">
        {!isPublicPage && (
          <Sidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />
        )}
        
        <main className="flex-1 flex flex-col">
          {children}
        </main>
      </div>

      {showFooter && <Footer />}
    </div>
  )
}