import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";

export default function AnnuityResult(props) {
  const [term, setTerm] = useState("");
  useEffect(() => {
    setTerm(props.money.paymentTerm);
  }, [props.money.result]);
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>Your {term} income is</Text>
      <Text style={styles.moneyText}> $ {props.money.result} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    margin: 30,
  },
  text: { fontSize: 15, marginTop: 10, fontWeight: "bold" },
  moneyText: {
    padding: 5,
    fontSize: 25,
    borderBottomWidth: 1,
    fontWeight: "bold",
    textAlign: "right",
  },
});
