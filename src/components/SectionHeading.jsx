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
  tone = "light",
}) {
  const onDark = tone === "dark";

  return (
    <div className={`flex flex-wrap items-end justify-between gap-x-8 gap-y-4 ${className}`}>
      <div className="max-w-2xl">
        {eyebrow && (
          <p className={`eyebrow flex items-center gap-2 ${onDark ? "text-white/55" : "text-muted"}`}>
            <span className="h-1.5 w-1.5 rounded-[2px] bg-orange" aria-hidden="true" />
            {eyebrow}
          </p>
        )}
        <h2 className={`type-section mt-2.5 ${onDark ? "text-white" : "text-navy"}`}>{title}</h2>
        {copy && (
          <p
            className={`mt-3 max-w-xl text-sm leading-relaxed ${
              onDark ? "text-white/60" : "text-muted"
            }`}
          >
            {copy}
          </p>
        )}
      </div>
      {link && (
        <Link
          to={link}
          className={`group inline-flex items-center gap-1.5 text-sm font-semibold transition-colors ${
            onDark ? "text-white hover:text-orange" : "text-blue hover:text-blue-deep"
          }`}
        >
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
