import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Star, Video } from "lucide-react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import type { Metadata } from "next";
import Doctors from "./doctors";
import { Suspense } from "react";
export const metadata: Metadata = {
  title: 'Medlux | Доктора',
}


export default function DoctorsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-50 to-green-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Наша команда экспертов
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Познакомьтесь с преданными своему делу профессионалами, которые
                обеспечивают высококлассное медицинское обслуживание в клинике
                MedLux.
              </p>
            </div>
          </div>
        </section>
    
        <Doctors/>
   
        
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center">
              Почему выбрать наших врачей?
            </h2>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col flex-wrap md:flex-row lg:flex-row gap-6 justify-center">
                <Card className="lg:w-1/3 w-full">
                  <CardHeader>
                    <CardTitle>Многолетний опыт</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500">
                      Наши специалисты имеют богатый опыт работы в медицине, что позволяет им 
                      эффективно диагностировать и лечить даже самые сложные случаи.
                    </p>
                  </CardContent>
                </Card>
                <Card className="lg:w-1/3 w-full">
                  <CardHeader>
                    <CardTitle>Комплексный подход</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500">
                      Мы рассматриваем здоровье пациента целостно, учитывая все аспекты 
                      жизни и предлагая комплексные решения для улучшения самочувствия.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-6 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Профессионализм</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500">
                      Наши врачи являются сертифицированными экспертами в своих
                      областях, что гарантирует вам получение медицинской помощи
                      самого высокого качества.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Ориентированность на пациента</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500">
                      Мы приоритизируем ваши индивидуальные потребности и
                      предпочтения, адаптируя наш подход для предоставления
                      персонализированной помощи.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Передовые технологии</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500">
                      Наши врачи используют последние медицинские технологии и
                      методы для достижения наилучших результатов.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
         
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center">
              Отзывы пациентов
            </h2>
            <div className="grid gap-6 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Исключительный уход</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-4">
                    "Профессионализм и внимательность доктора Петрова значительно
                    повлияли на мое выздоровление. Я очень благодарен за уход, 
                    который получил в клинике MedLux."
                  </p>
                  <p className="text-sm font-semibold">
                    - Андрей К., пациент с сердечными заболеваниями
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Дружелюбный и профессиональный</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-4">
                    "Доктор Соколова прекрасно ладит с детьми. Её дружелюбное
                    поведение успокоило мою дочь, сделав наши визиты
                    комфортными и эффективными."
                  </p>
                  <p className="text-sm font-semibold">- Мария В., мама двоих детей</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Изменяющие жизнь результаты</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-4">
                    "Благодаря современным методам лечения доктора Ивановой, я
                    вернула уверенность в себе. Её профессионализм
                    действительно изменил мою жизнь к лучшему."
                  </p>
                  <p className="text-sm font-semibold">
                    - Елена С., пациент дерматолога
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Высокая квалификация</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-4">
                    "Доктор Смирнов проявил исключительный профессионализм в лечении
                    моего сложного случая. Его опыт и знания помогли мне полностью
                    восстановиться после травмы."
                  </p>
                  <p className="text-sm font-semibold">
                    - Дмитрий П., пациент травматолога
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Внимательное отношение</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-4">
                    "Очень благодарна доктору Козловой за чуткое отношение и
                    профессионализм. Она всегда находит время ответить на все
                    вопросы и развеять сомнения."
                  </p>
                  <p className="text-sm font-semibold">
                    - Наталья М., пациент эндокринолога
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Эффективное лечение</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-4">
                    "Доктор Морозов назначил очень эффективное лечение, которое
                    помогло мне быстро справиться с проблемой. Рекомендую этого
                    специалиста всем своим знакомым."
                  </p>
                  <p className="text-sm font-semibold">
                    - Сергей Л., пациент невролога
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center">
              Часто задаваемые вопросы
            </h2>
            <Accordion
              type="single"
              collapsible
              className="w-full max-w-3xl mx-auto"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger>Как записаться на прием?</AccordionTrigger>
                <AccordionContent>
                  Вы можете записаться на прием, позвонив в нашу клинику,
                  используя нашу онлайн-систему бронирования или посетив нашу
                  ресепшн лично. Мы стремимся удовлетворить ваши предпочтения по
                  дате и времени в зависимости от доступности врача.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  Что мне нужно взять с собой на первый прием?
                </AccordionTrigger>
                <AccordionContent>
                  Для вашего первого приема, пожалуйста, возьмите с собой
                  удостоверение личности, вашу страховую карту, список текущих
                  лекарств и любые медицинские записи или результаты тестов.
                  Также будет полезно подготовить список вопросов или проблем,
                  которые вы хотели бы обсудить с врачом.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  Предоставляете ли вы услуги телемедицины?
                </AccordionTrigger>
                <AccordionContent>
                  Да, мы предоставляем услуги телемедицины для определенных
                  типов приемов и повторных визитов. Это позволяет вам
                  консультироваться с нашими врачами из удобства вашего дома.
                  Пожалуйста, уточните у нашей ресепшн или у вашего врача,
                  подходит ли ваш прием для телемедицины.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>
                  Какие страховые планы вы принимаете?
                </AccordionTrigger>
                <AccordionContent>
                  Мы принимаем широкий спектр страховых планов. Пожалуйста,
                  свяжитесь с нашим бухгалтерским отделом или посетите наш
                  веб-сайт для получения актуального списка принимаемых
                  страховых компаний. Если у вас есть вопросы по поводу
                  покрытия, мы будем рады помочь вам.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                  Услуги телемедицины
                </h2>
                <p className="text-gray-500 mb-4">
                  Ощутите удобство консультаций с нашими экспертами-врачами из
                  удобства вашего дома. Наши услуги телемедицины предлагают:
                </p>
                <ul className="list-disc list-inside text-gray-500 mb-6">
                  <li>Гибкое расписание</li>
                  <li>Сокращенное время ожидания</li>
                  <li>Доступ к специалистам</li>
                  <li>Безопасные и конфиденциальные консультации</li>
                </ul>
                <AlertDialog>
                  <AlertDialogTrigger asChild><Button className="w-full sm:w-auto">
                    <Video className="mr-2 h-4 w-4" /> Запланировать виртуальный
                    визит
                  </Button></AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Ошибка!</AlertDialogTitle>
                      <AlertDialogDescription>
                        К сожалению в данны моменты мы не можем предоставить данную услугу.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Ок</AlertDialogCancel>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
              <div className="relative h-[500px] sm:h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="/images/caucasian-doctor-sitting-workplace-using-laptop.jpg"
                  alt="Консультация по телемедицине"
                  layout="fill"
                  objectFit="hover"
                  className="rounded-lg scale-95"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
