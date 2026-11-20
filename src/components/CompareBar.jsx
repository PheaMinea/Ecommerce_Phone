import React, { useEffect, useState } from "react";
import { ArrowLeftRight, Trash2, X } from "lucide-react";
import { Link } from "react-router-dom";
import PhoneArt from "./PhoneArt";
import { useCart } from "../context/CartContext";
import {
  formatPrice,
  getEntryPrice,
  getProductById,
} from "../data/products";

const rows = [
  { label: "Price", render: (product) => formatPrice(getEntryPrice(product)) },
  { label: "Display", render: (product) => product.specs.display },
  { label: "Processor", render: (product) => product.specs.processor },
  { label: "Memory", render: (product) => product.specs.ram },
  { label: "Storage", render: (product) => product.specs.storage },
  { label: "Camera", render: (product) => product.specs.camera },
  { label: "Battery", render: (product) => product.specs.battery },
  { label: "OS", render: (product) => product.specs.os },
  { label: "Weight", render: (product) => product.specs.weight },
];

export default function CompareBar() {
  const { compare, toggleCompare, clearCompare, addToCart } = useCart();
  const [open, setOpen] = useState(false);
  const items = compare.map((id) => getProductById(id)).filter(Boolean);

  useEffect(() => {
    if (!open) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!items.length) return null;

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-[70] border-t border-line bg-white/95 shadow-[0_-14px_36px_-20px_rgba(15,23,42,0.4)] backdrop-blur">
        <div className="wrap flex items-center justify-between gap-3 py-2.5">
          <div className="flex min-w-0 items-center gap-2.5 sm:gap-3.5">
            <span className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted sm:flex">
              <ArrowLeftRight size={13} aria-hidden="true" />
              Compare
            </span>
            <ul className="flex min-w-0 items-center gap-1.5">
              {items.map((product) => (
                <li
                  key={product.id}
                  className="relative flex items-center gap-2 rounded-lg border border-line bg-ice py-1 pl-1 pr-2"
                >
                  <span className="flex h-9 w-7 items-center justify-center overflow-hidden rounded bg-white">
                    <PhoneArt product={product} className="h-[26px]" />
                  </span>
                  <span className="hidden max-w-[110px] truncate text-[11px] font-medium text-ink md:block">
                    {product.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleCompare(product.id)}
                    aria-label={`Remove ${product.name} from comparison`}
                    className="flex h-6 w-6 items-center justify-center rounded text-muted hover:bg-white hover:text-ink"
                  >
                    <X size={12} aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={clearCompare}
              className="hidden text-xs font-semibold text-muted transition-colors hover:text-ink sm:block"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => setOpen(true)}
              disabled={items.length < 2}
              className="btn-primary btn-sm disabled:opacity-60"
            >
              Compare {items.length > 1 ? `(${items.length})` : ""}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[85] flex items-center justify-center p-3 sm:p-6">
          <button
            type="button"
            aria-label="Close comparison"
            onClick={() => setOpen(false)}
            className="animate-fade absolute inset-0 h-full w-full cursor-default bg-navy-deep/60 backdrop-blur-[2px]"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Compare phones"
            className="animate-slide-up relative flex max-h-[88vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <div>
                <h2 className="font-display text-lg font-bold text-navy">Compare phones</h2>
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                  Side by side · {items.length} of 3
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close comparison"
                className="flex h-11 w-11 items-center justify-center rounded-lg text-navy hover:bg-ice"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            <div className="overflow-y-auto overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                <thead>
                  <tr>
                    <th className="sticky left-0 z-10 w-32 bg-white px-5 py-4" scope="col">
                      <span className="sr-only">Specification</span>
                    </th>
                    {items.map((product) => (
                      <th
                        key={product.id}
                        scope="col"
                        className="min-w-[170px] border-l border-line px-4 py-4 align-top"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            to={`/product/${product.slug}`}
                            onClick={() => setOpen(false)}
                            className="font-display text-sm font-bold text-navy hover:text-blue"
                          >
                            {product.name}
                          </Link>
                          <button
                            type="button"
                            onClick={() => toggleCompare(product.id)}
                            aria-label={`Remove ${product.name} from comparison`}
                            className="flex h-7 w-7 shrink-0 items-center justify-center rounded text-muted hover:bg-ice hover:text-orange-deep"
                          >
                            <Trash2 size={13} aria-hidden="true" />
                          </button>
                        </div>
                        <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-muted">
                          {product.brand}
                        </p>
                        <button
                          type="button"
                          onClick={() => addToCart(product, 1)}
                          className="btn-primary btn-sm mt-3 w-full"
                        >
                          Add to cart
                        </button>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.label} className="border-t border-line">
                      <th
                        scope="row"
                        className="sticky left-0 z-10 bg-white px-5 py-3 text-left font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-muted"
                      >
                        {row.label}
                      </th>
                      {items.map((product) => (
                        <td
                          key={product.id}
                          className="border-l border-line px-4 py-3 text-[13px] leading-relaxed text-ink"
                        >
                          {row.render(product)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="border-t border-line px-5 py-3 text-[11px] text-muted">
              Prices shown from the base configuration. Specifications from official listings.
            </div>
          </div>
        </div>
      )}
    </>
  );
}
