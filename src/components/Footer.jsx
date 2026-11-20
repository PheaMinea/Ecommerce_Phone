import React from "react";
import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import { Logo } from "./Navbar";

const shopLinks = [
  { label: "All products", to: "/products" },
  { label: "Flagships", to: "/products?category=flagship" },
  { label: "Foldables", to: "/products?category=foldable" },
  { label: "Camera-first", to: "/products?category=camera" },
  { label: "Best value", to: "/products?category=value" },
  { label: "Accessories", to: "/products?category=accessories" },
];

const companyLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Contact Us", to: "/contact" },
  { label: "Promotions", to: "/products?deals=1" },
];

const supportLinks = [
  { label: "Track an order", to: "/profile?tab=tracking" },
  { label: "Order history", to: "/orders" },
  { label: "Wishlist", to: "/wishlist" },
  { label: "Delivery & returns", to: "/contact" },
];

const socials = [
  { label: "Instagram", href: "https://instagram.com", Icon: Instagram },
  { label: "Facebook", href: "https://facebook.com", Icon: Facebook },
  { label: "YouTube", href: "https://youtube.com", Icon: Youtube },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="wrap grid gap-10 py-14 lg:grid-cols-[1.6fr_1fr_1fr_1fr] lg:gap-12">
        <div>
          <Logo tone="light" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/55">
            The premium smartphone store. A short list of genuinely great phones — with the
            advice, warranty and delivery to match.
          </p>

          <div className="mt-6 space-y-3 text-sm">
            <a
              href="mailto:care@north.store"
              className="flex items-center gap-3 text-white/60 transition-colors hover:text-white"
            >
              <Mail size={15} aria-hidden="true" />
              care@north.store
            </a>
            <a
              href="tel:+442079460321"
              className="flex items-center gap-3 text-white/60 transition-colors hover:text-white"
            >
              <Phone size={15} aria-hidden="true" />
              +44 20 7946 0321
            </a>
            <p className="flex items-start gap-3 text-white/60">
              <MapPin size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
              18 Kingsway, London WC2B 6UN
            </p>
          </div>

          <div className="mt-6 flex items-center gap-2">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white/60 transition-colors hover:border-white/30 hover:text-white"
              >
                {React.createElement(Icon, { size: 16, "aria-hidden": true })}
              </a>
            ))}
          </div>
        </div>

        <FooterColumn title="Company" links={companyLinks} />
        <FooterColumn title="Shop" links={shopLinks} />
        <FooterColumn title="Support" links={supportLinks} />
      </div>

      <div className="border-t border-white/10">
        <div className="wrap flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="text-center text-xs text-white/45 sm:text-left">
            © 2026 NORTH Devices Ltd. · Prices in USD, VAT included
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {["VISA", "MASTERCARD", "ABA PAY", "KHQR", "COD"].map((method) => (
              <span
                key={method}
                className="rounded border border-white/15 px-2 py-1 font-mono text-[8px] font-medium tracking-[0.08em] text-white/50"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }) {
  return (
    <div>
      <h2 className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/45">
        {title}
      </h2>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              to={link.to}
              className="text-sm text-white/60 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
