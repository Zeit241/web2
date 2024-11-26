import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MessageCircle, Star, Video } from "lucide-react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


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
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <Tabs defaultValue="all" className="w-full">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <TabsList>
                  <TabsTrigger value="all">Все врачи</TabsTrigger>
                  <TabsTrigger value="cardiology">Кардиология</TabsTrigger>
                  <TabsTrigger value="pediatrics">Педиатрия</TabsTrigger>
                  <TabsTrigger value="dermatology">Дерматология</TabsTrigger>
                </TabsList>
                <div className="flex gap-4">
                  <Input placeholder="Поиск врача..." className="w-[200px]" />
                </div>
              </div>
              <TabsContent value="all" className="space-y-8">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <Image
                        alt="Доктор Сара Джонсон"
                        className="mx-auto rounded-full"
                        height="150"
                        src="/placeholder.svg?height=150&width=150"
                        style={{
                          aspectRatio: "150/150",
                          objectFit: "cover",
                        }}
                        width="150"
                      />
                      <CardTitle className="text-center mt-4">
                        Доктор Сара Джонсон
                      </CardTitle>
                      <CardDescription className="text-center">
                        Кардиолог
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-sm text-gray-500 mb-4">
                        Доктор Джонсон — сертифицированный кардиолог с более чем
                        15-летним опытом лечения сердечно-сосудистых
                        заболеваний.
                      </p>
                      <div className="flex justify-center items-center gap-1 mb-4">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-gray-500 ml-2">
                          (124 отзыва)
                        </span>
                      </div>
                      <Button className="w-full">Записаться на прием</Button>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <Image
                        alt="Доктор Майкл Ли"
                        className="mx-auto rounded-full"
                        height="150"
                        src="/placeholder.svg?height=150&width=150"
                        style={{
                          aspectRatio: "150/150",
                          objectFit: "cover",
                        }}
                        width="150"
                      />
                      <CardTitle className="text-center mt-4">
                        Доктор Майкл Ли
                      </CardTitle>
                      <CardDescription className="text-center">
                        Педиатр
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-sm text-gray-500 mb-4">
                        Доктор Ли специализируется на детской медицине и с
                        большим энтузиазмом заботится о здоровье детей.
                      </p>
                      <div className="flex justify-center items-center gap-1 mb-4">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <Star className="w-4 h-4 text-gray-300" />
                        <span className="text-sm text-gray-500 ml-2">
                          (98 отзывов)
                        </span>
                      </div>
                      <Button className="w-full">Записаться на прием</Button>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <Image
                        alt="Доктор Эмили Чен"
                        className="mx-auto rounded-full"
                        height="150"
                        src="/placeholder.svg?height=150&width=150"
                        style={{
                          aspectRatio: "150/150",
                          objectFit: "cover",
                        }}
                        width="150"
                      />
                      <CardTitle className="text-center mt-4">
                        Доктор Эмили Чен
                      </CardTitle>
                      <CardDescription className="text-center">
                        Дерматолог
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-sm text-gray-500 mb-4">
                        Доктор Чен является экспертом в области здоровья кожи и
                        предлагает широкий спектр дерматологических услуг.
                      </p>
                      <div className="flex justify-center items-center gap-1 mb-4">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-gray-500 ml-2">
                          (156 отзывов)
                        </span>
                      </div>
                      <Button className="w-full">Записаться на прием</Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="cardiology" className="space-y-8">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <Image
                        alt="Доктор Алексей Иванов"
                        className="mx-auto rounded-full"
                        height="150"
                        src="/placeholder.svg?height=150&width=150"
                        style={{
                          aspectRatio: "150/150",
                          objectFit: "cover",
                        }}
                        width="150"
                      />
                      <CardTitle className="text-center mt-4">
                        Доктор Алексей Иванов
                      </CardTitle>
                      <CardDescription className="text-center">
                        Кардиолог
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-sm text-gray-500 mb-4">
                        Доктор Иванов специализируется на диагностике и лечении
                        сложных сердечно-сосудистых заболеваний.
                      </p>
                      <div className="flex justify-center items-center gap-1 mb-4">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <Star className="w-4 h-4 text-gray-300" />
                        <span className="text-sm text-gray-500 ml-2">
                          (87 отзывов)
                        </span>
                      </div>
                      <Button className="w-full">Записаться на прием</Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="pediatrics" className="space-y-8">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <Image
                        alt="Доктор Анна Смирнова"
                        className="mx-auto rounded-full"
                        height="150"
                        src="/placeholder.svg?height=150&width=150"
                        style={{
                          aspectRatio: "150/150",
                          objectFit: "cover",
                        }}
                        width="150"
                      />
                      <CardTitle className="text-center mt-4">
                        Доктор Анна Смирнова
                      </CardTitle>
                      <CardDescription className="text-center">
                        Педиатр
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-sm text-gray-500 mb-4">
                        Доктор Смирнова известна своим вниманием к мелочам и
                        искренним отношением к маленьким пациентам.
                      </p>
                      <div className="flex justify-center items-center gap-1 mb-4">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <Star className="w-4 h-4 text-gray-300" />
                        <Star className="w-4 h-4 text-gray-300" />
                        <span className="text-sm text-gray-500 ml-2">
                          (64 отзыва)
                        </span>
                      </div>
                      <Button className="w-full">Записаться на прием</Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="dermatology" className="space-y-8">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <Image
                        alt="Доктор Ольга Петрова"
                        className="mx-auto rounded-full aspect-square"
                        height="150"
                        src="/images/female-doctor-hospital-with-stethoscope.jpg"
                        style={{
                          // aspectRatio: "150/150",
                          objectFit: "cover",
                        }}
                        width="150"
                      />
                      <CardTitle className="text-center mt-4">
                        Доктор Ольга Петрова
                      </CardTitle>
                      <CardDescription className="text-center">
                        Дерматолог
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-sm text-gray-500 mb-4">
                        Доктор Петрова предоставляет комплексные решения для
                        всех типов кожных заболеваний и эстетических процедур.
                      </p>
                      <div className="flex justify-center items-center gap-1 mb-4">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-gray-500 ml-2">
                          (110 отзывов)
                        </span>
                      </div>
                      <Button className="w-full">Записаться на прием</Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center">
              Почему выбрать наших врачей?
            </h2>
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
                    "Профессионализм и сострадание доктора Джонсона значительно
                    повлияли на мое выздоровление. Я не могу быть более
                    благодарен за уход, который я получил в клинике MedLux."
                  </p>
                  <p className="text-sm font-semibold">
                    - Джон Д., пациент с сердечными заболеваниями
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Дружелюбный и профессиональный</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-4">
                    "Доктор Ли прекрасно ладит с детьми. Его дружелюбное
                    поведение успокоило моего сына, сделав наши визиты
                    безстрессовыми и эффективными."
                  </p>
                  <p className="text-sm font-semibold">- Сара М., родитель</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Изменяющие жизнь результаты</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-4">
                    "Благодаря инновационным методам лечения доктора Чен, я
                    вернула уверенность в своей коже. Ее профессионализм
                    действительно изменил мою жизнь."
                  </p>
                  <p className="text-sm font-semibold">
                    - Эмили Р., пациент дерматологии
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
                  <AlertDialogTrigger><Button className="w-full sm:w-auto">
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
