import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getProductBySlug } from "../data/products";

const slides = [
  {
    slug: "iphone-17-pro-max",
    banner: "/iphone-17-pro-max-banner.png",
    imageAlt: "iPhone 17 Pro Max new arrival. Shop now.",
  },
  {
    slug: "iphone-17-pro",
    banner: "/iphone-17-pro-banner-midnight.png",
    imageWidth: "1095",
    imageHeight: "768",
    imageAlt: "Deep blue iPhone Pro shown from the front and back",
    headline: "iPhone 17 Pro",
    caption: "Pro performance, in every detail.",
    cta: "Shop iPhone 17 Pro",
  },
  {
    slug: "iphone-17-pro",
    banner: "/iphone-17-pro-banner-silver.png",
    imageWidth: "1365",
    imageHeight: "768",
    imageAlt: "Silver iPhone Pro displayed in a studio setting",
    headline: "A brighter kind of Pro.",
    caption: "Meet the iPhone 17 Pro in silver.",
    cta: "Explore iPhone",
    copyPlacement: "top",
  },
];

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const slide = slides[activeIndex];
  const product = getProductBySlug(slide.slug);

  const slideControls = slides.map((entry, index) => (
    <button
      key={`${entry.slug}-${index}`}
      type="button"
      onClick={() => setActiveIndex(index)}
      aria-label={`Show ${entry.headline || getProductBySlug(entry.slug).name}`}
      aria-current={index === activeIndex ? "true" : undefined}
      className="flex h-8 w-8 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#2563eb]"
    >
      <span
        className={`h-1.5 rounded-full transition-all ${
          index === activeIndex ? "w-5 bg-[#2563eb]" : "w-1.5 bg-[#2563eb]/35"
        }`}
      />
    </button>
  ));

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <section
      className="relative isolate overflow-hidden bg-[#eff6ff]"
      aria-label="Featured phones"
      aria-roledescription="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
    >
      <div className="relative mx-auto max-w-[1800px]">
        {slide.headline ? (
          <Link
            to={`/product/${product.slug}`}
            aria-label={`Shop ${product.name}`}
            className="relative block aspect-[16/9] overflow-hidden bg-[#f3f5f9] focus-visible:outline-[#2563eb]"
          >
            <img
              src={slide.banner}
              alt={slide.imageAlt}
              width={slide.imageWidth}
              height={slide.imageHeight}
              className="absolute inset-0 h-full w-full object-contain"
            />
            <span
              className={`absolute left-[4%] z-10 flex flex-col sm:left-[5%] md:left-[6%] ${
                slide.copyPlacement === "top"
                  ? "top-[5%] w-[34%] sm:inset-y-0 sm:top-auto sm:w-[38%] sm:justify-center md:w-[34%]"
                  : "inset-y-0 w-[52%] justify-center sm:w-[44%] md:w-[38%]"
              }`}
            >
              <span className="font-display text-[clamp(1rem,3.8vw,3rem)] font-bold leading-tight tracking-tight text-[#111827]">
                {slide.headline}
              </span>
              <span className="mt-1.5 text-[clamp(0.65rem,1.3vw,1.125rem)] font-medium text-[#475569] sm:mt-3">
                {slide.caption}
              </span>
              <span className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-[#2563eb] px-3 py-1.5 text-[10px] font-semibold text-white transition-colors hover:bg-[#1d4ed8] sm:mt-5 sm:px-5 sm:py-2.5 sm:text-sm">
                {slide.cta}
                <ArrowRight size={14} aria-hidden="true" />
              </span>
            </span>
          </Link>
        ) : (
          <Link
            to={`/product/${product.slug}`}
            aria-label={`Shop ${product.name}`}
            className="block aspect-[16/9] overflow-hidden bg-[#f3f5f9] focus-visible:outline-[#2563eb]"
          >
            <img
              src={slide.banner}
              alt={slide.imageAlt}
              width="1800"
              height="768"
              fetchPriority="high"
              className="h-full w-full object-contain"
            />
          </Link>
        )}
        <div
          className={`absolute inset-x-0 z-10 flex justify-center ${
            slide.headline ? "bottom-2 sm:bottom-4" : "bottom-[12%]"
          }`}
        >
          <div className="flex rounded-full bg-white/80 px-1 backdrop-blur-sm">
            {slideControls}
          </div>
        </div>
      </div>
    </section>
  );
}
