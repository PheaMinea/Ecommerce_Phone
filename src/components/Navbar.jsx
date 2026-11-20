import React, { useEffect, useState } from "react";
import {
  Heart,
  Menu,
  Search,
  ShoppingBag,
  Truck,
  UserRound,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import SearchBar from "./SearchBar";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Shop" },
  { to: "/#categories", label: "Categories" },
  { to: "/products?deals=1", label: "Sale" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const drawerGroups = [
  {
    title: "Shop",
    links: [
      { to: "/products", label: "All products" },
      { to: "/products?category=flagship", label: "Flagships" },
      { to: "/products?category=foldable", label: "Foldables" },
      { to: "/products?category=camera", label: "Camera-first" },
      { to: "/products?category=value", label: "Best value" },
      { to: "/products?category=audio", label: "Audio" },
      { to: "/products?category=accessories", label: "Accessories" },
      { to: "/products?deals=1", label: "Promotions" },
    ],
  },
  {
    title: "Brands",
    links: [
      { to: "/products?brand=Apple", label: "Apple iPhone" },
      { to: "/products?brand=Samsung", label: "Samsung Galaxy" },
      { to: "/products?brand=Xiaomi", label: "Xiaomi" },
      { to: "/products?brand=OPPO", label: "OPPO" },
      { to: "/products?brand=vivo", label: "vivo" },
      { to: "/products?brand=Google%20Pixel", label: "Google Pixel" },
    ],
  },
  {
    title: "Account",
    links: [
      { to: "/profile", label: "My profile" },
      { to: "/orders", label: "Order history" },
      { to: "/wishlist", label: "Wishlist" },
      { to: "/login", label: "Sign in" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/about", label: "About Us" },
      { to: "/contact", label: "Contact Us" },
    ],
  },
];

export function Logo({ onClick, tone = "dark" }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      className="flex shrink-0 items-center"
      aria-label="Phone Store — home"
    >
      <span
        className={`font-display text-[22px] font-bold leading-none tracking-[-0.045em] ${
          tone === "light" ? "text-white" : "text-navy"
        }`}
      >
        Phone<span className="text-blue"> Store</span>
      </span>
    </Link>
  );
}

export default function Navbar() {
  const { cartCount, wishlist } = useCart();
  const { user } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const closeOverlays = () => {
    setMenuOpen(false);
    setSearchOpen(false);
  };

  const isActive = (to) => {
    if (to.includes("#")) return false;
    const [path, search] = to.split("?");
    if (location.pathname !== path) return false;
    const currentParams = new URLSearchParams(location.search);
    if (!search) return [...currentParams.keys()].length === 0;
    const wanted = new URLSearchParams(search);
    return [...wanted.entries()].every(([key, value]) => currentParams.get(key) === value);
  };

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((part) => part[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "";

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-navy focus:shadow-lg"
      >
        Skip to content
      </a>

      {/* Announcement */}
      <div className="bg-navy-deep text-white/60">
        <div className="wrap flex h-9 items-center justify-between gap-4">
          <p className="flex items-center gap-2 text-[11px]">
            <Truck size={12} className="text-orange" aria-hidden="true" />
            Free express delivery over $499
          </p>
          <p className="hidden text-[11px] md:block">
            Official warranty · Genuine stock · KHQR &amp; cash on delivery
          </p>
          <div className="hidden items-center gap-3 text-[11px] sm:flex">
            <a
              href="tel:+442079460321"
              className="hidden transition-colors hover:text-white lg:block"
            >
              Help · +44 20 7946 0321
            </a>
            {user ? (
              <Link to="/profile" className="transition-colors hover:text-white">
                My account
              </Link>
            ) : (
              <>
                <Link to="/login" className="transition-colors hover:text-white">
                  Login
                </Link>
                <Link to="/register" className="transition-colors hover:text-white">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-line bg-white shadow-sm">
        <div className="wrap relative flex h-[68px] items-center gap-3">
          <Logo onClick={closeOverlays} />

          <nav
            aria-label="Primary"
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 xl:flex"
          >
            {navLinks.map((link) => {
              const active = isActive(link.to);
              return (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={closeOverlays}
                  aria-current={active ? "page" : undefined}
                  className={`relative py-1 text-[13px] transition-colors ${
                    active ? "font-semibold text-navy" : "font-medium text-muted hover:text-navy"
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute -bottom-1.5 left-0 h-0.5 w-full rounded-full bg-blue" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-0.5">
            <SearchBar
              variant="compact"
              className="hidden w-[190px] xl:flex xl:w-[230px]"
            />
            <button
              type="button"
              onClick={() => setSearchOpen((open) => !open)}
              aria-expanded={searchOpen}
              aria-label={searchOpen ? "Close search" : "Open search"}
              className="flex h-11 w-11 items-center justify-center rounded-lg text-navy transition-colors hover:bg-ice xl:hidden"
            >
              {searchOpen ? (
                <X size={19} aria-hidden="true" />
              ) : (
                <Search size={19} aria-hidden="true" />
              )}
            </button>

            <Link
              to="/wishlist"
              onClick={closeOverlays}
              aria-label={`Wishlist${wishlist.length ? `, ${wishlist.length} saved` : ""}`}
              className="relative hidden h-11 w-11 items-center justify-center rounded-lg text-navy transition-colors hover:bg-ice sm:flex"
            >
              <Heart size={19} aria-hidden="true" />
              {wishlist.length > 0 && (
                <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-orange px-1 font-mono text-[9px] font-bold text-navy-deep">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <Link
              to={user ? "/profile" : "/login"}
              onClick={closeOverlays}
              aria-label={user ? `Account — ${user.name}` : "Sign in"}
              className="flex h-11 w-11 items-center justify-center rounded-lg text-navy transition-colors hover:bg-ice"
            >
              {user ? (
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-soft text-[10px] font-semibold text-blue ring-1 ring-blue/20">
                  {initials}
                </span>
              ) : (
                <UserRound size={19} aria-hidden="true" />
              )}
            </Link>

            <Link
              to="/cart"
              onClick={closeOverlays}
              aria-label={`Shopping cart, ${cartCount} ${cartCount === 1 ? "item" : "items"}`}
              className="relative flex h-11 w-11 items-center justify-center rounded-lg text-navy transition-colors hover:bg-ice"
            >
              <ShoppingBag size={19} aria-hidden="true" />
              {cartCount > 0 && (
                <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-orange px-1 font-mono text-[9px] font-bold text-navy-deep">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="flex h-11 w-11 items-center justify-center rounded-lg text-navy transition-colors hover:bg-ice xl:hidden"
            >
              <Menu size={21} aria-hidden="true" />
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="border-t border-white/10 bg-navy-deep/95 py-3 backdrop-blur">
            <div className="wrap">
              <div className="mx-auto max-w-2xl">
                <SearchBar
                  variant="large"
                  onSearchComplete={() => setSearchOpen(false)}
                />
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-[80] xl:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            className="animate-fade absolute inset-0 h-full w-full cursor-default bg-navy-deep/50 backdrop-blur-[2px]"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="animate-slide-right absolute inset-y-0 left-0 flex w-[88%] max-w-[360px] flex-col bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <Logo tone="dark" onClick={() => setMenuOpen(false)} />
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="flex h-11 w-11 items-center justify-center rounded-lg text-navy hover:bg-ice"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5">
              <SearchBar variant="large" onSearchComplete={() => setMenuOpen(false)} />

              <div className="mt-6 space-y-5">
                {drawerGroups.map((group) => (
                  <div key={group.title}>
                    <p className="eyebrow text-muted">{group.title}</p>
                    <ul className="mt-2 divide-y divide-line border-y border-line">
                      {group.links.map((link) => (
                        <li key={link.label}>
                          <Link
                            to={link.to}
                            onClick={() => setMenuOpen(false)}
                            className="flex items-center justify-between py-2.5 text-sm font-medium text-ink transition-colors hover:text-blue"
                          >
                            {link.label}
                            <span className="font-mono text-xs text-muted">→</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-line bg-ice px-5 py-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                NORTH Device Store
              </p>
              <p className="mt-1 text-xs text-muted">
                Free express delivery over $499 · 24-month warranty
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
