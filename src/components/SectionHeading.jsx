import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function SectionHeading({
  eyebrow,
  title,
  copy,
  link,
  linkLabel = "View all",
  className = "",
}) {
  return (
    <div className={`flex flex-wrap items-end justify-between gap-x-8 gap-y-4 ${className}`}>
      <div className="max-w-2xl">
        {eyebrow && <p className="eyebrow text-muted">{eyebrow}</p>}
        <h2 className="type-section mt-2 text-navy">{title}</h2>
        {copy && <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">{copy}</p>}
      </div>
      {link && (
        <Link to={link} className="text-link group">
          {linkLabel}
          <ArrowRight
            size={15}
            className="transition-transform duration-200 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      )}
    </div>
  );
}
