import React from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="wrap flex min-h-[62vh] flex-col items-center justify-center py-16 text-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-blue">Error 404</p>
      <h1 className="type-section mt-3 text-navy">This page took a different route.</h1>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
        The link may be old or mistyped. The catalog is still exactly where you left it.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link to="/" className="btn-primary">
          <ArrowLeft size={16} aria-hidden="true" />
          Back to home
        </Link>
        <Link to="/products" className="btn-outline">
          Browse devices
        </Link>
      </div>
    </div>
  );
}
