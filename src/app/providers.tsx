"use client";

import { CartProvider } from "@/lib/providers/cart";
import { AuthProvider } from "@/lib/providers/auth";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>{children}</CartProvider>
    </AuthProvider>
  );
}
