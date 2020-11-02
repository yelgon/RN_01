import * as React from "react";
import { Text, View, StyleSheet } from "react-native";

export default function Header(props) {
  return (
    <View>
      <Text style={styles.header}>{props.header}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 50,
    paddingBottom: 15,
    marginBottom: 5,
    backgroundColor: "#47ABFC",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
