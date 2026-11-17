import React from "react";
import {
  ArrowUpRight,
  BadgeDollarSign,
  BatteryCharging,
  Camera,
  FoldHorizontal,
  Headphones,
  Smartphone,
} from "lucide-react";
import { Link } from "react-router-dom";

const icons = {
  Smartphone,
  FoldHorizontal,
  Camera,
  BadgeDollarSign,
  Headphones,
  BatteryCharging,
};

export default function CategoryCard({ category, count }) {
  const Icon = icons[category.icon] || Smartphone;

  return (
    <Link
      to={`/products?category=${category.slug}`}
      className="group flex flex-col rounded-xl border border-line bg-white p-5 transition-colors duration-200 hover:border-slate-300"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-ice text-ink transition-colors group-hover:text-blue">
        <Icon size={20} aria-hidden="true" />
      </span>
      <h3 className="mt-4 font-display text-base font-semibold text-navy">{category.name}</h3>
      <p className="mt-1 text-xs leading-relaxed text-muted">{category.description}</p>
      <span className="mt-4 flex items-center justify-between border-t border-line pt-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
          {count} {count === 1 ? "device" : "devices"}
        </span>
        <ArrowUpRight
          size={15}
          className="text-muted transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue"
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}
