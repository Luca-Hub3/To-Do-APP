"use client"

import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import StatCard from "./stat-card"

const weeklyData = [
  { day: "Lun", tasks: 12 },
  { day: "Mar", tasks: 19 },
  { day: "Mer", tasks: 15 },
  { day: "Gio", tasks: 25 },
  { day: "Ven", tasks: 22 },
  { day: "Sab", tasks: 8 },
  { day: "Dom", tasks: 5 },
]

const monthlyData = [
  { day: "1", tasks: 8 },
  { day: "2", tasks: 12 },
  { day: "3", tasks: 15 },
  { day: "4", tasks: 11 },
  { day: "5", tasks: 18 },
  { day: "6", tasks: 22 },
  { day: "7", tasks: 19 },
  { day: "8", tasks: 25 },
  { day: "9", tasks: 28 },
  { day: "10", tasks: 24 },
  { day: "11", tasks: 31 },
  { day: "12", tasks: 27 },
  { day: "13", tasks: 35 },
  { day: "14", tasks: 32 },
  { day: "15", tasks: 38 },
  { day: "16", tasks: 42 },
  { day: "17", tasks: 39 },
  { day: "18", tasks: 45 },
  { day: "19", tasks: 41 },
  { day: "20", tasks: 48 },
  { day: "21", tasks: 52 },
  { day: "22", tasks: 49 },
  { day: "23", tasks: 55 },
  { day: "24", tasks: 58 },
  { day: "25", tasks: 54 },
  { day: "26", tasks: 61 },
  { day: "27", tasks: 65 },
  { day: "28", tasks: 62 },
  { day: "29", tasks: 68 },
  { day: "30", tasks: 72 },
]

export default function AdminOverview() {
  return (
    <div className="p-8 space-y-8">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Utenti Totali" value="124" change="+12%" changeType="positive" icon="👥" />
        <StatCard label="Liste Totali" value="89" change="+5%" changeType="positive" icon="📋" />
        <StatCard label="Task Totali" value="1,284" change="+23%" changeType="positive" icon="✓" />
        <StatCard label="Task Completati" value="78%" change="+4%" changeType="positive" icon="🎯" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Attività Settimanale</CardTitle>
            <CardDescription>Task creati negli ultimi 7 giorni</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="day" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-card)",
                    border: `1px solid var(--color-border)`,
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "var(--color-foreground)" }}
                />
                <Bar dataKey="tasks" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Growth Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Trend di Crescita</CardTitle>
            <CardDescription>Ultimi 30 giorni</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="day" stroke="var(--color-muted-foreground)" tick={{ fontSize: 12 }} />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-card)",
                    border: `1px solid var(--color-border)`,
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "var(--color-foreground)" }}
                />
                <Line
                  type="monotone"
                  dataKey="tasks"
                  stroke="var(--color-primary)"
                  strokeWidth={3}
                  dot={{ fill: "var(--color-primary)", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
