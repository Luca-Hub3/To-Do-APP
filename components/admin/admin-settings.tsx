"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    appName: "TaskHub",
    supportEmail: "support@taskhub.com",
    adminRole: "super-admin",
    maintenanceMode: false,
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = () => {
    console.log("[v0] Settings salvati:", settings)
  }

  return (
    <div className="p-8 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Impostazioni Generali</CardTitle>
          <CardDescription>Configura le impostazioni dell'applicazione</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* App Name */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Nome Applicazione</label>
              <input
                type="text"
                value={settings.appName}
                onChange={(e) => handleInputChange("appName", e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Support Email */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email Supporto</label>
              <input
                type="email"
                value={settings.supportEmail}
                onChange={(e) => handleInputChange("supportEmail", e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Admin Role */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Ruolo Admin</label>
              <select
                value={settings.adminRole}
                onChange={(e) => handleInputChange("adminRole", e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="super-admin">Super Admin</option>
                <option value="admin">Admin</option>
                <option value="moderator">Moderator</option>
              </select>
            </div>

            {/* Maintenance Mode */}
            <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-sidebar-accent">
              <div>
                <label className="block text-sm font-medium text-foreground">Modalità Manutenzione</label>
                <p className="text-xs text-muted-foreground mt-1">
                  Disabilita l'accesso degli utenti durante la manutenzione
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.maintenanceMode}
                onChange={(e) => handleInputChange("maintenanceMode", e.target.checked)}
                className="w-5 h-5 rounded border-border cursor-pointer"
              />
            </div>

            {/* Save Button */}
            <div className="pt-4">
              <Button onClick={handleSave} className="gap-2">
                <Save className="w-4 h-4" />
                Salva Impostazioni
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
