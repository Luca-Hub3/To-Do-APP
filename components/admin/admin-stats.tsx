"use client"

import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const priorityData = [
  { name: "Alta", value: 245, color: "var(--color-chart-1)" },
  { name: "Media", value: 412, color: "var(--color-chart-2)" },
  { name: "Bassa", value: 627, color: "var(--color-chart-3)" },
]

const last30Days = [
  { date: "1-5", tasks: 45 },
  { date: "6-10", tasks: 52 },
  { date: "11-15", tasks: 68 },
  { date: "16-20", tasks: 72 },
  { date: "21-25", tasks: 81 },
  { date: "26-30", tasks: 95 },
]

export default function AdminStats() {
  return (
    <div className="p-8 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Priority Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Distribuzione Priorità</CardTitle>
            <CardDescription>Task per livello di priorità</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={priorityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {priorityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Last 30 Days */}
        <Card>
          <CardHeader>
            <CardTitle>Task Ultimi 30 Giorni</CardTitle>
            <CardDescription>Trend di creazione task</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={last30Days}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="date" stroke="var(--color-muted-foreground)" />
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
      </div>

      {/* Stats Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Riepilogo Statistiche</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-sidebar-accent rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Task Creati</p>
              <p className="text-2xl font-bold text-foreground">1,284</p>
            </div>
            <div className="p-4 bg-sidebar-accent rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Task Completati</p>
              <p className="text-2xl font-bold text-foreground">1,001</p>
            </div>
            <div className="p-4 bg-sidebar-accent rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Media per Utente</p>
              <p className="text-2xl font-bold text-foreground">10.3</p>
            </div>
            <div className="p-4 bg-sidebar-accent rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Tasso Completamento</p>
              <p className="text-2xl font-bold text-foreground">78%</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
