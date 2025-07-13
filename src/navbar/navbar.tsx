import { Link } from "react-router-dom"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  ArrowRightLeft,
  Bell,
  LogOut,
  Settings,
  UserRound,
} from "lucide-react"
import { useState } from "react"

export default function Navbar() {
  // Simulated login state (replace with real auth logic later)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-background border-b shadow-sm px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold tracking-tight">⚡ SkillSwap</h1>

      <div className="flex gap-3 items-center">
        {/* Swap Requests Icon */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon">
              <ArrowRightLeft className="w-5 h-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="text-sm w-60">
            <p>No new swap requests.</p>
          </PopoverContent>
        </Popover>

        {/* Notifications Icon */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-ping" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="text-sm w-60">
            <p>No new notifications.</p>
          </PopoverContent>
        </Popover>

        {isLoggedIn ? (
          // Avatar + Dropdown for logged-in users
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-8 w-8 cursor-pointer">
                <AvatarImage src="" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to="/profile" className="flex items-center">
                  <UserRound className="w-4 h-4 mr-2" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings" className="flex items-center">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setIsLoggedIn(false)}
                className="text-destructive"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          // Show login button if not logged in
          <Link to="/login">
            <Button variant="outline" className="text-sm px-4 py-2">
              Login
            </Button>
          </Link>
        )}
      </div>
    </header>
  )
}
