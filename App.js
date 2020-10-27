import "react-native-gesture-handler";
import * as React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MortgageScreen from "./components/mortgage";
import AnnuityScreen from "./components/annuity";
import SavingsScreen from "./components/savings";
import CompareScreen from "./components/compare";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Mortgage" component={MortgageScreen} />
        <Tab.Screen name="Annuity" component={AnnuityScreen} />
        <Tab.Screen name="Savings" component={SavingsScreen} />
        <Tab.Screen name="Compare" component={CompareScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
