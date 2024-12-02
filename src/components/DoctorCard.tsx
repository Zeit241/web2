"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

interface Doctor {
  id: number;
  name: string;
  experience: string;
  photo: string;
  position: string;
  description: string;
  specializations: string[];
}

export default function DoctorCard() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/doctors')
      .then(res => res.json())
      .then(data => {
        if (data.doctors) {
          setDoctors(data.doctors.slice(0, 7));
          setIsLoading(false);
        }
      });
  }, []);

  if (isLoading) {
    return (
      <Carousel opts={{ loop: true }}>
        <CarouselContent>
          {[...Array(3)].map((_, i) => (
            <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
              <Card className="flex flex-col p-5 h-60">
                <CardHeader className="flex flex-row p-0 gap-2">
                  <Skeleton className="w-28 h-28 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-16 w-full mt-3" />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    );
  }

  return (
    <Carousel opts={{ loop: true }}>
      <CarouselContent>
        {doctors.map((doctor) => (
          <CarouselItem key={doctor.id} className="md:basis-1/2 lg:basis-1/3">
            <Link href={`/doctors/${doctor.id}`}>
              <Card className="flex flex-col p-5 h-60 hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row p-0 gap-2">
                  <div className="w-28 h-28 rounded-full overflow-hidden relative">
                    <Image
                      src={doctor.photo || "/images/doctor_placeholder.webp"}
                      fill
                      alt={doctor.name}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <CardDescription className="flex flex-row gap-2 mb-2">
                      {doctor.specializations.map((spec, i) => (
                        <Badge 
                          className="bg-white border-gray-400 text-black" 
                          key={i}
                        >
                          {spec}
                        </Badge>
                      ))}
                    </CardDescription>
                    <div>
                      <CardTitle>{doctor.name}</CardTitle>
                      <span>Стаж работы: {doctor.experience}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mt-3">
                    {doctor.description.slice(0, 180)}...
                  </p>
                </CardContent>
              </Card>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
