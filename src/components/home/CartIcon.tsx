"use client";

import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/lib/providers/cart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

export function CartIcon() {
  const { items, count } = useCart();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative">
          <ShoppingBag
            size={22}
            className="hover:text-gray-300 transition-all"
          />
          {count > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {count}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64" align="end">
        {count === 0 ? (
          <DropdownMenuItem disabled>Seu carrinho está vazio</DropdownMenuItem>
        ) : (
          <>
            {items.slice(0, 3).map((it) => (
              <DropdownMenuItem key={it.id} asChild>
                <Link href="/cart" className="flex items-center gap-2 py-2">
                  <Image
                    src={it.images?.[0]?.url ?? "/placeholder.png"}
                    alt={it.name}
                    width={32}
                    height={32}
                    className="rounded-sm object-cover"
                  />
                  <span className="truncate text-sm flex-1">
                    {it.name} × {it.qty}
                  </span>
                  <span className="text-xs">
                    R$ {(it.price * it.qty).toFixed(2)}
                  </span>
                </Link>
              </DropdownMenuItem>
            ))}

            {items.length > 3 && (
              <DropdownMenuItem disabled>
                … e mais {items.length - 3} itens
              </DropdownMenuItem>
            )}

            <DropdownMenuItem asChild>
              <Link
                href="/cart"
                className="w-full text-center mt-1 font-medium text-blue-600"
              >
                Ver carrinho →
              </Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
