"use client"
import "../app/globals.css"
import { X } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import * as React from "react"
import { menuItens } from "@/app/configs/MenuItens";
import { usePathname } from "next/navigation";
import { Separator } from "@radix-ui/react-separator";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.

export default function SidebarApp({ ...props }: React.ComponentProps<typeof Sidebar>) {

    const IsMobile = useIsMobile()
    const { toggleSidebar } = useSidebar()
    const pathname = usePathname()
    console.log(pathname)
    return (

        <Sidebar {...props} className="top-[calc(var(--header-height)+6px)] drop-shadow-md h-[92vh] border-r border-primary bg-white z-20"
            variant="inset"
            collapsible="offcanvas">
            {IsMobile ? <X color="var(--color-primary)" className="cursor-pointer" onClick={() => { toggleSidebar() }} />
                : <X size={26} color="var(--color-primary)" className="cursor-pointer ml-auto" onClick={() => { toggleSidebar() }} />}
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu className="text-gray-300">
                            {menuItens.map((item) => (
                                <SidebarMenuItem className="text-gray-300" key={item.title}>
                                    <SidebarMenuButton asChild isActive={pathname === item.href ? true : false}>
                                        <a href={item.href} className="text-gray-800 font-medium">
                                            {item.title}
                                        </a>
                                    </SidebarMenuButton>
                                    {item.subMenu?.length ? (
                                        <SidebarMenuSub>
                                            {item.subMenu.map((item) => (
                                                <SidebarMenuSubItem key={item.title}>
                                                    <SidebarMenuSubButton
                                                        className="text-gray-600"
                                                        asChild
                                                    >
                                                        <a href={item.href}>{item.title}</a>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            ))}
                                        </SidebarMenuSub>
                                    ) : null}
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    )
}
