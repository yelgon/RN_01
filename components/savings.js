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
import SavingsResult from "./savingsResult";
import Slider from "@react-native-community/slider";

export default function SavingsScreen() {
  const title = "Savings Calculator";
  const [period, setPeriod] = useState(3);
  const [savingPeriod, setSavingPeriod] = useState("Monthly");
  const [amount, setAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [yearsToSave, setYearsToSave] = useState(25);
  const [result, setResult] = useState(0);

  const Calculate = (initialVal, interest, period) => {
    let interestPow = Math.pow(interest + 1, period);
    let result = Math.round((initialVal * (interestPow - 1)) / interest);
    return setResult(result);
  };

  const handleCalculate = () => {
    let interest, frequency, savingAmount;
    if (amount && interestRate) {
      savingAmount = parseFloat(amount);
      if (period === 1) {
        frequency = yearsToSave * 52;
        interest = parseFloat(interestRate) / 52 / 100;
        Calculate(savingAmount, interest, frequency);
        return;
      } else if (period === 2) {
        frequency = yearsToSave * 26;
        interest = parseFloat(interestRate) / 26 / 100;
        Calculate(savingAmount, interest, frequency);
        return;
      } else if (period === 3) {
        frequency = yearsToSave * 12;
        interest = parseFloat(interestRate) / 12 / 100;
        Calculate(savingAmount, interest, frequency);
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
            <View>
              <View>
                <Text style={styles.text}>Saving Period</Text>
              </View>
              <View>
                <Slider
                  style={{ height: 30, width: 300, marginLeft: 20 }}
                  value={period}
                  minimumValue={1}
                  maximumValue={3}
                  onValueChange={(value) => {
                    if (value === 1) {
                      setPeriod(value);
                      setSavingPeriod("Weekly");
                      return;
                    }
                    if (value === 2) {
                      setPeriod(value);
                      setSavingPeriod("Bi-weekly");
                      return;
                    }
                    if (value === 3) {
                      setPeriod(value);
                      setSavingPeriod("Monthly");
                      return;
                    }
                  }}
                  step={1}
                />
                <Text style={styles.sliderText}>{savingPeriod}</Text>
              </View>
            </View>
            <View style={styles.inputWrapper}>
              <View>
                <Text style={styles.text}>{savingPeriod} Contributions</Text>
              </View>
              <View style={styles.inputBox}>
                <TextInput
                  keyboardType="decimal-pad"
                  value={amount}
                  placeholder="$"
                  style={styles.textInput}
                  onChangeText={(value) => {
                    setAmount(value);
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
            <View>
              <Text style={styles.text}>Years To Save</Text>
              <Slider
                style={{
                  height: 30,
                  width: 300,
                  marginLeft: 20,
                }}
                value={yearsToSave}
                minimumValue={5}
                maximumValue={40}
                onValueChange={(value) => setYearsToSave(value)}
                step={5}
              />
              <Text style={styles.sliderText}>{yearsToSave} years</Text>
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
                  setPeriod(3);
                  setSavingPeriod("Monthly");
                  setAmount("");
                  setInterestRate("");
                  setYearsToSave(25);
                }}
              ></Button>
            </View>

            <SavingsResult money={{ result }} />
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
