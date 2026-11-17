import React from "react";
import { Smartphone } from "lucide-react";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products, className = "" }) {
  if (!products.length) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-line bg-white px-6 py-20 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ice text-muted">
          <Smartphone size={22} aria-hidden="true" />
        </span>
        <h3 className="mt-4 font-display text-lg font-semibold text-navy">
          No devices match those filters
        </h3>
        <p className="mt-1 max-w-sm text-sm text-muted">
          Try widening the price range or clearing a filter or two.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${className}`}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
