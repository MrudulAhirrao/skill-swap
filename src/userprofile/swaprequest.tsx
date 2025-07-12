"use client"

import { useState, useRef } from "react"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ProfileSidebar } from "@/sidebar/sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { UserPlus, Check, X, Clock } from "lucide-react"

interface Swap {
  id: number
  user: string
  avatarUrl?: string
  type: "incoming" | "sent"
  status: "pending" | "accepted" | "rejected" | "cancelled"
}

export default function SwapRequest() {
  const [username, setUsername] = useState("")
  const [swaps, setSwaps] = useState<Swap[]>([
    { id: 1, user: "Alice", type: "incoming", status: "pending" },
    { id: 2, user: "Bob", type: "sent", status: "pending" },
    { id: 3, user: "Charlie", type: "incoming", status: "accepted" },
  ])
  const inputRef = useRef<HTMLInputElement>(null)

  const sendSwap = () => {
    if (!username.trim()) return
    const newSwap: Swap = {
      id: Date.now(),
      user: username.trim(),
      type: "sent",
      status: "pending",
    }
    setSwaps((prev) => [newSwap, ...prev])
    setUsername("")
    inputRef.current?.focus()
  }

  const updateSwapStatus = (id: number, status: Swap["status"]) => {
    setSwaps((prev) =>
      prev.map((swap) => (swap.id === id ? { ...swap, status } : swap))
    )
  }

  const statusBadge = (status: Swap["status"]) => {
    const color =
      status === "pending"
        ? "bg-yellow-500"
        : status === "accepted"
        ? "bg-green-500"
        : status === "rejected"
        ? "bg-red-500"
        : "bg-muted"

    return (
      <Badge className={`${color} text-white capitalize`}>
        {status}
      </Badge>
    )
  }

  const renderSwapCard = (swap: Swap, action?: "incoming" | "sent") => (
    <div
      key={swap.id}
      className="flex items-center justify-between border p-3 rounded-md"
    >
      <div className="flex items-center gap-3">
        <Avatar className="h-9 w-9">
          <AvatarImage src={swap.avatarUrl || ""} alt={swap.user} />
          <AvatarFallback>{swap.user.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{swap.user}</p>
          <p className="text-xs text-muted-foreground capitalize">
            {swap.type} • {swap.status}
          </p>
        </div>
      </div>

      {swap.status === "pending" && action === "incoming" && (
        <div className="flex gap-2">
          <Button size="sm" onClick={() => updateSwapStatus(swap.id, "accepted")}>
            <Check className="w-4 h-4 mr-1" /> Accept
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => updateSwapStatus(swap.id, "rejected")}
          >
            <X className="w-4 h-4 mr-1" /> Reject
          </Button>
        </div>
      )}

      {swap.status === "pending" && action === "sent" && (
        <Button
          size="sm"
          variant="outline"
          onClick={() => updateSwapStatus(swap.id, "cancelled")}
        >
          Cancel
        </Button>
      )}

      {swap.status !== "pending" && statusBadge(swap.status)}
    </div>
  )

  return (
    <SidebarProvider style={{ "--sidebar-width": "19rem" } as React.CSSProperties}>
      <ProfileSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-4 px-6 bg-muted/40 backdrop-blur-md border-b">
          <SidebarTrigger className="-ml-1" />
          <h1 className="text-xl font-semibold tracking-tight">Swap Requests</h1>
        </header>

        <div className="p-6 space-y-6">
          {/* SEND SWAP */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <UserPlus className="w-5 h-5" />
                Send New Swap Request
              </h2>
              <div className="flex gap-2 items-end">
                <div className="flex-1">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    ref={inputRef}
                    id="username"
                    placeholder="e.g. johndoe123"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <Button onClick={sendSwap}>Send</Button>
              </div>
            </CardContent>
          </Card>

          {/* INCOMING */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-lg font-semibold">Incoming Requests</h2>
              {swaps.filter((s) => s.type === "incoming").length === 0 ? (
                <p className="text-muted-foreground text-sm">No incoming requests.</p>
              ) : (
                <div className="space-y-3">
                  {swaps
                    .filter((s) => s.type === "incoming")
                    .map((swap) => renderSwapCard(swap, "incoming"))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* SENT */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-lg font-semibold">Sent Requests</h2>
              {swaps.filter((s) => s.type === "sent").length === 0 ? (
                <p className="text-muted-foreground text-sm">No sent requests.</p>
              ) : (
                <div className="space-y-3">
                  {swaps
                    .filter((s) => s.type === "sent")
                    .map((swap) => renderSwapCard(swap, "sent"))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
