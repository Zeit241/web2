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
import React from "react";
import { Badge } from "@/components/ui/badge";

export default function DoctorCard() {
  return (
    <Carousel
      opts={{
        loop: true,
      }}
    >
      <CarouselContent>
        {dataset.map((e, i) => (
          <CarouselItem className="md:basis-1/2 lg:basis-1/3" key={i}>
            <DoctorsCardContent data={e} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

function DoctorsCardContent(props: {
  data: {
    fullName: string;
    experience: string;
    about: string;
    specialties: string[];
  };
}) {
  const { fullName, experience, about, specialties } = props.data;

  return (
    <Card className={"flex flex-col p-5 h-60"}>
      <CardHeader className={"flex flex-row p-0 gap-2"}>
        <div className={"w-28 h-28 rounded-full overflow-hidden relative"}>
          <Image
            src={"/images/doctor-card.jpg"}
            width={500}
            height={500}
            alt={""}
            objectFit={"cover"}
          />
        </div>

        <div>
          <CardDescription className={"flex flex-row gap-2 mb-2"}>
            {specialties.map((e, i, a) => (
              <Badge className={"bg-white border-gray-400 text-black"} key={i}>
                {e}
              </Badge>
            ))}
          </CardDescription>
          <div>
            <CardTitle>{fullName}</CardTitle>
            <span>{experience}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500 mt-3">{about}</p>
      </CardContent>
    </Card>
  );
}

const dataset = [
  {
    fullName: "Петрова Анна Сергеевна",
    experience: "Стаж: 12 лет",
    about:
      "Петрова специализируется на педиатрии и уделяет особое внимание заботе о здоровье и развитии детей.",
    specialties: ["Аллерголог", "Неонатолог"],
  },
  {
    fullName: "Сидоров Иван Викторович",
    experience: "Стаж: 8 лет",
    about:
      "Сидоров имеет опыт работы в детской эндокринологии и успешно помогает в лечении гормональных нарушений.",
    specialties: ["Эндокринолог", "Иммунолог"],
  },
  {
    fullName: "Кузнецова Елена Николаевна",
    experience: "Стаж: 15 лет",
    about:
      "Кузнецова – эксперт в области профилактической медицины для детей, уделяет внимание укреплению иммунной системы.",
    specialties: ["Иммунолог", "Терапевт"],
  },
  {
    fullName: "Морозов Алексей Владимирович",
    experience: "Стаж: 10 лет",
    about:
      "Морозов специализируется на педиатрии и детской хирургии. Он делает всё для улучшения здоровья маленьких пациентов.",
    specialties: ["Хирург", "Ортопед"],
  },
  {
    fullName: "Николаева Светлана Петровна",
    experience: "Стаж: 9 лет",
    about:
      "Николаева известна своим подходом к лечению детей с респираторными заболеваниями.",
    specialties: ["Пульмонолог", "Аллерголог"],
  },
  {
    fullName: "Иванов Константин Иванович",
    experience: "Стаж: 14 лет",
    about: "Иванов – ведущий специалист по детским инфекционным заболеваниям.",
    specialties: ["Инфекционист", "Иммунолог"],
  },
  {
    fullName: "Лебедева Мария Андреевна",
    experience: "Стаж: 6 лет",
    about:
      "Лебедева делает акцент на кардиологическом обследовании детей и профилактике заболеваний сердца.",
    specialties: ["Кардиолог", "Терапевт"],
  },
  {
    fullName: "Смирнов Дмитрий Александрович",
    experience: "Стаж: 11 лет",
    about:
      "Смирнов помогает детям с проблемами ЖКТ, уделяя особое внимание диетологии.",
    specialties: ["Гастроэнтеролог", "Диетолог"],
  },
  {
    fullName: "Фёдорова Наталья Михайловна",
    experience: "Стаж: 7 лет",
    about:
      "Фёдорова активно занимается профилактикой детских инфекционных заболеваний.",
    specialties: ["Инфекционист", "Педиатр"],
  },
  {
    fullName: "Романов Сергей Петрович",
    experience: "Стаж: 13 лет",
    about: "Романов специализируется на ортопедии и травматологии у детей.",
    specialties: ["Ортопед", "Хирург"],
  },
  {
    fullName: "Волкова Ольга Викторовна",
    experience: "Стаж: 5 лет",
    about: "Волкова сосредоточена на лечении детских аллергических реакций.",
    specialties: ["Аллерголог", "Иммунолог"],
  },
  {
    fullName: "Захаров Павел Игоревич",
    experience: "Стаж: 16 лет",
    about: "Захаров известен своим вкладом в область детской психиатрии.",
    specialties: ["Психиатр", "Невролог"],
  },
  {
    fullName: "Гордеева Ирина Сергеевна",
    experience: "Стаж: 10 лет",
    about:
      "Гордеева ведет прием как педиатр с опытом в диетологии и спортивной медицине.",
    specialties: ["Диетолог", "Педиатр"],
  },
  {
    fullName: "Крылов Александр Николаевич",
    experience: "Стаж: 20 лет",
    about:
      "Крылов – опытный специалист в детской хирургии с упором на минимально инвазивные методы.",
    specialties: ["Хирург", "Ортопед"],
  },
  {
    fullName: "Тихонова Валентина Андреевна",
    experience: "Стаж: 9 лет",
    about:
      "Тихонова помогает детям с проблемами дыхательной системы и проводит диагностику легочных заболеваний.",
    specialties: ["Пульмонолог", "Терапевт"],
  },
];
