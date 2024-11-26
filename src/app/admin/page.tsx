"use client";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Activity } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import { useRouter, useSearchParams } from "next/navigation";
import DashboardTable from "@/components/Table";

type TabType = "doctors" | "services" | "news";

type DoctorsDataType = {
  id: number;
  name: string;
  specialty: string;
};

type ServicesDataType = {
  id: number;
  name: string;
  description: string;
};

type NewsDataType = {
  id: number;
  title: string;
  content: string;
};

type Data =
  | ({ type: "doctors" } & DoctorsDataType)
  | ({ type: "services" } & ServicesDataType)
  | ({ type: "news" } & NewsDataType);

const TabNames = {
  doctors: "Доктора",
  services: "Услуги",
  news: "Новости",
};
export default function Page() {
  const mockDoctors: DoctorsDataType[] = [
    { id: 1, name: "Dr. Sarah Johnson", specialty: "Cardiology" },
    { id: 2, name: "Dr. Michael Lee", specialty: "Pediatrics" },
    { id: 3, name: "Dr. Emily Chen", specialty: "Dermatology" },
  ];

  const mockServices = [
    {
      id: 1,
      name: "Cardiology Services",
      description: "Heart health and treatments",
    },
    {
      id: 2,
      name: "Pediatric Care",
      description: "Specialized care for children",
    },
    { id: 3, name: "Dermatology", description: "Skin health and treatments" },
  ];

  const mockNews = [
    {
      id: 1,
      title: "New MRI Machine",
      content: "MedLux Clinic acquires state-of-the-art MRI technology",
    },
    {
      id: 2,
      title: "COVID-19 Vaccination Drive",
      content: "Join our vaccination program this weekend",
    },
    {
      id: 3,
      title: "Dr. Johnson's Research Published",
      content: "Groundbreaking cardiac study in medical journal",
    },
  ];
  const [activeTab, setActiveTab] = useState<TabType | null>(null);
  const [data, setData] =
    useState<(DoctorsDataType | ServicesDataType | NewsDataType)[]>();

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab !== "doctors" && tab !== "services" && tab !== "news") {
      router.push("?tab=doctors");
    } else {
      setActiveTab(tab);
    }
  }, [searchParams]);

  useEffect(() => {
    if (activeTab === "doctors") {
      setData(mockDoctors);
    } else if (activeTab === "services") {
      setData(mockServices);
    } else if (activeTab === "news") {
      setData(mockNews);
    }
  }, [activeTab]);

  useEffect(() => {
    console.log("=>(page.tsx:88) data", data);
  }, [data]);
  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="w-full flex h-16 px-8 items-center justify-between">
          <Link className="flex items-center gap-2" href="/">
            <Activity size={32} color={"red"} />
            <span className="text-2xl font-extrabold text-blue-600">
              MedLux
            </span>
          </Link>
          <nav className="flex gap-4 sm:gap-6">
            <Button className="text-base font-medium" variant="link">
              Выйти
            </Button>
          </nav>
        </div>
      </header>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className={""}>
          <header className="flex h-16 shrink-0 items-center gap-2">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="block">
                    <BreadcrumbLink href="#">
                      Панель администратора
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{TabNames[activeTab!]}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0 max-h-screen overflow-hidden">
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
              {activeTab && data && (
                <DashboardTable type={activeTab!} data={data} />
              )}
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
