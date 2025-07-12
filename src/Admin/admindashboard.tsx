import { useState } from "react"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { AdminSidebar } from "./sidebar"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Users,
  ArrowRightLeft,
  FileWarning,
  AlertTriangle,
  Ban,
  Megaphone,
  Download,
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
} from "lucide-react"

export default function AdminDashboard() {
  const [message, setMessage] = useState("")

  return (
    <SidebarProvider
      style={{ "--sidebar-width": "19rem" } as React.CSSProperties}
    >
      <AdminSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-4 px-6 bg-background/60 backdrop-blur-md border-b sticky top-0 z-10">
          <SidebarTrigger className="-ml-1" />
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            Admin Dashboard
          </h1>
        </header>

        <div className="p-6 grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
          {/* Statistic Cards */}
          <StatCard
            icon={<Users className="w-6 h-6 text-primary" />}
            title="Users"
            value="1,482"
            trend="up"
            change="+5.2%"
          />
          <StatCard
            icon={<ArrowRightLeft className="w-6 h-6 text-green-500" />}
            title="Swaps"
            value="736"
            trend="down"
            change="-1.7%"
          />
          <StatCard
            icon={<FileWarning className="w-6 h-6 text-yellow-500" />}
            title="Reports"
            value="19"
            trend="up"
            change="+8.0%"
          />

          {/* Tools */}
          <ToolCard
            icon={<AlertTriangle className="w-5 h-5 text-yellow-500" />}
            title="Skill Moderation"
            description="Review pending skill reports and reject spam or abuse."
            actions={[{ label: "Review Now", variant: "default" }]}
          />
          <ToolCard
            icon={<Ban className="w-5 h-5 text-red-500" />}
            title="User Management"
            description="Manage flagged users and apply bans if necessary."
            actions={[{ label: "Ban User", variant: "destructive" }]}
          />
          <ToolCard
            icon={<ArrowRightLeft className="w-5 h-5 text-indigo-500" />}
            title="Swap Monitoring"
            description="Track and manage all active or pending swaps."
            actions={[{ label: "View Swaps", variant: "outline" }]}
          />

          {/* Broadcast Message */}
          <Card className="col-span-1 sm:col-span-2 xl:col-span-3 shadow-md">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-blue-500" />
                <h2 className="text-lg font-semibold">Broadcast Message</h2>
              </div>
              <Textarea
                placeholder="Announce updates, downtime, or features..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <div className="flex justify-end">
                <Button onClick={() => alert("Broadcast: " + message)}>
                  Send Message
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Download Reports */}
          <Card className="col-span-1 sm:col-span-2">
            <CardContent className="p-6 space-y-3">
              <div className="flex items-center gap-2">
                <Download className="w-5 h-5 text-green-600" />
                <h2 className="text-lg font-semibold">Download Reports</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <Button variant="outline">User Activity</Button>
                <Button variant="outline">Swap Stats</Button>
                <Button variant="outline">Feedback Logs</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

function StatCard({ icon, title, value, trend, change }: any) {
  return (
    <Card className="shadow-md hover:shadow-xl transition-all">
      <CardContent className="p-4 flex items-center gap-4">
        {icon}
        <div className="flex-1">
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-xl font-bold text-foreground">{value}</p>
        </div>
        <Badge
          variant={trend === "up" ? "default" : "destructive"}
          className="flex items-center gap-1 text-xs"
        >
          {trend === "up" ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          {change}
        </Badge>
      </CardContent>
    </Card>
  )
}

function ToolCard({ icon, title, description, actions }: any) {
  return (
    <Card className="shadow-md hover:shadow-lg transition-all">
      <CardContent className="p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icon}
            <h2 className="text-base font-semibold">{title}</h2>
          </div>
          <Button size="icon" variant="ghost">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        <div className="flex gap-2 flex-wrap">
          {actions.map((action: any, i: number) => (
            <Button
              key={i}
              size="sm"
              variant={action.variant}
              onClick={action.onClick || (() => alert(`${action.label} clicked`))}
            >
              {action.label}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
