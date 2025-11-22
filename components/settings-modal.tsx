"use client"

import { X, Moon, Sun, Bell, BellOff, Trash2, Download, User, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface SettingsModalProps {
  onClose: () => void
  theme: "light" | "dark"
  onToggleTheme: () => void
  onClearAllTasks: () => void
  notifications: boolean
  onToggleNotifications: (enabled: boolean) => void
  onExportTasks: () => void
}

export default function SettingsModal({
  onClose,
  theme,
  onToggleTheme,
  onClearAllTasks,
  notifications,
  onToggleNotifications,
  onExportTasks,
}: SettingsModalProps) {
  const [userName, setUserName] = useState(
    typeof window !== "undefined" ? localStorage.getItem("userName") || "Utente" : "Utente",
  )
  const [isSaved, setIsSaved] = useState(false)

  const handleSaveUserName = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("userName", userName)
      setIsSaved(true)
      setTimeout(() => setIsSaved(false), 2000)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-background rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden border border-border animate-slideUp">
        {/* Header */}
        <div className="p-6 border-b border-border flex items-center justify-between bg-gradient-to-r from-sidebar-primary/10 to-transparent">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Impostazioni</h2>
            <p className="text-sm text-muted-foreground mt-1">Personalizza la tua esperienza TaskHub</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-sidebar-accent rounded-lg transition-all duration-200 hover:rotate-90"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-auto max-h-[calc(90vh-180px)]">
          {/* Profile Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-foreground font-semibold">
              <User className="w-5 h-5 text-sidebar-primary" />
              <h3>Profilo</h3>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Nome utente</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-lg bg-sidebar-accent border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-sidebar-primary transition-all duration-200"
                  placeholder="Il tuo nome"
                />
                <Button
                  onClick={handleSaveUserName}
                  className={`transition-all duration-200 ${
                    isSaved ? "bg-green-500 hover:bg-green-600" : "bg-sidebar-primary hover:bg-sidebar-primary/90"
                  } text-white`}
                >
                  {isSaved ? (
                    <>
                      <Check className="w-4 h-4 mr-1" />
                      Salvato
                    </>
                  ) : (
                    "Salva"
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Appearance Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-foreground font-semibold">
              {theme === "dark" ? (
                <Moon className="w-5 h-5 text-sidebar-primary" />
              ) : (
                <Sun className="w-5 h-5 text-sidebar-primary" />
              )}
              <h3>Aspetto</h3>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-sidebar-accent border border-border hover:border-sidebar-primary transition-all duration-200">
              <div>
                <p className="font-medium text-foreground">Tema</p>
                <p className="text-sm text-muted-foreground">Scegli tra tema chiaro e scuro</p>
              </div>
              <button
                onClick={onToggleTheme}
                className="relative w-14 h-8 rounded-full bg-sidebar-primary transition-all duration-200 hover:shadow-lg"
              >
                <div
                  className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow-md transition-transform duration-200 flex items-center justify-center ${
                    theme === "dark" ? "translate-x-6" : ""
                  }`}
                >
                  {theme === "dark" ? <Moon className="w-3 h-3" /> : <Sun className="w-3 h-3" />}
                </div>
              </button>
            </div>
          </div>

          {/* Notifications Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-foreground font-semibold">
              <Bell className="w-5 h-5 text-sidebar-primary" />
              <h3>Notifiche</h3>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-sidebar-accent border border-border hover:border-sidebar-primary transition-all duration-200">
              <div>
                <p className="font-medium text-foreground">Notifiche desktop</p>
                <p className="text-sm text-muted-foreground">Ricevi notifiche per task in scadenza</p>
              </div>
              <button
                onClick={() => onToggleNotifications(!notifications)}
                className={`relative w-14 h-8 rounded-full transition-all duration-200 hover:shadow-lg ${
                  notifications ? "bg-sidebar-primary" : "bg-muted"
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow-md transition-transform duration-200 flex items-center justify-center ${
                    notifications ? "translate-x-6" : ""
                  }`}
                >
                  {notifications ? <Bell className="w-3 h-3" /> : <BellOff className="w-3 h-3" />}
                </div>
              </button>
            </div>
          </div>

          {/* Data Management Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-foreground font-semibold">
              <Download className="w-5 h-5 text-sidebar-primary" />
              <h3>Gestione dati</h3>
            </div>
            <div className="space-y-2">
              <button
                onClick={onExportTasks}
                className="w-full flex items-center justify-between p-4 rounded-lg bg-sidebar-accent border border-border hover:border-sidebar-primary hover:bg-sidebar-accent/80 transition-all duration-200 group"
              >
                <div className="text-left">
                  <p className="font-medium text-foreground">Esporta tasks</p>
                  <p className="text-sm text-muted-foreground">Scarica backup dei tuoi tasks</p>
                </div>
                <Download className="w-5 h-5 text-muted-foreground group-hover:text-sidebar-primary transition-colors" />
              </button>

              <button
                onClick={() => {
                  if (confirm("Sei sicuro di voler eliminare tutti i tasks? Questa azione è irreversibile.")) {
                    onClearAllTasks()
                  }
                }}
                className="w-full flex items-center justify-between p-4 rounded-lg bg-red-500/10 border border-red-500/20 hover:border-red-500 hover:bg-red-500/20 transition-all duration-200 group"
              >
                <div className="text-left">
                  <p className="font-medium text-red-600 dark:text-red-400">Elimina tutti i tasks</p>
                  <p className="text-sm text-red-600/70 dark:text-red-400/70">Rimuovi tutti i tasks definitivamente</p>
                </div>
                <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>

          {/* App Info */}
          <div className="pt-4 border-t border-border">
            <div className="text-center text-sm text-muted-foreground space-y-1">
              <p className="font-medium">TaskHub v1.0.0</p>
              <p>Made with ❤️ by Luca</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border bg-sidebar-accent/50">
          <Button
            onClick={onClose}
            className="w-full bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
          >
            Chiudi
          </Button>
        </div>
      </div>
    </div>
  )
}
