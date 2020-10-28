import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import MortgageScreen from "./components/mortgage";
import AnnuityScreen from "./components/annuity";
import SavingsScreen from "./components/savings";
import CompareScreen from "./components/compare";
import InfoScreen from "./components/info";

const Tab = createBottomTabNavigator();
const TabBarIcon = (focused, name) => {
  let iconName, iconSize;
  if (name === "Info") {
    iconName = "information-outline";
  } else if (name === "Mortgage") {
    iconName = "home-city-outline";
  } else if (name === "Annuity") {
    iconName = "chart-line";
  } else if (name === "Savings") {
    iconName = "currency-usd";
  } else if (name === "Compare") {
    iconName = "compare";
  }
  iconSize = focused ? 30 : 25;
  return (
    <MaterialCommunityIcons name={iconName} size={iconSize} color="black" />
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Mortgage"
        tabBarOptions={{
          activeBackgroundColor: "#fc4747",
          activeTintColor: "#000000",
          style: {
            backgroundColor: "#fff",
          },
        }}
        screenOptions={({ route }) => ({
          tabBarLabel: route.name,
          tabBarIcon: ({ focused }) => TabBarIcon(focused, route.name),
        })}
      >
        <Tab.Screen name="Mortgage" component={MortgageScreen} />
        <Tab.Screen name="Annuity" component={AnnuityScreen} />
        <Tab.Screen name="Savings" component={SavingsScreen} />
        <Tab.Screen name="Compare" component={CompareScreen} />
        <Tab.Screen name="Info" component={InfoScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
