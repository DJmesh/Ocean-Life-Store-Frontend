import { ShoppingBag } from "lucide-react";
import Link from "next/link";

export function CartIcon() {
  return (
    <Link href="/carrinho" className="relative">
      <ShoppingBag size={20} className="hover:text-gray-300 transition-all" />
    </Link>
  );
}
