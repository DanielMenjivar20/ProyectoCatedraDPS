// app/admin/profile.js
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const THEME_KEY = "app_theme";

export default function AdminProfile() {
  const router = useRouter();
  const [theme, setTheme] = useState("light");
  const [modalVisible, setModalVisible] = useState(false);

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

  const handleLogout = () => {
    setModalVisible(false);
    // Limpiar datos de sesión si es necesario
    router.push("/login");
  };

  const isDark = theme === "dark";

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <Text style={[styles.header, isDark && styles.headerDark]}> Perfil de Administrador</Text>

      <Text style={[styles.item, isDark && styles.itemDark]}>Nombre: Admin General</Text>
      <Text style={[styles.item, isDark && styles.itemDark]}>Correo: admin@edu.com</Text>
      <Text style={[styles.item, isDark && styles.itemDark]}>Rol: Administrador</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
      >
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

      {/* Modal de confirmación */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={[styles.modalContainer, isDark && styles.modalContainerDark]}>
            <Text style={[styles.modalTitle, isDark && styles.itemDark]}>Cerrar Sesión</Text>
            <Text style={[styles.modalMessage, isDark && styles.itemDark]}>¿Seguro que deseas cerrar sesión?</Text>
            <View style={styles.modalButtons}>
              <Pressable style={[styles.modalBtn, { backgroundColor: "#EF4444" }]} onPress={handleLogout}>
                <Text style={styles.btnText}>Sí</Text>
              </Pressable>
              <Pressable style={[styles.modalBtn, { backgroundColor: "#6B7280" }]} onPress={() => setModalVisible(false)}>
                <Text style={styles.btnText}>Cancelar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
  btnText: { color: "#fff", fontWeight: "700" },

  // Estilos modal
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalContainerDark: {
    backgroundColor: "#1f1f1f",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
    textAlign: "center",
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalBtn: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: "center",
  },
});
