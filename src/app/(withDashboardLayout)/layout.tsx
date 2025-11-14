"use client";

import { AppSidebar } from "@/components/modules/dashboard/sidebar/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useUser } from "@/context/UserContext";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user } = useUser();

  // ইউজারের আসল role (uppercase থেকে lowercase এ কনভার্ট করা)
  const userRole = user?.role?.toLowerCase() as
    | "admin"
    | "doctor"
    | "patient"
    | undefined;

  // ডাইনামিক role সেট করা
  let role: "admin" | "doctor" | "patient" = userRole || "patient";
  console.log(role);

  // pathname অনুযায়ী মিলিয়ে চেক করা
  if (pathname.startsWith("/admin") && userRole === "admin") role = "admin";
  else if (pathname.startsWith("/doctor") && userRole === "doctor")
    role = "doctor";
  else if (pathname.startsWith("/patient") && userRole === "patient")
    role = "patient";

  return (
    <SidebarProvider>
      <AppSidebar role={role} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
          </div>
        </header>
        <div className="p-4 pt-0 min-h-screen">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
