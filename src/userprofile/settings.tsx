"use client"

import { useState } from "react"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { ProfileSidebar } from "@/sidebar/sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function Settings() {
  const [email, setEmail] = useState("johndoe@example.com")
  const [password, setPassword] = useState("")
  const [notifications, setNotifications] = useState({
    email: true,
    swaps: true,
  })
  const [profileVisibility, setProfileVisibility] = useState("public")
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
    // Normally: Call an API here
  }

  return (
    <SidebarProvider style={{ "--sidebar-width": "19rem" } as React.CSSProperties}>
      <ProfileSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-4 px-6 bg-muted/40 backdrop-blur-md border-b">
          <SidebarTrigger className="-ml-1" />
          <h1 className="text-xl font-semibold tracking-tight">Settings</h1>
        </header>

        <div className="p-6 space-y-6">
          {/* Account Settings */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-lg font-semibold">Account Settings</h2>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                />
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-lg font-semibold">Notifications</h2>
              <div className="flex items-center justify-between">
                <Label>Email Alerts</Label>
                <Switch
                  checked={notifications.email}
                  onCheckedChange={(value) => setNotifications({ ...notifications, email: value })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label>Swap Request Notifications</Label>
                <Switch
                  checked={notifications.swaps}
                  onCheckedChange={(value) => setNotifications({ ...notifications, swaps: value })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-lg font-semibold">Privacy</h2>
              <RadioGroup
                value={profileVisibility}
                onValueChange={setProfileVisibility}
                className="space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="public" id="public" />
                  <Label htmlFor="public">Public Profile</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="private" id="private" />
                  <Label htmlFor="private">Private Profile</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Save Button + Inline Confirmation */}
          <div className="text-right space-y-2">
            <Button onClick={handleSave}>Save Settings</Button>
            {saved && (
              <p className="text-sm text-green-600 dark:text-green-400">✅ Settings saved successfully</p>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
