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
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function BroadcastMessage() {
  const [message, setMessage] = useState("")
  const [history, setHistory] = useState<string[]>([])

  const handleSend = () => {
    if (!message.trim()) return
    setHistory((prev) => [message, ...prev])
    setMessage("")
    alert("Broadcast message sent to all users")
  }

  return (
    <SidebarProvider
      style={{ "--sidebar-width": "19rem" } as React.CSSProperties}
    >
      <AdminSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-4 px-6 bg-background/60 backdrop-blur-md border-b sticky top-0 z-10">
          <SidebarTrigger className="-ml-1" />
          <h1 className="text-2xl font-bold tracking-tight">Broadcast Message</h1>
        </header>

        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold mb-1">New Broadcast</h2>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter a platform-wide announcement or update..."
                className="min-h-[120px]"
              />
              <div className="mt-3 flex justify-end">
                <Button onClick={handleSend}>Send Message</Button>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Previous Broadcasts</h2>
              <ScrollArea className="max-h-[300px] border rounded-md divide-y divide-border">
                {history.length === 0 ? (
                  <p className="p-4 text-sm text-muted-foreground text-center">
                    No broadcasts sent yet.
                  </p>
                ) : (
                  history.map((msg, index) => (
                    <div key={index} className="p-4 text-sm">
                      {msg}
                    </div>
                  ))
                )}
              </ScrollArea>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
