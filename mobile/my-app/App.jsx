import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { NavigationContainer, useIsFocused } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./components/Home";
import Create from "./components/Create";
import Update from "./components/Update";

const Stack = createNativeStackNavigator();

function App() {
  const [screenKey, setScreenKey] = useState("homeKey");

  const updateScreenKey = () => {
    setScreenKey((prev) => (prev === "homeKey" ? "otherKey" : "homeKey"));
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Extrato">
        <Stack.Screen
          name="Extrato"
          component={Home}
          initialParams={{ key: screenKey }} 
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Comprar"
          component={Create}
          initialParams={{ key: screenKey }} 
        />
        <Stack.Screen
          name="Editar"
          component={Update}
          initialParams={{ key: screenKey }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
