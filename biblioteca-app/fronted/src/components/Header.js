// src/components/Header.js
import { Image, StyleSheet, Text, View } from "react-native";

export default function Header({ title }) {
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/logo.png")} style={styles.logo} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center", padding: 12, backgroundColor: "#ffffff" },
  logo: { width: 36, height: 36, marginRight: 10, borderRadius: 8 },
  title: { fontSize: 18, fontWeight: "700", color: "#1f2937" },
});