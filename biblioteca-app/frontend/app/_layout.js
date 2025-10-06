import { Stack } from "expo-router";
import { AuthProvider } from "../src/context/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ title: "Registro" }} />
        <Stack.Screen name="modal" options={{ presentation: "Alerta" }} />
        <Stack.Screen name="tabs" options={{ headerShown: false }} />
        <Stack.Screen name="admin/index" options={{ title: "Inicio" }} />
        <Stack.Screen name="admin/add-book" options={{ title: "Agregar libro" }} />
        <Stack.Screen name="admin/loan-list" options={{ title: "Préstamos" }} />
        <Stack.Screen name="admin/user-list" options={{ title: "Usuarios" }} />
      </Stack>
    </AuthProvider>
  );
}