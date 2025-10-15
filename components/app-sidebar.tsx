import { Home, Heart, ShoppingCart, History, Shirt, Watch, Gem } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Main menu items
const mainItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Favorite Items", url: "/favorite", icon: Heart },
  { title: "Cart Items", url: "/cart", icon: ShoppingCart },
  { title: "Purchase History", url: "/purchase_history", icon: History },
]

// Category items
const categoryItems = [
  { title: "Clothing", url: "/category/clothing", icon: Shirt },
  { title: "Accessories", url: "/category/accessories", icon: Watch },
  { title: "Jewelry", url: "/category/jewelry", icon: Gem },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>    
        <SidebarGroup>
          <SidebarGroupLabel  className="mt-10">Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* カテゴリ欄
        <SidebarGroup>
          <SidebarGroupLabel>Categories</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {categoryItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup> */}

      </SidebarContent>
    </Sidebar>
  )
}
