import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Award, Clock, MapPin, Phone, Users, SquareActivity, Ambulance } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AboutUs() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        <section
          id="hero"
          className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-50 to-green-50"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                О клинике MedLux
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Исключительное медицинское обслуживание с индивидуальным
                подходом с 2005 года
              </p>
            </div>
          </div>
        </section>
        <section id="about" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Наша История
                </h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Клиника MedLux была основана в 2005 году с целью
                  предоставления комплексного и качественного медицинского
                  обслуживания населению. С годами мы выросли из небольшой
                  местной клиники в современное медицинское учреждение, сохраняя
                  наш фокус на индивидуальном подходе и передовых методах
                  лечения.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    className="inline-flex h-10 gap-2 items-center justify-center rounded-md bg-blue-600 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-700 disabled:pointer-events-none disabled:opacity-50"
                    href="/services"
                  >
                    <SquareActivity />
                    Наши Услуги
                  </Link>
                  <Link
                    className="inline-flex h-10 gap-2 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                    href="/doctors"
                  >
                    <Ambulance />
                    Познакомьтесь с Врачами
                  </Link>
                </div>
              </div>
              <Image
                alt="Здание клиники MedLux"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                height="550"
                src="/images/modern-office-building.jpg"
                width="550"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center">
              Почему выбирают MedLux
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <Clock className="h-8 w-8 text-blue-600" />
                  <CardTitle>18+ лет опыта</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    С 2005 года мы предоставляем качественные услуги, неизменно
                    повышая уровень нашего обслуживания.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <Users className="h-8 w-8 text-blue-600" />
                  <CardTitle>50,000+ пациентов</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Нас выбрали тысячи людей за всесторонние медицинские решения
                    — от профилактики до специализированного лечения.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <Award className="h-8 w-8 text-blue-600" />
                  <CardTitle>Признанное качество</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Мы аккредитованы ведущими организациями в области
                    здравоохранения за приверженность качеству и безопасности
                    пациентов.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section id="mission" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Наша Миссия
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                В клинике MedLux мы стремимся предоставлять персонализированную,
                качественную медицинскую помощь для улучшения здоровья и
                благополучия нашего сообщества. Наши основные цели:
              </p>
              <ul className="mx-auto mt-4 max-w-[600px] list-disc text-left space-y-2 text-gray-500">
                <li>
                  Уважать индивидуальные потребности и предпочтения пациентов
                </li>
                <li>
                  Использовать передовые медицинские технологии и доказательную
                  медицину
                </li>
                <li>
                  Создавать поддерживающую и заботливую атмосферу для пациентов
                  и сотрудников
                </li>
                <li>
                  Пропагандировать здоровье и профилактику в нашем сообществе
                </li>
                <li>
                  Поддерживать высочайшие стандарты профессионализма и
                  этического поведения
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section
          id="team"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-50"
        >
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center">
              Наша Команда
            </h2>
            <div className="flex gap-6 flex-row flex-wrap justify-center">
              <Card className={"w-2/5"}>
                <CardHeader>
                  <Image
                    alt="Доктор Эмили Чен"
                    className="mx-auto rounded-full"
                    height="150"
                    src="/images/vecteezy_a-young-doctor-woman-wears-a-lab-coat-and-stethoscope-in_7483472.jpg"
                    style={{
                      aspectRatio: "150/150",
                      objectFit: "cover",
                    }}
                    width="150"
                  />
                  <CardTitle className="text-center mt-4">
                    Доктор Светлана Иванченко
                  </CardTitle>
                  <CardDescription className="text-center">
                    Главный Врач
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 text-center">
                    Более 20 лет опыта в медицине и преданность пациентам делают
                    Светлану выдающимся специалистом.
                  </p>
                </CardContent>
              </Card>
              <Card className={"w-2/5"}>
                <CardHeader>
                  <Image
                    alt="Майкл Томпсон"
                    className="mx-auto rounded-full"
                    height="150"
                    src="/images/vecteezy_portrait-of-girl-doctor-illustration_23570077.jpg"
                    style={{
                      aspectRatio: "150/150",
                      objectFit: "cover",
                    }}
                    width="150"
                  />
                  <CardTitle className="text-center mt-4">
                    Ирина Путина
                  </CardTitle>
                  <CardDescription className="text-center">
                    Генеральный Директор
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 text-center">
                    Опыт в управлении здравоохранением помогает Ирине
                    направлять стратегическое развитие клиники.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
