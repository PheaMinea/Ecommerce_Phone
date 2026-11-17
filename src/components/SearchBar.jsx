import React, { useEffect, useId, useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SearchBar({
  defaultValue = "",
  placeholder,
  variant = "compact",
  className = "",
  onSearch,
  onSearchComplete,
}) {
  const [query, setQuery] = useState(defaultValue);
  const navigate = useNavigate();
  const inputId = useId();

  useEffect(() => {
    setQuery(defaultValue);
  }, [defaultValue]);

  const submit = (event) => {
    event.preventDefault();
    const clean = query.trim();
    if (onSearch) {
      onSearch(clean);
      onSearchComplete?.(clean);
      return;
    }
    navigate(clean ? `/products?q=${encodeURIComponent(clean)}` : "/products");
    onSearchComplete?.(clean);
  };

  const large = variant === "large";
  const resolvedPlaceholder =
    placeholder || (large ? "Search phones, brands or accessories" : "Search devices");

  return (
    <form
      role="search"
      onSubmit={submit}
      className={`flex w-full items-center rounded-xl border border-line bg-white transition-colors focus-within:border-blue ${
        large ? "h-12 pl-4 pr-1.5 shadow-sm" : "h-10 pl-3 pr-1"
      } ${className}`}
    >
      <Search
        size={large ? 18 : 16}
        className="shrink-0 text-muted"
        aria-hidden="true"
      />
      <label htmlFor={inputId} className="sr-only">
        Search products
      </label>
      <input
        id={inputId}
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={resolvedPlaceholder}
        className={`min-w-0 flex-1 bg-transparent text-ink placeholder:text-muted focus:outline-none ${
          large ? "px-3 text-sm" : "px-2.5 text-xs"
        }`}
        autoComplete="off"
      />
      <button
        type="submit"
        aria-label="Search"
        className={`flex shrink-0 items-center justify-center rounded-lg bg-blue font-medium text-white transition-colors hover:bg-blue-deep ${
          large ? "h-9 px-5 text-sm" : "h-8 w-8"
        }`}
      >
        {large ? "Search" : <Search size={14} aria-hidden="true" />}
      </button>
    </form>
  );
}
