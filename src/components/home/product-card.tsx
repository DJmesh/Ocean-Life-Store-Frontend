import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProductImageCarousel from "./ProductImageCarousel";

interface ProductProps {
  product: {
    id: number;
    name: string;
    price: string | number;
    images: {
      id: number;
      image: string;
    }[];
  };
}

export default function ProductCard({ product }: ProductProps) {
  return (
    <Card className="p-4">
      {product.images && product.images.length > 0 ? (
        <ProductImageCarousel images={product.images} />
      ) : (
        <img
          src="/placeholder.png"
          alt={product.name}
          className="w-[200px] h-[200px] object-contain mx-auto mb-4"
        />
      )}
      <CardContent>
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-500">R$ {Number(product.price).toFixed(2)}</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Comprar</Button>
      </CardFooter>
    </Card>
  );
}
