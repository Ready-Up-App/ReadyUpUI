import React, { useContext } from "react";

import { createStackNavigator } from "@react-navigation/stack";

import GroupsScreen from "../Screens/GroupsScreen";
import SignInScreen from "../Screens/SignInScreen/SignInScreen";
import SignUpScreen from "../Screens/SignUpScreen/SignUpScreen";

import { useLogin } from "../AppContext/LoginProvider";

const Stack = createStackNavigator();
const AuthStack = createStackNavigator();

const AppNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen component={GroupsScreen} name="GroupsScreen" />
        </Stack.Navigator>
    )
}

const SignInNavigation = () => {
    return (
        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
            <AuthStack.Screen component={SignInScreen} name="SignIn" />
            <AuthStack.Screen component={SignUpScreen} name="SignUp" />
        </AuthStack.Navigator>
    )
}


const MainNavigator = () => {
    const { isLoggedIn } = useLogin();

    if (isLoggedIn) {
        return (
            <AppNavigation/>
        )
    } else {
        return (
            <SignInNavigation/>   
        )
    }
}

export default MainNavigator;