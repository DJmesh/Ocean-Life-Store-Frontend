export interface ProductImage {
  id: string;
  url: string;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  images: ProductImage[];
}
