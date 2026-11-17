import React, { useId } from "react";
import { Minus, Plus } from "lucide-react";

export default function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  label = "Quantity",
  className = "",
}) {
  const inputId = useId();
  const setValue = (next) => onChange(Math.max(min, Math.min(max, next)));

  return (
    <div
      className={`inline-flex h-11 items-center rounded-lg border border-line bg-white ${className}`}
    >
      <button
        type="button"
        onClick={() => setValue(value - 1)}
        disabled={value <= min}
        aria-label={`Decrease ${label.toLowerCase()}`}
        className="flex h-11 w-11 items-center justify-center rounded-l-lg text-ink transition-colors hover:bg-ice disabled:opacity-35"
      >
        <Minus size={15} aria-hidden="true" />
      </button>
      <label htmlFor={inputId} className="sr-only">
        {label}
      </label>
      <input
        id={inputId}
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        value={value}
        onChange={(event) => setValue(Number(event.target.value) || min)}
        className="num h-full w-10 border-0 bg-transparent text-center text-sm font-semibold text-ink focus:outline-none"
      />
      <button
        type="button"
        onClick={() => setValue(value + 1)}
        disabled={value >= max}
        aria-label={`Increase ${label.toLowerCase()}`}
        className="flex h-11 w-11 items-center justify-center rounded-r-lg text-ink transition-colors hover:bg-ice disabled:opacity-35"
      >
        <Plus size={15} aria-hidden="true" />
      </button>
    </div>
  );
}
