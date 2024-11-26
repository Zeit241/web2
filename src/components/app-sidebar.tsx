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
import { useState } from "react";

export function AppSidebar() {
  const [tab, setTab] = useState("doctors")
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
          <SidebarGroupLabel>Выберите раздел</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Button onClick={() => {
                      setTab(item.tab)
                      router.push("?tab=" + item.tab)
                    }} variant={"link"} className={`p-3 h-12 flex items-center justify-start ${tab === item.tab && "bg-secondary"}`}>
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
