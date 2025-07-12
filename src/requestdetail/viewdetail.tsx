import { useState } from "react"
import Navbar from "@/navbar/navbar"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Star } from "lucide-react"
import { sendSwapRequest } from "@/lib/api"
import { toast } from "sonner"

export default function ViewDetail() {
  const user = {
    id: 2,
    name: "Michell",
    avatar: "",
    rating: 4.2,
    availability: "Weekends, Evenings",
    offered: ["React", "UI Design"],
    wanted: ["Photoshop", "Logo Design"],
    bio: "🎨 I’m a creative frontend dev & designer who loves collaboration, clean UI, and aesthetic user experiences. Let's build magic together!",
  }

  const yourSkills = ["Node.js", "React", "Python"]
  const yourUserId = "1" // Replace with actual logged-in user ID
  const offeredSkillIds: Record<string, string> = { "Node.js": "1", React: "3", Python: "5" }
  const wantedSkillIds: Record<string, string> = { Photoshop: "2", "Logo Design": "4" }

  const [selectedOffered, setSelectedOffered] = useState("")
  const [selectedWanted, setSelectedWanted] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const token = localStorage.getItem("token")
    if (!token) {
      toast.error("You must be logged in.")
      return
    }

    if (!selectedOffered || !selectedWanted || !message) {
      toast.error("All fields are required.")
      return
    }

    const offeredSkillId = offeredSkillIds[selectedOffered]
    const requestedSkillId = wantedSkillIds[selectedWanted]

    if (!offeredSkillId || !requestedSkillId) {
      toast.error("Skill ID mapping failed.")
      console.log("offeredSkillId", offeredSkillId)
      console.log("requestedSkillId", requestedSkillId)
      return
    }

    try {
      console.log("Sending Request:", {
        requesterId: yourUserId,
        receiverId: user.id.toString(),
        offeredSkillId,
        requestedSkillId,
        message,
      })

      const res = await sendSwapRequest(token, {
        requesterId: yourUserId,
        receiverId: user.id.toString(),
        offeredSkillId,
        requestedSkillId,
        message,
      })

      console.log("API Response:", res)
      toast.success("Swap request sent!")

      // Reset form
      setSelectedOffered("")
      setSelectedWanted("")
      setMessage("")
    } catch (err: any) {
      console.error("Swap request failed:", err)
      toast.error(err.message || "Failed to send request")
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
        <div className="bg-white/5 border border-border shadow-md backdrop-blur-md rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <Avatar className="w-20 h-20 ring-2 ring-primary shadow-md">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="text-xl">{user.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{user.name}</h1>
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <Star className="w-4 h-4 text-yellow-400 mr-1" />
                <span>{user.rating} / 5 rating</span>
              </div>
              <p className="text-xs mt-1 text-blue-500">Available: {user.availability}</p>
            </div>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="rounded-full px-6 text-sm">Send Request</Button>
            </DialogTrigger>
            <DialogContent className="bg-background border border-border rounded-xl">
              <DialogHeader>
                <DialogTitle className="text-lg">Send Skill Swap Request</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-2">
                  <Label>Your Skill to Offer</Label>
                  <Select value={selectedOffered} onValueChange={setSelectedOffered}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose skill you’ll teach" />
                    </SelectTrigger>
                    <SelectContent>
                      {yourSkills.map((skill, idx) => (
                        <SelectItem key={idx} value={skill}>
                          {skill}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Skill You Want to Learn</Label>
                  <Select value={selectedWanted} onValueChange={setSelectedWanted}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose skill you want" />
                    </SelectTrigger>
                    <SelectContent>
                      {user.wanted.map((skill, idx) => (
                        <SelectItem key={idx} value={skill}>
                          {skill}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Message</Label>
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Say something cool ✨"
                  />
                </div>
                <DialogFooter className="pt-2">
                  <Button type="submit" className="w-full">
                    Send Request
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <section className="bg-muted/10 border border-border rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-2">🧑‍💻 About {user.name}</h2>
          <p className="text-muted-foreground leading-relaxed">{user.bio}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2 text-green-600">✅ Skills Offered</h2>
          <div className="flex flex-wrap gap-2">
            {user.offered.map((skill, idx) => (
              <Badge key={idx} className="text-sm">{skill}</Badge>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mt-6 mb-2 text-blue-600">🎯 Skills Wanted</h2>
          <div className="flex flex-wrap gap-2">
            {user.wanted.map((skill, idx) => (
              <Badge key={idx} variant="outline" className="text-sm">{skill}</Badge>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
