"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import AdminOverview from "@/components/admin/admin-overview"
import AdminUsers from "@/components/admin/admin-users"
import AdminStats from "@/components/admin/admin-stats"
import AdminSettings from "@/components/admin/admin-settings"

export default function AdminPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const page = searchParams.get("page") || "overview"

  const renderPage = () => {
    switch (page) {
      case "overview":
        return <AdminOverview />
      case "users":
        return <AdminUsers />
      case "stats":
        return <AdminStats />
      case "settings":
        return <AdminSettings />
      default:
        return <AdminOverview />
    }
  }

  return renderPage()
}
