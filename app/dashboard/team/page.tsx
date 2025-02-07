"use client"

import { Bell, Check, MoreVertical, Plus, Search, Trash2, User } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

interface TeamMember {
  id: string
  name: string
  role: string
  avatar: string
  currentTask: {
    name: string
    progress: number
    status?: "approved" | "pending" | "in-progress"
  }
}

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "John Smith",
    role: "Project Manager",
    avatar: "/placeholder.svg",
    currentTask: {
      name: "Phase 1 of the CMS",
      progress: 45,
      status: "in-progress",
    },
  },
  {
    id: "2",
    name: "Mike Brown",
    role: "Senior Developer",
    avatar: "/placeholder.svg",
    currentTask: {
      name: "Setting up Dev/Prod/Test Environments",
      progress: 30,
      status: "in-progress",
    },
  },
  {
    id: "3",
    name: "Jane Doe",
    role: "Web Designer",
    avatar: "/placeholder.svg",
    currentTask: {
      name: "Logo Design",
      progress: 100,
      status: "approved",
    },
  },
]

const tasks = [
  {
    name: "Setup Source Control Branching",
    progress: 0,
    assignedTo: "Mike Brown",
  },
]

export default function TeamPage() {
  return (
    <div className="flex min-h-screen">
      <div className="flex-1 space-y-6 p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Team Services</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Current balance:</span>
              <span className="font-semibold">$100</span>
            </div>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder.svg" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New resource
          </Button>
          <Button variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            New Task
          </Button>
          <Button variant="outline">All tasks</Button>
          <Button variant="outline">Billing</Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Your team</CardTitle>
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="form-checkbox h-4 w-4" />
                  <span className="text-sm">Completed tasks</span>
                </label>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-[1fr_2fr_100px] gap-4 text-sm text-muted-foreground">
                <div>Resource</div>
                <div>Current task</div>
                <div>Actions</div>
              </div>
              {teamMembers.map((member) => (
                <div key={member.id} className="grid grid-cols-[1fr_2fr_100px] gap-4 items-center">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{member.name}</div>
                      <div className="text-sm text-muted-foreground">{member.role}</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{member.currentTask.name}</span>
                      <span className="text-sm text-muted-foreground">{member.currentTask.progress}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={member.currentTask.progress} className="flex-1" />
                      {member.currentTask.status === "approved" && (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          <Check className="mr-1 h-3 w-3" />
                          Approved
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <User className="mr-2 h-4 w-4" />
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-[2fr_1fr_1fr] gap-4 text-sm text-muted-foreground">
                <div>Task Name</div>
                <div>Progress</div>
                <div>Assigned To</div>
              </div>
              {tasks.map((task, i) => (
                <div key={i} className="grid grid-cols-[2fr_1fr_1fr] gap-4 items-center">
                  <div className="font-medium">{task.name}</div>
                  <Progress value={task.progress} />
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/placeholder.svg" alt={task.assignedTo} />
                      <AvatarFallback>{task.assignedTo[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{task.assignedTo}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="w-80 border-l p-6">
        <div className="space-y-6">
          <div>
            <h2 className="mb-4 text-lg font-semibold">Resources chat</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input className="pl-9" placeholder="Search" />
            </div>
          </div>
          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{member.name}</div>
                    <div className="text-sm text-muted-foreground">{member.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <Separator />
          <div>
            <h2 className="mb-4 text-lg font-semibold">Your Tasks</h2>
            {tasks.length === 0 ? (
              <div className="text-center">
                <p className="text-sm text-muted-foreground">You have no tasks.</p>
                <Button className="mt-4" variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Add new task
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {tasks.map((task, i) => (
                  <Card key={i}>
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <div className="font-medium">{task.name}</div>
                        <Progress value={task.progress} />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

