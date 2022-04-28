import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Home from "./Screens/Home";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator style={styles.Header}>
        <Tab.Screen name="Homepage" component={Home}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
