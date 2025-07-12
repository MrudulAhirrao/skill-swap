"use client"

import { useRef, useState } from "react"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ProfileSidebar } from "@/sidebar/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Settings, Pencil, X } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Page() {
  const [name, setName] = useState("John Doe")
  const [location, setLocation] = useState("Mumbai")
  const [availability, setAvailability] = useState("weekends")
  const [profileStatus, setProfileStatus] = useState("Public")
  const [skillsOffered, setSkillsOffered] = useState(["Graphic Design", "Video Editing", "Photoshop"])
  const [skillsWanted, setSkillsWanted] = useState(["Python", "JavaScript", "Manager"])
  const [image, setImage] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const removeSkill = (type: "offered" | "wanted", index: number) => {
    if (type === "offered") {
      setSkillsOffered(skillsOffered.filter((_, i) => i !== index))
    } else {
      setSkillsWanted(skillsWanted.filter((_, i) => i !== index))
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setImage(null)
  }

  return (
    <SidebarProvider style={{ "--sidebar-width": "19rem" } as React.CSSProperties}>
      <ProfileSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-4 px-6 bg-muted/40 backdrop-blur-md border-b">
          <SidebarTrigger className="-ml-1" />
          <h1 className="text-xl font-semibold tracking-tight">Profile</h1>
        </header>

        <div className="p-6 space-y-6">
          <Card className="rounded-2xl shadow-lg border border-border/40">
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
              {/* Left */}
              <div className="space-y-4">
                <div>
                  <Label>Name</Label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                  <Label>Location</Label>
                  <Input value={location} onChange={(e) => setLocation(e.target.value)} />
                </div>
                <div>
                  <Label>Skills Offered</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {skillsOffered.map((skill, index) => (
                      <Badge key={index} className="rounded-full flex items-center gap-1">
                        {skill}
                        <X className="w-3 h-3 cursor-pointer" onClick={() => removeSkill("offered", index)} />
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Availability</Label>
                  <Input value={availability} onChange={(e) => setAvailability(e.target.value)} />
                </div>
                <div>
                  <Label>Profile</Label>
                  <Input value={profileStatus} onChange={(e) => setProfileStatus(e.target.value)} />
                </div>
              </div>

              {/* Right */}
              <div className="space-y-4">
                <div className="flex flex-col items-center gap-2">
                  <Avatar className="w-24 h-24 ring ring-ring ring-offset-2 ring-offset-background">
                    {image ? (
                      <AvatarImage src={image} alt="Uploaded" />
                    ) : (
                      <AvatarFallback>JD</AvatarFallback>
                    )}
                  </Avatar>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Add/Edit
                    </Button>
                    {image && (
                      <Button variant="link" size="sm" className="text-red-500" onClick={handleRemoveImage}>
                        Remove
                      </Button>
                    )}
                  </div>
                </div>

                <div>
                  <Label>Skills Wanted</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {skillsWanted.map((skill, index) => (
                      <Badge key={index} className="rounded-full flex items-center gap-1">
                        {skill}
                        <X className="w-3 h-3 cursor-pointer" onClick={() => removeSkill("wanted", index)} />
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
