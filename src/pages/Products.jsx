import React, { useEffect, useMemo, useState } from "react";
import { ChevronRight, SlidersHorizontal, X } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import ProductGrid from "../components/ProductGrid";
import ProductFilters from "../components/ProductFilters";
import SearchBar from "../components/SearchBar";
import {
  categories,
  discountPercent,
  products,
  screenBands,
  sortOptions,
} from "../data/products";

const emptyFilters = {
  brands: [],
  priceMin: "",
  priceMax: "",
  rams: [],
  storages: [],
  screens: [],
  os: [],
};

const unique = (values) => [...new Set(values)].filter(Boolean);

const brandList = unique(products.map((product) => product.brand)).sort((a, b) =>
  a.localeCompare(b)
);
const ramList = unique(products.flatMap((product) => product.ramOptions || [])).sort();
const storageList = unique(
  products.flatMap((product) => (product.storage || []).map((option) => option.value))
).sort((a, b) => parseFloat(a) - parseFloat(b));
const osList = unique(products.map((product) => product.osGroup)).filter(
  (os) => os === "iOS" || os === "Android"
);

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const categoryParam = searchParams.get("category") || "";
  const brandParam = searchParams.get("brand") || "";
  const dealsOnly = searchParams.get("deals") === "1";
  const sort = searchParams.get("sort") || "popular";

  const [filters, setFilters] = useState(() => ({
    ...emptyFilters,
    brands: brandParam ? [brandParam] : [],
  }));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const validCategory = categories.find((category) => category.slug === categoryParam);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (!value) next.delete(key);
    else next.set(key, value);
    setSearchParams(next);
  };

  const changeSort = (value) => {
    const next = new URLSearchParams(searchParams);
    if (value === "popular") next.delete("sort");
    else next.set("sort", value);
    setSearchParams(next, { replace: true });
  };

  const activeCount =
    filters.brands.length +
    filters.rams.length +
    filters.storages.length +
    filters.screens.length +
    filters.os.length +
    (filters.priceMin || filters.priceMax ? 1 : 0);

  const filtered = useMemo(() => {
    const min = filters.priceMin === "" ? null : Number(filters.priceMin);
    const max = filters.priceMax === "" ? null : Number(filters.priceMax);
    const selectedBands = screenBands.filter((band) =>
      filters.screens.includes(band.label)
    );
    const needle = query.trim().toLowerCase();

    let list = products.filter((product) => {
      if (validCategory && product.category !== validCategory.slug) return false;
      if (dealsOnly && !(product.oldPrice > product.price)) return false;

      if (needle) {
        const haystack = `${product.name} ${product.brand} ${product.tagline} ${product.osGroup}`.toLowerCase();
        if (!haystack.includes(needle)) return false;
      }

      if (filters.brands.length && !filters.brands.includes(product.brand)) return false;

      if (min !== null && product.price < min) return false;
      if (max !== null && product.price > max) return false;

      if (
        filters.rams.length &&
        !(product.ramOptions || []).some((ram) => filters.rams.includes(ram))
      ) {
        return false;
      }

      if (
        filters.storages.length &&
        !(product.storage || []).some((option) => filters.storages.includes(option.value))
      ) {
        return false;
      }

      if (selectedBands.length) {
        if (!product.screenSize) return false;
        const inBand = selectedBands.some(
          (band) => product.screenSize >= band.min && product.screenSize <= band.max
        );
        if (!inBand) return false;
      }

      if (filters.os.length && !filters.os.includes(product.osGroup)) return false;

      return true;
    });

    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "newest":
        list = [...list].sort(
          (a, b) => b.releaseYear - a.releaseYear || b.id - a.id
        );
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      default:
        list = [...list].sort((a, b) => b.reviewCount - a.reviewCount);
        if (dealsOnly) {
          list = [...list].sort(
            (a, b) =>
              discountPercent(b.price, b.oldPrice) - discountPercent(a.price, a.oldPrice)
          );
        }
    }

    return list;
  }, [filters, query, validCategory, dealsOnly, sort]);

  const title = query
    ? `Results for “${query}”`
    : dealsOnly
    ? "Current offers"
    : validCategory
    ? validCategory.name
    : brandParam
    ? brandParam
    : "All phones";

  const description = query
    ? `${filtered.length} ${filtered.length === 1 ? "device matches" : "devices match"} your search.`
    : dealsOnly
    ? "End-of-cycle flagships with full warranty and a real price cut."
    : validCategory
    ? validCategory.description
    : "Every device we stock, across five brands — no filler, no old stock.";

  const chips = [
    ...filters.brands.map((value) => ({
      key: `brand-${value}`,
      label: value,
      remove: () =>
        setFilters((current) => ({
          ...current,
          brands: current.brands.filter((entry) => entry !== value),
        })),
    })),
    ...filters.rams.map((value) => ({
      key: `ram-${value}`,
      label: `${value} RAM`,
      remove: () =>
        setFilters((current) => ({
          ...current,
          rams: current.rams.filter((entry) => entry !== value),
        })),
    })),
    ...filters.storages.map((value) => ({
      key: `storage-${value}`,
      label: value,
      remove: () =>
        setFilters((current) => ({
          ...current,
          storages: current.storages.filter((entry) => entry !== value),
        })),
    })),
    ...filters.screens.map((value) => ({
      key: `screen-${value}`,
      label: value,
      remove: () =>
        setFilters((current) => ({
          ...current,
          screens: current.screens.filter((entry) => entry !== value),
        })),
    })),
    ...filters.os.map((value) => ({
      key: `os-${value}`,
      label: value,
      remove: () =>
        setFilters((current) => ({
          ...current,
          os: current.os.filter((entry) => entry !== value),
        })),
    })),
  ];

  if (filters.priceMin || filters.priceMax) {
    chips.push({
      key: "price",
      label: `$${filters.priceMin || "0"} – $${filters.priceMax || "Any"}`,
      remove: () =>
        setFilters((current) => ({ ...current, priceMin: "", priceMax: "" })),
    });
  }

  const clearAll = () => setFilters(emptyFilters);

  const filterProps = {
    filters,
    setFilters,
    onClear: clearAll,
    brandList,
    ramList,
    storageList,
    osList,
    activeCount,
  };

  return (
    <>
      <div className="border-b border-line bg-white">
        <div className="wrap py-7 sm:py-9">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted">
            <Link to="/" className="transition-colors hover:text-navy">
              Home
            </Link>
            <ChevronRight size={13} aria-hidden="true" className="text-slate-300" />
            <Link to="/products" className="transition-colors hover:text-navy">
              Shop
            </Link>
            {(validCategory || dealsOnly || brandParam) && (
              <>
                <ChevronRight size={13} aria-hidden="true" className="text-slate-300" />
                <span className="text-ink">
                  {dealsOnly ? "Deals" : validCategory ? validCategory.name : brandParam}
                </span>
              </>
            )}
          </nav>

          <div className="mt-4 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="type-section text-navy">{title}</h1>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">{description}</p>
            </div>
            <SearchBar
              defaultValue={query}
              variant="large"
              onSearch={(clean) => updateParam("q", clean)}
              className="md:w-[340px]"
            />
          </div>
        </div>
      </div>

      <div className="bg-[#f1f5f9]">
      <div className="wrap grid gap-8 py-8 lg:grid-cols-[250px_minmax(0,1fr)] lg:py-10">
        <aside className="hidden lg:block" aria-label="Product filters">
          <div className="sticky top-[84px] max-h-[calc(100vh-104px)] overflow-y-auto rounded-xl border border-line bg-white p-5">
            <ProductFilters {...filterProps} idPrefix="desktop" />
          </div>
        </aside>

        <div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                className="btn-outline h-10 px-3 text-xs lg:hidden"
                aria-haspopup="dialog"
              >
                <SlidersHorizontal size={15} aria-hidden="true" />
                Filters
                {activeCount > 0 && (
                  <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-blue px-1 font-mono text-[9px] text-white">
                    {activeCount}
                  </span>
                )}
              </button>
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                {filtered.length} {filtered.length === 1 ? "device" : "devices"}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-xs font-medium text-muted">
                Sort by
              </label>
              <select
                id="sort"
                value={sort}
                onChange={(event) => changeSort(event.target.value)}
                className="h-10 rounded-lg border border-line bg-white px-3 pr-8 text-xs font-medium text-ink focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/15"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {chips.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {chips.map((chip) => (
                <button
                  key={chip.key}
                  type="button"
                  onClick={chip.remove}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white py-1 pl-2.5 pr-2 text-[11px] font-medium text-ink transition-colors hover:border-navy/30"
                >
                  {chip.label}
                  <X size={12} aria-hidden="true" className="text-muted" />
                  <span className="sr-only">Remove filter</span>
                </button>
              ))}
              <button
                type="button"
                onClick={clearAll}
                className="text-[11px] font-semibold text-blue transition-colors hover:text-blue-deep"
              >
                Clear all
              </button>
            </div>
          )}

          <div className="mt-6">
            <ProductGrid products={filtered} />
          </div>

          <p className="mt-8 text-center text-xs text-muted lg:hidden">
            Showing all {filtered.length} matching devices
          </p>
        </div>
      </div>
      </div>

      {/* Mobile filter drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-[80] lg:hidden">
          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setDrawerOpen(false)}
            className="animate-fade absolute inset-0 h-full w-full cursor-default bg-ink/25 backdrop-blur-[2px]"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Product filters"
            className="animate-slide-right absolute inset-y-0 right-0 flex w-[90%] max-w-[360px] flex-col bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <h2 className="font-display text-base font-semibold text-navy">Filters</h2>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close filters"
                className="flex h-11 w-11 items-center justify-center rounded-lg text-navy hover:bg-ice"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-5">
              <ProductFilters {...filterProps} idPrefix="mobile" />
            </div>
            <div className="border-t border-line bg-white p-4">
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="btn-primary w-full"
              >
                Show {filtered.length} {filtered.length === 1 ? "device" : "devices"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
