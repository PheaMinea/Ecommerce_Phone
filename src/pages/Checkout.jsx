import React, { useState } from "react";
import {
  Banknote,
  Check,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  Lock,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { Link } from "react-router-dom";
import PhoneArt from "../components/PhoneArt";
import { formatPrice } from "../data/products";
import { useCart } from "../context/CartContext";

const initialForm = {
  email: "",
  phone: "",
  firstName: "",
  lastName: "",
  address: "",
  apartment: "",
  city: "",
  postalCode: "",
  country: "United Kingdom",
  payment: "card",
  cardName: "",
  cardNumber: "",
  expiry: "",
  cvc: "",
};

const formatCardNumber = (value) =>
  value
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();

const formatExpiry = (value) => {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
};

function TextField({ id, label, error, hint, className = "", ...props }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`field ${error ? "field-invalid" : ""}`}
        {...props}
      />
      {error ? (
        <p id={`${id}-error`} className="field-error">
          {error}
        </p>
      ) : hint ? (
        <p className="mt-1 text-[11px] text-muted">{hint}</p>
      ) : null}
    </div>
  );
}

export default function Checkout() {
  const { cartItems, cartItemProduct, totals, coupon, placeOrder } = useCart();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [placed, setPlaced] = useState(null);

  const setField = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      const next = { ...current };
      delete next[key];
      if (key === "payment") {
        ["cardNumber", "expiry", "cvc", "cardName"].forEach((field) => delete next[field]);
      }
      return next;
    });
  };

  const validate = () => {
    const next = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) {
      next.email = "Enter a valid email address.";
    }
    if (form.phone.replace(/\D/g, "").length < 7) {
      next.phone = "Enter a phone number we can reach you on.";
    }
    if (!form.firstName.trim()) next.firstName = "First name is required.";
    if (!form.lastName.trim()) next.lastName = "Last name is required.";
    if (!form.address.trim()) next.address = "Street address is required.";
    if (!form.city.trim()) next.city = "City is required.";
    if (form.postalCode.trim().length < 3) next.postalCode = "Enter a valid postal code.";
    if (!form.country) next.country = "Choose a country.";

    if (form.payment === "card") {
      const digits = form.cardNumber.replace(/\D/g, "");
      if (!/^\d{15,16}$/.test(digits)) {
        next.cardNumber = "Enter a 15 or 16 digit card number.";
      }
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.expiry)) {
        next.expiry = "Use the format MM/YY.";
      } else {
        const [month, year] = form.expiry.split("/");
        const expiryDate = new Date(2000 + Number(year), Number(month), 1);
        if (expiryDate <= new Date()) next.expiry = "This card has expired.";
      }
      if (!/^\d{3,4}$/.test(form.cvc)) next.cvc = "Enter the 3 or 4 digit security code.";
      if (!form.cardName.trim()) next.cardName = "Name on card is required.";
    }

    return next;
  };

  const submit = (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    const keys = Object.keys(nextErrors);
    if (keys.length) {
      document.getElementById(keys[0])?.focus();
      return;
    }

    const digits = form.cardNumber.replace(/\D/g, "");
    const order = placeOrder({
      email: form.email.trim(),
      phone: form.phone.trim(),
      address: form.address.trim(),
      city: form.city.trim(),
      postalCode: form.postalCode.trim(),
      country: form.country,
      payment:
        form.payment === "card"
          ? `Card ending ${digits.slice(-4)}`
          : "Cash on delivery",
    });
    setPlaced(order);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (placed) {
    const eta = new Date();
    eta.setDate(eta.getDate() + 2);
    const etaLabel = eta.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });

    return (
      <div className="wrap py-12 sm:py-20">
        <div className="mx-auto max-w-2xl">
          <div className="flex flex-col items-center text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-mint/10 text-mint">
              <CheckCircle2 size={30} aria-hidden="true" />
            </span>
            <p className="eyebrow mt-5 text-blue">Order confirmed</p>
            <h1 className="type-section mt-2 text-navy">Thank you — it's on its way.</h1>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
              We've sent a confirmation to {placed.email || form.email}. Your order number is{" "}
              <strong className="font-mono font-semibold text-ink">{placed.id}</strong>.
            </p>
          </div>

          <div className="mt-8 rounded-xl border border-line bg-white">
            <div className="grid gap-4 border-b border-line p-5 sm:grid-cols-3">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                  Delivery
                </p>
                <p className="mt-1 text-sm font-semibold text-navy">{etaLabel}</p>
                <p className="text-xs text-muted">Next-day tracked</p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                  Payment
                </p>
                <p className="mt-1 text-sm font-semibold text-navy">{placed.payment}</p>
                <p className="text-xs text-muted">{formatPrice(placed.total)} paid</p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                  Shipping to
                </p>
                <p className="mt-1 text-sm font-semibold text-navy">
                  {form.firstName} {form.lastName}
                </p>
                <p className="text-xs leading-relaxed text-muted">{placed.address}</p>
              </div>
            </div>

            <ul className="divide-y divide-line p-5">
              {placed.items.map((item) => {
                const product = cartItemProduct({ id: item.productId });
                return (
                <li key={`${item.productId}-${item.color}-${item.storage}`} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    {product ? (
                      <PhoneArt product={product} className="h-12 w-9" />
                    ) : (
                      <span className="h-12 w-9 rounded bg-ice" aria-hidden="true" />
                    )}
                    <div>
                      <p className="text-sm font-medium text-navy">{item.name}</p>
                      <p className="text-[11px] text-muted">
                        {[item.color, item.storage].filter(Boolean).join(" · ")} · Qty {item.qty}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-navy">
                    {formatPrice(item.price * item.qty)}
                  </p>
                </li>
                );
              })}
            </ul>

            <div className="flex items-center justify-between border-t border-line p-5">
              <span className="text-sm font-semibold text-navy">Total paid</span>
              <span className="font-display text-xl font-bold text-navy">
                {formatPrice(placed.total)}
              </span>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/profile?tab=tracking" className="btn-primary">
              Track this order
            </Link>
            <Link to="/products" className="btn-outline">
              Continue shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!cartItems.length) {
    return (
      <div className="wrap flex min-h-[55vh] flex-col items-center justify-center py-16 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-xl bg-white text-navy ring-1 ring-line">
          <ShoppingBag size={26} aria-hidden="true" />
        </span>
        <h1 className="type-section mt-5 text-navy">Nothing to check out</h1>
        <p className="mt-2 max-w-sm text-sm text-muted">
          Add a device to your bag first — then we can take the details.
        </p>
        <Link to="/products" className="btn-primary mt-6">
          Browse devices
        </Link>
      </div>
    );
  }

  return (
    <div className="wrap py-8 sm:py-12">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted">
        <Link to="/" className="transition-colors hover:text-navy">
          Home
        </Link>
        <ChevronRight size={13} aria-hidden="true" className="text-slate-300" />
        <Link to="/cart" className="transition-colors hover:text-navy">
          Bag
        </Link>
        <ChevronRight size={13} aria-hidden="true" className="text-slate-300" />
        <span className="text-ink">Checkout</span>
      </nav>

      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="type-section text-navy">Checkout</h1>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
            <Lock size={13} aria-hidden="true" />
            Encrypted and secure. Guest checkout is fine.
          </p>
        </div>

        <ol className="flex items-center gap-2 text-[11px]">
          <li className="flex items-center gap-1.5 text-muted">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-mint text-white">
              <Check size={11} aria-hidden="true" />
            </span>
            Bag
          </li>
          <ChevronRight size={12} className="text-slate-300" aria-hidden="true" />
          <li className="flex items-center gap-1.5 font-semibold text-navy" aria-current="step">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-navy font-mono text-[10px] text-white">
              2
            </span>
            Details
          </li>
          <ChevronRight size={12} className="text-slate-300" aria-hidden="true" />
          <li className="flex items-center gap-1.5 text-muted">
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-line font-mono text-[10px]">
              3
            </span>
            Done
          </li>
        </ol>
      </div>

      <form onSubmit={submit} noValidate className="mt-7 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_390px]">
        <div className="space-y-5">
          <section className="rounded-xl border border-line bg-white p-5 sm:p-6">
            <div className="flex items-center gap-2.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-navy font-mono text-[10px] font-semibold text-white">
                1
              </span>
              <h2 className="font-display text-base font-semibold text-navy">Contact</h2>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <TextField
                id="email"
                label="Email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(event) => setField("email", event.target.value)}
                error={errors.email}
              />
              <TextField
                id="phone"
                label="Phone"
                type="tel"
                autoComplete="tel"
                placeholder="+44 7700 900123"
                value={form.phone}
                onChange={(event) => setField("phone", event.target.value)}
                error={errors.phone}
                hint="For delivery updates only."
              />
            </div>
          </section>

          <section className="rounded-xl border border-line bg-white p-5 sm:p-6">
            <div className="flex items-center gap-2.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-navy font-mono text-[10px] font-semibold text-white">
                2
              </span>
              <h2 className="font-display text-base font-semibold text-navy">Shipping address</h2>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <TextField
                id="firstName"
                label="First name"
                autoComplete="given-name"
                value={form.firstName}
                onChange={(event) => setField("firstName", event.target.value)}
                error={errors.firstName}
              />
              <TextField
                id="lastName"
                label="Last name"
                autoComplete="family-name"
                value={form.lastName}
                onChange={(event) => setField("lastName", event.target.value)}
                error={errors.lastName}
              />
              <TextField
                id="address"
                label="Street address"
                autoComplete="address-line1"
                placeholder="18 Kingsway"
                value={form.address}
                onChange={(event) => setField("address", event.target.value)}
                error={errors.address}
                className="sm:col-span-2"
              />
              <TextField
                id="apartment"
                label="Apartment, suite (optional)"
                autoComplete="address-line2"
                value={form.apartment}
                onChange={(event) => setField("apartment", event.target.value)}
                className="sm:col-span-2"
              />
              <TextField
                id="city"
                label="City"
                autoComplete="address-level2"
                value={form.city}
                onChange={(event) => setField("city", event.target.value)}
                error={errors.city}
              />
              <TextField
                id="postalCode"
                label="Postal code"
                autoComplete="postal-code"
                value={form.postalCode}
                onChange={(event) => setField("postalCode", event.target.value)}
                error={errors.postalCode}
              />
              <div className="sm:col-span-2">
                <label htmlFor="country" className="field-label">
                  Country
                </label>
                <select
                  id="country"
                  autoComplete="country-name"
                  value={form.country}
                  onChange={(event) => setField("country", event.target.value)}
                  className="field"
                >
                  <option>United Kingdom</option>
                  <option>United States</option>
                  <option>Germany</option>
                  <option>France</option>
                  <option>Netherlands</option>
                  <option>Cambodia</option>
                </select>
                {errors.country && <p className="field-error">{errors.country}</p>}
              </div>
            </div>
            <p
              className={`mt-4 flex items-center gap-2 rounded-lg px-3 py-2.5 text-xs ${
                totals.shipping === 0
                  ? "bg-mint/5 text-mint"
                  : "bg-ice text-muted"
              }`}
            >
              <Truck size={14} aria-hidden="true" />
              {totals.shipping === 0
                ? "Free next-day delivery on this order"
                : `Standard delivery · ${formatPrice(totals.shipping)}`}
            </p>
          </section>

          <section className="rounded-xl border border-line bg-white p-5 sm:p-6">
            <div className="flex items-center gap-2.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-navy font-mono text-[10px] font-semibold text-white">
                3
              </span>
              <h2 className="font-display text-base font-semibold text-navy">Payment</h2>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                {
                  value: "card",
                  title: "Credit / debit card",
                  copy: "Visa, Mastercard, Amex",
                  Icon: CreditCard,
                },
                {
                  value: "cod",
                  title: "Cash on delivery",
                  copy: "Pay when it arrives",
                  Icon: Banknote,
                },
              ].map(({ value, title, copy, Icon }) => (
                <label
                  key={value}
                  className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors ${
                    form.payment === value
                      ? "border-blue bg-blue/5 ring-1 ring-blue"
                      : "border-line hover:border-navy/30"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={value}
                    checked={form.payment === value}
                    onChange={() => setField("payment", value)}
                    className="mt-1 h-4 w-4"
                  />
                  {React.createElement(Icon, {
                    size: 18,
                    className: "mt-0.5 shrink-0 text-navy",
                    "aria-hidden": true,
                  })}
                  <span>
                    <span className="block text-sm font-semibold text-navy">{title}</span>
                    <span className="block text-xs text-muted">{copy}</span>
                  </span>
                </label>
              ))}
            </div>

            {form.payment === "card" && (
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <TextField
                  id="cardNumber"
                  label="Card number"
                  inputMode="numeric"
                  autoComplete="cc-number"
                  placeholder="4242 4242 4242 4242"
                  value={form.cardNumber}
                  onChange={(event) => setField("cardNumber", formatCardNumber(event.target.value))}
                  error={errors.cardNumber}
                  className="sm:col-span-2"
                />
                <TextField
                  id="expiry"
                  label="Expiry date"
                  inputMode="numeric"
                  autoComplete="cc-exp"
                  placeholder="MM/YY"
                  value={form.expiry}
                  onChange={(event) => setField("expiry", formatExpiry(event.target.value))}
                  error={errors.expiry}
                />
                <TextField
                  id="cvc"
                  label="Security code"
                  inputMode="numeric"
                  autoComplete="cc-csc"
                  placeholder="123"
                  value={form.cvc}
                  onChange={(event) => setField("cvc", event.target.value.replace(/\D/g, "").slice(0, 4))}
                  error={errors.cvc}
                />
                <TextField
                  id="cardName"
                  label="Name on card"
                  autoComplete="cc-name"
                  value={form.cardName}
                  onChange={(event) => setField("cardName", event.target.value)}
                  error={errors.cardName}
                  className="sm:col-span-2"
                />
                <p className="rounded-lg bg-ice px-3 py-2.5 text-[11px] text-muted sm:col-span-2">
                  Demo checkout — use <span className="font-mono">4242 4242 4242 4242</span>, any
                  future expiry and any 3-digit code. No payment is taken.
                </p>
              </div>
            )}
          </section>

          <button type="submit" className="btn-primary w-full">
            <Lock size={15} aria-hidden="true" />
            Confirm order · {formatPrice(totals.total)}
          </button>
          <p className="text-center text-[11px] text-muted">
            By confirming you agree to our terms of sale and 30-day returns policy.
          </p>
        </div>

        {/* Summary */}
        <aside className="rounded-xl border border-line bg-white p-5 lg:sticky lg:top-[88px]">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-base font-semibold text-navy">In your bag</h2>
            <Link to="/cart" className="text-xs font-semibold text-blue hover:text-blue-deep">
              Edit
            </Link>
          </div>

          <ul className="mt-4 max-h-[320px] space-y-3 overflow-y-auto pr-1">
            {cartItems.map((item) => {
              const product = cartItemProduct(item);
              return (
                <li key={item.key} className="flex items-center gap-3">
                  <span className="plate flex h-14 w-12 shrink-0 items-center justify-center rounded-lg border border-line p-1.5">
                    {product && <PhoneArt product={product} className="h-full" />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-navy">{item.name}</p>
                    <p className="truncate text-[11px] text-muted">
                      {[item.color, item.storage].filter(Boolean).join(" · ")} · Qty {item.quantity}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs font-semibold text-ink">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </li>
              );
            })}
          </ul>

          <dl className="mt-4 space-y-2.5 border-t border-line pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">Subtotal</dt>
              <dd className="font-medium text-ink">{formatPrice(totals.subtotal)}</dd>
            </div>
            {totals.couponDiscount > 0 && (
              <div className="flex justify-between text-mint">
                <dt>Discount ({coupon?.code})</dt>
                <dd className="font-medium">-{formatPrice(totals.couponDiscount)}</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="text-muted">Shipping</dt>
              <dd className="font-medium text-ink">
                {totals.shipping === 0 ? "Free" : formatPrice(totals.shipping)}
              </dd>
            </div>
            <div className="flex items-center justify-between border-t border-line pt-3">
              <dt className="font-semibold text-navy">Total</dt>
              <dd className="font-display text-xl font-bold text-navy">{formatPrice(totals.total)}</dd>
            </div>
          </dl>

          <p className="mt-4 flex items-start gap-2 rounded-lg bg-ice px-3 py-2.5 text-[11px] leading-relaxed text-muted">
            <ShieldCheck size={13} className="mt-0.5 shrink-0 text-mint" aria-hidden="true" />
            Every device ships sealed with a 24-month warranty and free 30-day returns.
          </p>
        </aside>
      </form>
    </div>
  );
}
