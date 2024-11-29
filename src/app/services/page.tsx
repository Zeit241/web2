"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Heart,
  Brain,
  Stethoscope,
  Baby,
  Eye,
  Bone,
  Microscope,
  ShieldCheck,
  Scissors,
  Loader2,
  Activity,
  Zap,
  Pill,
  Dna,
  Thermometer,
  UserPlus,
} from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton"

// import type { Metadata } from "next";

// export const metadata: Metadata = {
//   title: 'Medlux | Услуги',
//   description: `Клиника MedLux предоставляет исключительные медицинские услуги с 2005 года. Наша миссия – обеспечивать персонализированную и
//   качественную медицинскую помощь для улучшения здоровья и  благополучия нашего сообщества.`,
// }

export default function ServicesPage() {
  const [expandedService, setExpandedService] = useState<string | null>(null);


  const [servicesList, setServicesList] = useState<undefined | any[]>();

  useEffect(() => {
    fetch("/api/services")
      .then(e => e.json())
      .then((e) => {
        console.log(e)
        if (e.services) {
          setServicesList(e.services)
        }
      })

  }, [])


  const toggleService = (service: string) => {
    setExpandedService(expandedService === service ? null : service);
  };

  const featuredService = {
    title: "Передовая кардиологическая помощь",
    description:
      "Современные кардиоваскулярные лечения и профилактическая помощь",
    image: "/images/doctor-typing-laptop.jpg",
    features: [
      "Круглосуточная экстренная кардиологическая помощь",
      "Неинвазивная кардиологическая визуализация",
      "Интервенционная кардиология",
      "Электрофизиологические услуги",
      "Программы кардиологической реабилитации",
    ],
  };

  const specialties = [
    { icon: <Heart className="h-6 w-6" />, name: "Кардиология" },
    { icon: <Brain className="h-6 w-6" />, name: "Неврология" },
    { icon: <Stethoscope className="h-6 w-6" />, name: "Терапия" },
    { icon: <Baby className="h-6 w-6" />, name: "Педиатрия" },
    { icon: <Eye className="h-6 w-6" />, name: "Офтальмология" },
    { icon: <Bone className="h-6 w-6" />, name: "Ортопедия" },
    { icon: <Zap className="h-6 w-6" />, name: "Неотложная медицина" },
    { icon: <Pill className="h-6 w-6" />, name: "Онкология" },
    { icon: <Dna className="h-6 w-6" />, name: "Генетика" },
    { icon: <Thermometer className="h-6 w-6" />, name: "Эндокринология" },
    { icon: <UserPlus className="h-6 w-6" />, name: "Гериатрия" },
    { icon: <Activity className="h-6 w-6" />, name: "Пульмонология" },
  ];

  const detailedServices = [
    {
      id: "diagnostic",
      title: "Диагностические услуги",
      icon: <Microscope className="h-8 w-8 text-blue-600" />,
      description:
        "Всесторонние диагностические инструменты для точной оценки здоровья.",
      details: [
        "Продвинутая визуализация (МРТ, КТ, ПЭТ сканирование)",
        "Лабораторные исследования",
        "Кардиологические стресс-тесты",
        "Эндоскопия и колоноскопия",
        "Ультразвуковые и допплеровские исследования",
        "Сканирование плотности костей",
        "Исследования сна",
      ],
    },
    {
      id: "preventive",
      title: "Профилактическая помощь",
      icon: <ShieldCheck className="h-8 w-8 text-blue-600" />,
      description:
        "Проактивные меры здоровья для поддержания вашего благополучия.",
      details: [
        "Ежегодные проверки",
        "Вакцинация",
        "Медицинские скрининги",
        "Консультации по питанию",
        "Программы отказа от курения",
        "Программы фитнеса и благополучия",
        "Психиатрические скрининги",
      ],
    },
    {
      id: "surgical",
      title: "Хирургические услуги",
      icon: <Scissors className="h-8 w-8 text-blue-600" />,
      description:
        "Передовые хирургические процедуры по различным специальностям.",
      details: [
        "Малоинвазивная хирургия",
        "Робот-ассистированная хирургия",
        "Кардиоваскулярная хирургия",
        "Нейрохирургия",
        "Ортопедическая хирургия",
        "Онкологическая хирургия",
        "Пластическая и реконструктивная хирургия",
      ],
    },
    {
      id: "specialized",
      title: "Специализированные лечения",
      icon: <Activity className="h-8 w-8 text-blue-600" />,
      description: "Передовые лечения для сложных состояний здоровья.",
      details: [
        "Лечение рака и химиотерапия",
        "Физическая и трудовая терапия",
        "Кардиологическая реабилитация",
        "Управление болью",
        "Психиатрические услуги",
        "Аллергии и иммунология",
        "Уход за ранами",
      ],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-50 to-green-50">
          <div className="container mx-auto  px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Комплексные медицинские услуги
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Получите медицинскую помощь мирового класса с нашим широким
                спектром медицинских услуг. От профилактической помощи до
                специализированных лечений, клиника MedLux - ваш партнер в
                здоровье и благополучии.
              </p>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center">
              Основная услуга
            </h2>
            <div className="grid gap-6 lg:grid-cols-2 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">
                  {featuredService.title}
                </h3>
                <p className="text-gray-500 mb-6">
                  {featuredService.description}
                </p>
                <ul className="space-y-2">
                  {featuredService.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Heart className="h-5 w-5 text-blue-600 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

              </div>
              <div className="relative h-[300px] sm:h-[400px] rounded-lg overflow-hidden">
                <Image
                  src={featuredService.image}
                  alt={featuredService.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container  mx-auto  px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center">
              Наши специальности
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {specialties.map((specialty, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="mx-auto bg-blue-100 rounded-full p-3 w-12 h-12 flex items-center justify-center">
                      {specialty.icon}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 className="font-semibold">{specialty.name}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center">
              Наши услуги
            </h2>
            <div className={"flex flex-wrap justify-center gap-6"}>
              {detailedServices.map((service) => (
                <Card className={"w-2/5"} key={service.id}>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      {service.icon}
                      <div>
                        <CardTitle>{service.title}</CardTitle>
                        <CardDescription>{service.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-6 space-y-2">
                      {service.details.map((detail, index) => (
                        <li key={index} className="text-sm text-gray-500">
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center">Список услуг</h2>
            <Card>
              <CardContent className="p-0">
                {
                  servicesList ? <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[300px]">Название услуги</TableHead>
                      <TableHead>Описание</TableHead>
                      <TableHead className="text-right">Цена</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {servicesList ? servicesList?.map((service, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{service.name}</TableCell>
                        <TableCell>{service.description}</TableCell>
                        <TableCell className="text-right">{service.price}</TableCell>
                      </TableRow>
                    )) : <Loader2 className={"animate-spin"} />}
                  </TableBody>
                </Table> :<Skeleton className="w-full h-[300px] rounded-2xl" />
                }
                
              </CardContent>
            </Card>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Готовы испытать заботу MedLux?
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Сделайте первый шаг к лучшему здоровью. Наша команда экспертов
                готова предоставить вам персонализированную, комплексную помощь.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="bg-blue-600 text-white hover:bg-blue-700">
                      Записаться на прием
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogDescription>
                        Для записи в нашу клинику необходимо позвонить в регистратуру по номеру +7999999999
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Ок</AlertDialogCancel>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline">Связаться с нами</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogDescription>
                        Для записи в нашу клинику необходимо позвонить в регистратуру по номеру +7999999999
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Ок</AlertDialogCancel>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div >
  );
}
