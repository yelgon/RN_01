import * as React from "react";
import { Text, View, StyleSheet } from "react-native";

export default function MortgageRusult(props) {
  console.log(props.money);
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>{props.money.paymentTerm} payment is</Text>
      <Text style={styles.moneyText}> $ {props.money.result} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  text: { fontSize: 15, marginLeft: 10, fontWeight: "bold" },
  moneyText: {
    marginRight: 20,
    fontSize: 25,
    fontWeight: "bold",
  },
});
