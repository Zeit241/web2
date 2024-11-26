import Link from "next/link";
import { Activity } from "lucide-react";
import React from "react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="w-full flex h-16 px-8 items-center justify-between">
        <Link className="flex items-center gap-2" href="/">
          <Activity size={32} color={"red"} />
          <span className="text-2xl font-extrabold text-blue-600">MedLux</span>
        </Link>
        <nav className="flex gap-4 sm:gap-6">
          <Link
            className="text-base font-medium hover:underline underline-offset-4"
            href="/about-us"
          >
            О нас
          </Link>
          <Link
            className="text-base font-medium hover:underline underline-offset-4"
            href="/doctors"
          >
            Врачи
          </Link>
          <Link
            className="text-base font-medium hover:underline underline-offset-4"
            href="/services"
          >
            Услуги
          </Link>
          <Link
            className="text-base font-medium hover:underline underline-offset-4"
            href="/news"
          >
            Новости
          </Link>
        </nav>
      </div>
    </header>
  );
}
