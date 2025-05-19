"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProductImageCarousel from "./ProductImageCarousel";
import { useCart } from "@/lib/providers/cart";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";


interface RawImage {
  id: number;
  image?: string;
  url?: string;
}

interface ProductProps {
  product: {
    id: number | string;
    name: string;
    price: number | string;
    images: RawImage[];
  };
}

export default function ProductCard({ product }: ProductProps) {
  const { add }   = useCart();
  const router    = useRouter();
  const { toast } = useToast();

  const carouselImages = product.images
    .map((img) => ({
      id: img.id,
      image: img.image ?? img.url ?? "",
    }))
    .filter((img) => !!img.image);

  const handleBuy = () => {
    add({
      ...product,
      price: Number(product.price),
    } as any);
    toast({ title: "Produto adicionado ao carrinho!" });
    router.push("/cart");
  };

  return (
    <Card className="p-4">
      {carouselImages.length ? (
        <ProductImageCarousel images={carouselImages} />
      ) : (
        <img
          src="/placeholder.png"
          alt={product.name}
          className="w-[200px] h-[200px] object-contain mx-auto mb-4"
        />
      )}

      <CardContent>
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-500">
          R$ {Number(product.price).toFixed(2)}
        </p>
      </CardContent>

      <CardFooter>
        <Button onClick={handleBuy} className="w-full">
          Comprar
        </Button>
      </CardFooter>
    </Card>
  );
}
