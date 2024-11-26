import Link from "next/link";
import { Activity } from "lucide-react";
import React from "react";

export default function Footer() {
  return (
    <footer className="w-full py-6 bg-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <Activity size={24} color={"red"} />
            <span className="text-lg font-semibold text-blue-600">MedLux</span>
          </div>
          <p className="text-sm text-gray-500">
            © 2023 MedLux Clinic. Все права защищены.
          </p>
          <div className="flex gap-4">
            <Link
              className="text-sm hover:underline underline-offset-4"
              href="/privacy-policy"
            >
              Политика конфиденциальности
            </Link>
            <Link
              className="text-sm hover:underline underline-offset-4"
              href="/terms-of-service"
            >
              Условия использования
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
