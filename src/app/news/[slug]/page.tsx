import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, ArrowLeft } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Skeleton } from "@/components/ui/skeleton"

async function getArticle(id: string) {
  try {
    const response = await fetch(`https://zeit-dev.site/api/news?id=${id}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.error) {
      return null;
    }
    
    return data.news[0];
  } catch (error) {
    console.error('Ошибка при загрузке статьи:', error);
    return null;
  }
}

function ArticleSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-8 w-3/4 mb-4" />
        <Skeleton className="h-4 w-40" />
      </CardHeader>
      <CardContent>
        <Skeleton className="w-full h-[400px] mb-6" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </CardContent>
    </Card>
  )
}

export default async function Page({
  params,
}: {
  params: { slug: string }
}) {
  const article = await getArticle(params.slug);

//   if (!article) {
//     notFound();
//   }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-1 mx-auto container py-8">
        <Link href="/news" className="inline-flex items-center text-blue-600 hover:underline mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Назад к новостям
        </Link>
        <article>
          <React.Suspense fallback={<ArticleSkeleton />}>
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl font-bold">{article.title}</CardTitle>
                <CardDescription className="flex items-center text-gray-500">
                  <CalendarDays className="mr-2 h-4 w-4" />
                  {new Date(article.published_at).toLocaleDateString('ru-RU', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                
                  <Image
                    src={article.image || '/images/news_placeholder.png'}
                    alt={article.title}
                    width={800}
                    height={400}
                    className="w-full h-auto rounded-lg mb-6"
                  />
      
                <div className="prose max-w-none">
                  {article.content?.split('\n\n').map((paragraph: string, index: number) => (
                    <p key={index} className="mb-4">{paragraph}</p>
                  )) || <p>Содержание отсутствует</p>}
                </div>
              </CardContent>
            </Card>
          </React.Suspense>
        </article>
      </main>
      <Footer />
    </div>
  )
}

