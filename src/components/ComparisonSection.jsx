import React from "react";
import { ArrowLeftRight, Check } from "lucide-react";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import PhoneArt from "./PhoneArt";
import SectionHeading from "./SectionHeading";

const comparisonPhones = [
  "iphone-17-pro-max",
  "galaxy-s26-ultra",
  "xiaomi-17-pro",
]
  .map((slug) => products.find((product) => product.slug === slug))
  .filter(Boolean);

export default function ComparisonSection() {
  const { toggleCompare, isCompared } = useCart();

  return (
    <section id="compare" className="section scroll-mt-24 bg-white">
      <div className="wrap">
        <SectionHeading
          eyebrow="Choose with confidence"
          title="Your next phone, side by side."
          copy="Compare camera, display and performance across three customer favorites."
          link="/products"
          linkLabel="Explore all phones"
        />

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {comparisonPhones.map((product) => {
            const selected = isCompared(product.id);
            return (
              <article key={product.id} className="card flex flex-col overflow-hidden">
                <div className="flex h-44 items-center justify-center bg-[#F8FAFC] p-5">
                  <PhoneArt product={product} className="h-full" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                    {product.brand}
                  </p>
                  <h3 className="mt-1 font-display text-base font-semibold text-navy">
                    {product.name}
                  </h3>
                  <dl className="mt-4 space-y-2 border-t border-line pt-4 text-xs">
                    <div className="flex justify-between gap-3">
                      <dt className="text-muted">Display</dt>
                      <dd className="text-right font-medium text-ink">
                        {product.specs.display.split("·")[0].trim()}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="text-muted">Camera</dt>
                      <dd className="text-right font-medium text-ink">
                        {product.specs.camera.split("·")[0].trim()}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="text-muted">Battery</dt>
                      <dd className="text-right font-medium text-ink">
                        {product.specs.battery.split("·")[0].trim()}
                      </dd>
                    </div>
                  </dl>
                  <button
                    type="button"
                    onClick={() => toggleCompare(product.id)}
                    aria-pressed={selected}
                    className={`mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-xl border px-4 text-xs font-semibold transition-colors ${
                      selected
                        ? "border-blue bg-blue-soft text-blue"
                        : "border-line text-navy hover:border-blue/40 hover:text-blue"
                    }`}
                  >
                    {selected ? <Check size={15} aria-hidden="true" /> : <ArrowLeftRight size={15} aria-hidden="true" />}
                    {selected ? "Added to compare" : "Add to compare"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
        <p className="mt-4 text-center text-xs text-muted">
          Select at least two phones to open the side-by-side comparison.
        </p>
      </div>
    </section>
  );
}
