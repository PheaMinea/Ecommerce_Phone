import React from "react";
import { RotateCcw } from "lucide-react";
import { priceBands, screenBands } from "../data/products";

function Group({ title, children }) {
  return (
    <section className="border-t border-line py-5 first:border-t-0 first:pt-0">
      <h3 className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-navy">
        {title}
      </h3>
      <div className="mt-3 space-y-2.5">{children}</div>
    </section>
  );
}

function CheckRow({ id, label, checked, onChange }) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-center gap-2.5 text-sm text-muted transition-colors hover:text-navy"
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 rounded border-line text-blue focus:ring-blue"
      />
      <span className="leading-tight">{label}</span>
    </label>
  );
}

export default function ProductFilters({
  filters,
  setFilters,
  onClear,
  brandList,
  ramList,
  storageList,
  osList,
  activeCount,
  idPrefix = "desktop",
}) {
  const toggle = (key, value) => {
    setFilters((current) => ({
      ...current,
      [key]: current[key].includes(value)
        ? current[key].filter((entry) => entry !== value)
        : [...current[key], value],
    }));
  };

  const setPriceBand = (band) => {
    setFilters((current) => ({
      ...current,
      priceMin: String(band.min),
      priceMax: band.max >= 100000 ? "" : String(band.max),
    }));
  };

  const bandActive = (band) =>
    filters.priceMin === String(band.min) &&
    filters.priceMax === (band.max >= 100000 ? "" : String(band.max));

  return (
    <div>
      <div className="flex items-center justify-between pb-4">
        <div>
          <h2 className="font-display text-base font-semibold text-navy">Filters</h2>
          <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
            {activeCount ? `${activeCount} active` : "Nothing selected"}
          </p>
        </div>
        <button
          type="button"
          onClick={onClear}
          disabled={!activeCount}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue transition-colors hover:text-blue-deep disabled:cursor-not-allowed disabled:text-slate-300"
        >
          <RotateCcw size={13} aria-hidden="true" />
          Clear
        </button>
      </div>

      <Group title="Brand">
        {brandList.map((brand) => (
          <CheckRow
            key={brand}
            id={`${idPrefix}-brand-${brand}`}
            label={brand}
            checked={filters.brands.includes(brand)}
            onChange={() => toggle("brands", brand)}
          />
        ))}
      </Group>

      <Group title="Price">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted">
              $
            </span>
            <label htmlFor={`${idPrefix}-price-min`} className="sr-only">
              Minimum price
            </label>
            <input
              id={`${idPrefix}-price-min`}
              type="number"
              inputMode="numeric"
              min="0"
              placeholder="Min"
              value={filters.priceMin}
              onChange={(event) =>
                setFilters((current) => ({ ...current, priceMin: event.target.value }))
              }
              className="field h-10 pl-6 text-xs"
            />
          </div>
          <span className="text-muted">–</span>
          <div className="relative flex-1">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted">
              $
            </span>
            <label htmlFor={`${idPrefix}-price-max`} className="sr-only">
              Maximum price
            </label>
            <input
              id={`${idPrefix}-price-max`}
              type="number"
              inputMode="numeric"
              min="0"
              placeholder="Max"
              value={filters.priceMax}
              onChange={(event) =>
                setFilters((current) => ({ ...current, priceMax: event.target.value }))
              }
              className="field h-10 pl-6 text-xs"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {priceBands.map((band) => (
            <button
              key={band.label}
              type="button"
              onClick={() => setPriceBand(band)}
              aria-pressed={bandActive(band)}
              className={`rounded-full border px-2.5 py-1 text-[11px] transition-colors ${
                bandActive(band)
                  ? "border-blue bg-blue text-white"
                  : "border-line bg-white text-muted hover:border-navy/30 hover:text-navy"
              }`}
            >
              {band.label}
            </button>
          ))}
        </div>
      </Group>

      <Group title="RAM">
        {ramList.map((ram) => (
          <CheckRow
            key={ram}
            id={`${idPrefix}-ram-${ram}`}
            label={ram}
            checked={filters.rams.includes(ram)}
            onChange={() => toggle("rams", ram)}
          />
        ))}
      </Group>

      <Group title="Storage">
        {storageList.map((storage) => (
          <CheckRow
            key={storage}
            id={`${idPrefix}-storage-${storage}`}
            label={storage}
            checked={filters.storages.includes(storage)}
            onChange={() => toggle("storages", storage)}
          />
        ))}
      </Group>

      <Group title="Screen size">
        {screenBands.map((band, index) => (
          <CheckRow
            key={band.label}
            id={`${idPrefix}-screen-${index}`}
            label={band.label}
            checked={filters.screens.includes(band.label)}
            onChange={() => toggle("screens", band.label)}
          />
        ))}
      </Group>

      <Group title="Operating system">
        {osList.map((os) => (
          <CheckRow
            key={os}
            id={`${idPrefix}-os-${os}`}
            label={os}
            checked={filters.os.includes(os)}
            onChange={() => toggle("os", os)}
          />
        ))}
      </Group>
    </div>
  );
}
