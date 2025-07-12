import { useState } from "react"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { AdminSidebar } from "./sidebar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent } from "@/components/ui/card"

export default function AdminSettings() {
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [email, setEmail] = useState("admin@skillswap.com")
  const [notification, setNotification] = useState(true)

  return (
    <SidebarProvider
      style={{ "--sidebar-width": "19rem" } as React.CSSProperties}
    >
      <AdminSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-4 px-6 bg-background/60 backdrop-blur-md border-b sticky top-0 z-10">
          <SidebarTrigger className="-ml-1" />
          <h1 className="text-2xl font-bold tracking-tight">Admin Settings</h1>
        </header>

        <div className="p-6 space-y-6 max-w-3xl">
          <Card>
            <CardContent className="space-y-5 p-6">
              <div className="space-y-2">
                <Label htmlFor="email">Admin Contact Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Enable Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive alerts about system status or flagged content.</p>
                </div>
                <Switch
                  checked={notification}
                  onCheckedChange={setNotification}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">Temporarily disable platform for all users.</p>
                </div>
                <Switch
                  checked={maintenanceMode}
                  onCheckedChange={setMaintenanceMode}
                />
              </div>

              <Button className="mt-4 w-full">Save Changes</Button>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
