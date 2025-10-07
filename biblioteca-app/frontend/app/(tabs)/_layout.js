// app/tabs/_layout.js
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ThemeProvider } from "./ThemeContext"; // Asegúrate de la ruta correcta

export default function TabsLayout() {
  return (
    <ThemeProvider>
      <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: "#1E3A8A" }}>
        <Tabs.Screen
          name="index"
          options={{
            title: "Libros",
            tabBarIcon: ({ color, size }) => <Ionicons name="book-outline" size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="loans"
          options={{
            title: "Préstamos",
            tabBarIcon: ({ color, size }) => <Ionicons name="document-text-outline" size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: "Explore",
            tabBarIcon: ({ color, size }) => <Ionicons name="star-outline" size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Perfil",
            tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />,
          }}
        />
      </Tabs>
    </ThemeProvider>
  );
}
