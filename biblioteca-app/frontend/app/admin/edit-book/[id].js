import { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import { Ionicons } from '@expo/vector-icons'; // npm install @expo/vector-icons

export default function EditBook() {
  const router = useRouter();
  const id = 1; // 🔹 Cambia este valor por el id de un libro que sí exista

  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagenUrl, setImagenUrl] = useState("");

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://10.0.2.2:3000/api/libros/${id}`);
        const book = res.data;
        setTitulo(book.titulo);
        setAutor(book.autor);
        setCategoria(book.categoria);
        setImagenUrl(book.imagenUrl || "");
      } catch (error) {
        console.log(error.response?.data || error.message);
        Alert.alert("Error", "No se pudo cargar el libro");
      }
    };
    fetchBook();
  }, []);

  const handleSave = async () => {
    if (!titulo || !autor || !categoria || !imagenUrl) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }

    try {
      await axios.put(`http://10.0.2.2:3000/api/libros/${id}`, {
        titulo,
        autor,
        categoria,
        imagenUrl,
      });

      Alert.alert("Éxito", "Libro actualizado correctamente", [
        { text: "OK", onPress: () => router.push("/admin/manage-books") },
      ]);
    } catch (error) {
      console.log(error.response?.data || error.message);
      Alert.alert("Error", "No se pudo actualizar el libro");
    }
  };

  return (
    <View style={styles.container}>
      {/* Header con flecha de volver */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
          <Ionicons name="arrow-back" size={28} color="#1E3A8A" />
        </TouchableOpacity>
        <Text style={styles.header}>Editar Libro</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Título"
        value={titulo}
        onChangeText={setTitulo}
      />
      <TextInput
        style={styles.input}
        placeholder="Autor"
        value={autor}
        onChangeText={setAutor}
      />
      <TextInput
        style={styles.input}
        placeholder="Categoría"
        value={categoria}
        onChangeText={setCategoria}
      />
      <TextInput
        style={styles.input}
        placeholder="URL de la imagen"
        value={imagenUrl}
        onChangeText={setImagenUrl}
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.btnText}>Guardar Cambios</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#ffd900" },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconButton: {
    marginRight: 10,
  },
  header: { fontSize: 22, fontWeight: "700", color: "#1E3A8A" },
  input: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#d1d5db", borderRadius: 8, padding: 12, marginBottom: 12 },
  button: { backgroundColor: "#1E3A8A", padding: 14, borderRadius: 8, alignItems: "center" },
  btnText: { color: "#fff", fontWeight: "700" }
});

