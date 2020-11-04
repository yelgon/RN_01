import * as React from "react";
import { Text, View, Image, StyleSheet } from "react-native";

export default function InfoScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={require("../assets/logo.png")}
        style={{ height: 150, width: 150 }}
      />

      <Text
        style={{
          marginTop: 50,
          fontSize: 15,
        }}
      >
        Calculated by mathematical theory
      </Text>
      <View style={{ marginTop: 100 }}>
        <Text style={styles.text}>Designed by</Text>
        <Text style={styles.text}>YANGOH KIM</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  text: { padding: 5, fontWeight: "bold" },
});
