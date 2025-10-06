import { View, Text, FlatList, StyleSheet } from "react-native";

export default function Explore() {
  const suggestions = [
    { id: 1, title: "📖 Lectura recomendada: El Principito" },
    { id: 2, title: "🌍 Autor destacado: Gabriel García Márquez" },
    { id: 3, title: "🔥 Top de la semana: 1984 - George Orwell" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}> Propuestas de Lectura</Text>
      <FlatList
        data={suggestions}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.text}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#ffd900" },
  header: { fontSize: 22, fontWeight: "700", marginBottom: 16, color: "#1E3A8A" },
  card: { backgroundColor: "#ffffffff", padding: 14, borderRadius: 8, marginBottom: 10, elevation: 2 },
  text: { fontSize: 16 }
});