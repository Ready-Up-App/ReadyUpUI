import React, { useState } from "react";

import { View, StyleSheet } from "react-native";

import CustomButton from "../CustomButton/CustomButton";

import Colors from "../../Constants/Colors";

const SignIn_SignUp_Buttons = ({ navigation, focus }) => {

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
                    borderRadius: 0,
                    // width: "30%",
                }}
            />
            <CustomButton
                text="Sign Up"
                onPress={signUp}
                style={{
                    backgroundColor: focus.signUp ? Colors.darkGray: Colors.purple,
                    borderRadius: 0,
                    // width: "30%",
                }}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        // width: "60%",
        flexDirection: "row",
        justifyContent: "center",
    },
})

export default SignIn_SignUp_Buttons;