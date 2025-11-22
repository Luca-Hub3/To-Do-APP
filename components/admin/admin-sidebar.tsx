"use client"

import { LayoutDashboard, Users, BarChart3, Settings, ListTodo } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"

interface AdminSidebarProps {
  currentPage: string
  onNavigate: (page: string) => void
}

export default function AdminSidebar({ currentPage, onNavigate }: AdminSidebarProps) {
  const pathname = usePathname()

  const menuItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard, href: "/admin/overview" },
    { id: "users", label: "Utenti", icon: Users, href: "/admin/users" },
    { id: "stats", label: "Statistiche Task", icon: BarChart3, href: "/admin/stats" },
    { id: "settings", label: "Impostazioni", icon: Settings, href: "/admin/settings" },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
            <ListTodo className="w-5 h-5 text-sidebar-primary-foreground" />
          </div>
          <span className="font-semibold text-lg text-sidebar-foreground">Admin</span>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)
          return (
            <Link href={item.href} key={item.id}>
              <button
                onClick={() => onNavigate(item.id)}
                className={`w-full px-4 py-3 rounded-lg text-left transition-colors flex items-center gap-3 ${
                  active
                    ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
                    : "text-sidebar-foreground hover:bg-sidebar-accent"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm">{item.label}</span>
              </button>
            </Link>
          )
        })}
      </nav>

      {/* Back to App */}
      <div className="p-4 border-t border-sidebar-border">
        <Link href="/">
          <Button variant="outline" className="w-full text-sm bg-transparent">
            Torna all'App
          </Button>
        </Link>
      </div>
    </div>
  )
}
