import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from '@expo/vector-icons'; // npm install @expo/vector-icons

export default function UserList() {
  const router = useRouter();
  const users = [
    { id: 1, name: "Juan Pérez", email: "juan@edu.com" },
    { id: 2, name: "Ana López", email: "ana@edu.com" }
  ];

  return (
    <View style={styles.container}>
      {/* Flecha para volver */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#1E3A8A" />
        <Text style={styles.backText}></Text>
      </TouchableOpacity>

      <Text style={styles.header}>Gestionar Usuarios</Text>

      <FlatList
        data={users}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.item}>Nombre: {item.name}</Text>
            <Text style={styles.item}>Correo: {item.email}</Text>
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.editBtn}
                onPress={() => router.push({ pathname: "/admin/user-form", params: item })}
              >
                <Text style={styles.btnText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteBtn} onPress={() => alert("Usuario eliminado")}>
                <Text style={styles.btnText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffd900", padding: 16 },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  backText: {
    fontSize: 16,
    color: "#1E3A8A",
    marginLeft: 6,
  },
  header: { fontSize: 22, fontWeight: "700", marginBottom: 20, color: "#1E3A8A" },
  card: { backgroundColor: "#fff", padding: 14, borderRadius: 10, marginBottom: 12, elevation: 2 },
  item: { fontSize: 15, marginBottom: 6 },
  row: { flexDirection: "row", marginTop: 8, justifyContent: "space-between" },
  editBtn: { backgroundColor: "#3B82F6", padding: 8, borderRadius: 6 },
  deleteBtn: { backgroundColor: "#EF4444", padding: 8, borderRadius: 6 },
  btnText: { color: "#fff", fontWeight: "700" }
});
