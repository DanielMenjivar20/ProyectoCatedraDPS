// app/tabs/index.js
import { useContext } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { ThemeContext } from "./ThemeContext";

// Datos de ejemplo
const books = [
  {
    id: 1,
    title: "Cien años de soledad",
    author: "Gabriel García Márquez",
    description: "Una novela sobre la soledad y el destino de la familia Buendía en el pueblo de Macondo.",
    available: 3,
  },
  {
    id: 2,
    title: "Clean Code",
    author: "Robert C. Martin",
    description: "Un libro sobre las mejores prácticas de programación y cómo escribir código limpio.",
    available: 5,
  },
];

export default function BooksIndex() {
  const router = useRouter();
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
    <View style={[styles.container, isDark ? styles.containerDark : styles.containerLight]}>
      <Text style={[styles.header, isDark ? styles.headerDark : styles.headerLight]}>
        Catálogo de Libros
      </Text>

      <FlatList
        data={books}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={[styles.card, isDark ? styles.cardDark : styles.cardLight]}>
            <Image source={require("../../assets/book-placeholder.png")} style={styles.img} />
            <View style={{ flex: 1 }}>
              <Text style={[styles.title, isDark ? styles.titleDark : styles.titleLight]}>{item.title}</Text>
              <Text style={[styles.author, isDark ? styles.authorDark : styles.authorLight]}>{item.author}</Text>
              <Text style={[styles.info, isDark ? styles.infoDark : styles.infoLight]}>
                Disponibles: {item.available}
              </Text>

              <TouchableOpacity
                style={[styles.button, isDark ? styles.buttonDark : styles.buttonLight]}
                onPress={() => router.push({ pathname: "/book-detail", params: item })}
              >
                <Text style={styles.btnText}>Ver Detalle</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
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

  card: { flexDirection: "row", borderRadius: 10, marginBottom: 12, padding: 12, elevation: 2 },
  cardLight: { backgroundColor: "#fff" },
  cardDark: { backgroundColor: "#1a1a1a" },

  title: { fontSize: 16, fontWeight: "600" },
  titleLight: { color: "#111827" },
  titleDark: { color: "#fff" },

  author: { fontSize: 14, marginBottom: 6 },
  authorLight: { color: "#374151" },
  authorDark: { color: "#ccc" },

  info: { fontSize: 14 },
  infoLight: { color: "#111827" },
  infoDark: { color: "#e6e6e6" },

  button: { padding: 8, borderRadius: 6, marginTop: 6, alignItems: "center" },
  buttonLight: { backgroundColor: "#1E3A8A" },
  buttonDark: { backgroundColor: "#374151" },

  btnText: { color: "#fff" },
  img: { width: 60, height: 80, borderRadius: 4, marginRight: 12 },
});
