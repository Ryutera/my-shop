"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Home, Heart, ShoppingCart, History, ChevronDown } from "lucide-react";

// ---- data
const mainItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Favorite Items", url: "/favorite", icon: Heart },
  { title: "Cart Items", url: "/cart", icon: ShoppingCart },
  { title: "Purchase History", url: "/purchase_history", icon: History },
] as const;

const categorySlugs = [
  { title: "Jackets", slug: "jackets" },
  { title: "Coats", slug: "coats" },
  { title: "Shirts", slug: "shirts" },
  { title: "T-shirts", slug: "t-shirts" },
  { title: "Pants", slug: "pants" },
  { title: "Knit / Sweaters", slug: "knit" },
  { title: "Accessories", slug: "accessories" },
  { title: "Other", slug: "other" },
] as const;

const infoItems = [
  { title: "About", url: "/about" },
  { title: "Shipping & Delivery", url: "/info/shipping" },
  { title: "Returns / Refunds", url: "/info/returns" },
  { title: "特定商取引法に基づく表記", url: "/legal/tokusho" },
] as const;

export function AppSidebar() {
  const pathname = usePathname();
  const { toggleSidebar } = useSidebar();

  // 現在のURLがカテゴリ配下なら、自動で開く
  const categoryOpenDefault = useMemo(() => pathname.startsWith("/category"), [pathname]);

  const isActive = (url: string) =>
    url === "/" ? pathname === "/" : pathname.startsWith(url);

  // モバイル時のみ閉じる（簡易判定）
  const closeIfMobile = () => {
    if (typeof window !== "undefined" && window.matchMedia("(max-width: 1024px)").matches) {
      toggleSidebar();
    }
  };

  
  return (
    <Sidebar>
      <SidebarContent className="space-y-6">
        {/* Main */}
        {/* <SidebarGroup>
          <SidebarGroupLabel className="mt-10 text-xs tracking-wider text-muted-foreground">
            MAIN
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={[
                        "px-3 py-2 rounded-lg text-sm gap-2",
                        active ? "bg-muted/60 font-medium" : "hover:bg-muted/40",
                      ].join(" ")}
                    >
                      <Link
                        href={item.url}
                        aria-current={active ? "page" : undefined}
                        onClick={closeIfMobile}
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        <span className="truncate">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup> */}

        {/* Categories */}

        <div className="flex flex-col h-full my-10">
        <SidebarGroup>
         
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className=" py-2 rounded-lg text-sm gap-2 hover:bg-muted/40"
                >
                  <CollapsibleTrigger
                    aria-expanded={categoryOpenDefault}
                    className="mt-10 text-xs tracking-wider text-muted-foreground"
                  >
                     CATEGORIES
                    <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </CollapsibleTrigger>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>

            <CollapsibleContent>
              <SidebarGroupContent className="mt-1 mb-2">
                <SidebarMenu>
                  {categorySlugs.map((item) => {
                    const url = `/category/${item.slug}`;
                    const active = isActive(url);
                    return (
                      <SidebarMenuItem key={item.slug}>
                        <SidebarMenuButton
                          asChild
                          className={[
                            "px-3 py-4 rounded-lg text-sm text-gray-800",
                            active ? "bg-muted/60 font-medium" : "hover:bg-muted/40",
                          ].join(" ")}
                        >
                          <Link
                            href={url}
                            aria-current={active ? "page" : undefined}
                             onClick={() => toggleSidebar()}
                            
                          >
                            <span className="truncate">{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>

        {/* Info */}
        <SidebarGroup className="mt-auto pt-8  border-t border-muted/40">
          <SidebarGroupLabel className="mt-10 text-xs tracking-wider text-muted-foreground">
            {/* INFO */}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {infoItems.map((it) => {
                const active = isActive(it.url);
                return (
                  <SidebarMenuItem key={it.title}>
                    <SidebarMenuButton
                      asChild
                      className={[
                        "px-3 py-2 rounded-lg text-sm",
                        active ? "bg-muted/60 font-medium" : "hover:bg-muted/40",
                      ].join(" ")}
                    >
                      <Link
                        href={it.url}
                        aria-current={active ? "page" : undefined}
                         onClick={() => toggleSidebar()}
                      >
                        <span className="truncate text-gray-500">{it.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        </div>
      </SidebarContent>
    </Sidebar>
  );
}
