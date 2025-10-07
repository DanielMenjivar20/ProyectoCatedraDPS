// app/tabs/explore.js
import { useContext } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { ThemeContext } from "./ThemeContext"; // Asegúrate de la ruta correcta

export default function Explore() {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const suggestions = [
    { id: 1, title: "📖 Lectura recomendada: El Principito" },
    { id: 2, title: "🌍 Autor destacado: Gabriel García Márquez" },
    { id: 3, title: "🔥 Top de la semana: 1984 - George Orwell" },
  ];

  return (
    <View style={[styles.container, isDark ? styles.containerDark : styles.containerLight]}>
      <Text style={[styles.header, isDark ? styles.headerDark : styles.headerLight]}>
        Propuestas de Lectura
      </Text>
      <FlatList
        data={suggestions}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={[styles.card, isDark ? styles.cardDark : styles.cardLight]}>
            <Text style={[styles.text, isDark ? styles.textDark : styles.textLight]}>
              {item.title}
            </Text>
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
  card: { padding: 14, borderRadius: 8, marginBottom: 10, elevation: 2 },
  cardLight: { backgroundColor: "#fff" },
  cardDark: { backgroundColor: "#1a1a1a" },

  // Texts
  text: { fontSize: 16 },
  textLight: { color: "#111827" },
  textDark: { color: "#e6e6e6" },
});
