"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CreateTaskModalProps {
  onClose: () => void
  onSubmit: (task: { title: string; description: string; priority: "Low" | "Medium" | "High"; dueDate: string }) => void
}

export default function CreateTaskModal({ onClose, onSubmit }: CreateTaskModalProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState<"Low" | "Medium" | "High">("Medium")
  const [dueDate, setDueDate] = useState("")

  const handleSubmit = () => {
    if (title.trim()) {
      onSubmit({
        title,
        description,
        priority,
        dueDate,
      })
      setTitle("")
      setDescription("")
      setPriority("Medium")
      setDueDate("")
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-xl shadow-lg w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-border">
          <h2 className="text-lg md:text-xl font-semibold text-foreground">Nuovo Task</h2>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition-colors text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 md:p-6 space-y-3 md:space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Titolo</label>
            <input
              type="text"
              placeholder="Titolo del task..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 md:px-4 py-2 rounded-lg bg-input text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm md:text-base"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Descrizione</label>
            <textarea
              placeholder="Descrizione del task..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-3 md:px-4 py-2 rounded-lg bg-input text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary resize-none text-sm md:text-base"
            />
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Priorità</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as any)}
              className="w-full px-3 md:px-4 py-2 rounded-lg bg-input text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm md:text-base"
            >
              <option value="Low">Bassa</option>
              <option value="Medium">Media</option>
              <option value="High">Alta</option>
            </select>
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Data scadenza</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3 md:px-4 py-2 rounded-lg bg-input text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm md:text-base"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-4 md:p-6 border-t border-border">
          <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent text-sm md:text-base">
            Annulla
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 text-sm md:text-base"
          >
            Crea Task
          </Button>
        </div>
      </div>
    </div>
  )
}
