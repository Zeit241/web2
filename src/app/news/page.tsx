import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Calendar, MessageCircle, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";

export default function NewsPage() {
  const newsArticles = [
    {
      id: 1,
      title: "MedLux внедряет новую передовую технологию МРТ",
      excerpt:
        "Наша клиника теперь предлагает современные МРТ-сканирования с улучшенной точностью и комфортом для пациентов.",
      date: "2023-06-15",
      image: "/placeholder.svg?height=200&width=300&text=МРТ+Технология",
    },
    {
      id: 2,
      title: "Доктор Сара Джонсон присоединяется к нашей команде кардиологов",
      excerpt:
        "Мы рады приветствовать доктора Сару Джонсон, известного кардиолога, в нашей растущей команде экспертов.",
      date: "2023-06-10",
      image: "/placeholder.svg?height=200&width=300&text=Др.+Сара+Джонсон",
    },
    {
      id: 3,
      title: "MedLux запускает услуги телемедицины",
      excerpt:
        "Теперь вы можете консультироваться с нашими врачами из комфорта вашего дома с помощью нашей новой платформы телемедицины.",
      date: "2023-06-05",
      image: "/placeholder.svg?height=200&width=300&text=Услуги+Телемедицины",
    },
    {
      id: 4,
      title: "Семинар по здоровью: Понимание диабета",
      excerpt:
        "Присоединяйтесь к нашему бесплатному семинару по управлению и профилактике диабета, организованному нашим отделением эндокринологии.",
      date: "2023-05-30",
      image: "/placeholder.svg?height=200&width=300&text=Семинар+по+Диабету",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Header />

      {/* Содержимое новостей */}
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Новости и обновления MedLux
        </h1>

        {/* Строка поиска */}
        <div className="mb-8 max-w-md mx-auto">
          <div className="relative">
            <Input
              type="text"
              placeholder="Поиск новостей..."
              className="pl-10"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>
        </div>

        {/* Сетка новостей */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {newsArticles.map((article) => (
            <Card key={article.id} className="overflow-hidden">
              <Image
                src={article.image}
                alt={article.title}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
              <CardHeader>
                <CardTitle>{article.title}</CardTitle>
                <CardDescription>
                  {new Date(article.date).toLocaleDateString("ru-RU")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>{article.excerpt}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Читать далее</Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Пагинация */}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </main>

      {/* Подвал */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Image
                src="/placeholder.svg?height=40&width=40"
                alt="Логотип MedLux"
                width={40}
                height={40}
                className="inline-block mr-2"
              />
              <span className="text-2xl font-bold">MedLux</span>
            </div>
            <nav className="flex space-x-4">
              <Link href="/" className="hover:text-blue-400">
                Главная
              </Link>
              <Link href="#" className="hover:text-blue-400">
                О нас
              </Link>
              <Link href="#" className="hover:text-blue-400">
                Врачи
              </Link>
              <Link href="#" className="hover:text-blue-400">
                Услуги
              </Link>
              <Link href="#" className="hover:text-blue-400">
                Новости
              </Link>
              <Link href="#" className="hover:text-blue-400">
                Контакты
              </Link>
            </nav>
          </div>
          <div className="mt-8 text-center text-gray-400">
            &copy; 2023 MedLux. Все права защищены.
          </div>
        </div>
      </footer>

      {/* Функция быстрого чата */}
      <div className="fixed bottom-4 right-4">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4">
          <MessageCircle size={24} />
        </Button>
      </div>

      {/* Кнопка записи на прием (видна на всех страницах) */}
      <div className="fixed bottom-4 left-4">
        <Button className="bg-green-600 hover:bg-green-700 text-white">
          <Calendar className="mr-2" size={18} />
          Записаться на прием
        </Button>
      </div>
    </div>
  );
}