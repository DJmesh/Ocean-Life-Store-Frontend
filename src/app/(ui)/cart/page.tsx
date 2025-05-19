"use client";
import { useCart } from "@/lib/providers/cart";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CartPage() {
  const { items, remove, clear, total } = useCart();

  if (!items.length)
    return (
      <main className="py-20 text-center">
        <p>Seu carrinho está vazio 😢</p>
        <Link href="/">
          <Button className="mt-4">Voltar à loja</Button>
        </Link>
      </main>
    );

  return (
    <main className="max-w-3xl mx-auto py-10 space-y-4">
      <h1 className="text-2xl font-bold mb-6">Carrinho</h1>

      {items.map((it) => (
        <div key={it.id} className="flex justify-between items-center border p-4 rounded-md">
          <span>
            {it.name} × {it.qty}
          </span>
          <span>R$ {(it.price * it.qty).toFixed(2)}</span>
          <Button size="sm" variant="ghost" onClick={() => remove(it.id)}>
            Remover
          </Button>
        </div>
      ))}

      <div className="text-right font-semibold text-lg">
        Total: R$ {total.toFixed(2)}
      </div>

      <div className="flex gap-4">
        <Button variant="secondary" onClick={clear} className="flex-1">
          Limpar carrinho
        </Button>
        <Link href="/checkout" className="flex-1">
          <Button className="w-full">Finalizar compra</Button>
        </Link>
      </div>
    </main>
  );
}
