"use client"

import { Bell, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAdminAuth } from "@/hooks/use-admin-auth"
import { useRouter } from "next/navigation"

export default function AdminNavbar() {
  const router = useRouter()
  const { logout } = useAdminAuth()

  const handleLogout = () => {
    logout()
    router.push("/admin/login")
  }

  return (
    <div className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
      <h1 className="text-xl font-semibold text-foreground">Dashboard Amministratore</h1>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Bell className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <User className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-destructive hover:text-destructive"
          onClick={handleLogout}
          title="Logout"
        >
          <LogOut className="w-5 h-5" />
        </Button>
      </div>
    </div>
  )
}
