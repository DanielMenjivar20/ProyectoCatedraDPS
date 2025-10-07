import { useContext } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { ThemeContext } from "./ThemeContext";

export default function Explore() {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const recommendations = [
    { id: 1, title: "📖 El Principito" },
    { id: 2, title: "🔥 1984 - George Orwell" },
  ];

  return (
    <View style={[styles.container, isDark ? styles.containerDark : styles.containerLight]}>
      <Text style={[styles.header, isDark ? styles.headerDark : styles.headerLight]}>
        Propuestas de Lectura
      </Text>
      <FlatList
        data={recommendations}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={[styles.card, isDark ? styles.cardDark : styles.cardLight]}>
            <Text style={[styles.item, isDark ? styles.itemDark : styles.itemLight]}>
              {item.title}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  containerLight: { backgroundColor: "#ffd900" },
  containerDark: { backgroundColor: "#0b1220" },
  header: { fontSize: 22, fontWeight: "700", marginBottom: 16 },
  headerLight: { color: "#1E3A8A" },
  headerDark: { color: "#fff" },
  card: { padding: 12, borderRadius: 8, marginBottom: 12, elevation: 2 },
  cardLight: { backgroundColor: "#fff" },
  cardDark: { backgroundColor: "#1a1a1a" },
  item: { fontSize: 16 },
  itemLight: { color: "#111827" },
  itemDark: { color: "#e6e6e6" },
});
