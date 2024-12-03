"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Star, PhoneCall } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface Doctor {
  id: number;
  name: string;
  experience: number;
  photo: string;
  specializations: string[];
}

interface Specialization {
  id: number;
  name: string;
}

const DoctorCardSkeleton = () => (
  <Card>
    <CardHeader>
      <div className="flex justify-center">
        <Skeleton className="h-[150px] w-[150px] rounded-full" />
      </div>
      <div className="mt-4 space-y-2">
        <Skeleton className="h-6 w-3/4 mx-auto" />
        <Skeleton className="h-4 w-2/3 mx-auto" />
      </div>
    </CardHeader>
    <CardContent className="text-center space-y-4">
      <Skeleton className="h-4 w-1/2 mx-auto" />
      <Skeleton className="h-10 w-full" />
    </CardContent>
  </Card>
);

const TabsSkeleton = () => (
  <div className="hidden md:flex flex-wrap gap-2">
    <Skeleton className="h-10 w-24" /> {/* Для "Все врачи" */}
    {[1, 2, 3, 4].map((_, index) => (
      <Skeleton key={index} className="h-10 w-32" />
    ))}
  </div>
);

const SelectSkeleton = () => (
  <div className="w-full md:hidden">
    <Skeleton className="h-10 w-full" />
  </div>
);

const DoctorCard = ({ doctor }: { doctor: Doctor }) => {
  const [showDialog, setShowDialog] = useState(false);

  // Преобразование Buffer в base64
  const getImageUrl = (photo: any): string => {
    return photo || "/images/doctor_placeholder.webp";
  };

  const imageUrl = getImageUrl(doctor.photo);

  return (
    <>
      <Card>
        <CardHeader>
          <Image
            alt={doctor.name}
            className="mx-auto rounded-full"
            height="150"
            width="150"
            src={imageUrl}
            style={{
              aspectRatio: "150/150",
              objectFit: "cover",
            }}
          />
          <CardTitle className="text-center mt-4">
            {doctor.name}
          </CardTitle>
          <CardDescription className="text-center">
            {doctor.specializations.join(", ")}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-sm text-gray-500 mb-4">
            Опыт работы: {doctor.experience} лет
          </p>
          <Button 
            className="w-full" 
            onClick={() => setShowDialog(true)}
          >
            Записаться на прием
          </Button>
        </CardContent>
      </Card>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Запись на прием</DialogTitle>
            <DialogDescription className="pt-4">
              <div className="flex flex-col items-center gap-4">
                <p>В данный момент онлайн-запись недоступна.</p>
                <p>Пожалуйста, позвоните в регистратуру по номеру:</p>
                <div className="flex items-center gap-2 text-lg font-semibold">
                  <PhoneCall className="h-5 w-5" />
                  <a href="tel:+71234567890" className="text-primary hover:underline">
                    +7 (123) 456-78-90
                  </a>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setShowDialog(false)} className="w-full">
              Закрыть
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default function Doctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [specializations, setSpecializations] = useState<Specialization[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Загрузка специализаций
    fetch("/api/specializations")
      .then(res => res.json())
      .then(data => {
        if (data.specializations) {
          setSpecializations(data.specializations);
        }
      });

    // Загрузка всех докторов один раз
    fetch('/api/doctors')
      .then(res => res.json())
      .then(data => {
        if (data.doctors) {
          setDoctors(data.doctors);
          setIsLoading(false);
        }
      });


  }, []);

  const handleTabChange = (value: string) => {
    setSelectedSpecialization(value);
  };

  // Фильтрация докторов
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = 
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesSpecialization = 
      selectedSpecialization === "all" || 
      doctor.specializations.includes(selectedSpecialization);

    return matchesSearch && matchesSpecialization;
  });

  const renderDoctorsGrid = () => (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {isLoading ? (
        [...Array(6)].map((_, index) => (
          <DoctorCardSkeleton key={index} />
        ))
      ) : (
        filteredDoctors.map(doctor => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))
      )}
    </div>
  );

  return (
    <section className="flex flex-col min-h-screen">
      <div className="flex-1 container mx-auto px-4 py-8">
        <Tabs value={selectedSpecialization} onValueChange={handleTabChange} className="w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            {isLoading ? (
              <>
                <SelectSkeleton />
                <TabsSkeleton />
              </>
            ) : (
              <>
                {/* Мобильное меню */}
                <div className="w-full md:hidden">
                  <Select
                    value={selectedSpecialization}
                    onValueChange={setSelectedSpecialization}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Выберите специализацию" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все врачи</SelectItem>
                      {specializations.map(spec => (
                        <SelectItem key={spec.id} value={spec.name}>
                          {spec.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Десктопное меню */}
                <div className="hidden md:block">
                  <TabsList className="flex flex-wrap gap-2 h-auto">
                    <TabsTrigger value="all" className="whitespace-nowrap">
                      Все врачи
                    </TabsTrigger>
                    {specializations.map(spec => (
                      <TabsTrigger 
                        key={spec.id} 
                        value={spec.name} 
                        className="whitespace-nowrap"
                      >
                        {spec.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
              </>
            )}

            {/* Поиск */}
            <div className="w-full md:w-auto">
              <Input
                placeholder="Поиск врача..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-[250px]"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Карточки докторов */}
          <TabsContent value="all" className="space-y-8">
            {renderDoctorsGrid()}
          </TabsContent>

          {specializations.map(spec => (
            <TabsContent key={spec.id} value={spec.name} className="space-y-8">
              {renderDoctorsGrid()}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}