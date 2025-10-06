import { Stack } from "expo-router";

export default function AdminLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="add-book" />
      <Stack.Screen name="user-list" />
      <Stack.Screen name="loan-list" />

      <Stack.Screen name="profile" />
    </Stack>
  );
}