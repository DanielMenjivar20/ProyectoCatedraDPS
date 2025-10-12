// app/register.js
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from "react-native";
import axios from "axios";

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister() {
    if (!name || !email || !password) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }

    try {
      // ⚡ Cambiado a 10.0.2.2 para que el emulador pueda acceder al backend
      const res = await axios.post("http://10.0.2.2:3000/api/usuarios", {
        nombre: name, // ⚡ importante: tu backend espera 'nombre'
        email,
        password
      });

      Alert.alert("Éxito", "Registro exitoso, ahora inicia sesión", [
        { text: "OK", onPress: () => router.replace("/login") }
      ]);
    } catch (error) {
      console.log(error.response?.data || error.message);
      Alert.alert("Error", error.response?.data?.message || "No se pudo registrar");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Crear Cuenta</Text>

      <TextInput
        placeholder="Nombre completo"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Correo electrónico"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Contraseña"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.btnText}>Registrarme</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace("/login")}>
        <Text style={styles.link}>¿Ya tienes cuenta? Inicia sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffd900", justifyContent: "center", padding: 20 },
  header: { fontSize: 26, fontWeight: "700", marginBottom: 20, textAlign: "center", color: "#1E3A8A" },
  input: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#d1d5db", borderRadius: 8, padding: 12, marginBottom: 12 },
  button: { backgroundColor: "#1E3A8A", padding: 14, borderRadius: 8, alignItems: "center" },
  btnText: { color: "#fff", fontWeight: "600", fontSize: 16 },
  link: { marginTop: 16, textAlign: "center", color: "#1E3A8A", fontWeight: "600" }
});
