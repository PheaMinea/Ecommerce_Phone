import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import PhoneArt from "./PhoneArt";

export default function BrandCard({ brand, product, count }) {
  return (
    <Link
      to={`/products?brand=${encodeURIComponent(brand.name)}`}
      className="card card-lift group flex flex-col overflow-hidden"
    >
      <div className="plate relative h-36 shrink-0 overflow-hidden sm:h-40">
        <span className="absolute left-3 top-3 z-10 rounded-md border border-line bg-white/85 px-2 py-1 font-mono text-[9px] font-medium uppercase tracking-[0.12em] text-muted backdrop-blur">
          {brand.since}
        </span>
        {product && (
          <span className="absolute inset-x-0 bottom-0 flex h-[92%] items-end justify-center pb-2">
            <span className="flex h-[88%] transition-transform duration-300 ease-out group-hover:scale-[1.04]">
              <PhoneArt product={product} className="h-full" />
            </span>
          </span>
        )}
      </div>

      <div className="flex flex-1 items-start justify-between gap-3 p-4">
        <div className="min-w-0">
          <h3 className="font-display text-base font-bold text-navy">{brand.name}</h3>
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted">{brand.blurb}</p>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-blue">
            {count} {count === 1 ? "phone" : "phones"}
          </p>
        </div>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-colors group-hover:border-blue group-hover:bg-blue group-hover:text-white">
          <ArrowUpRight size={15} aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
