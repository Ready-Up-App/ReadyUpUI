import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import Tabs from './Navigation/Tabs';
import SignIn from "./Screens/SignIn";



export default function App() {
  
  return (
    
    <NavigationContainer>
      
      <Tabs/>
    </NavigationContainer>
  );
}
