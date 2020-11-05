import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  TextInput,
  Button,
} from "react-native";
import Slider from "@react-native-community/slider";
import Header from "./header";
import MortgageResult from "./mortgageResult";

export default function MortgageScreen() {
  const title = "Mortgage Calculator";
  const [houseValue, setHouseValue] = useState("");
  const [downpayment, setDownpayment] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [amortizationPeriod, setAmortizationPeriod] = useState(25);
  const [frequency, setFrequency] = useState(3);
  const [paymentTerm, setPaymentTerm] = useState("Monthly");
  const [result, setResult] = useState(0);

  const Calculate = (initialVal, interest, period) => {
    let interestPow = Math.pow(interest + 1, period);
    let result =
      Math.round(
        ((initialVal * interestPow * interest) / (interestPow - 1)) * 100
      ) / 100;
    return setResult(result);
  };

  const handleCalculate = () => {
    let interest, period, mortgageAmount;
    if (houseValue && interestRate && downpayment) {
      mortgageAmount = parseInt(houseValue) - parseInt(downpayment);
      if (frequency === 1) {
        period = amortizationPeriod * 52;
        interest = parseFloat(interestRate) / 52 / 100;
        Calculate(mortgageAmount, interest, period);
        return;
      } else if (frequency === 2) {
        period = amortizationPeriod * 26;
        interest = parseFloat(interestRate) / 26 / 100;
        Calculate(mortgageAmount, interest, period);
        return;
      } else if (frequency === 3) {
        period = amortizationPeriod * 12;
        interest = parseFloat(interestRate) / 12 / 100;
        Calculate(mortgageAmount, interest, period);
        return;
      }
    } else alert("Please Input Numbers");
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={{ flex: 1 }}>
        <Header header={title} />

        <ScrollView>
          <View onStartShouldSetResponder={() => true}>
            <View style={styles.inputWrapper}>
              <View>
                <Text style={styles.text}>House Value</Text>
              </View>
              <View style={styles.inputBox}>
                <TextInput
                  keyboardType="decimal-pad"
                  value={houseValue}
                  placeholder="$"
                  style={styles.textInput}
                  onChangeText={(num) => {
                    setHouseValue(num);
                  }}
                />
              </View>
            </View>
            <View style={styles.inputWrapper}>
              <View>
                <Text style={styles.text}>Down Payment</Text>
              </View>
              <View style={styles.inputBox}>
                <TextInput
                  keyboardType="decimal-pad"
                  value={downpayment}
                  placeholder="downpay"
                  style={styles.textInput}
                  onChangeText={(payment) => {
                    setDownpayment(payment);
                  }}
                />
              </View>
            </View>
            <View style={styles.inputWrapper}>
              <View>
                <Text style={styles.text}>Interest Rate</Text>
              </View>
              <View style={styles.inputBox}>
                <TextInput
                  keyboardType="decimal-pad"
                  value={interestRate}
                  placeholder="% / year"
                  style={styles.textInput}
                  onChangeText={(rate) => {
                    setInterestRate(rate);
                  }}
                />
              </View>
            </View>
            <Text style={styles.text}>Amortization Period</Text>
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
            <View>
              <View>
                <Text style={styles.text}>Frequency</Text>
              </View>
              <View>
                <Slider
                  style={{ height: 30, width: 300, marginLeft: 20 }}
                  value={frequency}
                  minimumValue={1}
                  maximumValue={3}
                  onValueChange={(value) => {
                    if (value === 1) {
                      setFrequency(value);
                      setPaymentTerm("Weekly");
                      return;
                    }
                    if (value === 2) {
                      setFrequency(value);
                      setPaymentTerm("Bi-weekly");
                      return;
                    }
                    if (value === 3) {
                      setFrequency(value);
                      setPaymentTerm("Monthly");
                      return;
                    }
                  }}
                  step={1}
                />
                <Text style={styles.sliderText}>{paymentTerm}</Text>
              </View>
            </View>
            <View
              style={{
                justifyContent: "space-evenly",
                flexDirection: "row",
                marginTop: 10,
              }}
            >
              <Button
                title="Calculate"
                color="#fc4747"
                onPress={handleCalculate}
              ></Button>
              <Button
                title="Reset"
                onPress={() => {
                  setHouseValue("");
                  setDownpayment("");
                  setInterestRate("");
                  setAmortizationPeriod(25);
                  setFrequency(3);
                  setPaymentTerm("Monthly");
                  setResult(0);
                }}
              ></Button>
            </View>
            <MortgageResult money={{ result, paymentTerm }} />
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: "row",
  },
  inputBox: {
    borderBottomWidth: 2,
    flex: 1,
    margin: 10,
  },
  text: {
    fontWeight: "bold",
    fontSize: 15,
    margin: 10,
    minWidth: 130,
  },
  textInput: {
    fontSize: 20,
    textAlign: "right",
    padding: 15,
  },
  sliderText: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "right",
    marginRight: 20,
    marginTop: 5,
  },
});
