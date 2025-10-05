import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function BookDetail() {
  const { title, author, available } = useLocalSearchParams();
  const router = useRouter();

  const tieneVencido = true; // Simulación: cambiar cuando se conecte elbackend)

  function handleLoan() {
    if (tieneVencido) {
      router.push({
        pathname: "/modal",
        params: {
          title: "Préstamo bloqueado",
          message: "No puedes realizar otro préstamo mientras tengas libros vencidos."
        }
      });
    } else {
      router.push({
        pathname: "/modal",
        params: {
          title: "Solicitar Préstamo",
          message: `¿Quieres solicitar "${title}"?`,
          action: "Préstamo registrado"
        }
      });
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}> Detalles de Libro</Text>
      <Image source={require("../assets/book-placeholder.png")} style={styles.img} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.author}>Autor: {author}</Text>
      <Text style={styles.meta}>Disponibles: {available}</Text>

      <TouchableOpacity style={styles.button} onPress={handleLoan}>
        <Text style={styles.btnText}>Solicitar Préstamo</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.link}> Volver al Catálogo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F3F4F6", alignItems: "center" },
  header: { fontSize: 22, fontWeight: "700", marginBottom: 20, color: "#1E3A8A" },
  img: { width: 120, height: 160, borderRadius: 8, marginBottom: 20 },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 8 },
  author: { fontSize: 16, marginBottom: 6 },
  meta: { fontSize: 14, marginBottom: 12, color: "#6B7280" },
  button: { backgroundColor: "#1E3A8A", padding: 12, borderRadius: 8, marginBottom: 20 },
  btnText: { color: "#fff", fontWeight: "700" },
  link: { color: "#1E3A8A", fontWeight: "600" }
});