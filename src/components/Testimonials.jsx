import React from "react";
import { BadgeCheck, Quote } from "lucide-react";
import { testimonials } from "../data/products";
import RatingStars from "./RatingStars";
import SectionHeading from "./SectionHeading";

const avatarTones = [
  "from-navy to-blue",
  "from-blue-deep to-navy-soft",
  "from-orange-deep to-navy",
];

export default function Testimonials() {
  return (
    <section id="reviews" className="section scroll-mt-24 bg-ice">
      <div className="wrap">
        <SectionHeading
          eyebrow="Customer reviews"
          title="Bought here, then came back."
          copy="Real feedback from customers who compared, ordered and lived with their phones. Every review is tied to a verified purchase."
          link="/products?sort=rating"
          linkLabel="Browse top rated"
        />

        <div className="mt-10 grid gap-4 md:grid-cols-3 md:gap-5">
          {testimonials.map((testimonial, index) => (
            <figure
              key={testimonial.name}
              className="card flex flex-col p-5 sm:p-6"
            >
              <div className="flex items-center justify-between">
                <Quote size={20} className="text-orange" aria-hidden="true" />
                <RatingStars rating={testimonial.rating} size={13} />
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink">
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${
                    avatarTones[index % avatarTones.length]
                  } text-[11px] font-bold text-white ring-2 ring-white`}
                  aria-hidden="true"
                >
                  {testimonial.initials}
                </span>
                <span>
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-navy">
                    {testimonial.name}
                    <BadgeCheck size={14} className="text-blue" aria-label="Verified customer" />
                  </span>
                  <span className="block text-[11px] text-muted">{testimonial.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
