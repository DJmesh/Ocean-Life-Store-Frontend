import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProductProps {
  product: {
    id: number;
    title: string;
    price: number;
    image: string;
  };
}

export default function ProductCard({ product }: ProductProps) {
  return (
    <Card className="p-4">
      <img src={product.image} alt={product.title} className="w-full h-48 object-cover mb-4" />
      <CardContent>
        <h3 className="text-lg font-semibold">{product.title}</h3>
        <p className="text-gray-500">R$ {product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Comprar</Button>
      </CardFooter>
    </Card>
  );
}
