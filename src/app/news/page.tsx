import NewsClient from "./NewsClient";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NewsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <Header />
      <NewsClient />
      <Footer />
    </div>
  );
}
