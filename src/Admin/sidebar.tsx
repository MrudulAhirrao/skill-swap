import * as React from "react"
import { GalleryVerticalEnd} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom"

// This is sample data.
const data = {
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      items: [
        {
          title: "Dashboard",
          url: "/profile",
        },
        {
          title: "Skill Moderation",
          url: "/skillmoderation",
        },
        {
          title: "User Management",
          url: "/usermanagement",
        },
        {
          title: "Swap Monitoering",
          url: "/swapmonitor",
        },
        {
          title: "Broadcast Message",
          url: "/broadcastmess",
        },
        {
          title: "Reports",
          url: "/reports",
        },
      ],
    },
    {
      title: "Asscebility",
      url: "#",
      items: [
        {
          title: "Settings",
          url: "/adminsettings",
        },
        {
          title: "Log Out",
          url: "#",
        },
        {
          title: "Back to Home",
          url: "/",
        },
      ],
    },
  ],
}

export function AdminSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">Kshitij</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <span className="font-medium">{item.title}</span>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub className="ml-0 border-l-0 px-1.5">
                    {item.items.map((subitem) => (
                      <SidebarMenuSubItem key={subitem.title}>
                        <SidebarMenuSubButton asChild>
                          <Link to={`${subitem.url.replace('./', '/')}`}>
                            {subitem.title}
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
