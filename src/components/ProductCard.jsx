import React from "react";
import { Heart, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import PhoneArt from "./PhoneArt";
import RatingStars from "./RatingStars";
import { useCart } from "../context/CartContext";
import { discountPercent, formatPrice } from "../data/products";

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useCart();
  const saved = isWishlisted(product.id);
  const discount = discountPercent(product.price, product.oldPrice);

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-line bg-white transition-colors duration-200 hover:border-slate-300 hover:bg-[#f9fafb]">
      <div className="plate relative h-60 shrink-0 overflow-hidden">
        <Link
          to={`/product/${product.slug}`}
          className="absolute inset-0 flex items-center justify-center p-5"
          aria-label={`View ${product.name}`}
        >
          <span className="flex h-[82%] transition-transform duration-300 ease-out group-hover:scale-[1.02]">
            <PhoneArt product={product} className="h-full" />
          </span>
        </Link>

        <div className="pointer-events-none absolute left-3 top-3 z-10 flex flex-col items-start gap-1.5">
          {discount > 0 && <span className="badge-sale">-{discount}%</span>}
          {product.badge && (
            <span className="inline-flex items-center rounded-md border border-line bg-white/95 px-2 py-1 font-mono text-[10px] font-medium uppercase tracking-wider text-ink backdrop-blur">
              {product.badge}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${product.name} from saved items` : `Save ${product.name}`}
          className={`absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border bg-white/95 shadow-sm transition-colors sm:h-9 sm:w-9 ${
            saved
              ? "border-sale/30 text-sale"
              : "border-line text-muted hover:border-navy hover:text-navy"
          }`}
        >
          <Heart size={16} fill={saved ? "currentColor" : "none"} aria-hidden="true" />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-muted">
            {product.brand}
          </span>
          <RatingStars rating={product.rating} size={12} />
        </div>

        <Link to={`/product/${product.slug}`} className="mt-1.5 block">
          <h3 className="type-product text-ink transition-colors group-hover:text-blue">
            {product.name}
          </h3>
        </Link>

        <p className="mt-0.5 line-clamp-1 text-xs text-muted">{product.tagline}</p>

        <div className="mt-auto pt-4">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-lg font-bold text-navy">
              {formatPrice(product.price)}
            </span>
            {product.oldPrice > product.price && (
              <span className="text-xs text-muted line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => addToCart(product, 1)}
            className="btn-outline mt-3 w-full text-xs hover:border-blue hover:text-blue"
          >
            <ShoppingBag size={15} aria-hidden="true" />
            Add to bag
          </button>
        </div>
      </div>
    </article>
  );
}
