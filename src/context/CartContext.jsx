import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { CheckCircle2, Info, XCircle } from "lucide-react";
import { demoOrders, getProductById } from "../data/products";

const CartContext = createContext(null);

const CART_KEY = "north_cart_v1";
const WISHLIST_KEY = "north_wishlist_v1";
const ORDERS_KEY = "north_orders_v1";
const COMPARE_KEY = "north_compare_v1";
const MAX_COMPARE = 3;
const FREE_SHIPPING = 499;
const STANDARD_SHIPPING = 19;

const readStorage = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const writeStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage can be unavailable — cart still works for this session */
  }
};

const COUPONS = {
  SAVE10: 10,
  NORTH20: 20,
};

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => readStorage(CART_KEY, []));
  const [wishlist, setWishlist] = useState(() => readStorage(WISHLIST_KEY, []));
  const [orders, setOrders] = useState(() => readStorage(ORDERS_KEY, demoOrders));
  const [compare, setCompare] = useState(() => readStorage(COMPARE_KEY, []));
  const [coupon, setCoupon] = useState(null);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  useEffect(() => writeStorage(CART_KEY, cartItems), [cartItems]);
  useEffect(() => writeStorage(WISHLIST_KEY, wishlist), [wishlist]);
  useEffect(() => writeStorage(ORDERS_KEY, orders), [orders]);
  useEffect(() => writeStorage(COMPARE_KEY, compare), [compare]);
  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const showToast = useCallback((message, type = "success") => {
    clearTimeout(toastTimer.current);
    setToast({ id: Date.now(), message, type });
    toastTimer.current = setTimeout(() => setToast(null), 3200);
  }, []);

  const addToCart = useCallback(
    (product, quantity = 1, options = {}) => {
      const color = options.color || product.colors?.[0]?.name || "";
      const cheapestStorage = product.storage?.reduce(
        (best, option) => (!best || option.delta < best.delta ? option : best),
        null
      );
      const storage = options.storage || cheapestStorage?.value || "";
      const ram = options.ram || product.ramOptions?.[0] || "";
      const storageOption = product.storage?.find((option) => option.value === storage);
      const unitPrice = product.price + (storageOption?.delta || 0);
      const key = `${product.id}|${color}|${storage}|${ram}`;

      setCartItems((current) => {
        const existing = current.find((item) => item.key === key);
        if (existing) {
          return current.map((item) =>
            item.key === key
              ? { ...item, quantity: item.quantity + Number(quantity) }
              : item
          );
        }
        return [
          ...current,
          {
            key,
            id: product.id,
            slug: product.slug,
            name: product.name,
            brand: product.brand,
            price: unitPrice,
            oldPrice: product.oldPrice,
            color,
            storage,
            ram,
            quantity: Number(quantity),
          },
        ];
      });

      showToast(`${product.name} added to your bag`);
    },
    [showToast]
  );

  const removeFromCart = useCallback(
    (key) => {
      setCartItems((current) => current.filter((item) => item.key !== key));
      showToast("Item removed from your bag", "info");
    },
    [showToast]
  );

  const updateQuantity = useCallback(
    (key, quantity) => {
      if (quantity <= 0) {
        removeFromCart(key);
        return;
      }
      setCartItems((current) =>
        current.map((item) =>
          item.key === key ? { ...item, quantity: Number(quantity) } : item
        )
      );
    },
    [removeFromCart]
  );

  const clearCart = useCallback(() => {
    setCartItems([]);
    setCoupon(null);
  }, []);

  const applyCoupon = useCallback(
    (code) => {
      const clean = code.trim().toUpperCase();
      if (!clean) {
        setCoupon(null);
        return { ok: false, message: "Enter a promotion code first." };
      }
      if (COUPONS[clean]) {
        setCoupon({ code: clean, percent: COUPONS[clean] });
        showToast(`Promotion ${clean} applied — ${COUPONS[clean]}% off`);
        return { ok: true, message: "Promotion applied." };
      }
      return {
        ok: false,
        message: "That code isn't valid. Try SAVE10 or NORTH20.",
      };
    },
    [showToast]
  );

  const removeCoupon = useCallback(() => {
    setCoupon(null);
    showToast("Promotion removed", "info");
  }, [showToast]);

  const toggleCompare = useCallback(
    (productId) => {
      setCompare((current) => {
        if (current.includes(productId)) {
          return current.filter((id) => id !== productId);
        }
        if (current.length >= MAX_COMPARE) {
          showToast("You can compare up to three phones at a time", "info");
          return current;
        }
        return [...current, productId];
      });
    },
    [showToast]
  );

  const clearCompare = useCallback(() => setCompare([]), []);

  const toggleWishlist = useCallback(
    (productId) => {
      setWishlist((current) => {
        const saved = current.includes(productId);
        showToast(
          saved ? "Removed from your saved list" : "Saved for later",
          saved ? "info" : "success"
        );
        return saved ? current.filter((id) => id !== productId) : [...current, productId];
      });
    },
    [showToast]
  );

  const placeOrder = useCallback(
    (details) => {
      const items = cartItems.map((item) => ({ ...item }));
      const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const discount = coupon ? Math.round(subtotal * (coupon.percent / 100)) : 0;
      const standardShipping =
        subtotal === 0 || subtotal - discount >= FREE_SHIPPING ? 0 : STANDARD_SHIPPING;
      const shipping =
        typeof details.shipping === "number" ? details.shipping : standardShipping;
      const order = {
        id: `NR-${Math.floor(10000 + Math.random() * 89999)}`,
        date: new Date().toISOString().slice(0, 10),
        status: "Processing",
        payment: details.payment,
        delivery: details.delivery || "Standard",
        address: `${details.address}, ${details.city} ${details.postalCode}, ${details.country}`,
        email: details.email,
        phone: details.phone,
        shipping,
        discount,
        items: items.map((item) => ({
          productId: item.id,
          slug: item.slug,
          name: item.name,
          brand: item.brand,
          color: item.color,
          storage: item.storage,
          ram: item.ram,
          qty: item.quantity,
          price: item.price,
        })),
        total: subtotal - discount + shipping,
      };
      setOrders((current) => [order, ...current]);
      clearCart();
      return order;
    },
    [cartItems, clearCart, coupon]
  );

  const totals = useMemo(() => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const compareAt = cartItems.reduce(
      (sum, item) => sum + (item.oldPrice || item.price) * item.quantity,
      0
    );
    const couponDiscount = coupon ? Math.round(subtotal * (coupon.percent / 100)) : 0;
    const shipping =
      subtotal === 0 || subtotal - couponDiscount >= FREE_SHIPPING ? 0 : STANDARD_SHIPPING;
    return {
      subtotal,
      compareAt,
      couponDiscount,
      shipping,
      total: subtotal - couponDiscount + shipping,
      savings: Math.max(0, compareAt - subtotal) + couponDiscount,
    };
  }, [cartItems, coupon]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const value = {
    cartItems,
    cartCount,
    wishlist,
    orders,
    compare,
    coupon,
    totals,
    toast,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    applyCoupon,
    removeCoupon,
    toggleWishlist,
    toggleCompare,
    clearCompare,
    placeOrder,
    showToast,
    isWishlisted: (productId) => wishlist.includes(productId),
    isCompared: (productId) => compare.includes(productId),
    cartItemProduct: (item) => getProductById(item.id),
  };

  return (
    <CartContext.Provider value={value}>
      {children}

      {toast && (
        <div
          className="pointer-events-none fixed inset-x-4 bottom-5 z-[90] flex justify-center sm:inset-x-auto sm:right-6 sm:justify-end"
          role="status"
          aria-live="polite"
        >
          <div className="animate-toast pointer-events-auto flex max-w-sm items-start gap-3 rounded-lg border border-line bg-white px-4 py-3 text-sm text-ink shadow-lg">
            <span className="mt-0.5 shrink-0">
              {toast.type === "error" ? (
                <XCircle size={16} className="text-sale" />
              ) : toast.type === "info" ? (
                <Info size={16} className="text-blue" />
              ) : (
                <CheckCircle2 size={16} className="text-blue" />
              )}
            </span>
            <p className="leading-snug">{toast.message}</p>
          </div>
        </div>
      )}
    </CartContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components -- the hook belongs with its provider
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
};
