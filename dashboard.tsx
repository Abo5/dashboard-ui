"use client"

import { Bell, ChevronDown, LogOut, MessageSquare, Plus, Search, Settings } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

interface Project {
  id: string
  name: string
  team: string
  timeLeft: string
  progress: number
  icon: string
  color: string
  members: { avatar: string }[]
}

const projects: Project[] = [
  {
    id: "1",
    name: "App Development",
    team: "Marketing Team",
    timeLeft: "1 Week Left",
    progress: 34,
    icon: "📱",
    color: "bg-pink-500",
    members: [
      { avatar: "/placeholder.svg?height=32&width=32" },
      { avatar: "/placeholder.svg?height=32&width=32" },
      { avatar: "/placeholder.svg?height=32&width=32" },
    ],
  },
  {
    id: "2",
    name: "Web Design",
    team: "Core UI Team",
    timeLeft: "3 Weeks Left",
    progress: 76,
    icon: "💻",
    color: "bg-emerald-500",
    members: [{ avatar: "/placeholder.svg?height=32&width=32" }],
  },
  {
    id: "3",
    name: "Landing Page",
    team: "Marketing Team",
    timeLeft: "2 Days Left",
    progress: 4,
    icon: "🎯",
    color: "bg-blue-500",
    members: [
      { avatar: "/placeholder.svg?height=32&width=32" },
      { avatar: "/placeholder.svg?height=32&width=32" },
      { avatar: "/placeholder.svg?height=32&width=32" },
    ],
  },
  {
    id: "4",
    name: "Business Compare",
    team: "Marketing Team",
    timeLeft: "1 Month Left",
    progress: 90,
    icon: "📊",
    color: "bg-orange-500",
    members: [{ avatar: "/placeholder.svg?height=32&width=32" }, { avatar: "/placeholder.svg?height=32&width=32" }],
  },
]

const navItems = [
  { name: "Boards", icon: "⚄" },
  { name: "Plan Schedule", icon: "📅" },
  { name: "Reporting", icon: "📊" },
  { name: "Messages", icon: "💬" },
  { name: "Team Member", icon: "👥" },
  { name: "Tools Plugin", icon: "🔧" },
  { name: "Roadmap", icon: "🗺️" },
  { name: "Setting", icon: "⚙️" },
]

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-6 flex flex-col">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">B</div>
          <span className="font-semibold text-xl">Boardto</span>
        </div>

        <nav className="space-y-2 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href="#"
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700"
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        <Button variant="ghost" className="justify-start gap-3">
          <LogOut className="w-5 h-5" />
          Logout
        </Button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input className="pl-10" placeholder="Search..." />
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
            </Button>
            <Separator orientation="vertical" className="h-8" />
            <div className="flex items-center gap-2">
              <Image
                src="/placeholder.svg?height=40&width=40"
                alt="User avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <div className="font-medium">Director</div>
                <div className="text-sm text-gray-500">Augusta Ryan</div>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold mb-1">Reporting</h1>
          <p className="text-gray-500">All project in current month</p>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button>
              All
              <span className="ml-2 text-xs bg-gray-100 px-2 py-0.5 rounded">50</span>
            </Button>
            <Button variant="ghost">
              Started
              <span className="ml-2 text-xs bg-gray-100 px-2 py-0.5 rounded">20</span>
            </Button>
            <Button variant="ghost">
              Approval
              <span className="ml-2 text-xs bg-gray-100 px-2 py-0.5 rounded">15</span>
            </Button>
            <Button variant="ghost">
              Completed
              <span className="ml-2 text-xs bg-gray-100 px-2 py-0.5 rounded">34</span>
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <MessageSquare className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
            <Button>
              <Plus className="w-5 h-5 mr-2" />
              Add New
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div
                  className={`w-12 h-12 rounded-xl ${project.color} flex items-center justify-center text-white text-2xl`}
                >
                  {project.icon}
                </div>
                <div>
                  <h3 className="font-medium">{project.name}</h3>
                  <p className="text-sm text-gray-500">{project.team}</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex -space-x-2">
                  {project.members.map((member, i) => (
                    <Image
                      key={i}
                      src={member.avatar || "/placeholder.svg"}
                      alt="Team member"
                      width={32}
                      height={32}
                      className="rounded-full border-2 border-white"
                    />
                  ))}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <span>{project.timeLeft}</span>
              </div>

              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full ${project.color}`} style={{ width: `${project.progress}%` }} />
              </div>
              <div className="mt-2 text-sm text-right text-gray-500">{project.progress}%</div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}

