// app/login.js
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from "react-native";
import axios from "axios";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    if (!email || !password) {
      Alert.alert("Error", "Email y contraseña son obligatorios");
      return;
    }

    try {
      // ⚡ Cambiado a 10.0.2.2 para que el emulador pueda acceder al backend
      const res = await axios.post("http://10.0.2.2:3000/api/usuarios/login", {
        email,
        password
      });

      const usuario = res.data.usuario;

      // ⚡ Lógica para redirigir admin o usuario normal
      if (usuario.email === "admin@edu.com") {
        router.replace("/admin");
      } else {
        router.replace("/tabs"); // ruta principal para usuarios normales
      }

      Alert.alert("Éxito", `Bienvenido ${usuario.nombre}`);
    } catch (error) {
      console.log(error.response?.data || error.message);
      Alert.alert("Error", error.response?.data?.message || "No se pudo iniciar sesión");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Iniciar Sesión</Text>

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

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.btnText}>Ingresar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace("/register")}>
        <Text style={styles.link}>¿No tienes cuenta? Regístrate</Text>
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

