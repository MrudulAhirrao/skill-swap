import { useEffect, useState } from "react"
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
import { getMySkills, offeredSkillIds, sendSwapRequestApi, wantedSkillIds } from "@/lib/api"
import { toast } from "sonner"
import { useLocation } from "react-router-dom"

export default function ViewDetail() {
  const location = useLocation()
  const passedUser = location.state?.user
  interface skill{
    id:number;
    skill:string;
  }
  const [mySkills, setMySkills] = useState<skill[]>([])
  const sendSwapRequest = async () => {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        toast.error("You must be logged in.")
        return
      }
      const payload = JSON.parse(atob(token.split('.')[1]))
      const receiverId = payload.user
      const offeredSkillObj = mySkills.find(skill => skill.skill === selectedOffered)
      const offeredSkillId = offeredSkillObj ? offeredSkillObj.id : 0
      const wantedSkillObj = user.skills.find((skill: { id:number;skill: string }) => skill.skill === selectedWanted)
      const requestedSkillId = wantedSkillObj ? wantedSkillObj.id : 0
      const response = await sendSwapRequestApi({
        requesterId: receiverId,
        receiverId: user.id,
        offeredSkillId: offeredSkillId,
        requestedSkillId: requestedSkillId,
        message: message
      })
      toast.success("Swap request sent successfully!")
    } catch (error) {
      toast.error("Failed to send swap request")
    }
  }
  useEffect(() => {
    const fetchMySkills = async () => {
      try {
        const skills = await getMySkills()
        setMySkills(skills)
      } catch (error) {
        console.error("Failed to fetch my skills:", error)
      }
    }
    fetchMySkills()
  }, [])


  const user = passedUser ??{
    id: 1,
    name: "Marc Demo",
    avatar: "",
    "skills": [
            {
                "id": 2,
                "skill": "C"
            },
            {
                "id": 3,
                "skill": "JAVA"
            }
        ],
        "photo": "data:image/jpeg;base64,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",
    availability: "weekends",
  }
  // const yourSkills = ["Node.js", "React", "Python"]
  // const yourUserId = "1" // Replace with actual logged-in user ID
  // const offeredSkillIds: Record<string, string> = { "Node.js": "1", React: "3", Python: "5" }
  // const wantedSkillIds: Record<string, string> = { Photoshop: "2", "Logo Design": "4" }

  const [selectedOffered, setSelectedOffered] = useState("")
  const [selectedWanted, setSelectedWanted] = useState("")
  const [message, setMessage] = useState("")

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault()

  //   const token = localStorage.getItem("token")
  //   if (!token) {
  //     toast.error("You must be logged in.")
  //     return
  //   }

  //   if (!selectedOffered || !selectedWanted || !message) {
  //     toast.error("All fields are required.")
  //     return
  //   }

  //   const offeredSkillId = offeredSkillIds[selectedOffered]
  //   const requestedSkillId = wantedSkillIds[selectedWanted]

  //   if (!offeredSkillId || !requestedSkillId) {
  //     toast.error("Skill ID mapping failed.")
  //     console.log("offeredSkillId", offeredSkillId)
  //     console.log("requestedSkillId", requestedSkillId)
  //     return
  //   }

  //   try {
  //     console.log("Sending Request:", {
  //       requesterId: yourUserId,
  //       receiverId: user.id.toString(),
  //       offeredSkillId,
  //       requestedSkillId,
  //       message,
  //     })

  //     const res = await sendSwapRequest(token, {
  //       requesterId: yourUserId,
  //       receiverId: user.id.toString(),
  //       offeredSkillId,
  //       requestedSkillId,
  //       message,
  //     })

  //     console.log("API Response:", res)
  //     toast.success("Swap request sent!")

  //     // Reset form
  //     setSelectedOffered("")
  //     setSelectedWanted("")
  //     setMessage("")
  //   } catch (err: any) {
  //     console.error("Swap request failed:", err)
  //     toast.error(err.message || "Failed to send request")
  //   }
  // }

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
              <div  className="space-y-4">
                <div className="grid gap-2">
                  <Label>Your Skill to Offer</Label>
                  <Select value={selectedOffered} onValueChange={setSelectedOffered}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose skill you’ll teach" />
                    </SelectTrigger>
                    <SelectContent>
                        {mySkills.map((skill) => (
                        <SelectItem key={skill.id} value={skill.skill}>
                          {skill.skill}
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
                      {user.skills.map((skill: { id: number; skill: string }, idx: number) => (
                        <SelectItem key={idx} value={skill.skill}>
                          {skill.skill}
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
                  <Button onClick={sendSwapRequest} className="w-full">
                    Send Request
                  </Button>
                </DialogFooter>
              </div>
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
            {user.skills.map((skill: { id: number; skill: string }, idx: number) => (
              <Badge key={idx} className="text-sm">{skill.skill}</Badge>
            ))}
          </div>
        </section>

        {/* <section>
          <h2 className="text-lg font-semibold mt-6 mb-2 text-blue-600">🎯 Skills Wanted</h2>
          <div className="flex flex-wrap gap-2">
            {user.wanted.map((skill, idx) => (
              <Badge key={idx} variant="outline" className="text-sm">{skill}</Badge>
            ))}
          </div>
        </section> */}
      </div>
    </div>
  )
}
