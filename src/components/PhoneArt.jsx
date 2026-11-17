import React from "react";

/* ------------------------------------------------------------------
   NORTH. device renderer.
   Product visuals are drawn in CSS so the catalog stays crisp at every
   size and never depends on third-party image hosts.
------------------------------------------------------------------- */

const clampChannel = (value) => Math.max(0, Math.min(255, Math.round(value)));

function shade(hex, percent) {
  if (!hex) return "#334155";
  let value = hex.replace("#", "");
  if (value.length === 3) {
    value = value
      .split("")
      .map((char) => char + char)
      .join("");
  }
  const num = parseInt(value, 16);
  const target = percent < 0 ? 0 : 255;
  const amount = Math.abs(percent) / 100;
  const r = clampChannel(((target - ((num >> 16) & 255)) * amount + ((num >> 16) & 255)));
  const g = clampChannel(((target - ((num >> 8) & 255)) * amount + ((num >> 8) & 255)));
  const b = clampChannel(((target - (num & 255)) * amount + (num & 255)));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

function ScreenWallpaper({ accent }) {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(155deg, ${accent[1]} 0%, #0b1428 52%, ${accent[0]} 150%)`,
        }}
      />
      <div
        className="absolute -left-1/4 top-[6%] h-[46%] w-[120%] rounded-full opacity-70 blur-2xl"
        style={{ background: accent[0] }}
      />
      <div
        className="absolute -right-1/3 bottom-[8%] h-[42%] w-[110%] rounded-full opacity-60 blur-2xl"
        style={{ background: accent[1] }}
      />
      <div
        className="absolute left-1/2 top-1/2 h-[54%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15"
        style={{ boxShadow: "0 0 40px rgba(255,255,255,0.08) inset" }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/5" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/35 to-transparent" />
    </>
  );
}

function Lens({ size = "14%", style, accent }) {
  return (
    <span
      className="absolute rounded-full"
      style={{
        width: size,
        height: "auto",
        aspectRatio: "1",
        background: "radial-gradient(circle at 32% 28%, #475569 0%, #0b1428 58%, #020617 100%)",
        border: "1px solid rgba(255,255,255,0.28)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.5)",
        ...style,
      }}
    >
      <span
        className="absolute left-1/2 top-1/2 block h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: `radial-gradient(circle at 35% 30%, ${accent[0]}, #0f172a 75%)`,
          opacity: 0.85,
        }}
      />
      <span className="absolute left-[24%] top-[20%] block h-[16%] w-[16%] rounded-full bg-white/70 blur-[1px]" />
    </span>
  );
}

function CameraModule({ camera, accent, body }) {
  const plate = {
    background: `linear-gradient(145deg, ${shade(body, 12)}, ${shade(body, -10)})`,
    boxShadow:
      "0 2px 8px rgba(0,0,0,0.28), inset 0 0 0 1px rgba(255,255,255,0.22)",
  };

  if (camera === "samsung") {
    return (
      <div className="absolute left-[8%] top-[4.5%] flex w-[13%] flex-col">
        {[0, 1, 2].map((index) => (
          <span
            key={index}
            className="relative mb-[24%] block rounded-full"
            style={{
              width: "100%",
              height: "auto",
              aspectRatio: "1",
              background: "radial-gradient(circle at 32% 28%, #475569 0%, #0b1428 60%, #020617 100%)",
              border: "1px solid rgba(255,255,255,0.3)",
              boxShadow: "0 2px 6px rgba(0,0,0,0.45)",
            }}
          >
            <span
              className="absolute left-1/2 top-1/2 block h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ background: `radial-gradient(circle at 35% 30%, ${accent[0]}, #0f172a 75%)` }}
            />
          </span>
        ))}
        <span className="ml-1 block h-1.5 w-1.5 rounded-full bg-amber-200/80" />
      </div>
    );
  }

  if (camera === "circle") {
    return (
      <div
        className="absolute left-1/2 top-[4%] aspect-square w-[54%] -translate-x-1/2 rounded-full"
        style={plate}
      >
        <Lens size="30%" style={{ left: "11%", top: "11%" }} accent={accent} />
        <Lens size="30%" style={{ right: "11%", top: "11%" }} accent={accent} />
        <Lens size="30%" style={{ left: "35%", bottom: "9%" }} accent={accent} />
        <span className="absolute left-[20%] top-[68%] h-[7%] w-[7%] rounded-full bg-amber-100/90" />
        <span className="absolute bottom-[16%] right-[17%] font-mono text-[6px] uppercase tracking-[0.2em] text-white/50">
          Leica
        </span>
      </div>
    );
  }

  if (camera === "bar") {
    return (
      <div
        className="absolute left-1/2 top-[3.5%] flex w-[88%] -translate-x-1/2 items-center justify-between rounded-xl px-[6%] py-[3%]"
        style={plate}
      >
        <Lens size="22%" style={{ position: "relative" }} accent={accent} />
        <Lens size="22%" style={{ position: "relative" }} accent={accent} />
        <span className="h-[16%] w-[10%] rounded-full bg-amber-100/90" />
      </div>
    );
  }

  if (camera === "oneplus") {
    return (
      <div
        className="absolute left-[10%] top-[4%] aspect-square w-[46%] rounded-full"
        style={plate}
      >
        <Lens size="38%" style={{ left: "12%", top: "18%" }} accent={accent} />
        <Lens size="38%" style={{ right: "10%", bottom: "16%" }} accent={accent} />
        <span className="absolute left-[45%] top-[46%] h-[6%] w-[6%] rounded-full bg-amber-100/80" />
      </div>
    );
  }

  /* Apple — square island, three lenses */
  return (
    <div
      className="absolute left-[7%] top-[3.5%] aspect-square w-[42%] rounded-[26%]"
      style={plate}
    >
      <Lens size="31%" style={{ left: "12%", top: "12%" }} accent={accent} />
      <Lens size="31%" style={{ right: "12%", top: "12%" }} accent={accent} />
      <Lens size="31%" style={{ left: "12%", bottom: "12%" }} accent={accent} />
      <span className="absolute bottom-[16%] right-[18%] h-[7%] w-[7%] rounded-full bg-amber-100/85" />
      <span className="absolute bottom-[24%] right-[35%] h-[12%] w-[12%] rounded-full bg-slate-900/30" />
    </div>
  );
}

function PhoneBody({ product, view = "front", color, className = "" }) {
  const body = color || product.colors?.[0]?.hex || "#334155";
  const accent = product.accent || ["#2563eb", "#14213d"];
  const camera = product.art?.camera || "apple";
  const fold = product.art?.fold;
  const isBack = view === "back";
  const rotated = view === "angle";

  return (
    <div className={`relative flex h-full w-full items-center justify-center ${className}`}>
      <div
        className="relative h-full transition-transform duration-300"
        style={{
          aspectRatio: fold ? "10 / 19.4" : "9 / 19.4",
          transform: rotated ? "rotate(-9deg)" : undefined,
          filter: rotated ? "drop-shadow(18px 30px 30px rgba(11,20,40,0.28))" : undefined,
        }}
      >
        {/* side buttons */}
        <span
          className="absolute -right-[2.5%] top-[20%] w-[2.5%] rounded-r-sm"
          style={{ height: "7%", background: shade(body, -28) }}
        />
        <span
          className="absolute -left-[2%] top-[17%] w-[2%] rounded-l-sm"
          style={{ height: "4%", background: shade(body, -18) }}
        />
        <span
          className="absolute -left-[2%] top-[24%] w-[2%] rounded-l-sm"
          style={{ height: "7%", background: shade(body, -18) }}
        />

        {/* frame */}
        <div
          className="relative h-full w-full overflow-hidden"
          style={{
            borderRadius: "13.5% / 6.2%",
            padding: "3.6%",
            background: `linear-gradient(150deg, ${shade(body, 46)} 0%, ${body} 32%, ${shade(body, -34)} 68%, ${shade(body, 18)} 100%)`,
            boxShadow:
              "0 30px 55px -22px rgba(11,20,40,0.55), 0 10px 20px -12px rgba(11,20,40,0.4), inset 0 0 0 1px rgba(255,255,255,0.4)",
          }}
        >
          <div
            className="relative h-full w-full overflow-hidden bg-black"
            style={{
              borderRadius: "10.8% / 4.9%",
              boxShadow: "inset 0 0 0 1.5px rgba(2, 6, 23, 0.9)",
            }}
          >
            {!isBack ? (
              <>
                <ScreenWallpaper accent={accent} />
                <span className="absolute left-[12%] top-[3%] text-[5px] font-medium tracking-wide text-white/70">
                  9:41
                </span>
                <span className="absolute right-[12%] top-[3.2%] h-[0.9%] w-[14%] rounded-full bg-white/50" />

                {camera === "apple" ? (
                  <span className="absolute left-1/2 top-[2.2%] flex h-[3.4%] w-[32%] -translate-x-1/2 items-center justify-end rounded-full bg-black pr-[6%]">
                    <span className="h-[45%] w-[12%] rounded-full bg-[#111c33]" />
                  </span>
                ) : (
                  <span className="absolute left-1/2 top-[2.6%] h-[2.4%] w-[2.4%] -translate-x-1/2 rounded-full bg-black ring-1 ring-white/10" />
                )}

                <span className="absolute bottom-[1.4%] left-1/2 h-[0.7%] w-[32%] -translate-x-1/2 rounded-full bg-white/70" />
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/20" />
              </>
            ) : (
              <>
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(160deg, ${shade(body, 30)} 0%, ${body} 40%, ${shade(body, -22)} 100%)`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white/15 via-transparent to-black/20" />
                <CameraModule camera={camera} accent={accent} body={body} />
                <div className="absolute inset-x-0 bottom-[7%] text-center">
                  <p className="font-display text-[7px] font-semibold uppercase tracking-[0.45em] text-white/70">
                    {product.brand}
                  </p>
                </div>
                <span className="absolute bottom-[3.4%] left-1/2 -translate-x-1/2 font-mono text-[4px] uppercase tracking-[0.16em] text-white/35">
                  Designed by NORTH · assembled globally
                </span>
                {fold && (
                  <span className="absolute inset-y-0 left-1/2 w-px bg-black/40 shadow-[0_0_0_1px_rgba(255,255,255,0.1)]" />
                )}
              </>
            )}
          </div>

          {/* glass glare */}
          <span
            className="pointer-events-none absolute inset-0"
            style={{
              borderRadius: "13.5% / 6.2%",
              background:
                "linear-gradient(115deg, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0) 28%, rgba(255,255,255,0) 72%, rgba(255,255,255,0.12) 100%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

function WatchArt({ product, color, className = "" }) {
  const body = color || product.colors?.[0]?.hex || "#2b2b2e";
  const accent = product.accent || ["#0ea5e9", "#0f172a"];

  return (
    <div className={`relative flex h-full w-full items-center justify-center ${className}`}>
      <div className="relative h-[92%] w-[46%]">
        <span
          className="absolute left-1/2 top-0 h-[32%] w-[56%] -translate-x-1/2 rounded-t-xl"
          style={{ background: "linear-gradient(90deg, #111827, #374151, #111827)" }}
        />
        <span
          className="absolute bottom-0 left-1/2 h-[32%] w-[56%] -translate-x-1/2 rounded-b-xl"
          style={{ background: "linear-gradient(90deg, #111827, #374151, #111827)" }}
        />
        <div
          className="absolute left-1/2 top-1/2 z-10 aspect-[1/1.16] h-[58%] -translate-x-1/2 -translate-y-1/2 p-[7%]"
          style={{
            borderRadius: "30% / 26%",
            background: `linear-gradient(150deg, ${shade(body, 40)}, ${body} 45%, ${shade(body, -30)})`,
            boxShadow: "0 20px 30px -18px rgba(11,20,40,0.6), inset 0 0 0 1px rgba(255,255,255,0.35)",
          }}
        >
          <div
            className="relative h-full w-full overflow-hidden"
            style={{ borderRadius: "26% / 23%", background: "#050a14" }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(circle at 30% 25%, ${accent[0]}, transparent 60%), linear-gradient(160deg, #0b1428, #050a14)`,
              }}
            />
            <div className="absolute left-1/2 top-1/2 h-[62%] w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white/15 border-t-white/70" />
          </div>
        </div>
        <span
          className="absolute right-[2%] top-[42%] h-[8%] w-[3%] rounded-r-full"
          style={{ background: shade(body, -25) }}
        />
      </div>
    </div>
  );
}

function BudsArt({ product, color, className = "" }) {
  const body = color || product.colors?.[0]?.hex || "#f5f5f4";
  const accent = product.accent || ["#94a3b8", "#0f172a"];

  return (
    <div className={`relative flex h-full w-full items-center justify-center ${className}`}>
      <div className="relative h-[82%] aspect-[1/1.06]">
        <span
          className="absolute left-[8%] top-0 h-[48%] w-[32%] -rotate-12 rounded-t-full rounded-b-lg"
          style={{ background: `linear-gradient(160deg, ${shade(body, 8)}, ${shade(body, -16)})` }}
        />
        <span
          className="absolute right-[8%] top-0 h-[48%] w-[32%] rotate-12 rounded-t-full rounded-b-lg"
          style={{ background: `linear-gradient(160deg, ${shade(body, 8)}, ${shade(body, -16)})` }}
        />
        <div
          className="absolute bottom-0 left-1/2 z-10 aspect-[1/1.12] h-[78%] -translate-x-1/2 p-[7%]"
          style={{
            borderRadius: "28% / 25%",
            background: `linear-gradient(150deg, ${shade(body, 22)}, ${body} 55%, ${shade(body, -18)})`,
            boxShadow: "0 24px 34px -20px rgba(11,20,40,0.55), inset 0 0 0 1px rgba(255,255,255,0.55)",
          }}
        >
          <span className="absolute inset-x-0 top-[58%] h-px bg-black/15" />
          <span className="absolute left-1/2 top-[70%] h-[5%] w-[5%] -translate-x-1/2 rounded-full bg-blue/70 shadow-[0_0_8px_rgba(37,99,235,0.9)]" />
          <span className="absolute bottom-[12%] left-1/2 -translate-x-1/2 font-mono text-[6px] uppercase tracking-[0.3em] text-black/30">
            {product.brand}
          </span>
          <div
            className="absolute inset-x-[18%] top-[10%] h-[38%] rounded-xl opacity-30"
            style={{ background: `linear-gradient(140deg, ${accent[0]}, transparent)` }}
          />
        </div>
      </div>
    </div>
  );
}

function PowerBankArt({ product, color, className = "" }) {
  const body = color || product.colors?.[0]?.hex || "#f0f1f2";
  const accent = product.accent || ["#2563eb", "#14213d"];

  return (
    <div className={`relative flex h-full w-full items-center justify-center ${className}`}>
      <div
        className="relative aspect-[3/3.9] h-[58%] -rotate-6 p-[7%]"
        style={{
          borderRadius: "22%",
          background: `linear-gradient(150deg, ${shade(body, 30)}, ${body} 55%, ${shade(body, -18)})`,
          boxShadow: "0 26px 40px -22px rgba(11,20,40,0.55), inset 0 0 0 1px rgba(255,255,255,0.5)",
        }}
      >
        <span
          className="absolute inset-[8%] rounded-[18%] opacity-40"
          style={{ background: `radial-gradient(circle at 50% 45%, ${accent[0]}, transparent 68%)` }}
        />
        <div className="absolute left-1/2 top-[16%] flex -translate-x-1/2 flex-col items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-mint" />
          <span className="h-1.5 w-1.5 rounded-full bg-mint/70" />
          <span className="h-1.5 w-1.5 rounded-full bg-mint/40" />
        </div>
        <span className="absolute left-1/2 top-[42%] h-px w-1/3 -translate-x-1/2 bg-black/10" />
        <span className="absolute bottom-[12%] left-1/2 -translate-x-1/2 font-mono text-[6px] uppercase tracking-[0.28em] text-black/35">
          MagGo
        </span>
        <span className="absolute bottom-[5%] left-1/2 h-[6%] w-[18%] -translate-x-1/2 rounded-full bg-black/20" />
      </div>
    </div>
  );
}

export default function PhoneArt({ product, view = "front", color, className = "" }) {
  const type = product.art?.type || "phone";

  if (type === "watch") return <WatchArt product={product} color={color} className={className} />;
  if (type === "buds") return <BudsArt product={product} color={color} className={className} />;
  if (type === "powerbank")
    return <PowerBankArt product={product} color={color} className={className} />;

  return <PhoneBody product={product} view={view} color={color} className={className} />;
}
