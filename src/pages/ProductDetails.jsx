import React, { useMemo, useState } from "react";
import {
  ArrowLeftRight,
  BadgeCheck,
  ChevronRight,
  CreditCard,
  Heart,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PhoneArt from "../components/PhoneArt";
import RatingStars from "../components/RatingStars";
import QuantityStepper from "../components/QuantityStepper";
import ProductGrid from "../components/ProductGrid";
import {
  categories,
  defaultReviews,
  discountPercent,
  formatPrice,
  getProductBySlug,
  products,
} from "../data/products";
import { useCart } from "../context/CartContext";

const specLabels = {
  display: "Display",
  processor: "Processor",
  ram: "Memory",
  storage: "Storage",
  camera: "Camera system",
  battery: "Battery",
  charging: "Charging",
  os: "Operating system",
  build: "Build",
  weight: "Weight",
};

const formatDate = (value) =>
  new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export default function ProductDetails() {
  const { slug } = useParams();
  return <ProductDetailsView key={slug} slug={slug} />;
}

function ProductDetailsView({ slug }) {
  const navigate = useNavigate();
  const product = getProductBySlug(slug);
  const {
    addToCart,
    toggleWishlist,
    isWishlisted,
    toggleCompare,
    isCompared,
  } = useCart();

  const cheapestStorage = (product?.storage || []).reduce(
    (best, option) => (!best || option.delta < best.delta ? option : best),
    null
  );

  const [view, setView] = useState("front");
  const [colorIndex, setColorIndex] = useState(0);
  const [storageValue, setStorageValue] = useState(cheapestStorage?.value || "");
  const [ramValue, setRamValue] = useState(product?.ramOptions?.[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState("overview");

  const related = useMemo(() => {
    if (!product) return [];
    const sameBrand = products.filter(
      (entry) => entry.id !== product.id && entry.brand === product.brand
    );
    const sameCategory = products.filter(
      (entry) =>
        entry.id !== product.id &&
        entry.category === product.category &&
        entry.brand !== product.brand
    );
    const rest = products.filter(
      (entry) =>
        entry.id !== product.id &&
        !sameBrand.includes(entry) &&
        !sameCategory.includes(entry)
    );
    return [...sameBrand, ...sameCategory, ...rest].slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <div className="wrap flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <p className="eyebrow text-blue">404</p>
        <h1 className="type-section mt-2 text-navy">That product isn't here.</h1>
        <p className="mt-2 max-w-md text-sm text-muted">
          It may have sold out or moved. Browse the current catalog to find the right device.
        </p>
        <Link to="/products" className="btn-primary mt-6">
          Browse all phones
        </Link>
      </div>
    );
  }

  const category = categories.find((entry) => entry.slug === product.category);
  const color = product.colors[colorIndex] || product.colors[0];
  const storageOption = product.storage?.find((option) => option.value === storageValue);
  const unitPrice = product.price + (storageOption?.delta || 0);
  const compareAt = product.oldPrice ? product.oldPrice + (storageOption?.delta || 0) : 0;
  const discount = discountPercent(unitPrice, compareAt);
  const saved = isWishlisted(product.id);
  const compared = isCompared(product.id);
  const isPhone = product.art?.type === "phone";
  const reviews = product.reviews || defaultReviews;

  const distribution =
    product.rating >= 4.8
      ? [82, 12, 4, 1, 1]
      : product.rating >= 4.6
      ? [72, 18, 6, 3, 1]
      : [62, 22, 9, 4, 3];

  const options = {
    color: color?.name,
    storage: storageValue,
    ram: ramValue,
  };

  const handleAdd = () => addToCart(product, quantity, options);

  const handleBuyNow = () => {
    addToCart(product, quantity, options);
    navigate("/checkout");
  };

  const galleryViews = [
    { id: "front", label: "Front view" },
    { id: "back", label: "Back view" },
    { id: "angle", label: "Angled view" },
  ];

  return (
    <>
      <div className="border-b border-line bg-white">
        <div className="wrap flex flex-wrap items-center gap-1.5 py-4 text-xs text-muted">
          <Link to="/" className="transition-colors hover:text-navy">
            Home
          </Link>
          <ChevronRight size={13} aria-hidden="true" className="text-slate-300" />
          <Link to="/products" className="transition-colors hover:text-navy">
            Products
          </Link>
          <ChevronRight size={13} aria-hidden="true" className="text-slate-300" />
          <Link
            to={`/products?category=${product.category}`}
            className="transition-colors hover:text-navy"
          >
            {category?.name || "Devices"}
          </Link>
          <ChevronRight size={13} aria-hidden="true" className="text-slate-300" />
          <span className="text-ink">{product.name}</span>
        </div>
      </div>

      <div className="wrap grid gap-8 py-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:gap-12 lg:py-12">
        {/* Gallery */}
        <div>
          <div className="plate relative flex h-[400px] items-center justify-center overflow-hidden rounded-2xl border border-line p-8 sm:h-[520px]">
            <div className="pointer-events-none absolute left-4 top-4 z-10 flex flex-col gap-1.5">
              {discount > 0 && <span className="badge-sale">-{discount}%</span>}
              {product.badge && (
                <span className="badge-soft">{product.badge}</span>
              )}
            </div>

            <button
              type="button"
              onClick={() => toggleWishlist(product.id)}
              aria-pressed={saved}
              aria-label={saved ? "Remove from wishlist" : "Save this phone"}
              className={`absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border bg-white/95 shadow-sm transition-colors ${
                saved
                  ? "border-orange/40 text-orange-deep"
                  : "border-line text-muted hover:text-navy"
              }`}
            >
              <Heart size={18} fill={saved ? "currentColor" : "none"} aria-hidden="true" />
            </button>

            <div className="relative h-[88%]">
              <PhoneArt
                product={product}
                view={view}
                color={color?.hex}
                className="h-full"
              />
            </div>

            <span className="pointer-events-none absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
              NORTH selects · {product.brand}
            </span>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-3">
            {(isPhone ? galleryViews : product.colors.map((entry) => ({ id: entry.name, label: entry.name }))).map(
              (entry, index) => {
                const active = isPhone ? view === entry.id : index === colorIndex;
                return (
                  <button
                    key={entry.id}
                    type="button"
                    onClick={() => (isPhone ? setView(entry.id) : setColorIndex(index))}
                    aria-label={entry.label}
                    aria-pressed={active}
                    className={`plate flex h-24 items-center justify-center rounded-xl border p-3 transition-colors ${
                      active
                        ? "border-blue ring-1 ring-blue/30"
                        : "border-line hover:border-navy/30"
                    }`}
                  >
                    <PhoneArt
                      product={product}
                      view={isPhone ? entry.id : "front"}
                      color={isPhone ? color?.hex : product.colors[index]?.hex}
                      className="h-full"
                    />
                  </button>
                );
              }
            )}
          </div>
        </div>

        {/* Buy box */}
        <div className="self-start lg:sticky lg:top-[92px]">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-blue">
              {product.brand}
            </span>
            <span className="h-1 w-1 rounded-full bg-slate-300" aria-hidden="true" />
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
              {category?.name}
            </span>
          </div>

          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted">{product.tagline}</p>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <RatingStars rating={product.rating} size={15} />
            <a href="#reviews" className="text-xs font-medium text-blue hover:text-blue-deep">
              {product.reviewCount.toLocaleString()} customer reviews
            </a>
          </div>

          <div className="mt-5 flex flex-wrap items-end gap-x-3 gap-y-2">
            <span className="font-display text-3xl font-bold text-navy">
              {formatPrice(unitPrice)}
            </span>
            {compareAt > unitPrice && (
              <span className="text-sm text-muted line-through">{formatPrice(compareAt)}</span>
            )}
            {discount > 0 && (
              <span className="badge-sale">Save {formatPrice(compareAt - unitPrice)}</span>
            )}
          </div>
          <p className="mt-1 text-[11px] text-muted">
            Or 4 interest-free payments of {formatPrice(Math.round(unitPrice / 4))}. No fees.
          </p>

          <ul className="mt-5 space-y-2">
            {product.highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-2 text-sm text-muted">
                <BadgeCheck size={16} className="mt-0.5 shrink-0 text-blue" aria-hidden="true" />
                {highlight}
              </li>
            ))}
          </ul>

          <div className="mt-6 space-y-5 border-t border-line pt-5">
            {product.colors.length > 1 && (
              <div>
                <p className="text-[13px] font-medium text-ink">
                  Color: <span className="font-normal text-muted">{color?.name}</span>
                </p>
                <div className="mt-2.5 flex flex-wrap gap-2.5">
                  {product.colors.map((entry, index) => (
                    <button
                      key={entry.name}
                      type="button"
                      onClick={() => setColorIndex(index)}
                      aria-label={entry.name}
                      aria-pressed={index === colorIndex}
                      title={entry.name}
                      className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all ${
                        index === colorIndex
                          ? "border-blue ring-2 ring-blue/25 ring-offset-1"
                          : "border-line hover:border-navy/40"
                      }`}
                    >
                      <span
                        className="h-7 w-7 rounded-full border border-black/10"
                        style={{ backgroundColor: entry.hex }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.storage.length > 0 && (
              <div>
                <p className="text-[13px] font-medium text-ink">Storage</p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {product.storage.map((option) => {
                    const active = storageValue === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setStorageValue(option.value)}
                        aria-pressed={active}
                        className={`rounded-xl border px-4 py-2.5 text-left transition-colors ${
                          active
                            ? "border-blue bg-blue-soft ring-1 ring-blue"
                            : "border-line hover:border-navy/30"
                        }`}
                      >
                        <span className="block text-sm font-semibold text-navy">
                          {option.value}
                        </span>
                        <span className="block font-mono text-[10px] text-muted">
                          {option.delta === 0
                            ? "+$0"
                            : `${option.delta > 0 ? "+" : "−"}${formatPrice(
                                Math.abs(option.delta)
                              )}`}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {product.ramOptions.length > 0 && (
              <div>
                <p className="text-[13px] font-medium text-ink">Memory</p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {product.ramOptions.map((ram) => {
                    const active = ramValue === ram;
                    return (
                      <button
                        key={ram}
                        type="button"
                        onClick={() => setRamValue(ram)}
                        aria-pressed={active}
                        className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors ${
                          active
                            ? "border-blue bg-blue-soft text-navy ring-1 ring-blue"
                            : "border-line text-ink hover:border-navy/30"
                        }`}
                      >
                        {ram} RAM
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-3">
              <QuantityStepper value={quantity} onChange={setQuantity} label="Quantity" />
              <span
                className={`flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.1em] ${
                  product.stock <= 8 ? "text-orange-ink" : "text-mint"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    product.stock <= 8 ? "bg-orange" : "bg-mint"
                  }`}
                />
                {product.stock <= 8 ? `Only ${product.stock} left` : "In stock"}
              </span>
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              <button type="button" onClick={handleAdd} className="btn-primary w-full">
                <ShoppingBag size={16} aria-hidden="true" />
                Add to cart
              </button>
              <button type="button" onClick={handleBuyNow} className="btn-navy w-full">
                Buy now
              </button>
            </div>

            <button
              type="button"
              onClick={() => toggleCompare(product.id)}
              aria-pressed={compared}
              className={`inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl border text-xs font-semibold transition-colors ${
                compared
                  ? "border-blue bg-blue-soft text-blue"
                  : "border-line text-muted hover:border-blue/40 hover:text-blue"
              }`}
            >
              <ArrowLeftRight size={14} aria-hidden="true" />
              {compared ? "In comparison — manage at the bottom" : "Add to comparison"}
            </button>

            <div className="space-y-2.5 rounded-xl border border-line bg-blue-soft/60 p-4">
              <p className="flex items-center gap-2.5 text-xs text-muted">
                <Truck size={15} className="shrink-0 text-blue" aria-hidden="true" />
                Free express delivery over $499 — next-day on most orders
              </p>
              <p className="flex items-center gap-2.5 text-xs text-muted">
                <ShieldCheck size={15} className="shrink-0 text-blue" aria-hidden="true" />
                24-month NORTH warranty registered at checkout
              </p>
              <p className="flex items-center gap-2.5 text-xs text-muted">
                <RotateCcw size={15} className="shrink-0 text-blue" aria-hidden="true" />
                30-day free returns, no restocking fee
              </p>
              <p className="flex items-center gap-2.5 text-xs text-muted">
                <CreditCard size={15} className="shrink-0 text-blue" aria-hidden="true" />
                Card, KHQR or cash on delivery
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Detail tabs */}
      <div id="reviews" className="scroll-mt-24 border-t border-line bg-white">
        <div className="wrap py-10 sm:py-14">
          <div
            role="tablist"
            aria-label="Product information"
            className="flex gap-7 overflow-x-auto border-b border-line"
          >
            {[
              { id: "overview", label: "Overview" },
              { id: "specs", label: "Specifications" },
              { id: "reviews", label: `Reviews (${product.reviewCount.toLocaleString()})` },
            ].map((entry) => (
              <button
                key={entry.id}
                type="button"
                role="tab"
                id={`tab-${entry.id}`}
                aria-selected={tab === entry.id}
                aria-controls={`panel-${entry.id}`}
                onClick={() => setTab(entry.id)}
                className={`tab shrink-0 ${tab === entry.id ? "tab-active" : ""}`}
              >
                {entry.label}
              </button>
            ))}
          </div>

          <div className="pt-8">
            {tab === "overview" && (
              <div
                role="tabpanel"
                id="panel-overview"
                aria-labelledby="tab-overview"
                className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]"
              >
                <div>
                  <h2 className="font-display text-xl font-semibold text-navy">In short</h2>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                    {product.description}
                  </p>
                  <h3 className="mt-7 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-navy">
                    What stands out
                  </h3>
                  <ul className="mt-3 space-y-2.5">
                    {product.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-2 text-sm text-muted">
                        <BadgeCheck
                          size={16}
                          className="mt-0.5 shrink-0 text-blue"
                          aria-hidden="true"
                        />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-line bg-ice p-5">
                  <h3 className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-navy">
                    Key specification
                  </h3>
                  <dl className="mt-3 divide-y divide-line">
                    {["display", "processor", "camera", "battery"].map((key) => (
                      <div key={key} className="flex gap-4 py-3">
                        <dt className="w-20 shrink-0 text-xs text-muted">{specLabels[key]}</dt>
                        <dd className="text-xs font-medium text-ink">{product.specs[key]}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            )}

            {tab === "specs" && (
              <div
                role="tabpanel"
                id="panel-specs"
                aria-labelledby="tab-specs"
                className="max-w-3xl"
              >
                <dl className="divide-y divide-line border-y border-line">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="grid gap-1 py-4 sm:grid-cols-[160px_1fr] sm:gap-6">
                      <dt className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-muted">
                        {specLabels[key] || key}
                      </dt>
                      <dd className="text-sm leading-relaxed text-ink">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {tab === "reviews" && (
              <div
                role="tabpanel"
                id="panel-reviews"
                aria-labelledby="tab-reviews"
                className="grid gap-8 lg:grid-cols-[280px_1fr]"
              >
                <div className="self-start rounded-2xl border border-line bg-ice p-5">
                  <p className="font-display text-4xl font-bold text-navy">
                    {product.rating.toFixed(1)}
                  </p>
                  <RatingStars rating={product.rating} size={15} className="mt-1" />
                  <p className="mt-1 text-xs text-muted">
                    Based on {product.reviewCount.toLocaleString()} verified reviews
                  </p>
                  <div className="mt-4 space-y-2">
                    {distribution.map((percent, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="w-3 font-mono text-[10px] text-muted">{5 - index}</span>
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-line">
                          <span
                            className="block h-full rounded-full bg-amber"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                        <span className="w-8 text-right font-mono text-[10px] text-muted">
                          {percent}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  {reviews.map((review) => (
                    <article
                      key={`${review.name}-${review.title}`}
                      className="rounded-2xl border border-line bg-white p-5"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-navy to-blue text-[10px] font-semibold text-white">
                            {review.name
                              .split(" ")
                              .map((part) => part[0])
                              .slice(0, 2)
                              .join("")}
                          </span>
                          <div>
                            <p className="flex items-center gap-1.5 text-sm font-semibold text-navy">
                              {review.name}
                              {review.verified && (
                                <BadgeCheck
                                  size={14}
                                  className="text-blue"
                                  aria-label="Verified purchase"
                                />
                              )}
                            </p>
                            <p className="text-[11px] text-muted">{formatDate(review.date)}</p>
                          </div>
                        </div>
                        <RatingStars rating={review.rating} size={12} />
                      </div>
                      <h3 className="mt-3 text-sm font-semibold text-navy">{review.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{review.body}</p>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related */}
      <div className="wrap py-12 sm:py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow flex items-center gap-2 text-muted">
              <span className="h-1.5 w-1.5 rounded-[2px] bg-orange" aria-hidden="true" />
              You might also like
            </p>
            <h2 className="type-section mt-2.5 text-navy">Related products</h2>
          </div>
          <Link to="/products" className="text-link">
            Browse everything
            <ChevronRight size={15} aria-hidden="true" />
          </Link>
        </div>
        <ProductGrid products={related} className="mt-8" />
      </div>
    </>
  );
}
