"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAdminAuth } from "@/hooks/use-admin-auth"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AdminLoginPage() {
  const router = useRouter()
  const { login } = useAdminAuth()
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const success = login(password)

      if (success) {
        // Wait a bit for state to sync across all hook instances
        await new Promise((resolve) => setTimeout(resolve, 150))
        router.push("/admin/overview")
        router.refresh() // Force refresh to ensure layout picks up the auth state
      } else {
        setError("Password non corretta. Prova con: admin123")
        setIsLoading(false)
      }
    } catch (err) {
      setError("Errore durante il login. Riprova.")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md px-6">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold text-foreground mb-2">Admin Panel</h1>
          <p className="text-sm text-muted-foreground">Accedi al pannello amministrativo</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Password Input */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-foreground">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Inserisci password admin"
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* Hint */}
          <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
            <p className="text-xs text-blue-600 dark:text-blue-400">
              Password di demo: <strong>admin123</strong>
            </p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition-colors"
          >
            {isLoading ? "Accesso in corso..." : "Accedi"}
          </Button>
        </form>

        {/* Back Link */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-blue-500 hover:text-blue-600 transition-colors">
            Torna alla home
          </Link>
        </div>
      </div>
    </div>
  )
}
