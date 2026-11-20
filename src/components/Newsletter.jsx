import React, { useState } from "react";
import { ArrowRight, CheckCircle2, Mail } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Newsletter() {
  const { showToast } = useCart();
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const submit = (event) => {
    event.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
    if (!valid) {
      setError("Enter a valid email address, for example name@domain.com.");
      return;
    }
    setError("");
    setDone(true);
    showToast("Subscription preview saved; this demo is not connected to a mailing list.", "info");
  };

  return (
    <section className="pb-14 sm:pb-20">
      <div className="wrap">
        <div className="plate-dark relative overflow-hidden rounded-[24px] px-6 py-10 sm:px-10 lg:px-14 lg:py-14">
          <div
            className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-blue/40 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="eyebrow flex items-center gap-2 text-white/55">
                <span className="h-1.5 w-1.5 rounded-[2px] bg-orange" aria-hidden="true" />
                The short list
              </p>
              <h2 className="type-section mt-2.5 max-w-md text-white">
                One email when a phone is worth your money.
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-white/60">
                New stock, real price drops and honest buying notes. No daily noise, no
                sponsored picks — about twice a month.
              </p>
            </div>

            <div>
              {done ? (
                <div
                  className="flex items-start gap-3 rounded-xl border border-white/15 bg-white/10 p-4 backdrop-blur"
                  role="status"
                >
                  <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-orange" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold text-white">Subscription preview saved.</p>
                    <p className="mt-0.5 text-xs text-white/60">
                      This demo does not send email or connect to a mailing list.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={submit} noValidate>
                  <label
                    htmlFor="newsletter-email"
                    className="mb-2 block font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-white/55"
                  >
                    Email address
                  </label>
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <div className="relative flex-1">
                      <Mail
                        size={16}
                        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
                        aria-hidden="true"
                      />
                      <input
                        id="newsletter-email"
                        type="email"
                        value={email}
                        onChange={(event) => {
                          setEmail(event.target.value);
                          if (error) setError("");
                        }}
                        placeholder="you@example.com"
                        aria-invalid={Boolean(error)}
                        aria-describedby={error ? "newsletter-error" : undefined}
                        className={`h-12 w-full rounded-xl border bg-white pl-10 pr-3 text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-2 ${
                          error
                            ? "border-orange-deep focus:ring-orange/25"
                            : "border-transparent focus:border-blue focus:ring-blue/25"
                        }`}
                      />
                    </div>
                    <button type="submit" className="btn-primary h-12 shrink-0">
                      Subscribe
                      <ArrowRight size={16} aria-hidden="true" />
                    </button>
                  </div>
                  {error && (
                    <p id="newsletter-error" className="mt-2 text-xs font-medium text-orange">
                      {error}
                    </p>
                  )}
                  <p className="mt-2 text-[11px] text-white/45">
                    This demo validates your address only; it does not store or send it.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
