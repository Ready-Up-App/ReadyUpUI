
//import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Home from "../Screens/Home";

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

        <Tab.Screen name="Test" component={Home} 
            options={{
                tabBarIcon : ({ color, size}) => (
                    <MaterialCommunityIcons name="magnify" color={color} size={26}/>
                )
            }}
            />
        </Tab.Navigator>
    );
}


const screenOptions = (route, color) => {
    let iconName;

    switch(route.name){
        case "Home":
            iconName = "home";
            break;
        case "Test":
            iconName = "folder1";
            break;
    }

    return <Icon name={iconName} color={color} size={24}/>;
}


export default Tabs;