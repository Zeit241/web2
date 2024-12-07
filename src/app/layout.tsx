import type { Metadata } from "next";
import "./globals.css";
import "@uploadthing/react/styles.css"
import { Roboto } from 'next/font/google'
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: 'Medlux - лучшая медклиника',
  description: `Клиника MedLux предоставляет исключительные медицинские услуги с 2005 года. Наша миссия – обеспечивать персонализированную и
  качественную медицинскую помощь для улучшения здоровья и  благополучия нашего сообщества.`,
}
const unbounded = Roboto({
  subsets: ['latin', "cyrillic"],
  weight: ["400", "500", "700"],
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={unbounded.className}
      >
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
