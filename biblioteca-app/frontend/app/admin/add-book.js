import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";
import { Ionicons } from '@expo/vector-icons'; // npm install @expo/vector-icons

export default function AddBook() {
  const router = useRouter();
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagenUrl, setImagenUrl] = useState("");

  async function handleSave() {
    if (!titulo || !autor || !categoria || !imagenUrl) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }

    try {
      const res = await axios.post("http://10.0.2.2:3000/api/libros", {
        titulo,
        autor,
        categoria,
        imagenUrl
      });

      Alert.alert("Éxito", `Libro agregado: ${res.data.titulo}`);
      
      // Limpiar campos
      setTitulo(""); 
      setAutor(""); 
      setCategoria(""); 
      setImagenUrl("");
    } catch (error) {
      console.log(error.response?.data || error.message);
      Alert.alert("Error", error.response?.data?.message || "No se pudo agregar el libro");
    }
  }

  return (
    <View style={styles.container}>
      {/* Header con flecha de volver */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
          <Ionicons name="arrow-back" size={28} color="#1E3A8A" />
        </TouchableOpacity>
        <Text style={styles.header}>Agregar Libro</Text>
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
        <Text style={styles.btnText}>Guardar</Text>
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
