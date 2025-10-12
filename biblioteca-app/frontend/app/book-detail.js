import { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import axios from "axios";

export default function BookDetail() {
  const { id } = useLocalSearchParams(); // id del libro que llega desde la lista
  const router = useRouter();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  const tieneVencido = true; // Simulación: cambiar según tu backend

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://10.0.2.2:3000/api/libros/${id}`);
        setBook(res.data);
      } catch (err) {
        console.error(err);
        alert("No se pudo cargar el libro");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleLoan = () => {
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
          message: `¿Quieres solicitar "${book.titulo}"?`,
          action: "Préstamo registrado"
        }
      });
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#1E3A8A" />
      </View>
    );
  }

  if (!book) {
    return (
      <View style={styles.container}>
        <Text>No se encontró el libro.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Detalles de Libro</Text>

      <Image
        source={book.imagenUrl ? { uri: book.imagenUrl } : require("../assets/book-placeholder.png")}
        style={styles.img}
      />

      <Text style={styles.title}>{book.titulo}</Text>
      <Text style={styles.author}>Autor: {book.autor}</Text>
      <Text style={styles.meta}>Disponibles: {book.disponible ? "Sí" : "No"}</Text>

      <TouchableOpacity style={styles.button} onPress={handleLoan}>
        <Text style={styles.btnText}>Solicitar Préstamo</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.link}>Volver al Catálogo</Text>
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
