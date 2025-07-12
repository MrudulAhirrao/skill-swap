import { useState } from "react"
import { Link } from "react-router-dom"
import Navbar from "@/navbar/navbar"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const profiles = [
  {
    id: 1,
    name: "Marc Demo",
    avatar: "",
    offered: ["JavaScript", "Python"],
    wanted: ["Photoshop", "Graphic Design"],
    rating: 3.9,
    availability: "weekends",
  },
  {
    id: 2,
    name: "Michell",
    avatar: "",
    offered: ["C++", "Rust"],
    wanted: ["UI Design", "UX Writing"],
    rating: 4.4,
    availability: "anytime",
  },
  {
    id: 3,
    name: "Joe Wills",
    avatar: "",
    offered: ["React", "Node.js"],
    wanted: ["Figma", "After Effects"],
    rating: 4.8,
    availability: "evenings",
  },
]

export default function HomePage() {
  const [search, setSearch] = useState("")
  const [availability, setAvailability] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 3

  const filteredProfiles = profiles.filter((user) => {
    const matchesSearch =
      search === "" ||
      user.offered.some((skill) =>
        skill.toLowerCase().includes(search.toLowerCase())
      ) ||
      user.wanted.some((skill) =>
        skill.toLowerCase().includes(search.toLowerCase())
      )
    const matchesAvailability =
      availability === "" || user.availability === availability
    return matchesSearch && matchesAvailability
  })

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Search & Filter Controls */}
      <div className="px-6 pt-6 flex flex-col md:flex-row gap-4 md:items-center justify-between">
        <Input
          placeholder="Search skill..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-[300px]"
        />
        <Select onValueChange={setAvailability}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Select availability" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weekends">Weekends</SelectItem>
            <SelectItem value="evenings">Evenings</SelectItem>
            <SelectItem value="anytime">Anytime</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Profile Grid */}
      <main className="px-6 py-8 grid gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfiles.map((user) => (
            <Link to="/viewdetail" key={user.id} className="group">
              <Card className="hover:shadow-xl transition-all border rounded-xl overflow-hidden">
                <CardContent className="p-6 flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-14 w-14">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold">{user.name}</h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        {user.rating.toFixed(1)} / 5
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-green-600 font-medium text-sm mb-1">Skills Offered</p>
                    <div className="flex flex-wrap gap-2">
                      {user.offered.map((skill) => (
                        <Badge key={skill} variant="default">{skill}</Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-blue-600 font-medium text-sm mt-2 mb-1">Skills Wanted</p>
                    <div className="flex flex-wrap gap-2">
                      {user.wanted.map((skill) => (
                        <Badge key={skill} variant="outline">{skill}</Badge>
                      ))}
                    </div>
                  </div>

                  <Button size="sm" className="mt-4 w-full">View Profile</Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 py-6">
        <Button
          variant="ghost"
          size="icon"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        {Array.from({ length: totalPages }).map((_, idx) => (
          <Button
            key={idx}
            size="sm"
            variant={currentPage === idx + 1 ? "default" : "ghost"}
            className="rounded-full w-8 h-8"
            onClick={() => setCurrentPage(idx + 1)}
          >
            {idx + 1}
          </Button>
        ))}
        <Button
          variant="ghost"
          size="icon"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
