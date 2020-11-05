import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";

export default function AnnuityResult(props) {
  const [term, setTerm] = useState("");
  useEffect(() => {
    setTerm(props.money.paymentTerm);
  }, [props.money.result]);
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>{term} income is</Text>
      <Text style={styles.moneyText}> $ {props.money.result} </Text>
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
