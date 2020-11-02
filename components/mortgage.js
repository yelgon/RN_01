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
  const [loanAmount, setLoanAmount] = useState("");
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
    let interest, period;
    if (loanAmount && interestRate) {
      if (frequency === 1) {
        period = amortizationPeriod * 52;
        interest = parseFloat(interestRate) / 52 / 100;
        Calculate(parseInt(loanAmount), interest, period);
        return;
      } else if (frequency === 2) {
        period = amortizationPeriod * 26;
        interest = parseFloat(interestRate) / 26 / 100;
        Calculate(parseInt(loanAmount), interest, period);
        return;
      } else if (frequency === 3) {
        period = amortizationPeriod * 12;
        interest = parseFloat(interestRate) / 12 / 100;
        Calculate(parseInt(loanAmount), interest, period);
        return;
      }
    } else alert("Input numbers");
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
                <Text style={styles.text}>Loan Amount</Text>
              </View>
              <View style={styles.inputBox}>
                <TextInput
                  keyboardType="decimal-pad"
                  value={loanAmount}
                  placeholder="$"
                  style={styles.textInput}
                  onChangeText={(num) => {
                    setLoanAmount(num);
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
                  setLoanAmount("");
                  setInterestRate("");
                  setAmortizationPeriod(25);
                  setFrequency(3);
                  setPaymentTerm("Monthly");
                  setResult(0);
                }}
              ></Button>
            </View>
            <MortgageResult money={{ result, paymentTerm }} />
            <Text style={{ fontSize: 25, marginTop: 30 }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum. Why do we use it? It is a long established fact that
              a reader will be distracted by the readable content of a page when
              looking at its layout. The point of using Lorem Ipsum is that it
              has a more-or-less normal distribution of letters, as opposed to
              using 'Content here, content here', making it look like readable
              English. Many desktop publishing packages and web page editors now
              use Lorem Ipsum as their default model text, and a search for
              'lorem ipsum' will uncover many web sites still in their infancy.
              Various versions have evolved over the years, sometimes by
              accident, sometimes on purpose (injected humour and the like).
            </Text>
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
