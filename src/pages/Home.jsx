import React from "react";
import {
  ArrowRight,
  BadgeCheck,
  BadgeDollarSign,
  BatteryCharging,
  Camera,
  CreditCard,
  FoldHorizontal,
  Headset,
  Headphones,
  RotateCcw,
  ShieldCheck,
  Smartphone,
  Truck,
} from "lucide-react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import ProductGrid from "../components/ProductGrid";
import SectionHeading from "../components/SectionHeading";
import BrandCard from "../components/BrandCard";
import CategoryTile from "../components/CategoryTile";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";
import PhoneArt from "../components/PhoneArt";
import ComparisonSection from "../components/ComparisonSection";
import FaqSection from "../components/FaqSection";
import { brands, categories, getProductBySlug, products } from "../data/products";

const reasons = [
  {
    Icon: BadgeCheck,
    title: "100% genuine products",
    copy: "Sealed, unlocked and sourced from official distributors.",
  },
  {
    Icon: ShieldCheck,
    title: "Official warranty",
    copy: "24-month manufacturer warranty registered for you.",
  },
  {
    Icon: Truck,
    title: "Fast delivery",
    copy: "Free express over $499 — most orders arrive next day.",
  },
  {
    Icon: CreditCard,
    title: "Secure payment",
    copy: "Card, KHQR and cash on delivery, all fully protected.",
  },
  {
    Icon: Headset,
    title: "Real customer support",
    copy: "Specialists on call seven days a week, not a bot.",
  },
];

const categoryIcons = {
  flagship: Smartphone,
  foldable: FoldHorizontal,
  camera: Camera,
  value: BadgeDollarSign,
  audio: Headphones,
  accessories: BatteryCharging,
};

export default function Home() {
  const phoneProducts = products.filter((product) => product.art?.type === "phone");
  const featuredProducts = phoneProducts.filter((product) => product.isFeatured).slice(0, 3);
  const bestSellers = [...phoneProducts]
    .filter((product) => product.isBestSeller)
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 3);
  const newArrivals = [...phoneProducts]
    .filter((product) => product.isNew)
    .sort((a, b) => b.releaseYear - a.releaseYear || b.id - a.id)
    .slice(0, 3);

  const brandProducts = brands.map((brand) => {
    const pool = phoneProducts.filter((product) => product.brand === brand.name);
    return { brand, product: pool[0], count: pool.length };
  });
  const offerA = getProductBySlug("galaxy-s26-ultra");
  const offerB = getProductBySlug("xiaomi-17-pro");

  return (
    <>
      {/* 1. Announcement bar and navigation render globally in App. */}

      {/* 2. Hero */}
      <Hero />

      {/* 3. Featured brands */}
      <section className="border-b border-line bg-white py-8 sm:py-10">
        <div className="wrap">
          <p className="eyebrow text-center text-muted">Featured brands</p>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {brands.map((brand) => (
              <Link
                key={brand.name}
                to={`/products?brand=${encodeURIComponent(brand.name)}`}
                className="flex min-h-14 items-center justify-center rounded-xl border border-transparent px-3 text-center font-display text-sm font-semibold text-slate-500 transition-colors hover:border-line hover:bg-[#F8FAFC] hover:text-[#2563EB] sm:text-base"
              >
                {brand.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Shop by categories */}
      <section id="categories" className="section scroll-mt-24 bg-[#F8FAFC]">
        <div className="wrap">
          <SectionHeading
            eyebrow="Find your fit"
            title="Shop by category"
            copy="Start with the kind of device you need. We’ll help you find the right one."
            link="/products"
            linkLabel="Browse all phones"
          />
          <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-7">
            <CategoryTile
              title="All products"
              count={products.length}
              Icon={Smartphone}
              to="/products"
            />
            {categories.map((category) => (
              <CategoryTile
                key={category.slug}
                title={category.name}
                count={products.filter((product) => product.category === category.slug).length}
                Icon={categoryIcons[category.slug] || Smartphone}
                to={`/products?category=${category.slug}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Featured products */}
      <section id="featured" className="section scroll-mt-24 bg-white">
        <div className="wrap">
          <SectionHeading
            eyebrow="Handpicked for you"
            title="Featured smartphones"
            copy="A few standout devices, selected for the details that make a difference."
            link="/products"
            linkLabel="Explore the collection"
          />
          <ProductGrid products={featuredProducts} className="mt-8" />
        </div>
      </section>

      {/* 6. Best sellers */}
      <section id="best-sellers" className="section scroll-mt-24 bg-[#F8FAFC]">
        <div className="wrap">
          <SectionHeading
            eyebrow="Customer favorites"
            title="Best sellers"
            copy="The phones customers love, rated and reviewed by people who own them."
            link="/products?sort=popular"
            linkLabel="Shop best sellers"
          />
          <ProductGrid products={bestSellers} className="mt-8" />
        </div>
      </section>

      {/* 7. New arrivals */}
      <section id="new-arrivals" className="section scroll-mt-24 bg-white">
        <div className="wrap">
          <SectionHeading
            eyebrow="Just landed"
            title="New arrivals"
            copy="Meet the latest releases from the world’s leading smartphone makers."
            link="/products?sort=newest"
            linkLabel="See what’s new"
          />
          <ProductGrid products={newArrivals} className="mt-8" />
        </div>
      </section>

      {/* 8. Special offers */}
      <section id="promotions" className="scroll-mt-24 bg-[#F8FAFC] pb-14 sm:pb-20">
        <div className="wrap">
          <div className="plate-dark relative overflow-hidden rounded-[24px] px-6 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-12">
            <div
              className="pointer-events-none absolute -left-24 top-1/2 h-[380px] w-[380px] -translate-y-1/2 rounded-full bg-blue/25 blur-3xl"
              aria-hidden="true"
            />
            <div className="relative grid items-center gap-8 lg:grid-cols-[1.08fr_0.92fr]">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-blue/30 bg-blue/10 px-3 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-blue-soft">
                  Limited-time offers
                </span>
                <h2 className="type-section mt-4 max-w-lg text-white">
                  A smarter upgrade, at a better price.
                </h2>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-white/65">
                  Find a great price on genuine, sealed phones — all backed by the official
                  manufacturer warranty.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Link to="/products?deals=1" className="btn-primary group">
                    Shop special offers
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                  <Link
                    to="/products"
                    className="text-sm font-semibold text-white/70 transition-colors hover:text-white"
                  >
                    Explore all phones
                  </Link>
                </div>
              </div>

              <div className="relative flex items-end justify-center gap-1 sm:gap-3">
                <Link
                  to={`/product/${offerA.slug}`}
                  className="relative block h-[210px] w-1/2 max-w-[165px] sm:h-[260px]"
                  aria-label={`View ${offerA.name}`}
                >
                  <PhoneArt product={offerA} className="h-full" />
                  <span className="absolute -right-2 top-2 rounded-full bg-[#EF4444] px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-wider text-white">
                    Save $120
                  </span>
                </Link>
                <Link
                  to={`/product/${offerB.slug}`}
                  className="relative hidden h-[235px] w-1/2 max-w-[170px] sm:block"
                  aria-label={`View ${offerB.name}`}
                >
                  <PhoneArt product={offerB} className="h-full" />
                  <span className="absolute -right-2 top-6 rounded-full bg-[#EF4444] px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-wider text-white">
                    Save $100
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Shop by brand */}
      <section className="section bg-white">
        <div className="wrap">
          <SectionHeading
            eyebrow="Explore the makers"
            title="Shop by brand"
            copy="Discover the latest devices and signature features from brands you trust."
            link="/products"
            linkLabel="Browse every phone"
          />
          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
            {brandProducts.map(({ brand, product, count }) => (
              <BrandCard key={brand.name} brand={brand} product={product} count={count} />
            ))}
          </div>
        </div>
      </section>

      {/* 10. Smartphone comparison */}
      <ComparisonSection />

      {/* 11. Why shop with us */}
      <section id="why-us" className="section scroll-mt-24 bg-[#F8FAFC]">
        <div className="wrap">
          <SectionHeading
            eyebrow="Why shop with us"
            title="The details matter after checkout."
            copy="A premium phone deserves more than a marketplace listing. This is what comes with every order."
          />
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-5">
            {reasons.map(({ Icon, title, copy }) => (
              <div key={title} className="card p-5">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-soft text-blue">
                  {React.createElement(Icon, { size: 20, "aria-hidden": true })}
                </span>
                <h3 className="mt-4 font-display text-sm font-bold text-navy">{title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted">{copy}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 rounded-xl border border-line bg-white px-4 py-3 text-xs text-muted">
            <span className="flex items-center gap-1.5">
              <RotateCcw size={14} className="text-blue" aria-hidden="true" />
              30-day free returns
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-blue" aria-hidden="true" />
              Official warranty on every device
            </span>
            <span className="flex items-center gap-1.5">
              <BadgeCheck size={14} className="text-blue" aria-hidden="true" />
              Genuine, sealed stock only
            </span>
          </div>
        </div>
      </section>

      {/* 12. Customer reviews */}
      <Testimonials />

      {/* 13. FAQ */}
      <FaqSection />

      {/* 14. Newsletter */}
      <Newsletter />

      {/* 15. Footer renders globally in App. */}
    </>
  );
}
