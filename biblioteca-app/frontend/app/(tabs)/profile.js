// app/tabs/profile.js
import { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { ThemeContext } from "./ThemeContext"; 

export default function Profile() {
  const router = useRouter();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  // Redirige directamente al login
  function handleLogoutConfirm() {
    router.push("/login");
  }

  return (
    <View style={[styles.container, isDark ? styles.containerDark : styles.containerLight]}>
      <Text style={[styles.header, isDark ? styles.headerDark : styles.headerLight]}> Mi Perfil</Text>

      <Text style={[styles.item, isDark ? styles.itemDark : styles.itemLight]}>Nombre: Juan Pérez</Text>
      <Text style={[styles.item, isDark ? styles.itemDark : styles.itemLight]}>Correo: usuario@edu.com</Text>
      <Text style={[styles.item, isDark ? styles.itemDark : styles.itemLight]}>Rol: Estudiante</Text>
      <Text style={[styles.item, isDark ? styles.itemDark : styles.itemLight]}>Matrícula: 20251234</Text>

      <TouchableOpacity style={styles.button} onPress={handleLogoutConfirm}>
        <Text style={styles.btnText}>Cerrar Sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.modeBtn, isDark ? styles.modeBtnDark : styles.modeBtnLight]}
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
  container: { flex: 1, padding: 20 },
  containerLight: { backgroundColor: "#ffd900" },
  containerDark: { backgroundColor: "#0b1220" },

  header: { fontSize: 22, fontWeight: "700", marginBottom: 20 },
  headerLight: { color: "#1E3A8A" },
  headerDark: { color: "#fff" },

  item: { fontSize: 16, marginBottom: 10 },
  itemLight: { color: "#111827" },
  itemDark: { color: "#e6e6e6" },

  button: { backgroundColor: "#EF4444", padding: 14, borderRadius: 8, marginTop: 20, alignItems: "center" },
  modeBtn: { padding: 14, borderRadius: 8, marginTop: 12, alignItems: "center" },
  modeBtnLight: { backgroundColor: "#1E3A8A" },
  modeBtnDark: { backgroundColor: "#374151" },
  btnText: { color: "#fff", fontWeight: "700" }
});
