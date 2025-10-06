import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";

export default function UserForm() {
  const { id, name, email } = useLocalSearchParams();
  const [userName, setUserName] = useState(name || "");
  const [userEmail, setUserEmail] = useState(email || "");
  const router = useRouter();

  function handleSave() {
    alert(`Usuario actualizado: ${userName} - ${userEmail}`);
    router.back();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}> Editar Usuario</Text>
      <TextInput style={styles.input} value={userName} onChangeText={setUserName} />
      <TextInput style={styles.input} value={userEmail} onChangeText={setUserEmail} />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.btnText}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#ffd900" },
  header: { fontSize: 22, fontWeight: "700", marginBottom: 20 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 8, marginBottom: 12 },
  button: { backgroundColor: "#1E3A8A", padding: 14, borderRadius: 8, alignItems: "center" },
  btnText: { color: "#fff", fontWeight: "700" }
});