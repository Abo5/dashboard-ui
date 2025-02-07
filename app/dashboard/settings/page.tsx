"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Bell, CreditCard, Key, Languages, Sun, User } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  bio: z.string().max(160).min(4),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: "Please enter a valid URL." }),
      }),
    )
    .optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

const defaultValues: Partial<ProfileFormValues> = {
  bio: "I'm a software developer based in New York City. I love building web applications and exploring new technologies.",
  urls: [{ value: "https://shadcn.com" }, { value: "http://twitter.com/shadcn" }],
}

export default function SettingsPage() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  })

  function onSubmit(data: ProfileFormValues) {
    console.log(data)
  }

  return (
    <div className="space-y-6 p-10 pb-16">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage your account settings and set e-mail preferences.</p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <Tabs defaultValue="general" className="w-full" orientation="vertical">
            <TabsList className="flex flex-col items-start justify-start">
              <TabsTrigger value="general" className="w-full justify-start">
                <User className="mr-2 h-4 w-4" />
                General
              </TabsTrigger>
              <TabsTrigger value="security" className="w-full justify-start">
                <Key className="mr-2 h-4 w-4" />
                Security
              </TabsTrigger>
              <TabsTrigger value="notifications" className="w-full justify-start">
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="display" className="w-full justify-start">
                <Sun className="mr-2 h-4 w-4" />
                Display
              </TabsTrigger>
              <TabsTrigger value="language" className="w-full justify-start">
                <Languages className="mr-2 h-4 w-4" />
                Language
              </TabsTrigger>
              <TabsTrigger value="billing" className="w-full justify-start">
                <CreditCard className="mr-2 h-4 w-4" />
                Billing
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </aside>
        <div className="flex-1 lg:max-w-2xl">
          <Tabs defaultValue="general">
            <TabsContent value="general">
              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                  <CardDescription>Update your photo and personal details here.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src="/placeholder.svg" alt="User" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <Button>Change Photo</Button>
                        <p className="mt-2 text-sm text-muted-foreground">JPG, GIF or PNG. 1MB max.</p>
                      </div>
                    </div>
                  </div>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                      <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                              <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormDescription>This is your public display name.</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a verified email to display" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="m@example.com">m@example.com</SelectItem>
                                <SelectItem value="m@google.com">m@google.com</SelectItem>
                                <SelectItem value="m@support.com">m@support.com</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              You can manage verified email addresses in your{" "}
                              <a href="/examples/forms">email settings</a>.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell us a little bit about yourself"
                                className="resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              You can <span>@mention</span> other users and organizations.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div>
                        <h3 className="mb-4 text-lg font-medium">Portfolio Projects</h3>
                        <div className="space-y-4">
                          <div className="flex items-center gap-4">
                            <Input type="url" placeholder="https://example.com" />
                            <Button variant="outline" className="shrink-0">
                              Add URL
                            </Button>
                          </div>
                        </div>
                      </div>
                      <Button type="submit">Update profile</Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your security preferences and login options.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Password</h3>
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                    <Button>Change Password</Button>
                  </div>
                  <Separator />
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Two-Factor Authentication</Label>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Manage how you receive notifications and updates.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Email Notifications</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                        <Switch id="email-notifications" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Receive email notifications for important updates.
                      </p>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Push Notifications</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="push-notifications">Push Notifications</Label>
                        <Switch id="push-notifications" />
                      </div>
                      <p className="text-sm text-muted-foreground">Receive push notifications on your devices.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="display">
              <Card>
                <CardHeader>
                  <CardTitle>Display Settings</CardTitle>
                  <CardDescription>Customize the appearance of your dashboard.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Theme</h3>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="theme-toggle">Dark Mode</Label>
                      <Switch id="theme-toggle" checked={isDarkMode} onCheckedChange={setIsDarkMode} />
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Layout</h3>
                    <RadioGroup defaultValue="comfortable">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="compact" id="compact" />
                        <Label htmlFor="compact">Compact</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="comfortable" id="comfortable" />
                        <Label htmlFor="comfortable">Comfortable</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="language">
              <Card>
                <CardHeader>
                  <CardTitle>Language Settings</CardTitle>
                  <CardDescription>Choose your preferred language for the dashboard.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Select Language</h3>
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="de">Deutsch</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="pt">Português</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="billing">
              <Card>
                <CardHeader>
                  <CardTitle>Billing Information</CardTitle>
                  <CardDescription>Manage your billing details and subscription plan.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Current Plan</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Pro Plan</p>
                        <p className="font-medium">Pro Plan</p>
                        <p className="text-sm text-muted-foreground">$29.99/month</p>
                      </div>
                      <Button variant="outline">Upgrade Plan</Button>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Payment Method</h3>
                    <div className="flex items-center space-x-4">
                      <CreditCard className="h-6 w-6" />
                      <div>
                        <p className="font-medium">Visa ending in 1234</p>
                        <p className="text-sm text-muted-foreground">Expires 12/2024</p>
                      </div>
                    </div>
                    <Button variant="outline">Update Payment Method</Button>
                  </div>
                  <Separator />
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Billing History</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p>August 2023</p>
                        <p className="font-medium">$29.99</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p>July 2023</p>
                        <p className="font-medium">$29.99</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p>June 2023</p>
                        <p className="font-medium">$29.99</p>
                      </div>
                    </div>
                    <Button variant="link" className="px-0">
                      View Full History
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

