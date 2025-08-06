"use client";
import "../app/globals.css";
import { X } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import * as React from "react";
import { menuItens } from "@/app/configs/MenuItens";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { MoonIcon, Sun } from "lucide-react";
import { useSession } from "next-auth/react";
import { SignOut } from "@/app/SignOut/action";
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
} from "@/components/ui/sidebar";

export default function SidebarApp({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();

  const IsMobile = useIsMobile();

  const { toggleSidebar } = useSidebar();

  const pathname = usePathname();

  const { setTheme, theme } = useTheme();

  const sideMenuItems = [
    ...menuItens,
    {
      title: "Account Settings",
      href: "/myaccount",
      hasDropDownMenu: false,
      hasFunction: false,
    },
    {
      title: session ? "Sign Out" : "Sign in",
      href: session ? "signOut" : "/signIn",
      hasDropDownMenu: false,
      hasFunction: true,
    },
  ];

  return (
    <Sidebar
      {...props}
      className="top-[calc(var(--header-height)+6px)] drop-shadow-md h-[92vh] p-2 border-r border-primary dark:border-[#27272a] bg-[var(--background)] z-20"
      variant="inset"
      collapsible="offcanvas"
    >
      <div className="flex flex-row my-2 px-2">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="mb-auto top-0 flex cursor-pointer"
        >
          {theme === "dark" ? (
            <MoonIcon color="white" className="top-0" />
          ) : (
            <Sun color="var(--color-primary)" />
          )}
        </button>
        {IsMobile ? (
          <X
            color="var(--color-primary)"
            className="cursor-pointer ml-auto"
            onClick={() => {
              toggleSidebar();
            }}
          />
        ) : (
          <X
            size={26}
            color="var(--color-primary)"
            className="cursor-pointer ml-auto"
            onClick={() => {
              toggleSidebar();
            }}
          />
        )}
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="dark:text-white">
              {sideMenuItems.map((item) => {
                return (
                  <SidebarMenuItem className="" key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href ? true : false}
                    >
                      {item.title === "Sign Out" ? (
                        <form
                          className="cursor-pointer w-full text-start"
                          action={SignOut}
                        >
                          <button
                            className="cursor-pointer font-semibold w-full text-start"
                            type="submit"
                          >
                            Sign Out
                          </button>
                        </form>
                      ) : (
                        <a
                          href={item.href}
                          className="text-gray-800 dark:text-white font-medium"
                        >
                          {item.title}
                        </a>
                      )}
                    </SidebarMenuButton>
                    {item.subMenu?.length ? (
                      <SidebarMenuSub>
                        {item.subMenu.map((item) => (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton
                              className="text-gray-600 dark:text-white"
                              asChild
                            >
                              <a href={item.href}>{item.title}</a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    ) : null}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
