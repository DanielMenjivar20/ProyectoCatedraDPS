import { useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from '@expo/vector-icons'; // npm install @expo/vector-icons

export default function LoanList() {
  const router = useRouter();
  const [loans] = useState([
    { id: 1, user: "Juan Pérez", book: "Cien años de soledad", due: "2025-10-15", loanDate: "2025-10-01" },
    { id: 2, user: "Ana López", book: "Clean Code", due: "2025-10-20", loanDate: "2025-10-05" }
  ]);

  return (
    <View style={styles.container}>
      {/* Header con flecha de volver */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
          <Ionicons name="arrow-back" size={28} color="#0503a0ff" />
        </TouchableOpacity>
        <Text style={styles.header}>Préstamos</Text>
      </View>

      <FlatList
        data={loans}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.text}>Usuario: {item.user}</Text>
            <Text style={styles.text}>Libro: {item.book}</Text>
            <Text style={styles.text}>Devolver: {item.due}</Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                router.push(`/admin/LoanDetails/${encodeURIComponent(JSON.stringify(item))}`)
              }
            >
              <Text style={styles.buttonText}>Detalles</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffd900", padding: 20 },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 5, // Añadido para que haya espacio uniforme a ambos lados
  },
  iconButton: {
    marginRight: 10,
  },
  header: { fontSize: 22, fontWeight: "700", color: "#0503a0ff" },
  card: { backgroundColor: "#fff", borderRadius: 8, padding: 12, marginBottom: 10, elevation: 2 },
  text: { fontSize: 15, marginBottom: 4 },
  button: { padding: 8, backgroundColor: "#000", borderRadius: 5, marginTop: 8, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold" }
});

