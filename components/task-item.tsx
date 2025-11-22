"use client"

import { Check, Calendar, Trash2 } from "lucide-react"
import { Card } from "@/components/ui/card"

interface Task {
  id: string
  title: string
  description: string
  priority: "Low" | "Medium" | "High"
  completed: boolean
  dueDate?: string
  list: string
}

interface TaskItemProps {
  task: Task
  onToggle: () => void
  onDelete: () => void // Added onDelete prop
}

const priorityColors = {
  Low: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Medium: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  High: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
}

export default function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  const formatDate = (date: string) => {
    const d = new Date(date)
    return d.toLocaleDateString("it-IT", { day: "numeric", month: "short" })
  }

  return (
    <Card
      className={`p-3 md:p-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group border-2 ${
        task.completed ? "bg-muted border-border/50" : "bg-card border-border hover:border-primary/30"
      }`}
    >
      <div className="flex items-start gap-3 md:gap-4">
        <button
          onClick={onToggle}
          className={`mt-1 w-5 h-5 md:w-6 md:h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200 flex-shrink-0 hover:scale-110 ${
            task.completed
              ? "bg-primary border-primary text-primary-foreground shadow-md"
              : "border-border hover:border-primary hover:bg-primary/10"
          }`}
        >
          {task.completed && <Check className="w-3 h-3 md:w-4 md:h-4 animate-scaleIn" />}
        </button>

        <div className="flex-1 min-w-0">
          <h3
            className={`font-medium text-sm md:text-base text-foreground transition-all duration-300 ${
              task.completed ? "line-through text-muted-foreground" : "group-hover:text-primary"
            }`}
          >
            {task.title}
          </h3>
          <p
            className={`text-xs md:text-sm mt-1 transition-colors duration-300 ${task.completed ? "text-muted-foreground" : "text-muted-foreground"}`}
          >
            {task.description}
          </p>

          <div className="flex items-center gap-2 mt-2 md:mt-3 flex-wrap">
            <span
              className={`inline-block px-2 md:px-2.5 py-0.5 md:py-1 rounded-full text-xs font-medium transition-all duration-200 hover:scale-105 hover:shadow-md ${priorityColors[task.priority]}`}
            >
              {task.priority}
            </span>
            {task.dueDate && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                <Calendar className="w-3 h-3 md:w-3.5 md:h-3.5" />
                <span>{formatDate(task.dueDate)}</span>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={onDelete}
          className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-200 p-1.5 md:p-2 hover:bg-destructive/10 hover:scale-110 rounded-lg text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </Card>
  )
}
