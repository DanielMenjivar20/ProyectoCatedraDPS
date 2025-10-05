import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    // ⚡ Simulación sin backend
    if (email === "admin@edu.com") {
      router.replace("/admin");
    } else {
      router.replace("/tabs");
    }
  }

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />
      <Text style={styles.title}>Biblioteca Virtual</Text>

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
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/register")}>
        <Text style={styles.link}>¿No tienes cuenta? Regístrate</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#ffd900", padding: 20 },
  logo: { width: 100, height: 100, marginBottom: 20 },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 20, color: "#1E3A8A" },
  input: { width: "100%", backgroundColor: "#fff", borderRadius: 8, padding: 12, marginBottom: 12, borderWidth: 1, borderColor: "#d1d5db" },
  button: { width: "100%", backgroundColor: "#1E3A8A", padding: 14, borderRadius: 8, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  link: { marginTop: 16, color: "#1E3A8A", fontWeight: "600" }
});