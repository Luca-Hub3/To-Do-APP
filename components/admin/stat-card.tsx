"use client"

interface StatCardProps {
  label: string
  value: string
  change: string
  changeType: "positive" | "negative"
  icon: string
}

export default function StatCard({ label, value, change, changeType, icon }: StatCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{label}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          <p
            className={`text-xs mt-2 ${changeType === "positive" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
          >
            {change} da ieri
          </p>
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
    </div>
  )
}
