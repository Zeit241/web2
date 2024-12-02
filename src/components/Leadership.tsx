"use client";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

interface Doctor {
  id: number;
  name: string;
  position: string;
  photo: string;
  description: string;
}

export default function Leadership() {
  const [leaders, setLeaders] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLeadership = async () => {
      try {
        const response = await fetch('/api/doctors?position=Главный врач,Генеральный директор');
        const data = await response.json();
        
        if (data.doctors) {
          setLeaders(data.doctors);
        }
      } catch (error) {
        console.error("Error fetching leadership:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeadership();
  }, []);

  if (isLoading) {
    return (
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center">
            Наша Команда
          </h2>
          <div className="flex gap-6 flex-row flex-wrap justify-center">
            {[1, 2].map((i) => (
              <Card key={i} className="w-2/5">
                <CardHeader>
                  <Skeleton className="h-[150px] w-[150px] rounded-full mx-auto" />
                  <Skeleton className="h-6 w-[250px] mx-auto mt-4" />
                  <Skeleton className="h-4 w-[200px] mx-auto mt-2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="team" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center">
          Наша Команда
        </h2>
        <div className="flex gap-6 flex-row flex-wrap justify-center">
          {leaders.map((leader) => (
            <Card key={leader.id} className="w-2/5">
              <CardHeader>
                <Image
                  alt={leader.name}
                  className="mx-auto rounded-full"
                  height={150}
                  width={150}
                  src={leader.photo || "/images/doctor_placeholder.webp"}
                  style={{
                    aspectRatio: "150/150",
                    objectFit: "cover",
                  }}
                />
                <CardTitle className="text-center mt-4">
                  {leader.name}
                </CardTitle>
                <CardDescription className="text-center">
                  {leader.position}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 text-center">
                  {leader.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
} 