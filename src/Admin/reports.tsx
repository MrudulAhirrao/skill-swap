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
import { ScrollArea } from "@/components/ui/scroll-area"
import { Download } from "lucide-react"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

const dummyReports = [
  { id: 1, user: "Alice", action: "Swap Request", date: "2025-07-10" },
  { id: 2, user: "Bob", action: "Login", date: "2025-07-11" },
  { id: 3, user: "Charlie", action: "Skill Posted", date: "2025-07-11" },
  { id: 4, user: "David", action: "Swap Cancelled", date: "2025-07-12" },
]

export default function Reports() {
  const [search, setSearch] = useState("")
  const [filtered, setFiltered] = useState(dummyReports)

  const handleSearch = (value: string) => {
    setSearch(value)
    const query = value.toLowerCase()
    setFiltered(
      dummyReports.filter(
        (r) =>
          r.user.toLowerCase().includes(query) ||
          r.action.toLowerCase().includes(query) ||
          r.date.includes(query)
      )
    )
  }

  const handleDownload = () => {
    const doc = new jsPDF()
    autoTable(doc, {
      head: [["ID", "User", "Action", "Date"]],
      body: filtered.map((r) => [r.id, r.user, r.action, r.date]),
    })
    doc.save("report.pdf")
  }

  return (
    <SidebarProvider
      style={{ "--sidebar-width": "19rem" } as React.CSSProperties}
    >
      <AdminSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-4 px-6 bg-background/60 backdrop-blur-md border-b sticky top-0 z-10">
          <SidebarTrigger className="-ml-1" />
          <h1 className="text-2xl font-bold tracking-tight">Reports</h1>
        </header>

        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between gap-4">
            <Input
              type="text"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search by user, action, or date"
              className="w-full max-w-md"
            />
            <Button onClick={handleDownload} variant="outline">
              <Download className="w-4 h-4 mr-2" /> Download PDF
            </Button>
          </div>

          <ScrollArea className="border rounded-md max-h-[60vh] divide-y divide-border">
            {filtered.length === 0 ? (
              <p className="p-4 text-center text-muted-foreground text-sm">
                No reports found.
              </p>
            ) : (
              filtered.map((r) => (
                <div
                  key={r.id}
                  className="grid grid-cols-3 px-4 py-3 text-sm hover:bg-muted/50 transition"
                >
                  <span className="font-medium">{r.user}</span>
                  <span>{r.action}</span>
                  <span className="text-muted-foreground text-right">{r.date}</span>
                </div>
              ))
            )}
          </ScrollArea>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
