"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowRight,
  Award,
  Clock,
  MapPin,
  MessageCircle,
  Phone,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import DoctorCard from "@/components/DoctorCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Map from "@/components/Map";
export default function Component() {
  return (
    <div className="flex flex-col min-h-screen bg-white mx-auto">
      <Header />
      <main className="flex-1 ">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-50 to-green-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-6 ">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none w-4/5 mx-auto">
                  Комплексные решения для вашего здоровья под одной крышей
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Получите медицинское обслуживание высшего уровня с
                  персональным подходом в клинике MedLux.
                </p>
              </div>
              <div className="space-x-4">
                <Button className="bg-blue-600 text-white hover:bg-blue-700">
                  Записаться на прием
                </Button>
                <Button variant="outline">Узнать больше</Button>
              </div>
            </div>
          </div>
        </section>
        <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-2 lg:grid-cols-[400px_1fr] lg:gap-4 xl:grid-cols-[600px_1fr]">
              <Image
                src="/images/doctor.png"
                alt="MedLux"
                width={600}
                height={600}
                className="mx-auto overflow-hidden rounded-xl object-cover object-center sm:w-full max-[1023px]:hidden"
              />
              <div className="flex flex-col justify-center space-y-4 ">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  О нас
                </h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed my-5 lg:text-base/relaxed xl:text-xl/relaxed">
                  Клиника MedLux предоставляет исключительные медицинские услуги
                  с 2005 года. Наша миссия – обеспечивать персонализированную и
                  качественную медицинскую помощь для улучшения здоровья и
                  благополучия нашего сообщества.
                </p>
                <div className="grid pt-8 gap-6 md:grid-cols-2 lg:grid-cols-3 md:text-center">
                  <Card>
                    <CardHeader className="flex flex-row items-center gap-4 md:flex-col md:text-center">
                      <Clock className="h-8 w-8 text-blue-600" />
                      <CardTitle className={""}>18+ лет опыта</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500">
                        Мы обслуживаем вас с преданностью и профессионализмом с
                        2005 года.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center gap-4 md:flex-col md:text-center">
                      <Users className="h-8 w-8 text-blue-600" />
                      <CardTitle>50,000+ пациентов</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500">
                        Доверие тысяч людей благодаря комплексным медицинским
                        решениям.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center gap-4 md:flex-col ">
                      <Award className="h-8 w-8 text-blue-600" size={32} />
                      <CardTitle>Лучшее качество</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500">
                        Признание за наш вклад в качество и безопасность
                        пациентов.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          id="doctors"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100"
        >
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">
              Наши врачи
            </h2>
            <div className={"mx-auto w-full"}>
              <DoctorCard />
            </div>
          </div>
        </section>
        <section id="services" className="w-full py-12 md:py-24 lg:py-32">
          <div className="px-4 container mx-auto md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">
              Наши услуги
            </h2>
            <div className="grid gap-6 mx-auto w-full grid-cols-1 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Общие осмотры</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Комплексные обследования для обеспечения вашего общего
                    здоровья и раннего выявления возможных проблем.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Специализированное лечение</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Передовые медицинские процедуры и лечение по различным
                    направлениям, адаптированные под ваши потребности.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Диагностические услуги</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Современные диагностические инструменты и тесты для точного
                    выявления и оценки вашего состояния здоровья.
                  </p>
                </CardContent>
              </Card>
              <div className="flex justify-center gap-6 lg:col-span-3">
                <Card className="flex flex-col h-full w-full lg:w-auto">
                  <CardHeader>
                    <CardTitle>Профилактические программы</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col justify-between flex-grow">
                    <p className="text-sm text-gray-500">
                      Индивидуальные программы для поддержания здоровья и
                      профилактики заболеваний с учетом вашего образа жизни и
                      потребностей.
                    </p>
                  </CardContent>
                </Card>

                <Card className="flex flex-col h-full w-full lg:w-auto">
                  <CardHeader>
                    <CardTitle>Консультации специалистов</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col justify-between flex-grow">
                    <p className="text-sm text-gray-500">
                      Квалифицированные консультации опытных врачей для анализа
                      вашего здоровья и разработки плана лечения или
                      профилактики.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className={"w-full flex items-center justify-center py-6"}>
              <Button className={"mx-auto"} variant={"outline"} asChild>
                <Link href={"/services"}>Подробнее...</Link>
              </Button>
            </div>
          </div>
        </section>
        <section
          id="news"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-50"
        >
          <div className="px-4 container mx-auto md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">
              Последние Новости
            </h2>
            <div className="grid gap-6 w-full mx-auto lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <Image
                    src="/placeholder.svg?height=200&width=400"
                    alt="Изображение новости 1"
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <CardTitle className="mt-4">
                    Установка нового современного аппарата МРТ
                  </CardTitle>
                  <CardDescription>15 июня 2023</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Клиника MedLux недавно установила современный аппарат МРТ,
                    что значительно улучшит наши диагностические возможности...
                  </p>
                  <Link
                    href="#"
                    className="inline-flex items-center text-blue-600 hover:underline mt-4"
                  >
                    Читать далее <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Image
                    src="/placeholder.svg?height=200&width=400"
                    alt="Изображение новости 2"
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <CardTitle className="mt-4">
                    Доктор Джонсон получила престижную награду
                  </CardTitle>
                  <CardDescription>28 мая 2023</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Наша замечательная доктор Сара Джонсон была отмечена за её
                    выдающийся вклад в кардиологию...
                  </p>
                  <Link
                    href="#"
                    className="inline-flex items-center text-blue-600 hover:underline mt-4"
                  >
                    Читать далее <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Image
                    src="/placeholder.svg?height=200&width=400"
                    alt="Изображение новости 3"
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <CardTitle className="mt-4">
                    MedLux запускает телемедицинские услуги
                  </CardTitle>
                  <CardDescription>10 мая 2023</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Мы рады сообщить о запуске наших новых телемедицинских
                    услуг, предоставляющих медицинскую помощь прямо у вас
                    дома...
                  </p>
                  <Link
                    href="#"
                    className="inline-flex items-center text-blue-600 hover:underline mt-4"
                  >
                    Читать далее <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            </div>
            <div className="mt-12 text-center">
              <Button variant="outline">Посмотреть все новости</Button>
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100"
        >
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">
              Свяжитесь с нами
            </h2>
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Отправьте нам сообщение</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <Input placeholder="Ваше имя" />
                    <Input placeholder="Ваш email" type="email" />
                    <Textarea placeholder="Ваше сообщение" />
                    <Button type="submit">Отправить сообщение</Button>
                  </form>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Найдите нас</CardTitle>
                </CardHeader>
                <CardContent className={"flex justify-between"}>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <MapPin className="text-blue-600" />
                      <p className="text-sm text-gray-500">
                        Москва, ул. Примерная, д. 10
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="text-blue-600" />
                      <p className="text-sm text-gray-500">
                        +7 (495) 123-45-67
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MessageCircle className="text-blue-600" />
                      <p className="text-sm text-gray-500">info@medlux.ru</p>
                    </div>
                  </div>

                  <Map />
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </div>
  );
}
