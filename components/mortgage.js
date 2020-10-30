import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
  ScrollView,
} from "react-native";
import Slider from "@react-native-community/slider";

export default function MortgageScreen() {
  const [loanAmount, setLoanAmount] = useState("");
  const [initialValue, setInitialValue] = useState(0);
  const [interestRate, setInterestRate] = useState("");
  const [amortizationPeriod, setAmortizationPeriod] = useState(25);
  const [frequencyNum, setFrequencyNum] = useState(3);
  const [frequencyLetter, setFrequencyLetter] = useState("Monthly");
  const [result, setResult] = useState(1500);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  const calculatorHandler = () => {
    let interest, period, interestPow;
    setInitialValue(parseInt(loanAmount));
    if (frequencyNum == 1) {
      period = amortizationPeriod * 52;
      interest = parseFloat(interestRate) / 52 / 100;
      interestPow = Math.pow(interest + 1, period);
      setResult(
        parseInt(
          Math.floor(initialValue * interestPow * interest) / (interestPow - 1)
        )
      );
      setTotalPayment(result * period);
      setTotalInterest(totalPayment - initialValue);
    }
  };
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View>
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
                setLoanAmount(num);
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
              placeholder="% / year"
              style={styles.textInput}
              onChangeText={(num) => {
                setInterestRate(num);
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
              style={{
                height: 30,
                width: 300,
                marginLeft: 20,
              }}
              value={amortizationPeriod}
              minimumValue={5}
              maximumValue={30}
              onValueChange={(value) => setAmortizationPeriod(value)}
              step={5}
            />
            <Text style={styles.sliderText}>{amortizationPeriod} years</Text>
          </View>
        </View>
        <View>
          <View>
            <Text style={styles.text}>Frequency</Text>
          </View>
          <View>
            <Slider
              style={{ height: 30, width: 300, marginLeft: 20 }}
              value={frequencyNum}
              minimumValue={1}
              maximumValue={3}
              onValueChange={(value) => {
                if (value === 1) {
                  setFrequencyNum(value);
                  setFrequencyLetter("Weekly");
                  return;
                } else if (value === 2) {
                  setFrequencyNum(value);
                  setFrequencyLetter("Biweekly");
                  return;
                } else if (value === 3) {
                  setFrequencyNum(value);
                  setFrequencyLetter("Monthly");
                  return;
                }
              }}
              step={1}
            />
            <Text style={styles.sliderText}>{frequencyLetter}</Text>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "space-evenly",
            flexDirection: "row",
            marginTop: 10,
          }}
        >
          <Button
            title="Calculate"
            color="#fc4747"
            onPress={calculatorHandler}
          ></Button>
          <Button
            title="Reset"
            onPress={() => {
              setLoanAmount("");
              setInterestRate("");
              setAmortizationPeriod(25);
              setFrequencyNum(3);
              setFrequencyLetter("Monthly");
            }}
          ></Button>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            margin: 10,
          }}
        >
          <Text style={{ flex: 1, fontStyle: "italic" }}>
            {frequencyLetter} payment is
          </Text>
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
              backgroundColor: "#eaecee",
              flex: 1.2,
              textAlign: "center",
              padding: 10,
            }}
          >
            {result} $
          </Text>
        </View>
        <View style={{ padding: 10 }}>
          <Text style={styles.resultText}>
            The total amount you paid is {totalPayment}
          </Text>
          <Text style={styles.resultText}>
            The total interest is {totalPayment} - {initialValue} ={" "}
            {totalInterest}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    marginBottom: 5,
    backgroundColor: "#fff",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  wrapper: {
    flexDirection: "row",
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
    marginLeft: 10,
    marginRight: 10,
  },
  text: {
    fontWeight: "bold",
    fontSize: 17,
    padding: 10,
    // margin: 5,
  },
  sliderText: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "right",
    paddingRight: 15,
    width: "100%",
  },
  resultText: {
    fontStyle: "italic",
    fontSize: 15,
    padding: 5,
  },
});
