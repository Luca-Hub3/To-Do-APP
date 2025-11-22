"use client"

interface User {
  id: string
  name: string
  email: string
  lists: number
  registered: string
  status: "active" | "inactive" | "suspended"
}

interface UserStatusModalProps {
  user: User
  isOpen: boolean
  onClose: () => void
  onStatusChange: (status: "active" | "inactive" | "suspended") => void
}

export default function UserStatusModal({ user, isOpen, onClose, onStatusChange }: UserStatusModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card border border-border rounded-lg p-6 w-96 shadow-lg">
        <h2 className="text-lg font-bold text-foreground mb-2">Modifica Stato Utente</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Utente: <span className="font-medium">{user.name}</span>
        </p>

        <div className="space-y-3 mb-6">
          {(["active", "inactive", "suspended"] as const).map((status) => (
            <button
              key={status}
              onClick={() => onStatusChange(status)}
              className={`w-full px-4 py-3 rounded-lg border-2 transition-colors text-left font-medium ${
                user.status === status
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-foreground hover:border-primary"
              }`}
            >
              {status === "active" ? "✓ Attivo" : status === "inactive" ? "⊙ Inattivo" : "✕ Sospeso"}
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 rounded-lg border border-border text-foreground hover:bg-sidebar-accent transition-colors font-medium"
          >
            Annulla
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
          >
            Conferma
          </button>
        </div>
      </div>
    </div>
  )
}
