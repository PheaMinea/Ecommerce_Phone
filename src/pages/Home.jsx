import React from "react";
import {
  ArrowRight,
  Headset,
  RotateCcw,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import ProductGrid from "../components/ProductGrid";
import SectionHeading from "../components/SectionHeading";
import CategoryCard from "../components/CategoryCard";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";
import PhoneArt from "../components/PhoneArt";
import {
  brands,
  categories,
  getProductBySlug,
  products,
} from "../data/products";

const services = [
  {
    Icon: Truck,
    title: "Free next-day delivery",
    copy: "Order before 4pm on orders over $999.",
  },
  {
    Icon: ShieldCheck,
    title: "24-month warranty",
    copy: "Every device, sealed and covered.",
  },
  {
    Icon: RotateCcw,
    title: "30-day returns",
    copy: "Changed your mind? Send it back free.",
  },
  {
    Icon: Headset,
    title: "Advice from people",
    copy: "Real specialists, seven days a week.",
  },
];

export default function Home() {
  const featured = products.filter((product) => product.isFeatured).slice(0, 4);
  const featuredIds = new Set(featured.map((product) => product.id));

  const bestSellers = products
    .filter(
      (product) =>
        product.isBestSeller &&
        product.art.type === "phone" &&
        !featuredIds.has(product.id)
    )
    .slice(0, 4);
  const bestSellerIds = new Set(bestSellers.map((product) => product.id));

  const newArrivals = products
    .filter(
      (product) =>
        product.isNew && !featuredIds.has(product.id) && !bestSellerIds.has(product.id)
    )
    .sort((a, b) => b.releaseYear - a.releaseYear || b.id - a.id)
    .slice(0, 4);

  const offerA = getProductBySlug("galaxy-s26-ultra");
  const offerB = getProductBySlug("oppo-find-x9-pro");

  return (
    <>
      <Hero />

      {/* Service strip */}
      <section id="service" className="scroll-mt-24 border-b border-line bg-white">
        <div className="wrap grid grid-cols-2 gap-x-4 gap-y-6 py-8 lg:grid-cols-4">
          {services.map(({ Icon, title, copy }) => (
            <div key={title} className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-ice text-navy">
                {React.createElement(Icon, { size: 18, "aria-hidden": true })}
              </span>
              <div>
                <h2 className="text-sm font-semibold text-navy">{title}</h2>
                <p className="mt-0.5 text-xs leading-relaxed text-muted">{copy}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Brands */}
      <section id="brands" className="scroll-mt-24 border-b border-line bg-white py-7">
        <div className="wrap flex flex-col items-center gap-5 lg:flex-row lg:justify-between">
          <p className="eyebrow shrink-0 text-muted">Authorised stock · five brands</p>
          <div className="grid w-full grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-5 lg:w-auto lg:gap-x-10">
            {brands.map((brand) => (
              <Link
                key={brand.name}
                to={`/products?brand=${encodeURIComponent(brand.name)}`}
                className="group text-center"
              >
                <span className="font-display text-lg font-bold tracking-tight text-muted transition-colors group-hover:text-navy">
                  {brand.name}
                </span>
                <span className="mt-0.5 block font-mono text-[9px] uppercase tracking-[0.1em] text-muted transition-colors group-hover:text-blue">
                  {brand.since}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="section scroll-mt-24 bg-ice">
        <div className="wrap">
          <SectionHeading
            eyebrow="Shop by category"
            title="Start with how you use your phone."
            copy="Six ways into the catalog, each with a short list of devices worth your time."
            link="/products"
            linkLabel="Browse everything"
          />
          <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <CategoryCard
                key={category.slug}
                category={category}
                count={products.filter((product) => product.category === category.slug).length}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section id="featured" className="section scroll-mt-24 bg-white pt-0 sm:pt-0">
        <div className="wrap">
          <SectionHeading
            eyebrow="Featured this week"
            title="The four we keep recommending."
            copy="Picked on sustained performance, camera consistency and support — not on commission."
            link="/products?sort=rating"
            linkLabel="Top rated"
          />
          <ProductGrid products={featured} className="mt-9" />
        </div>
      </section>

      {/* Offers */}
      <section id="offers" className="section scroll-mt-24 bg-[#f1f5f9] pt-0 sm:pt-0">
        <div className="wrap">
          <div className="relative overflow-hidden rounded-2xl border border-line bg-white">
            <div className="relative grid items-center gap-8 p-6 sm:p-10 lg:grid-cols-[1.05fr_0.95fr] lg:p-12">
              <div>
                <span className="badge-sale">Up to $240 off</span>
                <h2 className="type-section mt-4 max-w-md text-ink">
                  Flagship performance. Last season's price.
                </h2>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
                  We clear end-of-cycle stock properly — sealed, full warranty, and marked
                  down because a new model arrived. Not because something is wrong with it.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Link to="/products?deals=1" className="btn-primary group">
                    Shop current offers
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                  <span className="text-[11px] uppercase tracking-[0.12em] text-muted">
                    While stock lasts
                  </span>
                </div>
              </div>

              <div className="relative flex items-end justify-center gap-2 sm:gap-4">
                <Link
                  to={`/product/${offerA.slug}`}
                  className="relative block h-[230px] w-1/2 max-w-[170px] sm:h-[290px]"
                  aria-label={`View ${offerA.name}`}
                >
                  <PhoneArt product={offerA} className="h-full" />
                </Link>
                <Link
                  to={`/product/${offerB.slug}`}
                  className="relative hidden h-[260px] w-1/2 max-w-[180px] sm:block"
                  aria-label={`View ${offerB.name}`}
                >
                  <PhoneArt product={offerB} className="h-full" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best sellers */}
      <section className="section bg-ice">
        <div className="wrap">
          <SectionHeading
            eyebrow="Best selling phones"
            title="What everyone else is buying."
            copy="Ranked by orders placed in the last 30 days."
            link="/products?sort=popular"
            linkLabel="See the ranking"
          />
          <ProductGrid products={bestSellers} className="mt-9" />
        </div>
      </section>

      {/* New arrivals */}
      <section className="section bg-white">
        <div className="wrap">
          <SectionHeading
            eyebrow="New arrivals"
            title="Just landed in the studio."
            copy="The latest generation, unboxed and checked before anything goes on sale."
            link="/products?sort=newest"
            linkLabel="All new arrivals"
          />
          <ProductGrid products={newArrivals} className="mt-9" />
        </div>
      </section>

      <Testimonials />
      <Newsletter />
    </>
  );
}
