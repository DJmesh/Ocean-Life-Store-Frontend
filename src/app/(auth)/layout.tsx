import { Toaster } from "@/components/ui/toaster";
import "@/app/globals.css";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const [carousel, form] = Array.isArray(children) ? children : [null, children];

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50">
      <section className="w-full max-w-5xl grid lg:grid-cols-2 rounded-3xl shadow-2xl overflow-hidden">
        <div className="hidden lg:flex items-center justify-center bg-gradient-to-b from-cyan-800 to-teal-700">
          {carousel}
        </div>
        <div className="bg-white p-8">{form}</div>
      </section>
      <Toaster />
    </main>
  );
}
