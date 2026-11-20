import React, { useState } from "react";
import { Eye, EyeOff, Lock, Mail, Phone, UserRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AuthShell from "../components/AuthShell";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { showToast } = useCart();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
    terms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const setField = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
    if (errors[key]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[key];
        return next;
      });
    }
  };

  const validate = () => {
    const next = {};
    if (form.name.trim().length < 2) next.name = "Enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) {
      next.email = "Enter a valid email address.";
    }
    if (form.phone.trim() && form.phone.replace(/\D/g, "").length < 7) {
      next.phone = "Enter a valid phone number, or leave it blank.";
    }
    if (form.password.length < 8) {
      next.password = "Use at least 8 characters.";
    }
    if (form.confirm !== form.password) next.confirm = "Passwords do not match.";
    if (!form.terms) next.terms = "Please accept the terms to continue.";
    return next;
  };

  const submit = (event) => {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length) {
      document.getElementById(Object.keys(next)[0])?.focus();
      return;
    }
    const user = register(form.name.trim(), form.email.trim(), form.phone.trim());
    showToast(`Welcome to NORTH, ${user.name.split(" ")[0]}`);
    navigate("/profile");
  };

  return (
    <AuthShell
      eyebrow="Create an account"
      title="Join NORTH"
      subtitle="Save phones, follow deliveries and keep every warranty in one place."
      footer={
        <p>
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-blue hover:text-blue-deep">
            Sign in
          </Link>
        </p>
      }
    >
      <form onSubmit={submit} noValidate className="space-y-4">
        <div>
          <label htmlFor="name" className="field-label">
            Full name
          </label>
          <div className="relative">
            <UserRound
              size={16}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
              aria-hidden="true"
            />
            <input
              id="name"
              type="text"
              autoComplete="name"
              placeholder="Alex Morgan"
              value={form.name}
              onChange={(event) => setField("name", event.target.value)}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
              className={`field pl-10 ${errors.name ? "field-invalid" : ""}`}
            />
          </div>
          {errors.name && (
            <p id="name-error" className="field-error">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="field-label">
            Email address
          </label>
          <div className="relative">
            <Mail
              size={16}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
              aria-hidden="true"
            />
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(event) => setField("email", event.target.value)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={`field pl-10 ${errors.email ? "field-invalid" : ""}`}
            />
          </div>
          {errors.email && (
            <p id="email-error" className="field-error">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="field-label">
            Phone <span className="font-normal text-muted">(optional)</span>
          </label>
          <div className="relative">
            <Phone
              size={16}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
              aria-hidden="true"
            />
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              placeholder="+44 7700 900123"
              value={form.phone}
              onChange={(event) => setField("phone", event.target.value)}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              className={`field pl-10 ${errors.phone ? "field-invalid" : ""}`}
            />
          </div>
          {errors.phone && (
            <p id="phone-error" className="field-error">
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="field-label">
            Password
          </label>
          <div className="relative">
            <Lock
              size={16}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
              aria-hidden="true"
            />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="At least 8 characters"
              value={form.password}
              onChange={(event) => setField("password", event.target.value)}
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? "password-error" : undefined}
              className={`field pl-10 pr-11 ${errors.password ? "field-invalid" : ""}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-1.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-muted hover:text-navy"
            >
              {showPassword ? (
                <EyeOff size={16} aria-hidden="true" />
              ) : (
                <Eye size={16} aria-hidden="true" />
              )}
            </button>
          </div>
          {errors.password && (
            <p id="password-error" className="field-error">
              {errors.password}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="confirm" className="field-label">
            Confirm password
          </label>
          <div className="relative">
            <Lock
              size={16}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
              aria-hidden="true"
            />
            <input
              id="confirm"
              type="password"
              autoComplete="new-password"
              placeholder="Repeat your password"
              value={form.confirm}
              onChange={(event) => setField("confirm", event.target.value)}
              aria-invalid={Boolean(errors.confirm)}
              aria-describedby={errors.confirm ? "confirm-error" : undefined}
              className={`field pl-10 ${errors.confirm ? "field-invalid" : ""}`}
            />
          </div>
          {errors.confirm && (
            <p id="confirm-error" className="field-error">
              {errors.confirm}
            </p>
          )}
        </div>

        <div>
          <label className="flex cursor-pointer items-start gap-2.5 text-xs leading-relaxed text-muted">
            <input
              id="terms"
              type="checkbox"
              checked={form.terms}
              onChange={(event) => setField("terms", event.target.checked)}
              aria-invalid={Boolean(errors.terms)}
              aria-describedby={errors.terms ? "terms-error" : undefined}
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-line text-blue focus:ring-blue"
            />
            <span>
              I agree to the terms of sale and understand that this is a demo storefront.
            </span>
          </label>
          {errors.terms && (
            <p id="terms-error" className="field-error">
              {errors.terms}
            </p>
          )}
        </div>

        <button type="submit" className="btn-primary w-full">
          Create account
        </button>
      </form>
    </AuthShell>
  );
}
