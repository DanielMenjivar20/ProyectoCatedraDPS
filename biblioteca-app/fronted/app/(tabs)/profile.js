// app/tabs/profile.js
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const THEME_KEY = "app_theme";

export default function Profile() {
  const router = useRouter();
  const [theme, setTheme] = useState("light"); // "light" | "dark"

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

  async function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    try {
      await AsyncStorage.setItem(THEME_KEY, next);
    } catch (e) {
      console.log("Error guardando tema:", e);
    }
  }

  function handleLogoutConfirm() {
    // abrir modal de confirmación
    router.push({
      pathname: "/modal",
      params: {
        title: "Cerrar Sesión",
        message: "¿Seguro que deseas cerrar sesión?",
        redirect: "/login",
        action: ""
      }
    });
  }

  const isDark = theme === "dark";
  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <Text style={[styles.header, isDark && styles.headerDark]}> Mi Perfil</Text>

      <Text style={[styles.item, isDark && styles.itemDark]}>Nombre: Juan Pérez</Text>
      <Text style={[styles.item, isDark && styles.itemDark]}>Correo: usuario@edu.com</Text>
      <Text style={[styles.item, isDark && styles.itemDark]}>Rol: Estudiante</Text>
      <Text style={[styles.item, isDark && styles.itemDark]}>Matrícula: 20251234</Text>

      <TouchableOpacity style={styles.button} onPress={handleLogoutConfirm}>
        <Text style={styles.btnText}>Cerrar Sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.modeBtn, isDark && styles.modeBtnDark]}
        onPress={toggleTheme}
      >
        <Text style={styles.btnText}>
          Cambiar a {isDark ? "Modo Claro" : "Modo Oscuro"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#ffd900" },
  containerDark: { backgroundColor: "#0b1220" },
  header: { fontSize: 22, fontWeight: "700", marginBottom: 20, color: "#1E3A8A" },
  headerDark: { color: "#fff" },
  item: { fontSize: 16, marginBottom: 10, color: "#111827" },
  itemDark: { color: "#e6e6e6" },
  button: { backgroundColor: "#EF4444", padding: 14, borderRadius: 8, marginTop: 20, alignItems: "center" },
  modeBtn: { backgroundColor: "#1E3A8A", padding: 14, borderRadius: 8, marginTop: 12, alignItems: "center" },
  modeBtnDark: { backgroundColor: "#374151" },
  btnText: { color: "#fff", fontWeight: "700" }
});