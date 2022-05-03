
//import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Home from "../Screens/Home";
import CreateActivity from "../Screens/CreateActivity";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createMaterialBottomTabNavigator();

const Tabs = () => {
    return(
        <Tab.Navigator
            initialRouteName="Home"
            barStyle={{ backgroundcolor: "#694fad" }}
            activeColor="#f0edf6"
            inactiveColor="#3e2465"
        >

            <Tab.Screen name="Home" component={Home} 
            options={{
                tabBarIcon : ({ color, size}) => (
                    <MaterialCommunityIcons name="home" color={color} size={26}/>
                )
            }}
            />

        <Tab.Screen name="Test" component={CreateActivity} 
            options={{
                tabBarIcon : ({ color, size}) => (
                    <MaterialCommunityIcons name="magnify" color={color} size={26}/>
                )
            }}
            />
        </Tab.Navigator>
    );
}


export default Tabs;