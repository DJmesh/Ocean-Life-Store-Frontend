import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "@/lib/providers/auth";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ocean Life Store",
  description: "Produtos eco‑sustentáveis para quem ama o mar",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            {children}
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
