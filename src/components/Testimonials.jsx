import React from "react";
import { BadgeCheck, Quote } from "lucide-react";
import { testimonials } from "../data/products";
import RatingStars from "./RatingStars";
import SectionHeading from "./SectionHeading";

export default function Testimonials() {
  return (
    <section id="reviews" className="section scroll-mt-24 bg-ice">
      <div className="wrap">
        <SectionHeading
          eyebrow="Customer reviews"
          title="Bought here, then came back."
          copy="Real feedback from customers who compared, ordered and lived with their phones. Every review is from a verified purchase."
          link="/products"
          linkLabel="Browse the catalog"
        />

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="flex flex-col rounded-xl border border-line bg-white p-6"
            >
              <Quote size={20} className="text-line" aria-hidden="true" />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink">
                “{testimonial.quote}”
              </blockquote>
              <RatingStars rating={testimonial.rating} size={13} className="mt-5" />
              <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-ice text-[11px] font-semibold text-ink">
                  {testimonial.initials}
                </span>
                <span>
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-navy">
                    {testimonial.name}
                    <BadgeCheck size={14} className="text-blue" aria-label="Verified customer" />
                  </span>
                  <span className="block text-xs text-muted">{testimonial.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
