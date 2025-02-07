"use client"

import { ArrowDownIcon, ArrowUpIcon, HelpCircle, Users, Eye, Target, Heart } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const metrics = [
  {
    title: "Total followers",
    value: "21.2k",
    icon: Users,
    change: "+12.71%",
    trending: "up",
  },
  {
    title: "Impressions",
    value: "1.6k",
    icon: Eye,
    change: "+112.71%",
    trending: "up",
  },
  {
    title: "Reach",
    value: "826",
    icon: Target,
    change: "-24.2%",
    trending: "down",
  },
  {
    title: "Engagement Rate",
    value: "18.2%",
    icon: Heart,
    change: "+112.71%",
    trending: "up",
  },
]

const followersData = [
  { name: "Jan", followers: 4000 },
  { name: "Feb", followers: 8500 },
  { name: "Mar", followers: 6000 },
  { name: "Apr", followers: 4200 },
  { name: "May", followers: 7000 },
  { name: "Jun", followers: 6500 },
  { name: "Jul", followers: 12800 },
  { name: "Aug", followers: 6000 },
  { name: "Sep", followers: 5500 },
  { name: "Oct", followers: 5000 },
  { name: "Nov", followers: 4800 },
  { name: "Dec", followers: 4000 },
]

export default function ReportingPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics Overview</h1>
          <p className="text-muted-foreground">Track your social media performance</p>
        </div>
        <Select defaultValue="30">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Last 7 days</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
            <SelectItem value="90">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center space-x-2">
                {metric.trending === "up" ? (
                  <ArrowUpIcon className="h-4 w-4 text-emerald-500" />
                ) : (
                  <ArrowDownIcon className="h-4 w-4 text-red-500" />
                )}
                <span className={metric.trending === "up" ? "text-emerald-500" : "text-red-500"}>{metric.change}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Get More Likes this Summer</CardTitle>
              <HelpCircle className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <div className="relative flex items-center justify-center">
              <svg className="h-52 w-52">
                <circle className="text-muted stroke-current" strokeWidth="12" fill="none" r="90" cx="100" cy="100" />
                <circle
                  className="text-primary stroke-current"
                  strokeWidth="12"
                  strokeDasharray={565.48}
                  strokeDashoffset={565.48 * 0.23}
                  strokeLinecap="round"
                  fill="none"
                  r="90"
                  cx="100"
                  cy="100"
                />
              </svg>
              <div className="absolute text-center">
                <div className="text-4xl font-bold">29.2k</div>
                <div className="text-sm text-muted-foreground">of 36,000 likes</div>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground text-center">You are at 77% of 36,000 likes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Follower Growth</CardTitle>
              <Button variant="ghost" size="icon">
                <HelpCircle className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={followersData}>
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                  />
                  <Bar dataKey="followers" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex items-center justify-center space-x-2">
              <ArrowUpIcon className="h-4 w-4 text-emerald-500" />
              <span className="font-medium text-emerald-500">22.8%</span>
              <span className="text-sm text-muted-foreground">growth rate</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

