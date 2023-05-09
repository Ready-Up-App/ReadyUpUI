import React, { useEffect, useState } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import GroupsScreen from "../Screens/GroupsScreen";
import SignInScreen from "../Screens/SignInScreen/SignInScreen";
import SignUpScreen from "../Screens/SignUpScreen/SignUpScreen";

import { useLogin } from "../AppContext/LoginProvider";

import * as SplashScreen from 'expo-splash-screen';
import * as SecureStore from 'expo-secure-store';

const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

// SplashScreen.show();

const AppNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, animation: "none" }}>
            <Stack.Screen component={GroupsScreen} name="GroupsScreen" />
        </Stack.Navigator>
    )
}

const SignInNavigation = () => {
    return (
        <AuthStack.Navigator screenOptions={{ headerShown: false, animation: "fade" }} initialRouteName="SignIn">
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