import { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import axios from "axios";

export default function EditUser() {
  const router = useRouter();
  const { id } = useLocalSearchParams(); // id viene como string
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://10.0.2.2:3000/api/usuarios/${id}`);
        setUserName(res.data.nombre);
        setUserEmail(res.data.email);
      } catch (error) {
        console.error(error.response?.data || error.message);
        Alert.alert("Error", "No se pudo cargar el usuario");
      }
    };

    fetchUser();
  }, []);

  const handleSave = async () => {
    try {
      await axios.put(`http://10.0.2.2:3000/api/usuarios/${id}`, {
        nombre: userName,
        email: userEmail,
      });
      Alert.alert("Éxito", "Usuario actualizado correctamente", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (error) {
      console.error(error.response?.data || error.message);
      Alert.alert("Error", "No se pudo actualizar el usuario");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Editar Usuario</Text>

      <TextInput
        style={styles.input}
        value={userName}
        onChangeText={setUserName}
        placeholder="Nombre"
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        value={userEmail}
        onChangeText={setUserEmail}
        placeholder="Correo"
        placeholderTextColor="#888"
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.btnText}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#ffd900" },
  backButton: { marginBottom: 20 },
  backArrow: { fontSize: 40, color: "#1E3A8A", fontWeight: "bold" },
  header: { fontSize: 22, fontWeight: "700", marginBottom: 20 },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
    color: "#000",
  },
  button: { backgroundColor: "#1E3A8A", padding: 14, borderRadius: 8, alignItems: "center" },
  btnText: { color: "#fff", fontWeight: "700" },
});

