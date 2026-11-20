import React from "react";
import { ArrowLeftRight, Heart, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import PhoneArt from "./PhoneArt";
import RatingStars from "./RatingStars";
import { useCart } from "../context/CartContext";
import {
  discountPercent,
  formatPrice,
  getEntryOldPrice,
  getEntryPrice,
} from "../data/products";

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isWishlisted, toggleCompare, isCompared } = useCart();
  const saved = isWishlisted(product.id);
  const compared = isCompared(product.id);

  const entryPrice = getEntryPrice(product);
  const entryOld = getEntryOldPrice(product);
  const discount = discountPercent(entryPrice, entryOld);
  const hasChoices = (product.storage || []).length > 1;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-[0_1px_3px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#BFDBFE] hover:shadow-[0_16px_36px_-20px_rgba(37,99,235,0.24)]">
      <div className="relative h-48 shrink-0 overflow-hidden bg-[#F8FAFC] sm:h-64">
        <Link
          to={`/product/${product.slug}`}
          className="absolute inset-0 flex items-center justify-center p-4 sm:p-6"
          aria-label={`View details for ${product.name}`}
        >
          <span className="flex h-[86%] transition-transform duration-500 ease-out group-hover:scale-[1.04]">
            <PhoneArt product={product} className="h-full" />
          </span>
        </Link>

        {discount > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-[#FEF2F2] px-2.5 py-1 text-[10px] font-semibold text-[#EF4444] sm:left-4 sm:top-4 sm:text-xs">
            Save {discount}%
          </span>
        )}

        <div className="absolute right-3 top-3 z-10 flex gap-1.5 sm:right-4 sm:top-4 sm:gap-2">
          <button
            type="button"
            onClick={() => toggleCompare(product.id)}
            aria-pressed={compared}
            aria-label={
              compared ? `Remove ${product.name} from comparison` : `Compare ${product.name}`
            }
            title={compared ? "Remove from comparison" : "Add to comparison"}
            className={`flex h-9 w-9 items-center justify-center rounded-full border bg-white/95 shadow-sm transition-colors ${
              compared
                ? "border-[#2563EB] bg-[#2563EB] text-white"
                : "border-[#E2E8F0] text-[#64748B] hover:border-[#BFDBFE] hover:text-[#2563EB]"
            }`}
          >
            <ArrowLeftRight size={15} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => toggleWishlist(product.id)}
            aria-pressed={saved}
            aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name}`}
            className={`flex h-9 w-9 items-center justify-center rounded-full border bg-white/95 shadow-sm transition-colors ${
              saved
                ? "border-rose-200 text-rose-500"
                : "border-[#E2E8F0] text-[#64748B] hover:border-rose-200 hover:text-rose-500"
            }`}
          >
            <Heart size={16} fill={saved ? "currentColor" : "none"} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-3.5 sm:p-5">
        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#64748B] sm:text-[11px]">
          {product.brand}
        </span>

        <Link to={`/product/${product.slug}`} className="mt-1.5 block">
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-[#111827] transition-colors group-hover:text-[#2563EB] sm:text-base">
            {product.name}
          </h3>
        </Link>

        <p className="mt-1.5 line-clamp-2 min-h-9 text-[11px] leading-relaxed text-[#64748B] sm:text-xs">
          {product.tagline}
        </p>

        <div className="mt-2">
          <RatingStars
            rating={product.rating}
            count={product.reviewCount}
            size={12}
            className="gap-1 sm:gap-1.5"
          />
        </div>

        <div className="mt-auto pt-4">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <span className="text-lg font-bold tracking-tight text-[#111827] sm:text-xl">
              {hasChoices ? "From " : ""}
              {formatPrice(entryPrice)}
            </span>
            {entryOld > entryPrice && (
              <span className="text-xs text-[#94A3B8] line-through">
                {formatPrice(entryOld)}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => addToCart(product, 1)}
            className="mt-3 inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#1D4ED8] focus-visible:outline-[#2563EB] sm:h-11 sm:text-sm"
          >
            <ShoppingBag size={15} aria-hidden="true" />
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
}
