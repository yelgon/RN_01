import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";

export default function MortgageRusult(props) {
  const [term, setTerm] = useState("");
  useEffect(() => {
    setTerm(props.money.paymentTerm);
  }, [props.money.result]);
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>{term} payment is</Text>
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
