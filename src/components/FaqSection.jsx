import React from "react";
import { ChevronDown } from "lucide-react";
import SectionHeading from "./SectionHeading";

const questions = [
  {
    question: "Are all phones genuine and unlocked?",
    answer:
      "Yes. Every device is sealed, genuine stock and unlocked, so you can use it with a compatible carrier of your choice.",
  },
  {
    question: "What warranty comes with my phone?",
    answer:
      "Phones include the official 24-month manufacturer warranty. Warranty information is included with your order.",
  },
  {
    question: "How much does delivery cost?",
    answer:
      "Express delivery is free on orders over $499. Your available delivery options and estimated arrival date are shown at checkout.",
  },
  {
    question: "Can I return a phone if it is not right for me?",
    answer:
      "You can request a return within 30 days of delivery. Contact our support team and they will guide you through the return.",
  },
  {
    question: "How do I compare phones?",
    answer:
      "Use the compare control on any product card to select phones. Once you have selected at least two, use the comparison bar to view their specifications side by side.",
  },
];

export default function FaqSection() {
  return (
    <section id="faq" className="section scroll-mt-24 bg-white">
      <div className="wrap">
        <SectionHeading
          eyebrow="Helpful answers"
          title="A little more peace of mind."
          copy="Everything you need to know before your new phone arrives."
          link="/contact"
          linkLabel="Talk to our team"
        />

        <div className="mt-8 divide-y divide-line border-y border-line">
          {questions.map(({ question, answer }) => (
            <details key={question} className="group py-1">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left text-sm font-semibold text-navy marker:hidden sm:py-5 sm:text-base">
                {question}
                <ChevronDown
                  size={18}
                  className="shrink-0 text-muted transition-transform duration-200 group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <p className="max-w-3xl pb-5 pr-8 text-sm leading-relaxed text-muted">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
