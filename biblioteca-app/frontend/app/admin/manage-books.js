import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert, Image } from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import { Ionicons } from '@expo/vector-icons'; // Asegúrate de instalar: npm install @expo/vector-icons

export default function ManageBooks() {
  const router = useRouter();
  const [books, setBooks] = useState([]);

  // Traer los libros desde la API
  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://10.0.2.2:3000/api/libros");
      setBooks(res.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
      Alert.alert("Error", "No se pudieron cargar los libros");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Eliminar libro
  const handleDelete = async (id) => {
    Alert.alert("Confirmar", "¿Seguro que quieres eliminar este libro?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: async () => {
          try {
            await axios.delete(`http://10.0.2.2:3000/api/libros/${id}`);
            Alert.alert("Éxito", "Libro eliminado");
            fetchBooks(); // Refrescar lista
          } catch (error) {
            console.log(error.response?.data || error.message);
            Alert.alert("Error", "No se pudo eliminar el libro");
          }
        },
      },
    ]);
  };

  // Render de cada libro
  const renderItem = ({ item }) => (
    <View style={styles.bookCard}>
      {/* Imagen del libro */}
      {item.imagenUrl ? (
        <Image
          source={{ uri: item.imagenUrl }}
          style={styles.bookImage}
          resizeMode="cover"
        />
      ) : (
        <View style={[styles.bookImage, styles.placeholder]}>
          <Text style={{ color: "#999" }}>Sin imagen</Text>
        </View>
      )}

      {/* Datos */}
      <View style={styles.info}>
        <Text style={styles.title}>{item.titulo}</Text>
        <Text style={styles.author}>Autor: {item.autor}</Text>
        <Text style={styles.category}>Categoría: {item.categoria}</Text>

        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => router.push(`/admin/edit-book/${item.id}`)}
          >
            <Text style={styles.btnText}>Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDelete(item.id)}
          >
            <Text style={styles.btnText}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Flecha para volver */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#06148fff" />
        <Text style={styles.backText}></Text>
      </TouchableOpacity>

      <Text style={styles.header}>Gestión de Libros</Text>

      {books.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          No hay libros registrados
        </Text>
      ) : (
        <FlatList
          data={books}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#ffd900" },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  backText: {
    fontSize: 16,
    color: "#06148fff",
    marginLeft: 6,
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
    color: "#06148fff",
  },
  bookCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 3,
  },
  bookImage: {
    width: 90,
    height: 120,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: "#eee",
  },
  placeholder: {
    justifyContent: "center",
    alignItems: "center",
  },
  info: { flex: 1 },
  title: { fontSize: 18, fontWeight: "700", color: "#1E3A8A", marginBottom: 4 },
  author: { fontSize: 14, marginBottom: 2 },
  category: { fontSize: 14, marginBottom: 8 },
  buttons: { flexDirection: "row", justifyContent: "space-between" },
  editButton: {
    backgroundColor: "#1E3A8A",
    padding: 8,
    borderRadius: 8,
    flex: 0.48,
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "#DC2626",
    padding: 8,
    borderRadius: 8,
    flex: 0.48,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontWeight: "600" },
});
