"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAdminAuth } from "@/hooks/use-admin-auth"

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { isAuthenticated, isLoading } = useAdminAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || isLoading) return

    const isLoginPage = pathname === "/admin/login"

    if (!isAuthenticated && !isLoginPage && pathname.startsWith("/admin")) {
      router.push("/admin/login")
    }
  }, [isAuthenticated, isLoading, pathname, mounted, router])

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

  return <>{children}</>
}
