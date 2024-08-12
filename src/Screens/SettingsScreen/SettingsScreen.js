import React from "react";

import { View, StyleSheet, Text, TouchableOpacity, SafeAreaView } from "react-native";

import Colors from "../../Constants/Colors";
import { ConstStyles } from "../../Constants/Styles";
import { useLogin } from "../../AppContext/LoginProvider";
import * as SecureStore from 'expo-secure-store';


const SettingsScreen = ({navigation}) => {

    const { setIsLoggedIn } = useLogin();

    const signOut = () => {
        SecureStore.deleteItemAsync("username");
        SecureStore.deleteItemAsync("password");
        SecureStore.deleteItemAsync("token");
        setIsLoggedIn(false);
    }

    const settingsList = [
        {
            name: "Sign Out",
            onPress: () => signOut(),
        },
    ]

    return(
        <SafeAreaView style={styles.root}>

            <View style={ConstStyles.banner}>
                <TouchableOpacity style={styles.backButton} onPress={navigation.goBack}>
                    <Text style={{}}>Back</Text>
                </TouchableOpacity>
                <Text style={styles.bannerTitle}>SETTINGS</Text>
            </View>

            <View style={styles.topView}>
                <View style={{weight: "100%"}}>
                    <TouchableOpacity style={styles.settingItem} onPress={settingsList[0].onPress} >
                        <Text style={{}}>{settingsList[0].name}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    root: {
        height: "100%",
        backgroundColor: Colors.black,
    }, 
        topView: {
            height: "100%",
            backgroundColor: Colors.blueGray,
            flexDirection: "column",
        },
        bannerTitle: {
            justifyContent: "center",
            alignContent: "center",
            textAlign: "center",
            alignSelf: "center",
            width: "66.66%"
        },
        backButton: {
            backgroundColor: Colors.blue,
            margin: "4%",
            paddingVertical: "0.5%",
            paddingHorizontal: "1%",
        },
        settingItemContainer: {
            backgroundColor: Colors.lightBlueGray,
            borderRadius: 25,
            margin: "4%",
        },
        settingItem: {
            backgroundColor: Colors.blue,
            paddingVertical: 10,
            marginHorizontal: "2%",
        },
        
    });
    

export default SettingsScreen;