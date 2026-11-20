import React, { useEffect, useMemo, useState } from "react";
import { ChevronRight, SlidersHorizontal, X } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import ProductGrid from "../components/ProductGrid";
import ProductFilters from "../components/ProductFilters";
import SearchBar from "../components/SearchBar";
import {
  categories,
  discountPercent,
  getEntryPrice,
  products,
  sortOptions,
} from "../data/products";

const emptyFilters = {
  brands: [],
  storages: [],
  priceMin: "",
  priceMax: "",
  inStock: false,
};

const unique = (values) => [...new Set(values)].filter(Boolean);

const brandList = unique(products.map((product) => product.brand)).sort((a, b) =>
  a.localeCompare(b)
);
const storageList = unique(
  products.flatMap((product) => (product.storage || []).map((option) => option.value))
).sort((a, b) => parseFloat(a) - parseFloat(b));

const categoryList = categories.map((category) => ({
  ...category,
  count: products.filter((product) => product.category === category.slug).length,
}));

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const categoryParam = searchParams.get("category") || "";
  const brandParam = searchParams.get("brand") || "";
  const dealsParam = searchParams.get("deals") === "1";
  const sort = searchParams.get("sort") || "popular";

  const [storedFilters, setStoredFilters] = useState(() => ({
    ...emptyFilters,
    brands: brandParam ? [brandParam] : [],
    sourceBrandParam: brandParam,
  }));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filters = useMemo(
    () =>
      storedFilters.sourceBrandParam === brandParam
        ? storedFilters
        : {
            ...storedFilters,
            brands: brandParam ? [brandParam] : [],
            sourceBrandParam: brandParam,
          },
    [storedFilters, brandParam]
  );
  const setFilters = (update) => {
    setStoredFilters((current) => {
      const currentForBrand =
        current.sourceBrandParam === brandParam
          ? current
          : {
              ...current,
              brands: brandParam ? [brandParam] : [],
              sourceBrandParam: brandParam,
            };
      const next = typeof update === "function" ? update(currentForBrand) : update;
      return { ...next, sourceBrandParam: brandParam };
    });
  };

  /* Category and promotions are URL-driven; the rest live in local state. */
  const filterState = {
    ...filters,
    categories: categoryParam ? [categoryParam] : [],
    deals: dealsParam,
  };

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const setParam = (key, value, options) => {
    const next = new URLSearchParams(searchParams);
    if (!value) next.delete(key);
    else next.set(key, value);
    setSearchParams(next, options);
  };

  const changeSort = (value) => setParam("sort", value === "popular" ? "" : value, { replace: true });

  const selectCategory = (slug) => setParam("category", slug);
  const toggleDeals = () => setParam("deals", dealsParam ? "" : "1");

  const activeCount =
    filters.brands.length +
    filters.storages.length +
    (filters.priceMin || filters.priceMax ? 1 : 0) +
    (filters.inStock ? 1 : 0) +
    (categoryParam ? 1 : 0) +
    (dealsParam ? 1 : 0);

  const filtered = useMemo(() => {
    const min = filters.priceMin === "" ? null : Number(filters.priceMin);
    const max = filters.priceMax === "" ? null : Number(filters.priceMax);
    const needle = query.trim().toLowerCase();

    let list = products.filter((product) => {
      if (categoryParam && product.category !== categoryParam) return false;
      if (dealsParam && !(product.oldPrice > product.price)) return false;
      if (filters.inStock && !(product.stock > 0)) return false;

      if (needle) {
        const haystack = `${product.name} ${product.brand} ${product.tagline} ${product.osGroup}`.toLowerCase();
        if (!haystack.includes(needle)) return false;
      }

      if (filters.brands.length && !filters.brands.includes(product.brand)) return false;

      const entryPrice = getEntryPrice(product);
      if (min !== null && entryPrice < min) return false;
      if (max !== null && entryPrice > max) return false;

      if (
        filters.storages.length &&
        !(product.storage || []).some((option) => filters.storages.includes(option.value))
      ) {
        return false;
      }

      return true;
    });

    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => getEntryPrice(a) - getEntryPrice(b));
        break;
      case "price-desc":
        list = [...list].sort((a, b) => getEntryPrice(b) - getEntryPrice(a));
        break;
      case "newest":
        list = [...list].sort((a, b) => b.releaseYear - a.releaseYear || b.id - a.id);
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      default:
        list = [...list].sort((a, b) => b.reviewCount - a.reviewCount);
        if (dealsParam) {
          list = [...list].sort(
            (a, b) =>
              discountPercent(b.price, b.oldPrice) - discountPercent(a.price, a.oldPrice)
          );
        }
    }

    return list;
  }, [filters, query, sort, categoryParam, dealsParam]);

  const activeCategory =
    categoryParam !== ""
      ? categories.find((category) => category.slug === categoryParam)
      : null;

  const selectedBrand = filters.brands.length === 1 ? filters.brands[0] : "";
  const title = query
    ? `Results for “${query}”`
    : dealsParam
    ? "Current promotions"
    : activeCategory
    ? activeCategory.name
    : selectedBrand || "All products";

  const description = query
    ? `${filtered.length} ${filtered.length === 1 ? "product matches" : "products match"} your search.`
    : dealsParam
    ? "End-of-cycle flagships with full warranty and a real price cut."
    : activeCategory
    ? activeCategory.description
    : selectedBrand
    ? `Every ${selectedBrand} device in stock, sealed and covered by the official warranty.`
    : "Every device we stock across six brands — no filler, no old stock.";

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
    ...filters.storages.map((value) => ({
      key: `storage-${value}`,
      label: value,
      remove: () =>
        setFilters((current) => ({
          ...current,
          storages: current.storages.filter((entry) => entry !== value),
        })),
    })),
    ...(filters.inStock
      ? [
          {
            key: "instock",
            label: "In stock",
            remove: () => setFilters((current) => ({ ...current, inStock: false })),
          },
        ]
      : []),
    ...(dealsParam
      ? [
          {
            key: "deals",
            label: "On promotion",
            remove: () => toggleDeals(),
          },
        ]
      : []),
  ];

  if (filters.priceMin || filters.priceMax) {
    chips.push({
      key: "price",
      label: `$${filters.priceMin || "0"} – $${filters.priceMax || "Any"}`,
      remove: () => setFilters((current) => ({ ...current, priceMin: "", priceMax: "" })),
    });
  }

  const clearAll = () => {
    setFilters(emptyFilters);
    const next = new URLSearchParams(searchParams);
    next.delete("brand");
    next.delete("category");
    next.delete("deals");
    setSearchParams(next);
  };

  const filterProps = {
    filters: filterState,
    setFilters,
    onClear: clearAll,
    onSelectCategory: selectCategory,
    onToggleDeals: toggleDeals,
    brandList,
    categoryList,
    storageList,
    activeCount,
  };

  return (
    <>
      <div className="border-b border-line bg-white">
        <div className="wrap pb-5 pt-6 sm:pb-6 sm:pt-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted">
            <Link to="/" className="transition-colors hover:text-navy">
              Home
            </Link>
            <ChevronRight size={13} aria-hidden="true" className="text-slate-300" />
            <Link to="/products" className="transition-colors hover:text-navy">
              Products
            </Link>
            {(activeCategory || dealsParam || brandParam) && (
              <>
                <ChevronRight size={13} aria-hidden="true" className="text-slate-300" />
                <span className="text-ink">
                  {dealsParam ? "Promotions" : activeCategory ? activeCategory.name : brandParam}
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
              onSearch={(clean) => setParam("q", clean)}
              className="md:w-[340px]"
            />
          </div>

          <div className="no-scrollbar -mx-4 mt-6 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
            <button
              type="button"
              onClick={() => selectCategory("")}
              aria-pressed={!categoryParam}
              className={`h-9 shrink-0 rounded-full border px-4 text-xs font-semibold transition-colors ${
                !categoryParam
                  ? "border-navy bg-navy text-white"
                  : "border-line bg-white text-muted hover:border-navy/30 hover:text-navy"
              }`}
            >
              All products
            </button>
            {categories.map((category) => {
              const active = categoryParam === category.slug;
              return (
                <button
                  key={category.slug}
                  type="button"
                  onClick={() => selectCategory(active ? "" : category.slug)}
                  aria-pressed={active}
                  className={`h-9 shrink-0 rounded-full border px-4 text-xs font-semibold transition-colors ${
                    active
                      ? "border-navy bg-navy text-white"
                      : "border-line bg-white text-muted hover:border-navy/30 hover:text-navy"
                  }`}
                >
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-ice">
        <div className="wrap grid gap-8 py-8 lg:grid-cols-[250px_minmax(0,1fr)] lg:py-10">
          <aside className="hidden lg:block" aria-label="Product filters">
            <div className="sticky top-[88px] max-h-[calc(100vh-108px)] overflow-y-auto rounded-2xl border border-line bg-white p-5">
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
                  {filtered.length} {filtered.length === 1 ? "product" : "products"}
                </p>
                <span className="hidden items-center gap-1.5 text-[11px] text-muted xl:flex">
                  · select up to 3 to compare
                </span>
              </div>

              <div className="flex items-center gap-2">
                <label htmlFor="sort" className="text-xs font-medium text-muted">
                  Sort by
                </label>
                <select
                  id="sort"
                  value={sort}
                  onChange={(event) => changeSort(event.target.value)}
                  className="h-10 rounded-xl border border-line bg-white px-3 pr-8 text-xs font-medium text-ink focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/15"
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
              Showing all {filtered.length} matching products
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
            className="animate-fade absolute inset-0 h-full w-full cursor-default bg-navy-deep/40 backdrop-blur-[2px]"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Product filters"
            className="animate-slide-right absolute inset-y-0 right-0 flex w-[90%] max-w-[370px] flex-col bg-white shadow-2xl"
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
                Show {filtered.length} {filtered.length === 1 ? "product" : "products"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
