"use client"

import { useState } from "react"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { ProfileSidebar } from "@/sidebar/sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle, XCircle, Ban } from "lucide-react"

type SwapStatus = "accepted" | "rejected" | "cancelled" | "pending"

interface SwapHistory {
  id: number
  user: string
  type: "incoming" | "sent"
  status: SwapStatus
  date: string
  avatarUrl?: string
}

export default function History() {
  const [history, setHistory] = useState<SwapHistory[]>([
    {
      id: 1,
      user: "Alice",
      type: "incoming",
      status: "accepted",
      date: "2025-07-11",
    },
    {
      id: 2,
      user: "Bob",
      type: "sent",
      status: "rejected",
      date: "2025-07-10",
    },
    {
      id: 3,
      user: "Charlie",
      type: "incoming",
      status: "cancelled",
      date: "2025-07-08",
    },
    {
      id: 4,
      user: "Daniel",
      type: "sent",
      status: "accepted",
      date: "2025-07-07",
    },
  ])

  const statusBadge = (status: SwapStatus) => {
    const map = {
      accepted: { color: "bg-green-500", icon: <CheckCircle className="w-4 h-4 mr-1" /> },
      rejected: { color: "bg-red-500", icon: <XCircle className="w-4 h-4 mr-1" /> },
      cancelled: { color: "bg-yellow-500", icon: <Ban className="w-4 h-4 mr-1" /> },
      pending: { color: "bg-muted", icon: <Clock className="w-4 h-4 mr-1" /> },
    }
    const item = map[status]
    return (
      <Badge className={`${item.color} text-white flex items-center`}>
        {item.icon} {status}
      </Badge>
    )
  }

  const typeBadge = (type: "incoming" | "sent") => (
    <Badge variant="outline" className="capitalize text-xs">
      {type}
    </Badge>
  )

  return (
    <SidebarProvider style={{ "--sidebar-width": "19rem" } as React.CSSProperties}>
      <ProfileSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-4 px-6 bg-muted/40 backdrop-blur-md border-b">
          <SidebarTrigger className="-ml-1" />
          <h1 className="text-xl font-semibold tracking-tight">Swap Request History</h1>
        </header>

        <div className="p-6">
          <Card className="rounded-2xl shadow-md border border-border/40 bg-background/80 backdrop-blur">
            <CardContent className="p-6 space-y-4">
              {history.length === 0 ? (
                <p className="text-muted-foreground text-sm text-center">No swap history found.</p>
              ) : (
                <ul className="space-y-5">
                  {history.map((entry) => (
                    <li
                      key={entry.id}
                      className="flex items-center justify-between p-4 rounded-xl border hover:bg-muted/20 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={entry.avatarUrl || ""} />
                          <AvatarFallback>{entry.user.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{entry.user}</p>
                          <p className="text-xs text-muted-foreground">{entry.date}</p>
                        </div>
                      </div>

                      <div className="flex gap-3 items-center">
                        {typeBadge(entry.type)}
                        {statusBadge(entry.status)}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
