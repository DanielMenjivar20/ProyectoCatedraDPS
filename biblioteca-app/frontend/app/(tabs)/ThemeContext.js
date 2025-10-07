// app/context/ThemeContext.js
import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const THEME_KEY = "app_theme";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    (async () => {
      try {
        const t = await AsyncStorage.getItem(THEME_KEY);
        if (t) setTheme(t);
      } catch (e) {
        console.log("Error leyendo tema:", e);
      }
    })();
  }, []);

  const toggleTheme = async () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    try {
      await AsyncStorage.setItem(THEME_KEY, next);
    } catch (e) {
      console.log("Error guardando tema:", e);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
