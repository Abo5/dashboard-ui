"use client"

import { useState } from "react"
import { AnchorIcon as AttachmentIcon, Mic, Search, Send, Smile } from "lucide-react"
import { format } from "date-fns"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

interface Message {
  id: string
  content: string
  sender: User
  timestamp: Date
  type: "text" | "file" | "audio"
  attachment?: {
    name: string
    type: string
  }
}

interface User {
  id: string
  name: string
  avatar: string
  status: "online" | "offline" | "away"
  lastSeen?: Date
}

const users: User[] = [
  {
    id: "1",
    name: "Cedar Botsford",
    avatar: "/placeholder.svg",
    status: "online",
  },
  {
    id: "2",
    name: "Sorrel Barrows",
    avatar: "/placeholder.svg",
    status: "online",
  },
  {
    id: "3",
    name: "Lily Schaden",
    avatar: "/placeholder.svg",
    status: "online",
  },
  {
    id: "4",
    name: "Elm Flatley",
    avatar: "/placeholder.svg",
    status: "away",
    lastSeen: new Date(),
  },
  {
    id: "5",
    name: "Daisy Reynolds",
    avatar: "/placeholder.svg",
    status: "online",
  },
]

const messages: Message[] = [
  {
    id: "1",
    content: "Hi Cedar. Send me the mockup file",
    sender: users[2],
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    type: "text",
  },
  {
    id: "2",
    content: "MockupUpdate.pdf",
    sender: users[0],
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    type: "file",
    attachment: {
      name: "MockupUpdate.pdf",
      type: "application/pdf",
    },
  },
  {
    id: "3",
    content: "Voice message",
    sender: users[2],
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
    type: "audio",
  },
  {
    id: "4",
    content: "OK Lily. I'm going to a meeting.",
    sender: users[0],
    timestamp: new Date(),
    type: "text",
  },
]

export default function MessagesPage() {
  const [selectedUser, setSelectedUser] = useState<User>(users[2])

  return (
    <div className="flex h-[calc(100vh-2rem)] gap-4">
      <div className="w-80 flex flex-col">
        <Card className="flex-1">
          <div className="p-4 pb-0">
            <div className="mb-4">
              <h2 className="text-xl font-semibold tracking-tight">Messages</h2>
            </div>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search messages" className="pl-8" />
            </div>
          </div>
          <ScrollArea className="h-[calc(100vh-12rem)]">
            <div className="p-4 pt-0">
              <h3 className="mb-4 mt-6 text-sm font-medium">Online Now</h3>
              <div className="flex gap-2 overflow-x-auto pb-4">
                {users
                  .filter((user) => user.status === "online")
                  .map((user) => (
                    <button
                      key={user.id}
                      className="flex flex-col items-center gap-1"
                      onClick={() => setSelectedUser(user)}
                    >
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name[0]}</AvatarFallback>
                        </Avatar>
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-green-500" />
                      </div>
                      <span className="text-xs">{user.name.split(" ")[0]}</span>
                    </button>
                  ))}
              </div>
              <Separator className="mb-4" />
              <div className="space-y-2">
                {users.map((user) => (
                  <button
                    key={user.id}
                    onClick={() => setSelectedUser(user)}
                    className={`w-full rounded-lg p-2 text-left transition-colors hover:bg-accent ${
                      selectedUser.id === user.id ? "bg-accent" : ""
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name[0]}</AvatarFallback>
                        </Avatar>
                        {user.status === "online" && (
                          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-green-500" />
                        )}
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{user.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {user.lastSeen ? format(user.lastSeen, "p") : "Now"}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground truncate">Click to view conversation</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </ScrollArea>
        </Card>
      </div>

      <Card className="flex-1 flex flex-col">
        <div className="flex items-center gap-4 p-4">
          <Avatar>
            <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} />
            <AvatarFallback>{selectedUser.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{selectedUser.name}</h3>
            <p className="text-sm text-muted-foreground">{selectedUser.status === "online" ? "Active now" : "Away"}</p>
          </div>
        </div>
        <Separator />
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => {
              const isOwn = message.sender.id === users[0].id
              return (
                <div key={message.id} className={`flex items-end gap-2 ${isOwn ? "flex-row-reverse" : ""}`}>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={message.sender.avatar} alt={message.sender.name} />
                    <AvatarFallback>{message.sender.name[0]}</AvatarFallback>
                  </Avatar>
                  <div
                    className={`rounded-lg p-4 max-w-[70%] ${
                      isOwn ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    {message.type === "text" && <p>{message.content}</p>}
                    {message.type === "file" && (
                      <div className="flex items-center gap-2">
                        <AttachmentIcon className="h-4 w-4" />
                        <span>{message.attachment?.name}</span>
                      </div>
                    )}
                    {message.type === "audio" && (
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-40 bg-black/10 rounded-full overflow-hidden">
                          <div className="h-full w-full bg-gradient-to-r from-transparent via-black/20 to-transparent animate-pulse" />
                        </div>
                        <span>2:10</span>
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">{format(message.timestamp, "p")}</span>
                </div>
              )
            })}
          </div>
        </ScrollArea>
        <Separator />
        <div className="p-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <Smile className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <AttachmentIcon className="h-4 w-4" />
            </Button>
            <Input placeholder="Type a message" className="flex-1" />
            <Button variant="outline" size="icon">
              <Mic className="h-4 w-4" />
            </Button>
            <Button size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

