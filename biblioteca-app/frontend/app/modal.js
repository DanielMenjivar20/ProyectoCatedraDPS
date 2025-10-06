import { useRouter, useLocalSearchParams } from "expo-router";
import { Button, Text, View } from "react-native";

export default function ModalScreen() {
  const router = useRouter();
  const { title, message, action, redirect } = useLocalSearchParams();

  function handleConfirm() {
    if (redirect) {
      router.replace(redirect); // redirige (ej. login)
    } else {
      router.back(); // vuelve a la pantalla anterior
    }
    if (action) {
      alert(action); // simula la acción (ej. "Usuario eliminado")
    }
  }

  return (
    <View style={{ padding: 20, flex: 1, justifyContent: "center" }}>
      <Text style={{ fontSize: 20, marginBottom: 10, fontWeight: "bold" }}>
        {title || "Confirmación"}
      </Text>
      <Text style={{ fontSize: 16, marginBottom: 20 }}>
        {message || "¿Seguro que deseas continuar?"}
      </Text>

      <Button title="Confirmar" onPress={handleConfirm} />
      <View style={{ height: 10 }} />
      <Button title="Cancelar" color="gray" onPress={() => router.back()} />
    </View>
  );
}