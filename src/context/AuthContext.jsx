import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);
const USER_KEY = "north_user_v1";

const readUser = () => {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const titleCase = (value) =>
  value
    .replace(/[._-]+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readUser);

  useEffect(() => {
    try {
      if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
      else localStorage.removeItem(USER_KEY);
    } catch {
      /* ignore storage errors */
    }
  }, [user]);

  const login = (email) => {
    const existing = readUser();
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
    setUser(next);
    return next;
  };

  const register = (name, email, phone) => {
    const next = {
      name,
      email,
      phone,
      joined: new Date().toISOString().slice(0, 10),
    };
    setUser(next);
    return next;
  };

  const updateProfile = (changes) => {
    setUser((current) => ({ ...(current || {}), ...changes }));
  };

  const logout = () => setUser(null);

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
