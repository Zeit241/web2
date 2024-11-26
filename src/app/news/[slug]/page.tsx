import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CalendarDays, ArrowLeft, Share2 } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const article = {
        title: "MedLux Clinic Introduces Cutting-Edge MRI Technology",
        date: "2023-11-26",
        author: "Dr. Emily Chen",
        content: `MedLux Clinic is proud to announce the introduction of our new state-of-the-art MRI machine, 
        marking a significant advancement in our diagnostic capabilities. This cutting-edge technology 
        offers unparalleled image quality, faster scan times, and enhanced patient comfort.
    
        The new MRI system features:
        
        1. High-resolution imaging for more accurate diagnoses
        2. Reduced scan times, minimizing patient discomfort
        3. Quieter operation, creating a more relaxing environment
        4. Larger bore size to accommodate claustrophobic patients
        
        This investment in advanced technology underscores MedLux Clinic's commitment to providing 
        the highest quality care to our patients. The improved imaging capabilities will enable our 
        medical team to detect and diagnose conditions earlier and with greater precision, leading 
        to better treatment outcomes.
    
        Dr. Sarah Johnson, Head of Radiology at MedLux Clinic, commented, "This new MRI technology 
        represents a quantum leap in our diagnostic capabilities. It will allow us to provide faster, 
        more comfortable, and more accurate scans for our patients, ultimately leading to better 
        health outcomes."
    
        Patients can expect to benefit from this new technology starting next month. To learn more 
        about our new MRI services or to schedule an appointment, please contact our radiology 
        department.`,
        image: "/placeholder.svg?height=400&width=800"
    }

    const slug = (await params).slug
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Header />
            <main className="flex-1 mx-auto container py-8">
                <Link href="/news" className="inline-flex items-center text-blue-600 hover:underline mb-4">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to News
                </Link>
                <article>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-3xl font-bold">{article.title}</CardTitle>
                            <CardDescription className="flex items-center text-gray-500">
                                <CalendarDays className="mr-2 h-4 w-4" />
                                {new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                <Separator className="mx-2" orientation="vertical" />
                                By {article.author}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Image
                                src={article.image}
                                alt="Article featured image"
                                width={800}
                                height={400}
                                className="w-full h-auto rounded-lg mb-6"
                            />
                            <div className="prose max-w-none">
                                {article.content.split('\n\n').map((paragraph, index) => (
                                    <p key={index} className="mb-4">{paragraph}</p>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </article>
            </main>
            <Footer />
        </div>
    )
}

