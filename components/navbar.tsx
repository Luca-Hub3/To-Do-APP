"use client"

import { Search, Moon, Sun, User, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface NavbarProps {
  selectedList: string
  theme: "light" | "dark"
  onToggleTheme: () => void
  searchQuery: string
  onSearchChange: (query: string) => void
  onToggleMobileSidebar: () => void
}

export default function Navbar({
  selectedList,
  theme,
  onToggleTheme,
  searchQuery,
  onSearchChange,
  onToggleMobileSidebar,
}: NavbarProps) {
  return (
    <nav className="h-16 bg-card border-b border-border flex items-center justify-between px-4 md:px-8">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleMobileSidebar}
          className="lg:hidden text-foreground hover:bg-muted"
        >
          <Menu className="w-5 h-5" />
        </Button>

        {/* Left - List Name */}
        <h1 className="text-lg md:text-xl font-semibold text-foreground truncate">{selectedList}</h1>
      </div>

      {/* Right - Controls */}
      <div className="flex items-center gap-2 md:gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Cerca task..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-lg bg-muted text-foreground placeholder-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-all w-48 lg:w-64"
          />
        </div>

        <Button variant="ghost" size="icon" className="md:hidden text-foreground hover:bg-muted">
          <Search className="w-5 h-5" />
        </Button>

        {/* Theme Toggle */}
        <Button variant="ghost" size="icon" onClick={onToggleTheme} className="text-foreground hover:bg-muted">
          {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
        </Button>

        <Link href="/admin/login" className="hidden sm:block">
          <Button variant="outline" size="sm" className="text-xs bg-transparent">
            Admin
          </Button>
        </Link>

        {/* Avatar */}
        <button className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:opacity-90 transition-opacity">
          <User className="w-5 h-5" />
        </button>
      </div>
    </nav>
  )
}
