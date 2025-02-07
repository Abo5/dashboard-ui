import type React from "react"

export interface Project {
  id: string
  name: string
  team: string
  timeLeft: string
  progress: number
  icon: string
  color: string
  members: { avatar: string }[]
}

export interface NavItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

export interface User {
  id: string
  name: string
  email: string
  role: string
  avatar: string
}

