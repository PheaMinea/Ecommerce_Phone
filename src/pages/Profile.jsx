import React, { useMemo, useState } from "react";
import {
  Check,
  ChevronRight,
  Heart,
  LayoutDashboard,
  LogOut,
  MapPin,
  Package,
  Plus,
  Settings,
  ShoppingBag,
  Truck,
  UserRound,
} from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import PhoneArt from "../components/PhoneArt";
import ProductGrid from "../components/ProductGrid";
import { formatPrice, getProductById } from "../data/products";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const tabs = [
  { id: "overview", label: "Overview", Icon: LayoutDashboard },
  { id: "orders", label: "Orders", Icon: Package },
  { id: "tracking", label: "Tracking", Icon: Truck },
  { id: "wishlist", label: "Saved items", Icon: Heart },
  { id: "settings", label: "Settings", Icon: Settings },
];

const statusStyles = {
  Processing: "bg-amber/10 text-amber",
  "In transit": "bg-blue/10 text-blue",
  Delivered: "bg-ink/5 text-ink",
};

const formatDate = (value, options) =>
  new Date(value).toLocaleDateString(
    "en-GB",
    options || { day: "numeric", month: "short", year: "numeric" }
  );

const initialsOf = (name = "") =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

export default function Profile() {
  const { user, logout, updateProfile } = useAuth();
  const {
    orders,
    wishlist,
    toggleWishlist,
    addToCart,
    showToast,
  } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const requestedTab = searchParams.get("tab") || "overview";
  const tab = tabs.some((entry) => entry.id === requestedTab) ? requestedTab : "overview";

  const [selectedOrderId, setSelectedOrderId] = useState(orders[0]?.id || "");
  const [settings, setSettings] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    orderUpdates: true,
    priceDrops: true,
    newsletter: false,
  });
  const [settingsErrors, setSettingsErrors] = useState({});

  const savedProducts = useMemo(
    () => wishlist.map((id) => getProductById(id)).filter(Boolean),
    [wishlist]
  );

  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
  const selectedOrder =
    orders.find((order) => order.id === selectedOrderId) || orders[0] || null;

  const setTab = (nextTab) => {
    const next = new URLSearchParams(searchParams);
    next.set("tab", nextTab);
    setSearchParams(next);
  };

  const trackOrder = (orderId) => {
    setSelectedOrderId(orderId);
    setTab("tracking");
  };

  const buyAgain = (order) => {
    order.items.forEach((item) => {
      const product = getProductById(item.productId);
      if (product) {
        addToCart(product, item.qty, {
          color: item.color,
          storage: item.storage,
          ram: item.ram,
        });
      }
    });
  };

  const saveSettings = (event) => {
    event.preventDefault();
    const next = {};
    if (settings.name.trim().length < 2) next.name = "Enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(settings.email.trim())) {
      next.email = "Enter a valid email address.";
    }
    if (settings.phone.trim() && settings.phone.replace(/\D/g, "").length < 7) {
      next.phone = "Enter a valid phone number, or leave it blank.";
    }
    setSettingsErrors(next);
    if (Object.keys(next).length) {
      document.getElementById(Object.keys(next)[0])?.focus();
      return;
    }
    updateProfile({
      name: settings.name.trim(),
      email: settings.email.trim(),
      phone: settings.phone.trim(),
    });
    showToast("Account details updated");
  };

  const signOut = () => {
    logout();
    showToast("You've been signed out", "info");
    navigate("/");
  };

  if (!user) {
    return (
      <div className="wrap flex min-h-[62vh] flex-col items-center justify-center py-16 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-xl bg-white text-navy shadow-sm ring-1 ring-line">
          <UserRound size={26} aria-hidden="true" />
        </span>
        <h1 className="type-section mt-5 text-navy">Sign in to see your account</h1>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
          Orders, tracking and account settings live here. Your saved items stay on this device
          either way.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link to="/login" className="btn-primary">
            Sign in
          </Link>
          <Link to="/register" className="btn-outline">
            Create an account
          </Link>
        </div>
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
        <span className="text-ink">My account</span>
      </nav>

      <div className="mt-4 flex flex-wrap items-center gap-4">
        <span className="flex h-14 w-14 items-center justify-center rounded-xl border border-line bg-ice text-lg font-bold text-ink">
          {initialsOf(user.name)}
        </span>
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-navy">
            {user.name}
          </h1>
          <p className="text-sm text-muted">
            {user.email} · Member since {formatDate(user.joined, { month: "long", year: "numeric" })}
          </p>
        </div>
      </div>

      <div className="mt-7 grid items-start gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-8">
        {/* Sidebar */}
        <aside>
          <nav
            aria-label="Account sections"
            className="no-scrollbar flex gap-2 overflow-x-auto rounded-xl border border-line bg-white p-2 lg:flex-col lg:gap-1"
          >
            {tabs.map(({ id, label, Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setTab(id)}
                aria-current={tab === id ? "page" : undefined}
                className={`flex h-11 shrink-0 items-center gap-2.5 rounded-lg px-3 text-sm font-medium transition-colors lg:w-full ${
                  tab === id
                    ? "bg-blue/10 text-blue"
                    : "text-muted hover:bg-ice hover:text-ink"
                }`}
              >
                {React.createElement(Icon, { size: 16, "aria-hidden": true })}
                {label}
                {id === "wishlist" && savedProducts.length > 0 && (
                  <span
                    className={`ml-auto hidden rounded-full px-1.5 py-0.5 font-mono text-[9px] lg:inline ${
                      tab === id ? "bg-blue/10 text-blue" : "bg-ice text-muted"
                    }`}
                  >
                    {savedProducts.length}
                  </span>
                )}
              </button>
            ))}
          </nav>

          <button
            type="button"
            onClick={signOut}
            className="mt-3 hidden h-11 w-full items-center gap-2.5 rounded-lg px-3 text-sm font-medium text-muted transition-colors hover:bg-sale/5 hover:text-sale lg:flex"
          >
            <LogOut size={16} aria-hidden="true" />
            Sign out
          </button>
        </aside>

        <div>
          {tab === "overview" && (
            <div className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { label: "Orders placed", value: orders.length },
                  { label: "Saved devices", value: savedProducts.length },
                  { label: "Lifetime spend", value: formatPrice(totalSpent) },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl border border-line bg-white p-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                      {stat.label}
                    </p>
                    <p className="mt-1.5 font-display text-2xl font-bold text-navy">{stat.value}</p>
                  </div>
                ))}
              </div>

              <div className="grid gap-5 lg:grid-cols-2">
                <section className="rounded-xl border border-line bg-white p-5">
                  <div className="flex items-center justify-between">
                    <h2 className="font-display text-base font-semibold text-navy">
                      Personal information
                    </h2>
                    <button
                      type="button"
                      onClick={() => setTab("settings")}
                      className="text-xs font-semibold text-blue hover:text-blue-deep"
                    >
                      Edit
                    </button>
                  </div>
                  <dl className="mt-4 space-y-3 text-sm">
                    <div>
                      <dt className="text-xs text-muted">Name</dt>
                      <dd className="mt-0.5 font-medium text-ink">{user.name}</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-muted">Email</dt>
                      <dd className="mt-0.5 font-medium text-ink">{user.email}</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-muted">Phone</dt>
                      <dd className="mt-0.5 font-medium text-ink">{user.phone || "Not added yet"}</dd>
                    </div>
                  </dl>
                </section>

                <section className="rounded-xl border border-line bg-white p-5">
                  <div className="flex items-center justify-between">
                    <h2 className="font-display text-base font-semibold text-navy">Shipping address</h2>
                    <MapPin size={16} className="text-muted" aria-hidden="true" />
                  </div>
                  {orders[0] ? (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-ink">
                        {orders[0].address.split(",")[0]}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{orders[0].address}</p>
                      <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                        Default delivery address
                      </p>
                    </div>
                  ) : (
                    <p className="mt-4 text-sm text-muted">
                      Your delivery address is added at checkout.
                    </p>
                  )}
                </section>
              </div>

              <section className="rounded-xl border border-line bg-white p-5">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-base font-semibold text-navy">Most recent order</h2>
                  <button
                    type="button"
                    onClick={() => setTab("orders")}
                    className="text-xs font-semibold text-blue hover:text-blue-deep"
                  >
                    All orders
                  </button>
                </div>
                {orders[0] ? (
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="flex items-center gap-2 text-sm font-semibold text-navy">
                        {orders[0].id}
                        <span
                          className={`rounded-full px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider ${
                            statusStyles[orders[0].status] || "bg-ice text-muted"
                          }`}
                        >
                          {orders[0].status}
                        </span>
                      </p>
                      <p className="mt-1 text-xs text-muted">
                        {formatDate(orders[0].date)} · {orders[0].items.length}{" "}
                        {orders[0].items.length === 1 ? "item" : "items"} ·{" "}
                        {formatPrice(orders[0].total)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => trackOrder(orders[0].id)}
                      className="btn-outline btn-sm"
                    >
                      Track order
                    </button>
                  </div>
                ) : (
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                    <p className="text-sm text-muted">No orders yet.</p>
                    <Link to="/products" className="btn-primary btn-sm">
                      Start shopping
                    </Link>
                  </div>
                )}
              </section>
            </div>
          )}

          {tab === "orders" && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="font-display text-lg font-semibold text-navy">Order history</h2>
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                  {orders.length} {orders.length === 1 ? "order" : "orders"}
                </p>
              </div>

              {orders.length === 0 && (
                <EmptyPanel
                  title="No orders yet"
                  copy="When you place an order, it will appear here with tracking and receipts."
                  action={
                    <Link to="/products" className="btn-primary">
                      Browse devices
                    </Link>
                  }
                />
              )}

              {orders.map((order) => (
                <article key={order.id} className="rounded-xl border border-line bg-white">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4">
                    <div>
                      <p className="flex flex-wrap items-center gap-2 text-sm font-semibold text-navy">
                        {order.id}
                        <span
                          className={`rounded-full px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider ${
                            statusStyles[order.status] || "bg-ice text-muted"
                          }`}
                        >
                          {order.status}
                        </span>
                      </p>
                      <p className="mt-1 text-xs text-muted">
                        Placed {formatDate(order.date)} · {order.payment}
                      </p>
                    </div>
                    <p className="font-display text-lg font-bold text-navy">
                      {formatPrice(order.total)}
                    </p>
                  </div>

                  <ul className="divide-y divide-line px-5">
                    {order.items.map((item) => {
                      const product = getProductById(item.productId);
                      return (
                        <li
                          key={`${order.id}-${item.productId}-${item.color}-${item.storage}`}
                          className="flex flex-wrap items-center gap-4 py-4"
                        >
                          <span className="plate flex h-16 w-14 shrink-0 items-center justify-center rounded-lg border border-line p-2">
                            {product && <PhoneArt product={product} className="h-full" />}
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold text-navy">{item.name}</p>
                            <p className="mt-0.5 text-xs text-muted">
                              {[item.color, item.storage, item.ram ? `${item.ram} RAM` : ""]
                                .filter(Boolean)
                                .join(" · ")}{" "}
                              · Qty {item.qty}
                            </p>
                          </div>
                          <p className="text-sm font-semibold text-ink">
                            {formatPrice(item.price * item.qty)}
                          </p>
                        </li>
                      );
                    })}
                  </ul>

                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-5 py-4">
                    <p className="text-xs text-muted">
                      Delivering to {order.address.split(",").slice(-2).join(",").trim()}
                    </p>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => buyAgain(order)}
                        className="btn-outline btn-sm"
                      >
                        <Plus size={14} aria-hidden="true" />
                        Buy again
                      </button>
                      <button
                        type="button"
                        onClick={() => trackOrder(order.id)}
                        className="btn-navy btn-sm"
                      >
                        Track order
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {tab === "tracking" && (
            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-display text-lg font-semibold text-navy">Track an order</h2>
                {orders.length > 0 && (
                  <div className="flex items-center gap-2">
                    <label htmlFor="order-picker" className="text-xs text-muted">
                      Order
                    </label>
                    <select
                      id="order-picker"
                      value={selectedOrder?.id || ""}
                      onChange={(event) => setSelectedOrderId(event.target.value)}
                      className="h-10 rounded-lg border border-line bg-white px-3 text-xs font-medium text-ink focus:border-blue focus:outline-none"
                    >
                      {orders.map((order) => (
                        <option key={order.id} value={order.id}>
                          {order.id} · {formatDate(order.date)}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {!selectedOrder ? (
                <EmptyPanel
                  title="Nothing to track"
                  copy="Once an order is placed, its delivery timeline will live here."
                  action={
                    <Link to="/products" className="btn-primary">
                      Browse devices
                    </Link>
                  }
                />
              ) : (
                <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
                  <section className="rounded-xl border border-line bg-white p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                          Tracking number
                        </p>
                        <p className="mt-1 font-mono text-sm font-semibold text-navy">
                          {selectedOrder.id}-GB
                        </p>
                      </div>
                      <span
                        className={`rounded-full px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider ${
                          statusStyles[selectedOrder.status] || "bg-ice text-muted"
                        }`}
                      >
                        {selectedOrder.status}
                      </span>
                    </div>

                    <TrackingTimeline order={selectedOrder} />

                    <p className="mt-5 rounded-lg bg-ice px-3 py-2.5 text-xs text-muted">
                      Carrier: NORTH Express · Signature may be required on delivery.
                    </p>
                  </section>

                  <section className="rounded-xl border border-line bg-white p-5">
                    <h3 className="font-display text-base font-semibold text-navy">
                      Delivery details
                    </h3>
                    <div className="mt-4 space-y-3 text-sm">
                      <p className="flex items-start gap-2.5 text-muted">
                        <MapPin size={15} className="mt-0.5 shrink-0 text-navy" aria-hidden="true" />
                        {selectedOrder.address}
                      </p>
                      <p className="flex items-start gap-2.5 text-muted">
                        <Truck size={15} className="mt-0.5 shrink-0 text-navy" aria-hidden="true" />
                        {selectedOrder.status === "Delivered"
                          ? "Delivered"
                          : `Expected ${formatDate(
                              new Date(
                                new Date(selectedOrder.date).getTime() + 2 * 86400000
                              ).toISOString()
                            )}`}
                      </p>
                      <p className="flex items-start gap-2.5 text-muted">
                        <ShoppingBag
                          size={15}
                          className="mt-0.5 shrink-0 text-navy"
                          aria-hidden="true"
                        />
                        {selectedOrder.items.length}{" "}
                        {selectedOrder.items.length === 1 ? "item" : "items"} ·{" "}
                        {formatPrice(selectedOrder.total)}
                      </p>
                    </div>

                    <div className="mt-4 divide-y divide-line border-t border-line pt-3">
                      {selectedOrder.items.map((item) => (
                        <div
                          key={`${selectedOrder.id}-${item.productId}`}
                          className="flex items-center justify-between gap-3 py-2.5"
                        >
                          <p className="text-xs font-medium text-ink">{item.name}</p>
                          <p className="font-mono text-[10px] text-muted">×{item.qty}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              )}
            </div>
          )}

          {tab === "wishlist" && (
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="font-display text-lg font-semibold text-navy">Saved items</h2>
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                  {savedProducts.length} saved
                </p>
              </div>

              {savedProducts.length ? (
                <>
                  <ProductGrid products={savedProducts} className="mt-4" />
                  <p className="mt-4 text-xs text-muted">
                    Saved on this device.{" "}
                    <button
                      type="button"
                      onClick={() => savedProducts.forEach((product) => toggleWishlist(product.id))}
                      className="font-semibold text-blue hover:text-blue-deep"
                    >
                      Clear saved items
                    </button>
                  </p>
                </>
              ) : (
                <EmptyPanel
                  title="No saved devices"
                  copy="Tap the heart on any device to keep it here while you decide."
                  action={
                    <Link to="/products" className="btn-primary">
                      Browse devices
                    </Link>
                  }
                />
              )}
            </div>
          )}

          {tab === "settings" && (
            <div className="space-y-5">
              <section className="rounded-xl border border-line bg-white p-5 sm:p-6">
                <h2 className="font-display text-lg font-semibold text-navy">Account details</h2>
                <p className="mt-1 text-sm text-muted">
                  Used for order updates and warranty registration.
                </p>

                <form onSubmit={saveSettings} noValidate className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="field-label">
                      Full name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={settings.name}
                      onChange={(event) =>
                        setSettings((current) => ({ ...current, name: event.target.value }))
                      }
                      aria-invalid={Boolean(settingsErrors.name)}
                      className={`field ${settingsErrors.name ? "field-invalid" : ""}`}
                    />
                    {settingsErrors.name && (
                      <p className="field-error">{settingsErrors.name}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="field-label">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={settings.email}
                      onChange={(event) =>
                        setSettings((current) => ({ ...current, email: event.target.value }))
                      }
                      aria-invalid={Boolean(settingsErrors.email)}
                      className={`field ${settingsErrors.email ? "field-invalid" : ""}`}
                    />
                    {settingsErrors.email && (
                      <p className="field-error">{settingsErrors.email}</p>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="phone" className="field-label">
                      Phone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={settings.phone}
                      onChange={(event) =>
                        setSettings((current) => ({ ...current, phone: event.target.value }))
                      }
                      aria-invalid={Boolean(settingsErrors.phone)}
                      className={`field ${settingsErrors.phone ? "field-invalid" : ""}`}
                    />
                    {settingsErrors.phone && (
                      <p className="field-error">{settingsErrors.phone}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <button type="submit" className="btn-primary">
                      Save changes
                    </button>
                  </div>
                </form>
              </section>

              <section className="rounded-xl border border-line bg-white p-5 sm:p-6">
                <h2 className="font-display text-lg font-semibold text-navy">Notifications</h2>
                <div className="mt-4 space-y-3">
                  {[
                    {
                      key: "orderUpdates",
                      title: "Order and delivery updates",
                      copy: "Tracking links and delivery windows by email.",
                    },
                    {
                      key: "priceDrops",
                      title: "Price drops on saved devices",
                      copy: "Only when something on your saved list is reduced.",
                    },
                    {
                      key: "newsletter",
                      title: "The short list newsletter",
                      copy: "About twice a month. No sponsored picks.",
                    },
                  ].map((option) => (
                    <label
                      key={option.key}
                      className="flex cursor-pointer items-start justify-between gap-4 rounded-xl border border-line p-4"
                    >
                      <span>
                        <span className="block text-sm font-medium text-ink">{option.title}</span>
                        <span className="mt-0.5 block text-xs text-muted">{option.copy}</span>
                      </span>
                      <input
                        type="checkbox"
                        checked={settings[option.key]}
                        onChange={(event) =>
                          setSettings((current) => ({
                            ...current,
                            [option.key]: event.target.checked,
                          }))
                        }
                        className="mt-1 h-4 w-4 shrink-0 rounded border-line text-blue focus:ring-blue"
                      />
                    </label>
                  ))}
                </div>
              </section>

              <section className="rounded-xl border border-line bg-white p-5 sm:p-6">
                <h2 className="font-display text-lg font-semibold text-navy">Session</h2>
                <p className="mt-1 text-sm text-muted">
                  Signed in as {user.email}. Signing out keeps your saved items on this device.
                </p>
                <button
                  type="button"
                  onClick={signOut}
                  className="btn-outline mt-4 border-sale/30 text-sale hover:border-sale hover:bg-sale/5"
                >
                  <LogOut size={15} aria-hidden="true" />
                  Sign out
                </button>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function EmptyPanel({ title, copy, action }) {
  return (
    <div className="mt-4 flex flex-col items-center rounded-xl border border-dashed border-line bg-white px-6 py-12 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ice text-muted">
        <Package size={20} aria-hidden="true" />
      </span>
      <h3 className="mt-3 font-display text-base font-semibold text-navy">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-muted">{copy}</p>
      <div className="mt-4">{action}</div>
    </div>
  );
}

function TrackingTimeline({ order }) {
  const steps = [
    { label: "Order placed", detail: formatDate(order.date) },
    { label: "Processing", detail: "Payment confirmed" },
    { label: "Shipped", detail: "Left NORTH warehouse" },
    { label: "Out for delivery", detail: "With the local courier" },
    { label: "Delivered", detail: "Signed for at your address" },
  ];

  const stage =
    order.status === "Delivered" ? 4 : order.status === "In transit" ? 3 : 1;

  return (
    <ol className="relative mt-6 space-y-5 border-l border-line pl-6">
      {steps.map((step, index) => {
        const done = index < stage;
        const current = index === stage && order.status !== "Delivered";
        const reached = done || index === stage;

        return (
          <li key={step.label} className="relative">
            <span
              className={`absolute -left-[31px] flex h-4 w-4 items-center justify-center rounded-full border-2 ${
                reached
                  ? "border-blue bg-blue text-white"
                  : "border-line bg-white text-transparent"
              }`}
            >
              <Check size={8} aria-hidden="true" />
            </span>
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <p
                className={`text-sm font-semibold ${
                  reached ? "text-navy" : "text-muted"
                }`}
              >
                {step.label}
                {current && (
                  <span className="ml-2 rounded-full bg-blue/10 px-2 py-0.5 font-mono text-[9px] font-medium uppercase tracking-wider text-blue">
                    Now
                  </span>
                )}
              </p>
              {reached && <p className="text-[11px] text-muted">{step.detail}</p>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
