import { useState, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import axios from "axios";

export default function UserList() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Función para cargar usuarios desde la API
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://10.0.2.2:3000/api/usuarios");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "No se pudieron cargar los usuarios");
    } finally {
      setLoading(false);
    }
  };

  // Se ejecuta cuando la pantalla gana foco (vuelves desde otra pantalla)
  useFocusEffect(
    useCallback(() => {
      fetchUsers();
    }, [])
  );

  // Función para eliminar un usuario
  const handleDelete = async (id) => {
    Alert.alert(
      "Eliminar usuario",
      "¿Estás seguro que deseas eliminar este usuario?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              await axios.delete(`http://10.0.2.2:3000/api/usuarios/${id}`);
              Alert.alert("Usuario eliminado");
              fetchUsers(); // refresca la lista después de eliminar
            } catch (err) {
              console.error(err);
              Alert.alert("Error", "No se pudo eliminar el usuario");
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#1E3A8A" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#1E3A8A" />
      </TouchableOpacity>

      <Text style={styles.header}>Gestionar Usuarios</Text>

      <FlatList
        data={users}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.item}>Nombre: {item.nombre}</Text>
            <Text style={styles.item}>Correo: {item.email}</Text>
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.editBtn}
                onPress={() => router.push(`/admin/edit-user/${item.id}`)}
              >
                <Text style={styles.btnText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteBtn} onPress={() => handleDelete(item.id)}>
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
  backButton: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  header: { fontSize: 22, fontWeight: "700", marginBottom: 20, color: "#1E3A8A" },
  card: { backgroundColor: "#fff", padding: 14, borderRadius: 10, marginBottom: 12, elevation: 2 },
  item: { fontSize: 15, marginBottom: 6 },
  row: { flexDirection: "row", marginTop: 8, justifyContent: "space-between" },
  editBtn: { backgroundColor: "#3B82F6", padding: 8, borderRadius: 6 },
  deleteBtn: { backgroundColor: "#EF4444", padding: 8, borderRadius: 6 },
  btnText: { color: "#fff", fontWeight: "700" }
});



