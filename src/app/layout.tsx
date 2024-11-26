import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from 'next/font/google'

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

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
    <html lang="en">
      <body
          className={unbounded.className}
      >
        {children}
      </body>
    </html>
  );
}