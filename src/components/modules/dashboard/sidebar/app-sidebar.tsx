"use client";

import * as React from "react";
import { Bot, Hospital, Settings, SquareTerminal } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import Link from "next/link";

import { LucideIcon } from "lucide-react";
type Role = "admin" | "doctor" | "patient";

type NavItem = {
  title: string;
  url: string;
  icon: LucideIcon;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
  }[];
};

const navConfig: Record<Role, NavItem[]> = {
  admin: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: SquareTerminal,
    },
    {
      title: "Doctor",
      url: "/admin/doctors",
      icon: Bot,
      items: [
        { title: "Create Doctor", url: "/admin/doctor/create" },
        { title: "Manage Doctor", url: "/admin/doctor/manage" },
      ],
    },
    {
      title: "Settings",
      url: "/admin/settings",
      icon: Settings,
    },
  ],
  doctor: [
    {
      title: "Dashboard",
      url: "/doctor/dashboard",
      icon: SquareTerminal,
    },
    {
      title: "Patients",
      url: "/doctor/patients",
      icon: Bot,
      items: [
        { title: "View Patients", url: "/doctor/patients" },
        { title: "Reports", url: "/doctor/reports" },
      ],
    },
    {
      title: "Profile",
      url: "/doctor/profile",
      icon: Settings,
    },
  ],
  patient: [
    {
      title: "Dashboard",
      url: "/patient/dashboard",
      icon: SquareTerminal,
    },
    {
      title: "My Health",
      url: "/patient/health",
      icon: Settings,
      items: [
        { title: "Profile", url: "/patient/profile" },
        { title: "Prescriptions", url: "/patient/prescriptions" },
      ],
    },
  ],
};

export function AppSidebar({
  role = "patient",
  ...props
}: React.ComponentProps<typeof Sidebar> & { role?: Role }) {
  const navMain = navConfig[role] || [];

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex items-center justify-center">
                  <Hospital></Hospital>
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <h2 className="font-semibold text-blue-700">
                    Universal Health Care
                  </h2>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
