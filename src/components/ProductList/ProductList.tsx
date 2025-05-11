import type { ProductResponse } from "@/api/interfaces";
import { ProductCard } from "@/components/ProductCard/ProductCard";

interface ProductListProps {
  products: ProductResponse[];
  className?: string;
}

export function ProductList({ products }: ProductListProps) {
  return products?.map((product) => {
    return <ProductCard key={product.id} {...product} />;
  });
}
