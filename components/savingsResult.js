import React from "react";
import { Text, View, StyleSheet } from "react-native";
import NumberFormat from "react-number-format";

export default function SavingsResult(props) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>Total Savings will be</Text>
      <NumberFormat
        value={props.money.result}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
        renderText={(value) => <Text style={styles.moneyText}>{value}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  text: { fontSize: 15, marginTop: 10, fontWeight: "bold" },
  moneyText: {
    padding: 10,
    fontSize: 25,
    fontWeight: "bold",
  },
});
