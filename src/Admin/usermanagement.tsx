import { useState } from "react"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { AdminSidebar } from "./sidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Ban, CheckCircle2, User2 } from "lucide-react"

const flaggedUsers = [
  {
    id: 1,
    name: "John Doe",
    reason: "Repeatedly violated skill posting rules.",
    flaggedAt: "2025-07-10 09:12",
  },
  {
    id: 2,
    name: "Alice Green",
    reason: "Inappropriate profile picture.",
    flaggedAt: "2025-07-11 14:47",
  },
  {
    id: 3,
    name: "Bob Stone",
    reason: "Suspicious activity and spam messaging.",
    flaggedAt: "2025-07-12 11:03",
  },
]

export default function UserManagement() {
  const [users, setUsers] = useState(flaggedUsers)

  const handleBan = (id: number) => {
    setUsers((prev) => prev.filter((u) => u.id !== id))
    alert(`User #${id} has been banned.`)
  }

  const handleDismiss = (id: number) => {
    setUsers((prev) => prev.filter((u) => u.id !== id))
    alert(`Flag for user #${id} dismissed.`)
  }

  return (
    <SidebarProvider
      style={{ "--sidebar-width": "19rem" } as React.CSSProperties}
    >
      <AdminSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-4 px-6 bg-background/60 backdrop-blur-md border-b sticky top-0 z-10">
          <SidebarTrigger className="-ml-1" />
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            User Management
          </h1>
        </header>

        <div className="p-6 space-y-6">
          <div className="bg-background border shadow-sm rounded-xl">
            <div className="px-6 py-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <User2 className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-semibold">Flagged Users</h2>
              </div>
              <Badge variant="destructive" className="text-xs px-2 py-1 rounded-full">
                {users.length} flagged
              </Badge>
            </div>

            <ScrollArea className="max-h-[65vh] divide-y divide-border">
              {users.length === 0 ? (
                <div className="text-center text-sm text-muted-foreground py-6">
                  🎉 No flagged users.
                </div>
              ) : (
                users.map((user) => (
                  <div
                    key={user.id}
                    className="grid md:grid-cols-3 items-center px-6 py-5 gap-4 hover:bg-muted transition rounded-md"
                  >
                    <div className="col-span-2">
                      <h3 className="text-base font-medium text-foreground">
                        {user.name} <span className="text-xs text-muted-foreground">(#{user.id})</span>
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Flagged on <span className="font-medium">{user.flaggedAt}</span>
                      </p>
                      <p className="mt-1 text-sm text-foreground">
                        <span className="font-medium">Reason:</span> {user.reason}
                      </p>
                    </div>
                    <div className="flex flex-col md:flex-row md:justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDismiss(user.id)}
                      >
                        <CheckCircle2 className="w-4 h-4 mr-1" /> Dismiss
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleBan(user.id)}
                      >
                        <Ban className="w-4 h-4 mr-1" /> Ban
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </ScrollArea>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
} 
