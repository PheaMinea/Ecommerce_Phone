import React, { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Lock,
  ShieldCheck,
  ShoppingBag,
  Tag,
  Trash2,
  Truck,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import PhoneArt from "../components/PhoneArt";
import QuantityStepper from "../components/QuantityStepper";
import { formatPrice } from "../data/products";
import { useCart } from "../context/CartContext";

const FREE_SHIPPING = 499;

export default function Cart() {
  const {
    cartItems,
    cartCount,
    cartItemProduct,
    totals,
    coupon,
    updateQuantity,
    removeFromCart,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [code, setCode] = useState("");
  const [couponError, setCouponError] = useState("");

  const submitCoupon = (event) => {
    event.preventDefault();
    const result = applyCoupon(code);
    if (result.ok) {
      setCouponError("");
      setCode("");
    } else {
      setCouponError(result.message);
    }
  };

  if (!cartItems.length) {
    return (
      <div className="wrap py-16 sm:py-24">
        <div className="mx-auto flex max-w-lg flex-col items-center text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-navy shadow-sm ring-1 ring-line">
            <ShoppingBag size={26} aria-hidden="true" />
          </span>
          <h1 className="type-section mt-5 text-navy">Your cart is empty</h1>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
            Nothing here yet. The catalog is short on purpose — six brands, current
            generation, and a real recommendation for each budget.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/products" className="btn-primary">
              Browse phones
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link to="/products?deals=1" className="btn-outline">
              See promotions
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const remaining = Math.max(0, FREE_SHIPPING - totals.subtotal);
  const progress = Math.min(100, (totals.subtotal / FREE_SHIPPING) * 100);

  return (
    <div className="wrap py-8 sm:py-12">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted">
        <Link to="/" className="transition-colors hover:text-navy">
          Home
        </Link>
        <ChevronRight size={13} aria-hidden="true" className="text-slate-300" />
        <span className="text-ink">Cart</span>
      </nav>

      <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="type-section text-navy">Your cart</h1>
          <p className="mt-1 text-sm text-muted">
            {cartCount} {cartCount === 1 ? "item" : "items"} · prices include VAT
          </p>
        </div>
        <Link to="/products" className="text-link">
          <ArrowLeft size={15} aria-hidden="true" />
          Continue shopping
        </Link>
      </div>

      <div className="mt-7 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-8">
        <div>
          <div className="rounded-2xl border border-line bg-white px-4 py-3.5 sm:px-5">
            <div className="flex items-center gap-2.5">
              <Truck size={16} className="shrink-0 text-blue" aria-hidden="true" />
              <p className="text-xs text-muted">
                {remaining > 0 ? (
                  <>
                    Add{" "}
                    <strong className="font-semibold text-navy">{formatPrice(remaining)}</strong>{" "}
                    more for free express delivery.
                  </>
                ) : (
                  <strong className="font-semibold text-mint">
                    Free express delivery unlocked.
                  </strong>
                )}
              </p>
            </div>
            <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-line">
              <span
                className={`block h-full rounded-full transition-all duration-300 ${
                  remaining > 0 ? "bg-blue" : "bg-mint"
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <ul className="mt-4 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white">
            {cartItems.map((item) => {
              const product = cartItemProduct(item);
              if (!product) return null;

              return (
                <li key={item.key} className="p-4 sm:p-5">
                  <div className="flex gap-4">
                    <Link
                      to={`/product/${item.slug}`}
                      className="plate flex h-28 w-24 shrink-0 items-center justify-center rounded-xl border border-line p-2.5 sm:h-32 sm:w-28"
                      aria-label={`View ${item.name}`}
                    >
                      <PhoneArt
                        product={product}
                        color={
                          product.colors?.find((color) => color.name === item.color)?.hex
                        }
                        className="h-full"
                      />
                    </Link>

                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                            {item.brand}
                          </p>
                          <Link
                            to={`/product/${item.slug}`}
                            className="mt-0.5 block truncate font-display text-sm font-semibold text-navy transition-colors hover:text-blue sm:text-base"
                          >
                            {item.name}
                          </Link>
                          <p className="mt-1 text-xs text-muted">
                            {[item.color, item.storage, item.ram ? `${item.ram} RAM` : ""]
                              .filter(Boolean)
                              .join(" · ")}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.key)}
                          aria-label={`Remove ${item.name} from cart`}
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted transition-colors hover:bg-orange-soft hover:text-orange-ink"
                        >
                          <Trash2 size={16} aria-hidden="true" />
                        </button>
                      </div>

                      <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-4">
                        <QuantityStepper
                          value={item.quantity}
                          onChange={(value) => updateQuantity(item.key, value)}
                          label={`Quantity for ${item.name}`}
                        />
                        <div className="text-right">
                          <p className="font-display text-base font-semibold text-navy">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-[11px] text-muted">
                              {formatPrice(item.price)} each
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted">
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-mint" aria-hidden="true" />
              24-month official warranty
            </span>
            <span className="flex items-center gap-1.5">
              <Truck size={14} className="text-mint" aria-hidden="true" />
              Free returns within 30 days
            </span>
          </div>
        </div>

        {/* Summary */}
        <aside className="rounded-2xl border border-line bg-white p-5 lg:sticky lg:top-[92px]">
          <h2 className="font-display text-lg font-semibold text-navy">Order summary</h2>

          <form onSubmit={submitCoupon} className="mt-4" noValidate>
            <label htmlFor="promo" className="field-label flex items-center gap-1.5">
              <Tag size={13} aria-hidden="true" />
              Promotion code
            </label>
            {coupon ? (
              <div className="flex items-center justify-between rounded-xl border border-mint/30 bg-mint/5 px-3 py-2.5">
                <span className="flex items-center gap-2 text-xs font-semibold text-mint">
                  <Tag size={13} aria-hidden="true" />
                  {coupon.code} · {coupon.percent}% off
                </span>
                <button
                  type="button"
                  onClick={removeCoupon}
                  aria-label="Remove promotion code"
                  className="flex h-7 w-7 items-center justify-center rounded text-mint hover:bg-mint/10"
                >
                  <X size={14} aria-hidden="true" />
                </button>
              </div>
            ) : (
              <>
                <div className="flex gap-2">
                  <input
                    id="promo"
                    type="text"
                    value={code}
                    onChange={(event) => {
                      setCode(event.target.value);
                      if (couponError) setCouponError("");
                    }}
                    placeholder="SAVE10"
                    autoComplete="off"
                    aria-invalid={Boolean(couponError)}
                    aria-describedby={couponError ? "promo-error" : undefined}
                    className="field h-10 text-xs uppercase placeholder:normal-case"
                  />
                  <button type="submit" className="btn-navy h-10 shrink-0 px-4 text-xs">
                    Apply
                  </button>
                </div>
                {couponError && (
                  <p id="promo-error" className="mt-1.5 text-xs font-medium text-orange-ink">
                    {couponError}
                  </p>
                )}
              </>
            )}
          </form>

          <dl className="mt-5 space-y-2.5 border-t border-line pt-4 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-muted">Subtotal</dt>
              <dd className="font-medium text-ink">{formatPrice(totals.subtotal)}</dd>
            </div>
            {totals.couponDiscount > 0 && (
              <div className="flex items-center justify-between text-mint">
                <dt>Discount ({coupon?.code})</dt>
                <dd className="font-medium">-{formatPrice(totals.couponDiscount)}</dd>
              </div>
            )}
            <div className="flex items-center justify-between">
              <dt className="text-muted">Delivery</dt>
              <dd className="font-medium text-ink">
                {totals.shipping === 0 ? "Free" : formatPrice(totals.shipping)}
              </dd>
            </div>
            <div className="flex items-center justify-between border-t border-line pt-3 text-base">
              <dt className="font-semibold text-navy">Total</dt>
              <dd className="font-display text-xl font-bold text-navy">
                {formatPrice(totals.total)}
              </dd>
            </div>
          </dl>

          {totals.savings > 0 && (
            <p className="mt-2 rounded-lg bg-orange-soft px-3 py-2 text-xs font-medium text-orange-ink">
              You're saving {formatPrice(totals.savings)} on this order.
            </p>
          )}

          <Link to="/checkout" className="btn-primary mt-5 w-full">
            <Lock size={15} aria-hidden="true" />
            Proceed to checkout
          </Link>

          <Link
            to="/products"
            className="mt-2 flex h-10 items-center justify-center rounded-lg text-xs font-semibold text-muted transition-colors hover:text-navy"
          >
            Continue shopping
          </Link>

          <div className="mt-4 border-t border-line pt-4">
            <p className="flex items-center gap-2 text-[11px] text-muted">
              <Lock size={12} aria-hidden="true" />
              Secure checkout · 256-bit encryption
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {["VISA", "MASTERCARD", "KHQR", "COD"].map((method) => (
                <span
                  key={method}
                  className="rounded border border-line px-1.5 py-1 font-mono text-[8px] tracking-[0.08em] text-muted"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
