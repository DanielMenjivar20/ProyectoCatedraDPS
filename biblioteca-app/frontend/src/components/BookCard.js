import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function BookCard({ book }) {
  const router = useRouter();

  return (
    <View style={styles.card}>
      <Image source={require("../../assets/book-placeholder.png")} style={styles.img} />
      <View style={styles.info}>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>{book.author}</Text>
        <Text style={styles.meta}>Disponibles: {book.available}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push({ pathname: "/tabs/book-detail", params: book })}
        >
          <Text style={styles.btnText}>Ver Detalle</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    elevation: 2
  },
  img: {
    width: 60,
    height: 80,
    borderRadius: 6,
    marginRight: 12
  },
  info: { flex: 1 },
  title: { fontSize: 16, fontWeight: "700", marginBottom: 2 },
  author: { fontSize: 14, color: "#6B7280" },
  meta: { fontSize: 13, color: "#4B5563", marginTop: 6 },
  button: {
    marginTop: 8,
    backgroundColor: "#1E3A8A",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: "flex-start"
  },
  btnText: { color: "#fff", fontWeight: "600" }
});