import React, { useState } from "react";

import { View, StyleSheet } from "react-native";

import CustomButton from "../CustomButton/CustomButton";

import Colors from "../../Constants/Colors";

const LoginNav = ({ navigation, focus }) => {

    function signIn() {
        if(focus.signUp){
            navigation.navigate("SignIn");
        }
    }

    function signUp() {
        if(focus.signIn){
            navigation.navigate("SignUp");
        }
    }

    return (
        <View style={styles.container}>
            <CustomButton
                text="Sign In"
                onPress={signIn}
                style={{
                    backgroundColor: focus.signIn ? Colors.darkGray: Colors.purple,
                }}
            />
            <CustomButton
                text="Sign Up"
                onPress={signUp}
                style={{
                    backgroundColor: focus.signUp ? Colors.darkGray: Colors.purple,
                }}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        justifyContent: "space-between",
        flexDirection: "row"
    },
})

export default LoginNav;