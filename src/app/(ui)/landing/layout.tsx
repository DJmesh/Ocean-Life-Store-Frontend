import Navbar from "@/components/lainding/navbar";
import Footer from "@/components/footer/footer";

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main
        className="flex-1 container mx-auto p-6 bg-cover bg-center text-white"
        style={{ backgroundImage: "url('/background-2.jpg')" }}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
