import React from "react";
import { ArrowRight, Check, ShieldCheck, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import PhoneArt from "./PhoneArt";
import { getProductBySlug, formatPrice } from "../data/products";

const specRail = [
  { label: "Chip", value: "A19 Pro" },
  { label: "Display", value: '6.9" · 120Hz' },
  { label: "Cameras", value: "48MP × 3" },
  { label: "Battery", value: "39 hours video" },
];

export default function Hero() {
  const hero = getProductBySlug("iphone-17-pro-max");

  return (
    <section className="border-b border-line bg-[#f3f4f6]">
      <div className="wrap py-12 sm:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-blue" aria-hidden="true" />
              New arrival · iPhone 17 Pro Max
            </p>

            <h1 className="type-hero mt-4 max-w-xl text-ink">
              Titanium,
              <br />
              re-engineered.
            </h1>

            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted">
              A19 Pro. A 4x tetraprism telephoto. 39 hours of video. The most capable
              iPhone we have ever stocked — available for next-day delivery.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link to={`/product/${hero.slug}`} className="btn-primary">
                Shop Now
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link to="/products" className="btn-outline">
                Explore More
              </Link>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted">
              <span className="flex items-center gap-1.5">
                <Truck size={14} className="text-blue" aria-hidden="true" />
                Free next-day delivery
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-blue" aria-hidden="true" />
                24-month warranty
              </span>
              <span className="flex items-center gap-1.5">
                <Check size={14} className="text-blue" aria-hidden="true" />
                30-day returns
              </span>
            </div>
          </div>

          <div className="relative flex h-[360px] items-center justify-center rounded-2xl border border-line bg-white p-6 sm:h-[470px] sm:p-10">
            <div className="h-[90%]">
              <PhoneArt product={hero} className="h-full" />
            </div>
            <p className="absolute bottom-4 left-5 text-xs text-muted">
              iPhone 17 Pro Max · From {formatPrice(hero.price)}
            </p>
          </div>
        </div>

        <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line pt-8 md:grid-cols-4">
          {specRail.map((spec) => (
            <div key={spec.label}>
              <dt className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted">
                {spec.label}
              </dt>
              <dd className="mt-1.5 text-sm font-semibold text-ink">{spec.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
