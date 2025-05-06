/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useProducts } from "@/hooks/useProducts";
import ProductCard from "@/components/home/product-card";

export default function LandingPage() {
  const { products, loading, error } = useProducts();

  if (loading) return <p className="text-white text-center">Carregando produtos...</p>;
  if (error) return <p className="text-red-500 text-center">Erro ao carregar os produtos: {error.message}</p>;

  return (
    <div className="text-center text-white">
      <h2 className="text-4xl font-bold mb-6">CATÁLOGOS</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
