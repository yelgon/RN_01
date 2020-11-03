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

export default function MortgageScreen() {
  const title = "Savings";
  return (
    <View>
      <Header header={title} />
    </View>
  );
}

const styles = StyleSheet.create({});
