"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import TaskItem from "./task-item"

interface Task {
  id: string
  title: string
  description: string
  priority: "Low" | "Medium" | "High"
  completed: boolean
  dueDate?: string
  list: string
}

interface TaskBoardProps {
  listName: string
  tasks: Task[]
  onTasksChange: (tasks: Task[]) => void
  onAddTask: () => void
  onDeleteTask: (id: string) => void // Added onDeleteTask prop
}

export default function TaskBoard({ listName, tasks, onTasksChange, onAddTask, onDeleteTask }: TaskBoardProps) {
  const [draggedId, setDraggedId] = useState<string | null>(null)

  const toggleTask = (id: string) => {
    const updatedTasks = tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
    onTasksChange(updatedTasks)
  }

  const handleDragStart = (id: string) => {
    setDraggedId(id)
  }

  const handleDragEnd = () => {
    setDraggedId(null)
  }

  const incompleteTasks = tasks.filter((t) => !t.completed && t.list === listName)
  const completedTasks = tasks.filter((t) => t.completed && t.list === listName)

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl">
      {/* Incomplete Tasks */}
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h2 className="text-base md:text-lg font-semibold text-foreground">
            Da fare
            <span className="ml-2 text-xs md:text-sm font-normal text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
              {incompleteTasks.length}
            </span>
          </h2>
        </div>

        <div className="space-y-2 md:space-y-3">
          {incompleteTasks.map((task, index) => (
            <div
              key={task.id}
              draggable
              onDragStart={() => handleDragStart(task.id)}
              onDragEnd={handleDragEnd}
              className={`${draggedId === task.id ? "opacity-50 scale-95" : ""} transition-all duration-200`}
              style={{
                animation: `fadeInUp 0.3s ease-out ${index * 0.05}s both`,
              }}
            >
              <TaskItem task={task} onToggle={() => toggleTask(task.id)} onDelete={() => onDeleteTask(task.id)} />
            </div>
          ))}
        </div>

        <Button
          onClick={onAddTask}
          variant="ghost"
          className="w-full mt-4 text-primary hover:bg-primary/10 hover:shadow-md hover:scale-[1.01] justify-start transition-all duration-200 border-2 border-dashed border-border hover:border-primary/50 text-sm md:text-base"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nuovo task
        </Button>
      </div>

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div className="mt-8 md:mt-12 space-y-4">
          <h2 className="text-base md:text-lg font-semibold text-foreground">
            Completati
            <span className="ml-2 text-xs md:text-sm font-normal text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
              {completedTasks.length}
            </span>
          </h2>

          <div className="space-y-2 md:space-y-3">
            {completedTasks.map((task, index) => (
              <div
                key={task.id}
                draggable
                onDragStart={() => handleDragStart(task.id)}
                onDragEnd={handleDragEnd}
                className={`${draggedId === task.id ? "opacity-50 scale-95" : ""} transition-all duration-200`}
                style={{
                  animation: `fadeInUp 0.3s ease-out ${index * 0.05}s both`,
                }}
              >
                <TaskItem task={task} onToggle={() => toggleTask(task.id)} onDelete={() => onDeleteTask(task.id)} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
