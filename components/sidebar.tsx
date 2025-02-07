"use client"

import { BarChart3, Calendar, Grid, LogOut, MessageSquare, Settings, Users } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import type { NavItem } from "@/types/dashboard"

const navItems: NavItem[] = [
  { name: "Boards", href: "/dashboard", icon: Grid },
  { name: "Plan Schedule", href: "/dashboard/schedule", icon: Calendar },
  { name: "Reporting", href: "/dashboard/reporting", icon: BarChart3 },
  { name: "Messages", href: "/dashboard/messages", icon: MessageSquare },
  { name: "Team Member", href: "/dashboard/team", icon: Users },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white border-r p-6 flex flex-col">
      <div className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">B</div>
        <span className="font-semibold text-xl">Boardto</span>
      </div>

      <nav className="space-y-1 flex-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                isActive ? "bg-primary/10 text-primary" : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>

      <Button variant="ghost" className="justify-start gap-3">
        <LogOut className="w-5 h-5" />
        Logout
      </Button>
    </aside>
  )
}

