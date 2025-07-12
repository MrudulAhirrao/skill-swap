import { useState } from "react"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { AdminSidebar } from "./sidebar"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRightLeft, CheckCircle, Clock4, XCircle } from "lucide-react"

const swaps = [
  {
    id: 101,
    from: "Alice",
    to: "Bob",
    status: "pending",
    date: "2025-07-11",
  },
  {
    id: 102,
    from: "John",
    to: "Sara",
    status: "accepted",
    date: "2025-07-10",
  },
  {
    id: 103,
    from: "Emma",
    to: "Liam",
    status: "cancelled",
    date: "2025-07-09",
  },
]

export default function SwapMonitor() {
  const [requests, setRequests] = useState(swaps)

  return (
    <SidebarProvider
      style={{ "--sidebar-width": "19rem" } as React.CSSProperties}
    >
      <AdminSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-4 px-6 bg-background/60 backdrop-blur-md border-b sticky top-0 z-10">
          <SidebarTrigger className="-ml-1" />
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Swap Monitoring</h1>
        </header>

        <div className="p-6 space-y-6">
          <div className="bg-background border shadow-sm rounded-xl">
            <div className="px-6 py-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ArrowRightLeft className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-semibold">All Swap Requests</h2>
              </div>
              <Badge className="text-xs px-2 py-1 rounded-full">
                Total: {requests.length}
              </Badge>
            </div>

            <ScrollArea className="max-h-[65vh] divide-y divide-border">
              {requests.map((swap) => (
                <div
                  key={swap.id}
                  className="grid md:grid-cols-3 items-center px-6 py-4 gap-4 hover:bg-muted transition rounded-md"
                >
                  <div className="col-span-2">
                    <p className="text-base font-medium">
                      <span className="text-primary">{swap.from}</span> ⇄ <span className="text-primary">{swap.to}</span>
                    </p>
                    <p className="text-sm text-muted-foreground">Swap ID: #{swap.id} — Date: {swap.date}</p>
                  </div>
                  <div className="flex justify-end">
                    {swap.status === "pending" && (
                      <Badge variant="outline" className="text-yellow-600 border-yellow-500">
                        <Clock4 className="w-3 h-3 mr-1" /> Pending
                      </Badge>
                    )}
                    {swap.status === "accepted" && (
                      <Badge variant="outline" className="text-green-600 border-green-500">
                        <CheckCircle className="w-3 h-3 mr-1" /> Accepted
                      </Badge>
                    )}
                    {swap.status === "cancelled" && (
                      <Badge variant="outline" className="text-red-600 border-red-500">
                        <XCircle className="w-3 h-3 mr-1" /> Cancelled
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </ScrollArea>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
