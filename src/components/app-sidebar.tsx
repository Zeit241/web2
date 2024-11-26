"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { BriefcaseMedical, Home, Newspaper, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function AppSidebar() {
  const router = useRouter();
  const items = [
    {
      title: "Доктора",
      tab: "doctors",
      icon: Stethoscope,
    },
    {
      title: "Услуги",
      tab: "services",
      icon: BriefcaseMedical,
    },
    {
      title: "Новости",
      tab: "news",
      icon: Newspaper,
    },
  ];

  return (
    <Sidebar className={"mt-16"}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Button onClick={() => router.push("?tab=" + item.tab)}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
