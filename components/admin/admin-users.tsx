"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit2, Trash2, CheckCircle, AlertCircle } from "lucide-react"
import UserStatusModal from "./user-status-modal"

interface User {
  id: string
  name: string
  email: string
  lists: number
  registered: string
  status: "active" | "inactive" | "suspended"
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "Marco Rossi",
    email: "marco.rossi@example.com",
    lists: 5,
    registered: "15 Nov 2024",
    status: "active",
  },
  {
    id: "2",
    name: "Giulia Bianchi",
    email: "giulia.bianchi@example.com",
    lists: 3,
    registered: "12 Nov 2024",
    status: "active",
  },
  {
    id: "3",
    name: "Luca Verdi",
    email: "luca.verdi@example.com",
    lists: 8,
    registered: "01 Nov 2024",
    status: "inactive",
  },
  {
    id: "4",
    name: "Sofia Romano",
    email: "sofia.romano@example.com",
    lists: 2,
    registered: "08 Nov 2024",
    status: "active",
  },
  {
    id: "5",
    name: "Antonio Conti",
    email: "antonio.conti@example.com",
    lists: 6,
    registered: "03 Nov 2024",
    status: "suspended",
  },
]

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleEditUser = (user: User) => {
    setSelectedUser(user)
    setIsModalOpen(true)
  }

  const handleStatusChange = (status: "active" | "inactive" | "suspended") => {
    if (selectedUser) {
      setUsers(users.map((u) => (u.id === selectedUser.id ? { ...u, status } : u)))
      setIsModalOpen(false)
      setSelectedUser(null)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
            <CheckCircle className="w-3 h-3" />
            Attivo
          </span>
        )
      case "inactive":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400">
            <AlertCircle className="w-3 h-3" />
            Inattivo
          </span>
        )
      case "suspended":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
            <AlertCircle className="w-3 h-3" />
            Sospeso
          </span>
        )
    }
  }

  return (
    <div className="p-8">
      <Card>
        <CardHeader>
          <CardTitle>Gestione Utenti</CardTitle>
          <CardDescription>Visualizza e modifica lo stato degli utenti</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Nome</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Email</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Liste</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Registrazione</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Stato</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Azioni</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-border hover:bg-sidebar-accent transition-colors">
                    <td className="px-4 py-3 text-foreground font-medium">{user.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{user.email}</td>
                    <td className="px-4 py-3 text-foreground">{user.lists}</td>
                    <td className="px-4 py-3 text-muted-foreground">{user.registered}</td>
                    <td className="px-4 py-3">{getStatusBadge(user.status)}</td>
                    <td className="px-4 py-3 flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEditUser(user)} className="text-xs">
                        <Edit2 className="w-3 h-3 mr-1" />
                        Modifica
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs text-destructive hover:text-destructive bg-transparent"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {selectedUser && (
        <UserStatusModal
          user={selectedUser}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setSelectedUser(null)
          }}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  )
}
