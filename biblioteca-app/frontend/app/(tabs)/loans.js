// app/tabs/loans.js
import { useState, useContext } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import dayjs from "dayjs";
import { ThemeContext } from "./ThemeContext"; // Asegúrate de la ruta correcta

export default function Loans() {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const [loans] = useState([
    { id: 1, title: "Cien años de soledad", start: "2025-09-20", due: "2025-10-05" },
    { id: 2, title: "Clean Code", start: "2025-09-15", due: "2025-09-25" }
  ]);

  function getStatus(dueDate) {
    return dayjs().isAfter(dayjs(dueDate)) ? "❌ Vencido" : "✅ Vigente";
  }

  return (
    <View style={[styles.container, isDark ? styles.containerDark : styles.containerLight]}>
      <Text style={[styles.header, isDark ? styles.headerDark : styles.headerLight]}>Mi Historial de Préstamos</Text>
      <FlatList
        data={loans}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={[styles.card, isDark ? styles.cardDark : styles.cardLight]}>
            <Text style={[styles.title, isDark ? styles.titleDark : styles.titleLight]}>{item.title}</Text>
            <Text style={isDark ? styles.textDark : styles.textLight}>Fecha de préstamo: {item.start}</Text>
            <Text style={isDark ? styles.textDark : styles.textLight}>Fecha de devolución: {item.due}</Text>
            <Text style={isDark ? styles.textDark : styles.textLight}>Estado: {getStatus(item.due)}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  // Containers
  container: { flex: 1, padding: 16 },
  containerLight: { backgroundColor: "#ffd900" },
  containerDark: { backgroundColor: "#0b1220" },

  // Headers
  header: { fontSize: 22, fontWeight: "700", marginBottom: 16 },
  headerLight: { color: "#1E3A8A" },
  headerDark: { color: "#fff" },

  // Cards
  card: { padding: 12, borderRadius: 8, marginBottom: 12, elevation: 2 },
  cardLight: { backgroundColor: "#fff" },
  cardDark: { backgroundColor: "#1a1a1a" },

  // Texts
  title: { fontSize: 16, fontWeight: "600", marginBottom: 6 },
  titleLight: { color: "#111827" },
  titleDark: { color: "#fff" },

  textLight: { color: "#111827" },
  textDark: { color: "#e6e6e6" },
});
