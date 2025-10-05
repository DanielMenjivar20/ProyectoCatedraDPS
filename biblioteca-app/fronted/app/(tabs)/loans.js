import { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import dayjs from "dayjs";

export default function Loans() {
  const [loans] = useState([
    { id: 1, title: "Cien años de soledad", start: "2025-09-20", due: "2025-10-05" },
    { id: 2, title: "Clean Code", start: "2025-09-15", due: "2025-09-25" }
  ]);

  function getStatus(dueDate) {
    return dayjs().isAfter(dayjs(dueDate)) ? "❌ Vencido" : "✅ Vigente";
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}> Mi Historial de Préstamos</Text>
      <FlatList
        data={loans}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>Fecha de préstamo: {item.start}</Text>
            <Text>Fecha de devolución: {item.due}</Text>
            <Text>Estado: {getStatus(item.due)}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffd900", padding: 16 },
  header: { fontSize: 22, fontWeight: "700", marginBottom: 16, color: "#1E3A8A" },
  card: { backgroundColor: "#fff", padding: 12, borderRadius: 8, marginBottom: 12, elevation: 2 },
  title: { fontSize: 16, fontWeight: "600", marginBottom: 6 }
});