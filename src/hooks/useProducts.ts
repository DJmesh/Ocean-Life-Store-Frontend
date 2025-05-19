import { useState, useEffect } from "react";
import { getProducts } from "@/services/productService";
import { Product } from "@/lib/types/product";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<Error | null>(null);

  useEffect(() => {
    getProducts()
      .then((data) => {

        const results = Array.isArray(data) ? data : data.results ?? [];
        setProducts(results);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return { products, loading, error };
}
