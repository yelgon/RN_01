import * as React from "react";
import { Text, View, Image } from "react-native";

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
        style={{ height: 100, width: 100 }}
      />

      <Text
        style={{
          marginTop: 50,
          fontSize: 15,
          fontWeight: "bold",
        }}
      >
        Calculated by mathematical theory
      </Text>
      <Text>Designed by YANGOH KIM</Text>
    </View>
  );
}
