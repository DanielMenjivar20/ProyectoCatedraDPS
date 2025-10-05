import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default function AddBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  function handleSave() {
    alert(`Libro agregado: ${title} - ${author}`);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}> Agregar Libro</Text>
      <TextInput style={styles.input} placeholder="Título" value={title} onChangeText={setTitle} />
      <TextInput style={styles.input} placeholder="Autor" value={author} onChangeText={setAuthor} />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.btnText}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#ffd900" },
  header: { fontSize: 22, fontWeight: "700", marginBottom: 16, color: "#1E3A8A" },
  input: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#d1d5db", borderRadius: 8, padding: 12, marginBottom: 12 },
  button: { backgroundColor: "#1E3A8A", padding: 14, borderRadius: 8, alignItems: "center" },
  btnText: { color: "#fff", fontWeight: "700" }
});