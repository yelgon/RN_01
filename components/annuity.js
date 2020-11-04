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
import Header from "./header";
import Slider from "@react-native-community/slider";
import AnnuityResult from "./annuityResult";

export default function AnnuityScreen() {
  const [beginningPrincipal, setBeginningPrincipal] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [paymentPeriod, setPaymentPeriod] = useState(30);
  const [frequency, setFrequency] = useState(3);
  const [paymentTerm, setPaymentTerm] = useState("Monthly");
  const [result, setResult] = useState(0);

  const title = "Annuity Calculator";

  const Calculate = (initialVal, interest, period) => {
    let interestPow = Math.pow(interest + 1, period);
    let result =
      Math.round(
        ((initialVal * interestPow * interest) / (interestPow - 1)) * 100
      ) / 100;
    return setResult(result);
  };

  const handleCalculate = () => {
    let interest, period, principalValue;
    if (beginningPrincipal && interestRate) {
      principalValue = parseInt(beginningPrincipal);
      switch (frequency) {
        case 1:
          period = paymentPeriod * 52;
          interest = parseFloat(interestRate) / 52 / 100;
          Calculate(principalValue, interest, period);
          break;
        case 2:
          period = paymentPeriod * 26;
          interest = parseFloat(interestRate) / 26 / 100;
          Calculate(principalValue, interest, period);
          break;
        case 3:
          period = paymentPeriod * 12;
          interest = parseFloat(interestRate) / 12 / 100;
          Calculate(principalValue, interest, period);
          break;
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
                <Text style={styles.text}>Beginning Principal</Text>
              </View>
              <View style={styles.inputBox}>
                <TextInput
                  keyboardType="number-pad"
                  value={beginningPrincipal}
                  placeholder="$"
                  style={styles.textInput}
                  onChangeText={(val) => {
                    setBeginningPrincipal(val);
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
            <Text style={styles.text}>Payment Years</Text>
            <Slider
              style={{
                height: 30,
                width: 300,
                marginLeft: 20,
              }}
              value={paymentPeriod}
              minimumValue={10}
              maximumValue={35}
              onValueChange={(value) => setPaymentPeriod(value)}
              step={5}
            />
            <Text style={styles.sliderText}>{paymentPeriod} years</Text>
            <View>
              <View>
                <Text style={styles.text}>Payment Period</Text>
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
                  setBeginningPrincipal("");
                  setInterestRate("");
                  setPaymentPeriod(30);
                  setPaymentTerm("Monthly");
                  setFrequency(3);
                  setResult(0);
                }}
              ></Button>
            </View>
            <AnnuityResult money={{ result, paymentTerm }} />
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
