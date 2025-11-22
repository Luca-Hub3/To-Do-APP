"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import AdminSidebar from "@/components/admin/admin-sidebar"
import AdminNavbar from "@/components/admin/admin-navbar"
import { useAdminAuth } from "@/hooks/use-admin-auth"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { isAuthenticated, isLoading } = useAdminAuth()
  const [currentPage, setCurrentPage] = useState("overview")
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || isLoading) return

    const isLoginPage = pathname === "/admin/login"

    if (!isAuthenticated && !isLoginPage) {
      router.push("/admin/login")
      return
    }
  }, [isAuthenticated, isLoading, pathname, mounted, router])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setTheme(isDark ? "dark" : "light")
    }
  }, [])

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [theme])

  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-8 h-8 rounded-full border-4 border-blue-200 border-t-blue-500 animate-spin mx-auto mb-2"></div>
          <p className="text-sm text-muted-foreground">Caricamento...</p>
        </div>
      </div>
    )
  }

  const isLoginPage = pathname === "/admin/login"
  if (isLoginPage) {
    return <>{children}</>
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-8 h-8 rounded-full border-4 border-blue-200 border-t-blue-500 animate-spin mx-auto mb-2"></div>
          <p className="text-sm text-muted-foreground">Reindirizzamento...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminNavbar />
        <main className="flex-1 overflow-auto text-foreground">{children}</main>
      </div>
    </div>
  )
}
