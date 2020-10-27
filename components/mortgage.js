import * as React from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function MortgageScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Mortgage!</Text>
      <Ionicons name="md-checkmark-circle" size={32} color="black" />
    </View>
  );
}
