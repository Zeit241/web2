'use client';
import React, { useEffect, useState } from "react";
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
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

export interface NewsArticle {
    id: number;
    title: string;
    excerpt: string;
    date: string;
    image: string;
  }

export function NewsCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="w-full h-48" />
      <CardHeader>
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/4 mt-2" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-20 w-full" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-10 w-32" />
      </CardFooter>
    </Card>
  );
}

export default function NewsClient() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<NewsArticle[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 4;

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch('/api/news');
      const data = await response.json();
      
      console.log('API Response:', data);

      const newsData = data.news || data;
      
      if (Array.isArray(newsData)) {
        const formattedNews = newsData.map((item: any) => ({
          id: item.id,
          title: item.title,
          excerpt: item.content?.substring(0, 150) + '...' || '',
          date: item.published_at,
          image: item.image || '/images/news_placeholder.png'
        }));
        setArticles(formattedNews);
        setFilteredArticles(formattedNews);
      } else {
        console.error('Неверный формат данных:', newsData);
      }
    } catch (error) {
      console.error('Ошибка при загрузке новостей:', error);
      setArticles([]);
      setFilteredArticles([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const filtered = articles.filter(article =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredArticles(filtered);
    setCurrentPage(1);
  }, [searchQuery, articles]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredArticles.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);

  return (
    <main className="container mx-auto px-4 py-8 flex-1">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Новости и обновления MedLux
      </h1>
      <div className="mb-8 max-w-md mx-auto">
        <div className="relative">
          <Input
            type="text"
            placeholder="Поиск новостей..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={isLoading}
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {isLoading ? (
          Array.from({ length: itemsPerPage }).map((_, index) => (
            <NewsCardSkeleton key={index} />
          ))
        ) : (
          currentItems.map((article) => (
            <Card key={article.id} className="overflow-hidden">
              <Image
                src={article.image || '/images/news_placeholder.png'}
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
                <Link href={`/news/${article.id}`}>
                  <Button variant="outline">Читать далее</Button>
                </Link>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
      {!isLoading && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                href="#" 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === page}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext 
                href="#" 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </main>
  );
} 