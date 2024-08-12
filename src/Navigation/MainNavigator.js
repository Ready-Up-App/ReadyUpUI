import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignInScreen from "../Screens/SignInScreen/SignInScreen";
import SignUpScreen from "../Screens/SignUpScreen/SignUpScreen";

import { useLogin } from "../AppContext/LoginProvider";

import GroupsScreen from "../Screens/GroupsScreen";
import FriendsScreen from "../Screens/FriendsScreen";
import SettingsScreen from "../Screens/SettingsScreen";
import { useState, useEffect, useRef } from 'react';
import { Platform } from 'react-native';

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { setPushToken } from "../Api/NotificationAPI/NotificationApi";

    
Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
});

const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();


const AppNavigation = () => {

    const [expoPushToken, setExpoPushToken] = useState('');
    const [channels, setChannels] = useState([]);
    const [notification, setNotification] = useState(undefined);

    const notificationListener = useRef();
    const responseListener = useRef();

    const registerForPushNotificationsAsync = async () => {
        let token;
    
        if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
        }
    
        if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        try {
            const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
            if (!projectId) {
                throw new Error('Project ID not found');
            }
            token = (
                await Notifications.getExpoPushTokenAsync({
                    projectId,
                })
            ).data;
            setPushToken(token);
        } catch (e) {
            token = `${e}`;
        }
        } else {
            alert('Must use physical device for Push Notifications');
        }
    
        return token;
    }
      

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => token && setExpoPushToken(token));
    
        if (Platform.OS === 'android') {
            Notifications.getNotificationChannelsAsync().then(value => setChannels(value ?? []));
        }
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });
    
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });
    
        return () => {
            notificationListener.current &&
                Notifications.removeNotificationSubscription(notificationListener.current);
            responseListener.current &&
                Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);


    return (
        <Stack.Navigator screenOptions={{ headerShown: false, animation: "none" }}>
            <Stack.Screen name="Groups" component={GroupsScreen} />
            <Stack.Screen name="FriendsList" component={FriendsScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
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