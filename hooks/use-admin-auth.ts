"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"

export function useAdminAuth() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const checkAuth = useCallback(() => {
    if (typeof window !== "undefined") {
      const adminToken = localStorage.getItem("admin_token")
      setIsAuthenticated(!!adminToken)
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    checkAuth()

    // Listen for storage changes (from other tabs/windows)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "admin_token") {
        checkAuth()
      }
    }

    // Listen for custom storage events (from same window)
    const handleCustomStorageChange = () => {
      checkAuth()
    }

    window.addEventListener("storage", handleStorageChange)
    window.addEventListener("adminAuthChange", handleCustomStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("adminAuthChange", handleCustomStorageChange)
    }
  }, [checkAuth])

  const login = (password: string) => {
    if (password === "admin123") {
      const token = "authenticated_" + Date.now()
      localStorage.setItem("admin_token", token)
      setIsAuthenticated(true)
      setIsLoading(false)
      // Dispatch custom event to notify other instances
      window.dispatchEvent(new Event("adminAuthChange"))
      return true
    }
    return false
  }

  const logout = () => {
    localStorage.removeItem("admin_token")
    setIsAuthenticated(false)
    window.dispatchEvent(new Event("adminAuthChange"))
    router.push("/admin/login")
  }

  return { isAuthenticated, isLoading, login, logout }
}
