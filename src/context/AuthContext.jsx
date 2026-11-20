import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);
const USER_KEY = "north_user_v1";

const readStoredUser = (storage) => {
  try {
    const raw = storage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const readAuthState = () => {
  const persistentUser = readStoredUser(localStorage);
  if (persistentUser) return { user: persistentUser, remember: true };
  return { user: readStoredUser(sessionStorage), remember: false };
};

const titleCase = (value) =>
  value
    .replace(/[._-]+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(readAuthState);
  const { user, remember } = authState;

  useEffect(() => {
    try {
      if (!user) {
        localStorage.removeItem(USER_KEY);
        sessionStorage.removeItem(USER_KEY);
        return;
      }

      const activeStorage = remember ? localStorage : sessionStorage;
      const inactiveStorage = remember ? sessionStorage : localStorage;
      activeStorage.setItem(USER_KEY, JSON.stringify(user));
      inactiveStorage.removeItem(USER_KEY);
    } catch {
      /* Keep the signed-in state for this session when storage is unavailable. */
    }
  }, [user, remember]);

  const login = (email, shouldRemember = true) => {
    const existing = readAuthState().user;
    const name =
      existing && existing.email.toLowerCase() === email.toLowerCase()
        ? existing.name
        : titleCase(email.split("@")[0]);
    const next = {
      name,
      email,
      phone: existing?.phone || "",
      joined: existing?.joined || new Date().toISOString().slice(0, 10),
    };
    setAuthState({ user: next, remember: shouldRemember });
    return next;
  };

  const register = (name, email, phone) => {
    const next = {
      name,
      email,
      phone,
      joined: new Date().toISOString().slice(0, 10),
    };
    setAuthState({ user: next, remember: true });
    return next;
  };

  const updateProfile = (changes) =>
    setAuthState((current) => ({
      ...current,
      user: { ...(current.user || {}), ...changes },
    }));

  const logout = () => setAuthState({ user: null, remember: true });

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: Boolean(user), login, register, updateProfile, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components -- the hook belongs with its provider
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
