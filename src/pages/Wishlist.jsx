import React, { useMemo } from "react";
import { ArrowRight, ChevronRight, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import ProductGrid from "../components/ProductGrid";
import { getProductById } from "../data/products";
import { useCart } from "../context/CartContext";

export default function Wishlist() {
  const { wishlist, toggleWishlist } = useCart();

  const savedProducts = useMemo(
    () => wishlist.map((id) => getProductById(id)).filter(Boolean),
    [wishlist]
  );

  return (
    <div className="wrap py-8 sm:py-12">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted">
        <Link to="/" className="transition-colors hover:text-navy">
          Home
        </Link>
        <ChevronRight size={13} aria-hidden="true" className="text-slate-300" />
        <span className="text-ink">Wishlist</span>
      </nav>

      <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="type-section text-navy">Your wishlist</h1>
          <p className="mt-1 text-sm text-muted">
            {savedProducts.length === 0
              ? "Nothing saved yet — tap the heart on any product."
              : `${savedProducts.length} ${
                  savedProducts.length === 1 ? "item" : "items"
                } saved on this device.`}
          </p>
        </div>
        {savedProducts.length > 0 && (
          <button
            type="button"
            onClick={() => savedProducts.forEach((product) => toggleWishlist(product.id))}
            className="text-xs font-semibold text-muted transition-colors hover:text-orange-ink"
          >
            Clear wishlist
          </button>
        )}
      </div>

      {savedProducts.length ? (
        <ProductGrid products={savedProducts} className="mt-7" />
      ) : (
        <div className="mt-7 flex flex-col items-center rounded-2xl border border-dashed border-line bg-white px-6 py-20 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-soft text-orange-ink">
            <Heart size={24} aria-hidden="true" />
          </span>
          <h2 className="mt-4 font-display text-lg font-semibold text-navy">
            Your wishlist is empty
          </h2>
          <p className="mt-1 max-w-sm text-sm text-muted">
            Save the products you are weighing up and come back when you have decided.
          </p>
          <Link to="/products" className="btn-primary mt-6">
            Browse phones
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      )}
    </div>
  );
}
