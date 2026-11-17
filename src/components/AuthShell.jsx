import React from "react";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import PhoneArt from "./PhoneArt";
import { getProductBySlug } from "../data/products";

const points = [
  "Five brands, current generation only",
  "24-month NORTH warranty on every device",
  "Free next-day delivery over $999",
];

export default function AuthShell({ eyebrow, title, subtitle, children, footer }) {
  const device = getProductBySlug("iphone-17-pro-max");

  return (
    <div className="wrap py-8 sm:py-14">
      <div className="grid overflow-hidden rounded-2xl border border-line bg-white lg:grid-cols-[0.92fr_1.08fr]">
        <aside className="relative hidden flex-col border-r border-line bg-ice p-10 lg:flex">
          <Link to="/" className="flex items-center" aria-label="NORTH — home">
            <span className="font-display text-[22px] font-bold leading-none tracking-[-0.05em] text-ink">
              NORTH<span className="text-blue">.</span>
            </span>
          </Link>

          <div className="mt-12 max-w-sm">
            <p className="eyebrow text-muted">The flagship store</p>
            <h2 className="mt-3 max-w-sm text-3xl font-bold leading-tight tracking-[-0.03em] text-ink">
              A shorter list. Better phones.
            </h2>
            <ul className="mt-6 space-y-3">
              {points.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm text-muted">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue/10 text-blue">
                    <Check size={10} aria-hidden="true" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-auto flex h-[220px] items-end justify-center pt-10">
            <PhoneArt product={device} color="#2c3a57" className="h-full" />
          </div>
        </aside>

        <div className="p-6 sm:p-10 lg:p-12">
          <div className="mx-auto max-w-md">
            <Link
              to="/"
              className="mb-8 inline-flex items-center lg:hidden"
              aria-label="NORTH — home"
            >
              <span className="font-display text-xl font-bold leading-none tracking-[-0.05em] text-ink">
                NORTH<span className="text-blue">.</span>
              </span>
            </Link>

            <p className="eyebrow text-muted">{eyebrow}</p>
            <h1 className="mt-2 text-2xl font-bold tracking-[-0.03em] text-ink sm:text-3xl">
              {title}
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-muted">{subtitle}</p>

            <div className="mt-7">{children}</div>

            <div className="mt-7 border-t border-line pt-5 text-sm text-muted">{footer}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
