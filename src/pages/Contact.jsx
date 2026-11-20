import React, { useState } from "react";
import {
  CheckCircle2,
  ChevronRight,
  Clock,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { Link } from "react-router-dom";

const channels = [
  {
    Icon: Phone,
    title: "Call us",
    value: "+44 20 7946 0321",
    href: "tel:+442079460321",
    copy: "Mon–Sat 9:00–20:00, Sun 10:00–18:00",
  },
  {
    Icon: Mail,
    title: "Email",
    value: "care@north.store",
    href: "mailto:care@north.store",
    copy: "We reply within one business day.",
  },
  {
    Icon: MapPin,
    title: "Showroom",
    value: "18 Kingsway, London",
    href: "https://maps.google.com/?q=18+Kingsway+London",
    copy: "WC2B 6UN · no appointment needed.",
  },
  {
    Icon: Clock,
    title: "Support hours",
    value: "Seven days a week",
    copy: "Call during business hours or email us anytime.",
  },
];

const faqs = [
  {
    q: "What warranty comes with a phone?",
    a: "Every device includes the official 24-month manufacturer warranty. We register it in your name at checkout and keep a copy on your account.",
  },
  {
    q: "How fast is delivery?",
    a: "Standard delivery is 2–3 business days and free over $499. Express is next business day for $25. Orders placed before 4pm ship the same day.",
  },
  {
    q: "Can I trade in my current phone?",
    a: "Yes. Bring it to the showroom or ask for a trade-in quote before checkout. The credit is applied to your order once the device is inspected.",
  },
  {
    q: "Which payments do you accept?",
    a: "Card, KHQR and cash on delivery. Card payments are encrypted and take no fee; KHQR works with any Cambodian banking app.",
  },
];

const topics = ["Order and delivery", "Product advice", "Warranty or repair", "Trade-in", "Something else"];

const initialForm = { name: "", email: "", topic: topics[0], message: "" };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const setField = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      const next = { ...current };
      delete next[key];
      return next;
    });
  };

  const submit = (event) => {
    event.preventDefault();
    const next = {};
    if (form.name.trim().length < 2) next.name = "Enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) {
      next.email = "Enter a valid email address.";
    }
    if (form.message.trim().length < 12) {
      next.message = "Tell us a little more — at least 12 characters.";
    }
    setErrors(next);
    if (Object.keys(next).length) {
      document.getElementById(Object.keys(next)[0])?.focus();
      return;
    }
    setSent(true);
  };

  return (
    <div className="wrap py-8 sm:py-12">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted">
        <Link to="/" className="transition-colors hover:text-navy">
          Home
        </Link>
        <ChevronRight size={13} aria-hidden="true" className="text-slate-300" />
        <span className="text-ink">Contact Us</span>
      </nav>

      <div className="mt-4 max-w-2xl">
        <p className="eyebrow flex items-center gap-2 text-muted">
          <span className="h-1.5 w-1.5 rounded-[2px] bg-orange" aria-hidden="true" />
          Contact us
        </p>
        <h1 className="type-section mt-2.5 text-navy">Talk to a person.</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Questions about a phone, an order or a warranty? Call, email, or send a message and
          the same team that sold you the device will get back to you.
        </p>
      </div>

      <div className="mt-8 grid items-start gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
        <div className="space-y-3">
          {channels.map(({ Icon, title, value, href, copy }) => {
            const body = (
              <>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-soft text-blue">
                  {React.createElement(Icon, { size: 19, "aria-hidden": true })}
                </span>
                <span className="min-w-0">
                  <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                    {title}
                  </span>
                  <span className="mt-1 block text-sm font-semibold text-navy">{value}</span>
                  <span className="mt-0.5 block text-xs text-muted">{copy}</span>
                </span>
              </>
            );

            return href ? (
              <a
                key={title}
                href={href}
                className="card card-lift flex items-start gap-3.5 p-4"
              >
                {body}
              </a>
            ) : (
              <div key={title} className="card flex items-start gap-3.5 p-4">
                {body}
              </div>
            );
          })}

          <div className="rounded-2xl border border-line bg-white p-5">
            <h2 className="font-display text-sm font-bold text-navy">Visit the showroom</h2>
            <p className="mt-1.5 text-xs leading-relaxed text-muted">
              Try every flagship in one afternoon. Our specialists will set up side-by-side
              camera tests while you compare.
            </p>
            <a
              href="https://maps.google.com/?q=18+Kingsway+London"
              target="_blank"
              rel="noreferrer noopener"
              className="text-link mt-3 text-xs"
            >
              Open in Maps
              <ChevronRight size={13} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="card p-5 sm:p-7">
          {sent ? (
            <div className="flex flex-col items-center py-12 text-center" role="status">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-mint/10 text-mint">
                <CheckCircle2 size={26} aria-hidden="true" />
              </span>
              <h2 className="mt-4 font-display text-xl font-bold text-navy">Message validated</h2>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
                Thanks {form.name.split(" ")[0]} — this demo form does not send email. Contact us
                at{" "}
                <a className="font-medium text-blue hover:text-blue-deep" href="mailto:care@north.store">
                  care@north.store
                </a>{" "}
                and we will reply within one business day.
              </p>
              <button
                type="button"
                onClick={() => {
                  setForm(initialForm);
                  setSent(false);
                }}
                className="btn-outline mt-6"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <h2 className="font-display text-lg font-bold text-navy">Send a message</h2>
              <p className="mt-1 text-xs text-muted">
                Required fields are marked. This demo form validates input but does not deliver
                messages.
              </p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="field-label">
                    Full name
                  </label>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    value={form.name}
                    onChange={(event) => setField("name", event.target.value)}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={`field ${errors.name ? "field-invalid" : ""}`}
                    placeholder="Alex Morgan"
                  />
                  {errors.name && (
                    <p id="name-error" className="field-error">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="field-label">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(event) => setField("email", event.target.value)}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={`field ${errors.email ? "field-invalid" : ""}`}
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p id="email-error" className="field-error">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="topic" className="field-label">
                    Topic
                  </label>
                  <select
                    id="topic"
                    value={form.topic}
                    onChange={(event) => setField("topic", event.target.value)}
                    className="field"
                  >
                    {topics.map((topic) => (
                      <option key={topic}>{topic}</option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="message" className="field-label">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={form.message}
                    onChange={(event) => setField("message", event.target.value)}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    className={`field h-auto py-3 ${errors.message ? "field-invalid" : ""}`}
                    placeholder="Tell us what you need — include an order number if you have one."
                  />
                  {errors.message && (
                    <p id="message-error" className="field-error">
                      {errors.message}
                    </p>
                  )}
                </div>
              </div>

              <button type="submit" className="btn-primary mt-5 w-full sm:w-auto">
                <Send size={15} aria-hidden="true" />
                Send message
              </button>
            </form>
          )}
        </div>
      </div>

      <section className="mt-12 sm:mt-16">
        <div className="max-w-2xl">
          <p className="eyebrow flex items-center gap-2 text-muted">
            <span className="h-1.5 w-1.5 rounded-[2px] bg-orange" aria-hidden="true" />
            Common questions
          </p>
          <h2 className="type-section mt-2.5 text-navy">Answered before you ask.</h2>
        </div>
        <div className="mt-6 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white">
          {faqs.map((faq) => (
            <details key={faq.q} className="group px-5 py-4 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-sm font-semibold text-navy">
                {faq.q}
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
