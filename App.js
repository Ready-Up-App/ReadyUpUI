import React, {Component} from 'react';
import { StyleSheet, Text, View, SafeAreaView } from "react-native"
//import {Authentication, Authenticate}  from "./Screens/Authentication";
// import Home from "./Screens/Home";
// import { NavigationContainer } from "@react-navigation/native"
import Colors from "./Constants/Colors";
//import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { MaterialCommunityIcons } from '@expo/vector-icons';



import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
// import { StackView } from '@react-navigation/stack';
import Authentication from './Screens/Authentication';

let Stack = createMaterialBottomTabNavigator();

export default class App extends Component {
    
    render() {
        return (
            <View style={styles.container}>
                <Authentication/>
            </View>

            //temporary until I create custom navigator
        //     <NavigationContainer>
        //         <Stack.Navigator
        //             initialRouteName="Home"
        //             barStyle={{ backgroundcolor: "#694fad" }}
        //             activeColor="#f0edf6"
        //             inactiveColor="#3e2465"
        //         >

        //             <Stack.Screen name="Home" component={Home} 
        //                 options={{
        //                     tabBarIcon : ({ color, size}) => (
        //                         <MaterialCommunityIcons name="home" color={color} size={26}/>
        //                     )
        //                 }}
        //             />

        //     </Stack.Navigator>
        //   </NavigationContainer>
        );
    }

}


const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "#57687C",
    //   justifyContent: "center",
    //   alignItems: "center"
  },
  itemTitle: { fontSize: 24, padding: 5, color: "white" },
  itemContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      height: 100,
      flex: 0.5,
      borderRadius: 20,
      marginHorizontal: 20,
      marginVertical: 200,
      padding: 15,
      backgroundColor: Colors.blueGray,
  },
  icon: {
      padding: 5,
      fontSize: 24,
  },
  centeredView: {
      justifyContent: "center",
      alignItems: "center",
      marginTop: 50,
  },
  modalView: {
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
  },
});