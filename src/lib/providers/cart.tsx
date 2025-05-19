"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { Product } from "@/lib/types/product";

type CartItem = Product & { qty: number };

interface CartCtx {
  items: CartItem[];
  add:    (p: Product) => void;
  remove: (id: string) => void;
  clear:  () => void;
  total:  number;
  count:  number;
}

const CartContext = createContext<CartCtx>({
  items: [],
  add:   () => {},
  remove: () => {},
  clear: () => {},
  total: 0,
  count: 0,
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() =>
    typeof window === "undefined"
      ? []
      : JSON.parse(localStorage.getItem("cart") ?? "[]")
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const add = (product: Product) =>
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.id === product.id);
      if (idx > -1) {
        const nxt = [...prev];
        nxt[idx].qty += 1;
        return nxt;
      }
      return [...prev, { ...product, qty: 1 }];
    });

  const remove = (id: string) =>
    setItems((prev) => prev.filter((i) => i.id !== id));

  const clear  = () => setItems([]);

  const total  = items.reduce((s, i) => s + i.price * i.qty, 0);
  const count  = items.reduce((s, i) => s + i.qty, 0);

  return (
    <CartContext.Provider value={{ items, add, remove, clear, total, count }}>
      {children}
    </CartContext.Provider>
  );
}
export const useCart = () => useContext(CartContext);
