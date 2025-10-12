import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from '@expo/vector-icons'; // npm install @expo/vector-icons

export default function ExploreManage() {
  const router = useRouter();
  const [recommendations, setRecommendations] = useState([
    { id: 1, title: "📖 El Principito" },
    { id: 2, title: "🔥 1984 - George Orwell" },
  ]);
  const [newRec, setNewRec] = useState("");

  function addRecommendation() {
    if (!newRec) return;
    setRecommendations([...recommendations, { id: Date.now(), title: newRec }]);
    setNewRec("");
  }

  function deleteRecommendation(id) {
    setRecommendations(recommendations.filter((r) => r.id !== id));
  }

  return (
    <View style={styles.container}>
      {/* Header con flecha de volver */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
          <Ionicons name="arrow-back" size={28} color="#1E3A8A" />
        </TouchableOpacity>
        <Text style={styles.header}>Gestionar Recomendaciones</Text>
      </View>

      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="Nueva recomendación..."
          value={newRec}
          onChangeText={setNewRec}
        />
        <TouchableOpacity style={styles.addBtn} onPress={addRecommendation}>
          <Text style={styles.btnText}>Agregar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={recommendations}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.item}>{item.title}</Text>
            <TouchableOpacity style={styles.deleteBtn} onPress={() => deleteRecommendation(item.id)}>
              <Text style={styles.btnText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#ffffffff" },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconButton: {
    marginRight: 10,
  },
  header: { fontSize: 22, fontWeight: "700", color: "#1E3A8A" },
  row: { flexDirection: "row", marginBottom: 12 },
  input: { flex: 1, borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10 },
  addBtn: { backgroundColor: "#3B82F6", marginLeft: 8, borderRadius: 8, justifyContent: "center", paddingHorizontal: 12 },
  card: { backgroundColor: "#fff", padding: 12, borderRadius: 10, flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  item: { fontSize: 16 },
  deleteBtn: { backgroundColor: "#EF4444", borderRadius: 6, paddingHorizontal: 10, paddingVertical: 6 },
  btnText: { color: "#fff" }
});
