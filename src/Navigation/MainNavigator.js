import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import GroupsScreen from "../Screens/GroupsScreen";
import SignInScreen from "../Screens/SignInScreen/SignInScreen";
import SignUpScreen from "../Screens/SignUpScreen/SignUpScreen";

import { useLogin } from "../AppContext/LoginProvider";

const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

const AppNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen component={GroupsScreen} name="GroupsScreen" />
        </Stack.Navigator>
    )
}

const SignInNavigation = () => {
    return (
        <AuthStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="SignIn">
            <AuthStack.Screen component={SignInScreen} name="SignIn" />
            <AuthStack.Screen component={SignUpScreen} name="SignUp" />
        </AuthStack.Navigator>
    )
}


const MainNavigator = () => {
    const { isLoggedIn } = useLogin();
    // if(true){
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