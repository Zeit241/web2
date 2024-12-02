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
import { signOut } from "next-auth/react";

type TabType = "doctors" | "services" | "news" | "specializations" | "categories";

interface Doctor {
  id: number;
  name: string;
  experience: number;
  phone: string;
  email: string;
  photo: string;
  position: 'Доктор' | 'Главный врач' | 'Генеральный директор';
  description: string;
  specializations: string[];
}

interface Service {
  id: number;
  service_name: string;
  service_description: string;
  price: number;
  category_name: string;
  created_at: string;
}

interface News {
  id: number;
  title: string;
  content: string;
  published_at: string;
}

interface Specialization {
  id: number;
  name: string;
  description: string;
}

interface ServiceCategory {
  id: number;
  name: string;
  description: string;
}

const TabNames = {
  doctors: "Доктора",
  specializations: "Специализации",
  services: "Услуги",
  categories: "Категории услуг",
  news: "Новости",
};

export default function Page() {
  const [activeTab, setActiveTab] = useState<TabType | null>(null);
  const [data, setData] = useState<(Doctor | Service | News | Specialization | ServiceCategory)[]>();
  const [isLoading, setIsLoading] = useState(true);

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (!TabNames[tab as TabType]) {
      router.push("?tab=doctors");
    } else {
      setActiveTab(tab as TabType);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let response;
        
        if (activeTab === "doctors") {
          response = await fetch('/api/doctors');
          const data = await response.json();
          setData(data.doctors);
        } 
        else if (activeTab === "services") {
          response = await fetch('/api/services');
          const data = await response.json();
          setData(data.services);
        }
        else if (activeTab === "news") {
          response = await fetch('/api/news');
          const data = await response.json();
          setData(data.news);
        }
        else if (activeTab === "specializations") {
          response = await fetch('/api/specializations');
          const data = await response.json();
          setData(data.specializations);
        }
        else if (activeTab === "categories") {
          response = await fetch('/api/categories');
          const data = await response.json();
          setData(data.categories);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (activeTab) {
      fetchData();
    }
  }, [activeTab]);

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
            <Button className="text-base font-medium" variant="link" onClick={() => signOut()}>
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
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
              {activeTab && data && (
                <DashboardTable type={activeTab} data={data} />
              )}
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
