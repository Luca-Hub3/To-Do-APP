"use client"

import { useState } from "react"
import { Plus, Settings, ListTodo } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  lists: string[]
  selectedList: string
  onSelectList: (list: string) => void
  onAddList: (name: string) => void
  onOpenSettings: () => void
}

export default function Sidebar({ lists, selectedList, onSelectList, onAddList, onOpenSettings }: SidebarProps) {
  const [newListName, setNewListName] = useState("")
  const [isCreating, setIsCreating] = useState(false)

  const handleAddList = () => {
    if (newListName.trim()) {
      onAddList(newListName)
      setNewListName("")
      setIsCreating(false)
    }
  }

  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center transition-transform hover:scale-110 duration-200">
            <ListTodo className="w-5 h-5 text-sidebar-primary-foreground" />
          </div>
          <span className="font-semibold text-lg text-sidebar-foreground">TaskHub</span>
        </div>
      </div>

      {/* New List Button */}
      <div className="p-4 border-b border-sidebar-border">
        <Button
          onClick={() => setIsCreating(true)}
          className="w-full bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90 hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nuova Lista
        </Button>
      </div>

      {/* Lists */}
      <div className="flex-1 overflow-auto p-4 space-y-2">
        {lists.map((list) => (
          <button
            key={list}
            onClick={() => onSelectList(list)}
            className={`w-full px-4 py-3 rounded-lg text-left transition-all duration-200 ${
              selectedList === list
                ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium shadow-md scale-[1.02]"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:shadow-sm hover:scale-[1.01] hover:translate-x-1"
            }`}
          >
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full bg-current transition-all duration-200 ${selectedList === list ? "opacity-100 animate-pulse" : "opacity-60"}`}
              />
              <span className="text-sm">{list}</span>
            </div>
          </button>
        ))}

        {isCreating && (
          <div className="space-y-2 mt-4 pt-4 border-t border-sidebar-border animate-fadeIn">
            <input
              type="text"
              placeholder="Nome lista..."
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddList()}
              autoFocus
              className="w-full px-3 py-2 rounded bg-sidebar-accent text-sidebar-foreground placeholder-sidebar-foreground/50 text-sm border border-sidebar-border focus:outline-none focus:ring-2 focus:ring-sidebar-primary focus:border-transparent transition-all duration-200"
            />
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={handleAddList}
                className="flex-1 bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90 hover:shadow-md transition-all duration-200"
              >
                Crea
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setIsCreating(false)
                  setNewListName("")
                }}
                className="flex-1 hover:bg-sidebar-accent transition-all duration-200"
              >
                Annulla
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Settings */}
      <div className="p-4 border-t border-sidebar-border">
        <button
          onClick={onOpenSettings}
          className="w-full px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:shadow-sm hover:scale-[1.01] transition-all duration-200 flex items-center gap-2 group"
        >
          <Settings className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
          <span className="text-sm">Impostazioni</span>
        </button>
      </div>
    </div>
  )
}
