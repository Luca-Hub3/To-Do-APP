"use client"

import { useState, useEffect } from "react"
import Sidebar from "@/components/sidebar"
import Navbar from "@/components/navbar"
import TaskBoard from "@/components/task-board"
import CreateTaskModal from "@/components/create-task-modal"
import SettingsModal from "@/components/settings-modal"

interface Task {
  id: string
  title: string
  description: string
  priority: "Low" | "Medium" | "High"
  completed: boolean
  dueDate?: string
  list: string
}

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Revisione progetto design",
    description: "Controllare la proposta di design del nuovo dashboard",
    priority: "High",
    completed: false,
    dueDate: "2025-11-25",
    list: "Work",
  },
  {
    id: "2",
    title: "Meeting con il team",
    description: "Sync settimanale con il team di prodotto",
    priority: "High",
    completed: false,
    dueDate: "2025-11-22",
    list: "Work",
  },
  {
    id: "3",
    title: "Aggiornare documentazione",
    description: "Aggiornare le docs dell'API REST",
    priority: "Medium",
    completed: false,
    dueDate: "2025-11-28",
    list: "Work",
  },
  {
    id: "4",
    title: "Testing feature nuovo",
    description: "Test completo della nuova feature auth",
    priority: "Medium",
    completed: true,
    dueDate: "2025-11-20",
    list: "Work",
  },
  {
    id: "5",
    title: "Ottimizzare performance",
    description: "Ridurre il bundle size di 20%",
    priority: "Low",
    completed: false,
    dueDate: "2025-12-05",
    list: "Work",
  },
]

export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [selectedList, setSelectedList] = useState("My Tasks")
  const [showModal, setShowModal] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [lists, setLists] = useState<string[]>(["My Tasks", "Work", "Personal"])
  const [tasks, setTasks] = useState<Task[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTasks = localStorage.getItem("tasks")
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks))
      } else {
        // Initialize with mock tasks only if no saved tasks
        setTasks(mockTasks)
        localStorage.setItem("tasks", JSON.stringify(mockTasks))
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined" && tasks.length >= 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks))
    }
  }, [tasks])

  useEffect(() => {
    // Check system preference on mount
    if (typeof window !== "undefined") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setTheme(isDark ? "dark" : "light")
    }
  }, [])

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  const addNewList = (name: string) => {
    if (!lists.includes(name)) {
      setLists([...lists, name])
    }
  }

  const handleAddTask = (newTask: Omit<Task, "id" | "completed" | "list">) => {
    const task: Task = {
      ...newTask,
      id: Date.now().toString(),
      completed: false,
      list: selectedList,
    }
    setTasks([...tasks, task])
    setShowModal(false)
  }

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const handleClearAllTasks = () => {
    setTasks([])
    setShowSettings(false)
  }

  const handleExportTasks = () => {
    const dataStr = JSON.stringify(tasks, null, 2)
    const blob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `taskhub-backup-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesList = task.list === selectedList
    const matchesSearch =
      searchQuery === "" ||
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesList && matchesSearch
  })

  const handleSelectList = (list: string) => {
    setSelectedList(list)
    setIsMobileSidebarOpen(false)
  }

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsMobileSidebarOpen(false)} />
      )}

      <div
        className={`fixed lg:static inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out ${
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <Sidebar
          lists={lists}
          selectedList={selectedList}
          onSelectList={handleSelectList}
          onAddList={addNewList}
          onOpenSettings={() => setShowSettings(true)}
        />
      </div>

      <div className="flex flex-col flex-1 min-w-0">
        <Navbar
          selectedList={selectedList}
          theme={theme}
          onToggleTheme={toggleTheme}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        />

        <main className="flex-1 overflow-auto">
          <TaskBoard
            listName={selectedList}
            tasks={filteredTasks}
            onTasksChange={setTasks}
            onAddTask={() => setShowModal(true)}
            onDeleteTask={handleDeleteTask}
          />
        </main>
      </div>

      {showModal && <CreateTaskModal onClose={() => setShowModal(false)} onSubmit={handleAddTask} />}

      {showSettings && (
        <SettingsModal
          onClose={() => setShowSettings(false)}
          theme={theme}
          onToggleTheme={toggleTheme}
          onClearAllTasks={handleClearAllTasks}
          notifications={notifications}
          onToggleNotifications={setNotifications}
          onExportTasks={handleExportTasks}
        />
      )}
    </div>
  )
}
