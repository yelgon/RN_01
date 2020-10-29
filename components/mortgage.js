import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
} from "react-native";
import Slider from "@react-native-community/slider";

export default function MortgageScreen() {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [amortizationPeriod, setAmortizationPeriod] = useState(25);
  const [frequency, setFrequency] = useState("Monthly");

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        <Text style={styles.header}>Mortgage Calculator</Text>
        <View style={styles.wrapper}>
          <View style={{ flex: 1 }}>
            <Text style={styles.text}>Loan Amount</Text>
          </View>
          <View style={styles.inputBox}>
            <TextInput
              keyboardType="decimal-pad"
              value={loanAmount}
              placeholder="Amount"
              style={styles.textInput}
              onChangeText={(num) => {
                setLoanAmount(parseFloat(num));
              }}
            />
          </View>
        </View>
        <View style={styles.wrapper}>
          <View style={{ flex: 1 }}>
            <Text style={styles.text}>Interest Rate</Text>
          </View>
          <View style={styles.inputBox}>
            <TextInput
              keyboardType="decimal-pad"
              value={interestRate}
              placeholder="%/year"
              style={styles.textInput}
              onChangeText={(num) => {
                setInterestRate(parseFloat(num));
              }}
            />
          </View>
        </View>
        <View>
          <View>
            <Text style={styles.text}>Amortization Period</Text>
          </View>
          <View>
            <Slider
              style={{ height: 30, width: 300, marginLeft: 20 }}
              value={amortizationPeriod}
              minimumValue={5}
              maximumValue={30}
              onValueChange={(value) => setAmortizationPeriod(value)}
              step={5}
            />
            <Text style={{ fontSize: 15, fontWeight: "bold", marginLeft: 300 }}>
              {amortizationPeriod} years
            </Text>
          </View>
        </View>
        <View>
          <View>
            <Text style={styles.text}>Frequency</Text>
          </View>
          <View>
            <Slider
              style={{ height: 30, width: 300, marginLeft: 20 }}
              value={3}
              minimumValue={1}
              maximumValue={3}
              onValueChange={(value) => {
                if (value === 1) {
                  return setFrequency("Weekly");
                } else if (value === 2) {
                  return setFrequency("Biweekly");
                } else if (value === 3) {
                  return setFrequency("Monthly");
                }
              }}
              step={1}
            />
            <Text style={{ fontSize: 15, fontWeight: "bold", marginLeft: 300 }}>
              {frequency}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", margin: 20, width: "100%" }}>
          <Button title="Calculate" color="#fc4747"></Button>
          <Button
            title="Reset"
            onPress={() => {
              setLoanAmount("");
              setInterestRate("");
            }}
          ></Button>
        </View>
        <Text>{loanAmount}</Text>
        <Text>{interestRate}</Text>
        <Text>{frequency}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 50,
    padding: 30,
    marginBottom: 30,
    backgroundColor: "#fff",
    fontSize: 30,
    textAlign: "center",
  },
  container: {},
  wrapper: {
    flexDirection: "row",
    marginBottom: 5,
  },
  textInput: {
    fontSize: 20,
    textAlign: "right",
    padding: 10,
  },
  inputBox: {
    borderBottomWidth: 2,
    width: 100,
    flex: 1,
    marginLeft: 20,
  },
  text: {
    // borderWidth: 1,
    fontWeight: "bold",
    fontSize: 17,
    padding: 10,
    margin: 5,
  },
});
