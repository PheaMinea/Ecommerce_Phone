import React from "react";
import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

const shopLinks = [
  { label: "All devices", to: "/products" },
  { label: "Flagships", to: "/products?category=flagship" },
  { label: "Foldables", to: "/products?category=foldable" },
  { label: "Audio", to: "/products?category=audio" },
  { label: "Accessories", to: "/products?category=accessories" },
];

const supportLinks = [
  { label: "Track an order", to: "/profile?tab=tracking" },
  { label: "Order history", to: "/profile?tab=orders" },
  { label: "Saved items", to: "/profile?tab=wishlist" },
  { label: "Delivery & returns", to: "/products" },
];

const companyLinks = [
  { label: "Home", to: "/" },
  { label: "How we pick stock", to: "/#service" },
  { label: "Customer reviews", to: "/#reviews" },
  { label: "Current offers", to: "/#offers" },
];

const socials = [
  { label: "Instagram", href: "https://instagram.com", Icon: Instagram },
  { label: "Facebook", href: "https://facebook.com", Icon: Facebook },
  { label: "YouTube", href: "https://youtube.com", Icon: Youtube },
];

export default function Footer() {
  return (
    <footer className="bg-[#111827] text-white">
      <div className="wrap grid gap-10 py-16 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-12">
        <div>
          <Link to="/" className="inline-flex items-center" aria-label="NORTH — home">
            <span className="font-display text-[22px] font-bold leading-none tracking-[-0.05em] text-white">
              NORTH<span className="text-blue">.</span>
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-gray-400">
            The flagship store. We stock a short list of genuinely great phones — and nothing
            else — with the advice to help you choose.
          </p>

          <div className="mt-6 space-y-3 text-sm">
            <a
              href="mailto:care@north.store"
              className="flex items-center gap-3 text-gray-400 transition-colors hover:text-white"
            >
              <Mail size={15} aria-hidden="true" />
              care@north.store
            </a>
            <a
              href="tel:+442079460321"
              className="flex items-center gap-3 text-gray-400 transition-colors hover:text-white"
            >
              <Phone size={15} aria-hidden="true" />
              +44 20 7946 0321
            </a>
            <p className="flex items-start gap-3 text-gray-400">
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
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-gray-400 transition-colors hover:border-white/25 hover:text-white"
              >
                {React.createElement(Icon, { size: 16, "aria-hidden": true })}
              </a>
            ))}
          </div>
        </div>

        <FooterColumn title="Shop" links={shopLinks} />
        <FooterColumn title="Support" links={supportLinks} />
        <FooterColumn title="Company" links={companyLinks} />
      </div>

      <div className="border-t border-white/10">
        <div className="wrap flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="text-center text-xs text-gray-400 sm:text-left">
            © 2026 NORTH Devices Ltd. · Prices in USD, VAT included
          </p>
          <div className="flex items-center gap-2">
            {["VISA", "MASTERCARD", "AMEX", "APPLE PAY"].map((method) => (
              <span
                key={method}
                className="rounded border border-white/15 px-2 py-1 font-mono text-[8px] font-medium tracking-[0.08em] text-gray-400"
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
      <h2 className="text-[11px] font-medium uppercase tracking-[0.12em] text-gray-400">{title}</h2>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              to={link.to}
              className="text-sm text-gray-400 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
