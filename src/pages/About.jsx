import React from "react";
import {
  ArrowRight,
  BadgeCheck,
  ChevronRight,
  Headset,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";
import { Link } from "react-router-dom";
import PhoneArt from "../components/PhoneArt";
import { getProductBySlug } from "../data/products";

const stats = [
  { value: "2019", label: "Founded in London" },
  { value: "6", label: "Brands curated" },
  { value: "42k+", label: "Orders delivered" },
  { value: "4.9/5", label: "Average rating" },
];

const values = [
  {
    Icon: BadgeCheck,
    title: "Curated, not crowded",
    copy: "Six brands, current generation. If a phone is not worth your money, we do not stock it.",
  },
  {
    Icon: ShieldCheck,
    title: "Real warranty",
    copy: "Every device ships sealed with a 24-month official warranty registered in your name.",
  },
  {
    Icon: Sparkles,
    title: "Advice without commission",
    copy: "Our specialists recommend what fits your use, not what carries the biggest margin.",
  },
  {
    Icon: Headset,
    title: "Support that answers",
    copy: "Seven days a week, by phone or email. The same team handles sales and aftercare.",
  },
];

const showroom = getProductBySlug("iphone-17-pro-max");
const showroomAlt = getProductBySlug("galaxy-s26-ultra");

export default function About() {
  return (
    <div>
      <section className="wrap pt-4 sm:pt-6">
        <div className="plate-dark relative overflow-hidden rounded-[26px] px-6 py-10 sm:px-10 sm:py-14 lg:px-14">
          <div
            className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-blue/40 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-white/50">
                <Link to="/" className="transition-colors hover:text-white">
                  Home
                </Link>
                <ChevronRight size={13} aria-hidden="true" />
                <span className="text-white/80">About Us</span>
              </nav>

              <p className="eyebrow mt-6 flex items-center gap-2 text-white/60">
                <span className="h-1.5 w-1.5 rounded-[2px] bg-orange" aria-hidden="true" />
                About NORTH
              </p>
              <h1 className="type-hero mt-4 max-w-xl text-white">
                A shorter list.
                <br />
                Better phones.
              </h1>
              <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-white/65">
                We started NORTH because buying a phone had become a wall of spec sheets and
                sponsored rankings. So we built the opposite: a small, current catalog and
                people who will tell you when you do not need the biggest one.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link to="/products" className="btn-primary">
                  Browse the catalog
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <Link to="/contact" className="btn-light-outline">
                  Talk to us
                </Link>
              </div>
            </div>

            <div className="relative flex h-[230px] items-center justify-center sm:h-[300px]">
              <div
                className="absolute bottom-6 h-12 w-48 rounded-full bg-black/40 blur-2xl"
                aria-hidden="true"
              />
              <div className="relative flex h-[86%] items-end gap-3">
                <PhoneArt product={showroom} className="h-[88%]" />
                <PhoneArt product={showroomAlt} className="hidden h-full sm:block" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="wrap py-10 sm:py-14">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="card p-5">
              <p className="font-display text-2xl font-bold text-navy sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-white">
        <div className="wrap grid items-start gap-8 py-12 sm:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div>
            <p className="eyebrow flex items-center gap-2 text-muted">
              <span className="h-1.5 w-1.5 rounded-[2px] bg-orange" aria-hidden="true" />
              How we work
            </p>
            <h2 className="type-section mt-2.5 text-navy">
              We stock less, on purpose.
            </h2>
          </div>
          <div className="space-y-4 text-sm leading-relaxed text-muted">
            <p>
              Every phone on the shelf is checked against three questions: is it current, is it
              actually good, and would we recommend it to a friend without caveats? That is why
              the catalog is short. Filler models and old stock do not make the cut.
            </p>
            <p>
              We buy through official distribution, register the warranty in your name, and keep
              our own aftercare team. When something goes wrong, you talk to the same people who
              sold you the phone — not a marketplace support queue.
            </p>
            <p>
              And when a new model arrives, we tell existing customers first. No manufactured
              urgency, no fake countdowns. Just a straight answer on whether the upgrade is
              worth it.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-ice">
        <div className="wrap py-12 sm:py-16">
          <div className="max-w-2xl">
            <p className="eyebrow flex items-center gap-2 text-muted">
              <span className="h-1.5 w-1.5 rounded-[2px] bg-orange" aria-hidden="true" />
              What we stand for
            </p>
            <h2 className="type-section mt-2.5 text-navy">Four things we do not compromise.</h2>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {values.map(({ Icon, title, copy }) => (
              <div key={title} className="card p-5 sm:p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-soft text-blue">
                  {React.createElement(Icon, { size: 20, "aria-hidden": true })}
                </span>
                <h3 className="mt-4 font-display text-base font-bold text-navy">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap py-12 sm:py-16">
        <div className="plate-dark relative overflow-hidden rounded-[24px] px-6 py-9 sm:px-10 sm:py-11">
          <div
            className="pointer-events-none absolute -left-16 -top-20 h-64 w-64 rounded-full bg-orange/25 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <p className="eyebrow text-white/55">Visit the showroom</p>
              <h2 className="mt-2 max-w-lg font-display text-2xl font-bold tracking-[-0.03em] text-white sm:text-3xl">
                Try every flagship in one afternoon.
              </h2>
              <p className="mt-2 max-w-md text-sm text-white/60">
                18 Kingsway, London WC2B 6UN · Mon–Sat 9–8, Sun 10–6. No appointment needed.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/contact" className="btn-orange">
                Contact us
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link to="/products" className="btn-light-outline">
                <Truck size={16} aria-hidden="true" />
                Shop online
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
