"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { addDays, format } from "date-fns"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

interface Task {
  id: string
  title: string
  status: "DRAFT" | "IN PROGRESS" | "REVIEW" | "DONE"
  progress: number
  startDate: Date
  duration: number
  color: string
  assignee: string
}

const tasks: Task[] = [
  {
    id: "1",
    title: "Website redesign",
    status: "IN PROGRESS",
    progress: 55,
    startDate: new Date(),
    duration: 14,
    color: "bg-blue-500",
    assignee: "Alice",
  },
  {
    id: "2",
    title: "Mobile app development",
    status: "IN PROGRESS",
    progress: 40,
    startDate: addDays(new Date(), 7),
    duration: 21,
    color: "bg-purple-500",
    assignee: "Bob",
  },
  {
    id: "3",
    title: "Marketing campaign",
    status: "REVIEW",
    progress: 85,
    startDate: addDays(new Date(), 3),
    duration: 10,
    color: "bg-pink-500",
    assignee: "Charlie",
  },
  {
    id: "4",
    title: "Product launch",
    status: "DRAFT",
    progress: 35,
    startDate: addDays(new Date(), 14),
    duration: 7,
    color: "bg-orange-500",
    assignee: "Diana",
  },
]

const team = [
  { name: "Alice", avatar: "/placeholder.svg" },
  { name: "Bob", avatar: "/placeholder.svg" },
  { name: "Charlie", avatar: "/placeholder.svg" },
  { name: "Diana", avatar: "/placeholder.svg" },
]

const statuses = [
  { id: "DRAFT", label: "Draft", color: "bg-gray-200" },
  { id: "IN PROGRESS", label: "In Progress", color: "bg-blue-100" },
  { id: "REVIEW", label: "Review", color: "bg-yellow-100" },
  { id: "DONE", label: "Done", color: "bg-green-100" },
]

export default function SchedulePage() {
  const [currentDate] = useState(new Date())
  const timelineDates = Array.from({ length: 14 }, (_, i) => addDays(currentDate, i))

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Plan Schedule</h1>
          <p className="text-muted-foreground">
            {format(currentDate, "MMMM yyyy")} • Week {format(currentDate, "w")}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_280px] gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle>Tasks Timeline</CardTitle>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Task
            </Button>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[calc(100vh-15rem)] pr-4">
              <div className="space-y-8">
                {statuses.map((status) => {
                  const statusTasks = tasks.filter((task) => task.status === status.id)
                  if (statusTasks.length === 0) return null

                  return (
                    <div key={status.id}>
                      <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`h-2 w-2 rounded-full ${status.color}`} />
                          <h3 className="font-semibold">{status.label}</h3>
                        </div>
                        <span className="text-sm text-muted-foreground">{statusTasks.length} tasks</span>
                      </div>
                      <div className="space-y-4">
                        {statusTasks.map((task) => (
                          <div key={task.id} className="group relative">
                            <div className="flex items-center gap-4 rounded-lg border bg-card p-4 hover:shadow-sm">
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium">{task.title}</span>
                                    <Avatar className="h-6 w-6">
                                      <AvatarImage
                                        src={team.find((t) => t.name === task.assignee)?.avatar}
                                        alt={task.assignee}
                                      />
                                      <AvatarFallback>{task.assignee[0]}</AvatarFallback>
                                    </Avatar>
                                  </div>
                                  <span className="text-sm text-muted-foreground">{task.progress}%</span>
                                </div>
                                <Progress value={task.progress} className="mt-2" />
                              </div>
                              <div
                                className={`h-2 w-2 rounded-full ${task.color}`}
                                style={{
                                  backgroundColor: task.color,
                                }}
                              />
                            </div>
                            <div
                              className={`absolute left-0 top-0 h-full w-1 rounded-l-lg ${task.color}`}
                              style={{
                                opacity: 0.5,
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
              <ScrollBar orientation="vertical" />
            </ScrollArea>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {team.map((member) => (
                  <Avatar key={member.name}>
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.name[0]}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 text-center">
                {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
                  <div key={day} className="text-sm font-medium text-muted-foreground">
                    {day}
                  </div>
                ))}
                {Array.from({ length: 31 }, (_, i) => (
                  <Button key={i + 1} variant="ghost" className="h-8 w-8 p-0 hover:bg-muted">
                    <time dateTime={`2024-01-${i + 1}`}>{i + 1}</time>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Task Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {statuses.map((status) => {
                const count = tasks.filter((task) => task.status === status.id).length
                return (
                  <div key={status.id}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{status.label}</span>
                      <span className="text-muted-foreground">{count} tasks</span>
                    </div>
                    <Progress value={(count / tasks.length) * 100} className={`h-2 ${status.color}`} />
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

