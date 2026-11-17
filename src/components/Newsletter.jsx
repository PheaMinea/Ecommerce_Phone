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
    showToast("You're on the list — check your inbox for a welcome code.");
  };

  return (
    <section className="pb-16 sm:pb-20">
      <div className="wrap">
        <div className="overflow-hidden rounded-2xl border border-blue/10 bg-[#eff6ff] px-6 py-10 sm:px-10 lg:px-14 lg:py-14">
          <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="eyebrow text-muted">The short list</p>
              <h2 className="type-section mt-2 max-w-md text-ink">
                One email when a flagship is worth your money.
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
                New stock, price drops and honest buying notes. No daily noise, no sponsored
                picks — about twice a month.
              </p>
            </div>

            <div>
              {done ? (
                <div
                  className="flex items-start gap-3 rounded-xl border border-line bg-white p-4"
                  role="status"
                >
                  <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-blue" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold text-ink">You're subscribed.</p>
                    <p className="mt-0.5 text-xs text-muted">
                      Your welcome code is on its way to {email}.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={submit} noValidate>
                  <label
                    htmlFor="newsletter-email"
                    className="mb-2 block text-[11px] font-medium uppercase tracking-[0.12em] text-muted"
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
                        className={`h-12 w-full rounded-lg border bg-white pl-10 pr-3 text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-2 ${
                          error
                            ? "border-sale focus:ring-sale/25"
                            : "border-line focus:border-blue focus:ring-blue/15"
                        }`}
                      />
                    </div>
                    <button type="submit" className="btn-primary h-12 shrink-0">
                      Subscribe
                      <ArrowRight size={16} aria-hidden="true" />
                    </button>
                  </div>
                  {error && (
                    <p id="newsletter-error" className="mt-2 text-xs font-medium text-sale">
                      {error}
                    </p>
                  )}
                  <p className="mt-2 text-[11px] text-muted">
                    By subscribing you agree to our privacy policy. Unsubscribe any time.
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
