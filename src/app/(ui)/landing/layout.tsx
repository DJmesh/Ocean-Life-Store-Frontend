import Navbar from "@/components/lainding/navbar";

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto p-6">{children}</main>
      <footer className="p-4 border-t text-center text-sm">
        &copy; 2025 Ocean Life Store. Todos os direitos reservados.
      </footer>
    </div>
  );
}
