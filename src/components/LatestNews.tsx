"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface NewsItem {
  id: number;
  title: string;
  content: string;
  published_at: string;
  image: string;
}

export default function LatestNews() {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const response = await fetch('/api/news?limit=3');
        const data = await response.json();
        setNews(data.news || []);
      } catch (error) {
        console.error('Ошибка при загрузке новостей:', error);
      }
    };

    fetchLatestNews();
  }, []);

  return (
    <section id="news" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
      <div className="px-4 container mx-auto md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">
          Последние Новости
        </h2>
        <div className="grid gap-6 w-full mx-auto lg:grid-cols-3">
          {news.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <Image
                  src={item.image || "/images/news_placeholder.png"}
                  alt={`Изображение новости: ${item.title}`}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <CardTitle className="mt-4">{item.title}</CardTitle>
                <CardDescription>
                  {new Date(item.published_at).toLocaleDateString('ru-RU')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  {item.content.substring(0, 150)}...
                </p>
                <Link
                  href={`/news/${item.id}`}
                  className="inline-flex items-center text-blue-600 hover:underline mt-4"
                >
                  Читать далее <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button variant="outline" asChild>
            <Link href="/news">Посмотреть все новости</Link>
          </Button>
        </div>
      </div>
    </section>
  );
} 