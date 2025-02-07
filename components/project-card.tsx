import { Plus } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { Project } from "@/types/dashboard"

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-4 mb-4">
        <div className={`w-12 h-12 rounded-xl ${project.color} flex items-center justify-center text-white`}>
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
  )
}

