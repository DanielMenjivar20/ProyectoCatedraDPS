import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const books = [
  { id: 1, title: "Cien años de soledad", author: "Gabriel García Márquez", available: 3 },
  { id: 2, title: "Clean Code", author: "Robert C. Martin", available: 5 },
];

export default function Books() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Catálogo de Libros</Text>
      <FlatList
        data={books}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={require("../../assets/book-placeholder.png")} style={styles.img} />
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.author}>{item.author}</Text>
              <Text>Disponibles: {item.available}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => router.push({
                  pathname: "/book-detail",
                  params: item
                })}
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
  container: { flex: 1, backgroundColor: "#ffd900", padding: 20 },
  header: { fontSize: 22, fontWeight: "700", marginBottom: 20, color: "#1E3A8A" },
  card: { flexDirection: "row", backgroundColor: "#fff", borderRadius: 10, marginBottom: 12, padding: 12, elevation: 2 },
  img: { width: 60, height: 80, borderRadius: 4, marginRight: 12 },
  title: { fontSize: 16, fontWeight: "600" },
  author: { fontSize: 14, marginBottom: 6, color: "#374151" },
  button: { backgroundColor: "#1E3A8A", padding: 8, borderRadius: 6, marginTop: 6, alignItems: "center" },
  btnText: { color: "#fff" }
});