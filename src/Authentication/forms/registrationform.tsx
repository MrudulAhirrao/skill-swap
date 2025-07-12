import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Link } from "react-router-dom"
import { registerUser } from "@/lib/api"

export default function Registrationform() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    location: "",
    availability: "",
    isPublic: true,
    photo: "",
  })

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target
    setForm((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, photo: reader.result as string }))
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("")
    setLoading(true)

    if (form.password !== form.confirmPassword) {
      setMessage("Passwords do not match.")
      setLoading(false)
      return
    }

    try {
      await registerUser({
        email: form.email,
        password: form.password,
        name: form.name,
        location: form.location,
        availability: form.availability,
        isPublic: form.isPublic,
        photo: form.photo,
      })
      setMessage("✅ Registration successful! You can now log in.")
    } catch (err: any) {
      setMessage(`❌ ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-4">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Create an Account</CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="John Doe" value={form.name} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" value={form.password} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" type="password" placeholder="••••••••" value={form.confirmPassword} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="City or Region" value={form.location} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="availability">Availability</Label>
              <Input id="availability" placeholder="e.g. Weekdays, Holidays" value={form.availability} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="photo">Profile Photo</Label>
              <Input id="photo" type="file" accept="image/*" onChange={handleImageUpload} required />
            </div>

            <div className="flex items-center gap-2">
              <Input id="isPublic" type="checkbox" checked={form.isPublic} onChange={handleChange} />
              <Label htmlFor="isPublic">Make profile public</Label>
            </div>

            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </Button>

            {message && <p className="text-center text-sm text-muted-foreground">{message}</p>}
          </form>

          <Separator />

          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}