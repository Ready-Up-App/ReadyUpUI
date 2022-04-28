
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "../Screens/Home";
import CreateActivity from "../Screens/CreateActivity";


const Tab = createBottomTabNavigator();

const Tabs = () => {
    return(
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Fuckyu" component={Home}></Tab.Screen>
            <Tab.Screen name="Fuckme" component={CreateActivity}></Tab.Screen>
        </Tab.Navigator>
    );
}

export default Tabs;