import Navbar from "@/components/home/navbar";
import Footer from "@/components/footer/footer";
import { Toaster } from "@/components/ui/toaster";

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main
        className="flex-1 w-full min-h-full p-6 bg-cover bg-center text-white"
        style={{ backgroundImage: "url('/background-2.jpg')" }}
      >
        <div className="max-w-7xl mx-auto">{children}</div>
        <Toaster />
      </main>

      <Footer />
    </div>
  );
}
