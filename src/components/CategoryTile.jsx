import React from "react";
import { Link } from "react-router-dom";

export default function CategoryTile({ title, count, Icon, to }) {
  return (
    <Link
      to={to}
      className="group flex flex-col items-center rounded-xl border border-line bg-ice px-3 py-4 text-center transition-all hover:border-blue/30 hover:bg-blue-soft hover:shadow-sm"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-blue shadow-sm transition-colors group-hover:bg-blue group-hover:text-white">
        {React.createElement(Icon, { size: 22, strokeWidth: 1.7, "aria-hidden": true })}
      </span>
      <span className="mt-3 text-xs font-semibold text-ink">{title}</span>
      <span className="mt-1 font-mono text-[9px] uppercase tracking-wide text-muted">
        {count} {count === 1 ? "item" : "items"}
      </span>
    </Link>
  );
}
