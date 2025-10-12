import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.header}> Panel de Administración</Text>

      <TouchableOpacity style={styles.card} onPress={() => router.push("/admin/add-book")}>
        <Text style={styles.cardText}> Agregar Libros</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => router.push("/admin/manage-books")}>
        <Text style={styles.cardText}> Gestionar Libros</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => router.push("/admin/user-list")}>
        <Text style={styles.cardText}> Gestionar Usuarios</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => router.push("/admin/loan-list")}>
        <Text style={styles.cardText}> Gestionar Préstamos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => router.push("/admin/explore-manage")}>
        <Text style={styles.cardText}> Gestionar Recomendaciones</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => router.push("/admin/profile")}>
        <Text style={styles.cardText}> Configuración </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#ffd900" },
  header: { fontSize: 24, fontWeight: "700", marginBottom: 20, textAlign: "center", color: "#06148fff" },
  card: { backgroundColor: "#fff", padding: 20, borderRadius: 12, marginBottom: 16, elevation: 3 },
  cardText: { fontSize: 18, fontWeight: "600", color: "#1E3A8A" }
});