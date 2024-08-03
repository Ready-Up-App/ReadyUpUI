import React, { useEffect, useState } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignInScreen from "../Screens/SignInScreen/SignInScreen";
import SignUpScreen from "../Screens/SignUpScreen/SignUpScreen";

import { useLogin } from "../AppContext/LoginProvider";

import GroupsScreen from "../Screens/GroupsScreen";
import FriendsScreen from "../Screens/FriendsScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();


const AppNavigation = () => {

    return (
        <Stack.Navigator screenOptions={{ headerShown: false, animation: "none" }}>
            <Stack.Screen name="FriendsList" component={FriendsScreen} />
            <Stack.Screen name="Groups" component={GroupsScreen} />
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