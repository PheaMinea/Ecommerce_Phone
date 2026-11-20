import React from "react";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import PhoneArt from "./PhoneArt";
import { Logo } from "./Navbar";
import { getProductBySlug } from "../data/products";

const points = [
  "Six brands, current generation only",
  "24-month official warranty on every phone",
  "Free express delivery over $499",
];

export default function AuthShell({ eyebrow, title, subtitle, children, footer }) {
  const device = getProductBySlug("iphone-17-pro-max");

  return (
    <div className="wrap py-8 sm:py-14">
      <div className="grid overflow-hidden rounded-[24px] border border-line bg-white lg:grid-cols-[0.94fr_1.06fr]">
        <aside className="plate-dark relative hidden flex-col overflow-hidden p-10 lg:flex">
          <div
            className="pointer-events-none absolute -right-24 -top-20 h-64 w-64 rounded-full bg-blue/40 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative">
            <Logo />
          </div>

          <div className="relative mt-12 max-w-sm">
            <p className="eyebrow flex items-center gap-2 text-white/55">
              <span className="h-1.5 w-1.5 rounded-[2px] bg-orange" aria-hidden="true" />
              The premium store
            </p>
            <h2 className="mt-3 max-w-sm text-3xl font-bold leading-tight tracking-[-0.03em] text-white">
              A shorter list.
              <br />
              Better phones.
            </h2>
            <ul className="mt-6 space-y-3">
              {points.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm text-white/65">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-orange text-navy-deep">
                    <Check size={10} aria-hidden="true" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mt-auto flex h-[220px] items-end justify-center pt-10">
            <PhoneArt product={device} color="#2c3a57" className="h-full" />
          </div>
        </aside>

        <div className="p-6 sm:p-10 lg:p-12">
          <div className="mx-auto max-w-md">
            <div className="mb-8 lg:hidden">
              <Logo tone="dark" />
            </div>

            <p className="eyebrow text-blue">{eyebrow}</p>
            <h1 className="mt-2 text-2xl font-bold tracking-[-0.03em] text-navy sm:text-3xl">
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
