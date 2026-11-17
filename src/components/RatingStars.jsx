import React from "react";
import { Star } from "lucide-react";

export default function RatingStars({ rating = 0, count, size = 14, className = "" }) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <span
        className="flex items-center gap-0.5"
        role="img"
        aria-label={`Rated ${Number(rating).toFixed(1)} out of 5`}
      >
        {[0, 1, 2, 3, 4].map((index) => {
          const fill = Math.max(0, Math.min(1, Number(rating) - index)) * 100;
          return (
            <span
              key={index}
              className="relative inline-block shrink-0"
              style={{ width: size, height: size }}
            >
              <Star
                size={size}
                strokeWidth={0}
                className="absolute inset-0 text-line"
                fill="currentColor"
                aria-hidden="true"
              />
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${fill}%` }}
              >
                <Star
                  size={size}
                  strokeWidth={0}
                  className="text-amber"
                  fill="currentColor"
                  aria-hidden="true"
                />
              </span>
            </span>
          );
        })}
      </span>
      <span className="font-mono text-[11px] font-medium text-ink">
        {Number(rating).toFixed(1)}
      </span>
      {count != null && (
        <span className="text-[11px] text-muted">({Number(count).toLocaleString()})</span>
      )}
    </div>
  );
}
