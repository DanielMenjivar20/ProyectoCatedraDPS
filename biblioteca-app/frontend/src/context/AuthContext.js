// src/context/AuthContext.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import api, { setAuthToken } from "../api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const t = await AsyncStorage.getItem("token");
        const u = await AsyncStorage.getItem("user");
        if (t && u) {
          setAuthToken(t);
          setToken(t);
          setUser(JSON.parse(u));
        }
      } catch (e) {
        console.log("Auth restore error:", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function login(email, password) {
    const res = await api.post("/auth/login", { email, password });
    const { token: tok, user: u } = res.data;
    await AsyncStorage.setItem("token", tok);
    await AsyncStorage.setItem("user", JSON.stringify(u));
    setAuthToken(tok);
    setToken(tok);
    setUser(u);
    return u;
  }

  async function register(payload) {
    // payload: { name, email, password }
    const res = await api.post("/auth/register", payload);
    return res.data;
  }

  async function logout() {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    setAuthToken(null);
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}