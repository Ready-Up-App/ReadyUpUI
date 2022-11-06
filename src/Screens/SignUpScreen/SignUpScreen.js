import React, { useState } from "react";
import { View, StyleSheet, Image, useWindowDimensions, KeyboardAvoidingView, Platform } from "react-native";

import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton/CustomButton";

import { signUpCall } from "../../Api/Api";
import Colors from "../../Constants/Colors";

import Logo from "../../../assets/regularIcon.png";

const SignUpScreen = ({ navigation }) => {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [errors, setErrors] = useState({});

    const {height} = useWindowDimensions();

    const onSignUpPressed = () => {
        if (validate()) {
            signUpCall(email, password);
        }
    }

    const validate = () => {
        var valid = true;

        if (username.trim().length === 0) {
            valid = false;
            errors["username"] = "Please enter a Username."
            console.warn("enter a username for sign up");
        }

        if (email.trim().length === 0) {
            valid = false;
            errors["email"] = "Please enter an email address."
            console.warn("enter an email for sign up");
        }

        if (password.trim().length === 0) {
            valid = false;
            errors["password"] = "Please enter password."
            console.warn("enter a password for sign up");
        }

        return valid;
    }

    return (
        <KeyboardAvoidingView style={styles.root}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <Image source={Logo} style={[styles.logo, { height: height * 0.3 }]} resizeMode="contain" />

            <CustomButton
                text="Returning User"
                onPress={() => navigation.navigate("SignIn")}
            />

            <CustomInput
                value={username}
                setValue={setUsername}
                placeholder="Username"
                placeholderTextColor="black"
            />

            <CustomInput
                value={email}
                setValue={setEmail}
                placeholder="Email"
                placeholderTextColor="black"
            />

            <CustomInput
                value={password}
                setValue={setPassword}
                placeholder="Password"
                secureTextEntry={true}
                placeholderTextColor="black"
            />

            <CustomButton
                text="Sign Up"
                onPress={onSignUpPressed}
            />

        </KeyboardAvoidingView>
    )
}


const styles = StyleSheet.create({
    root: {
        alignItems: "center",
        padding: 20,
        backgroundColor: Colors.blueGray,
        flex: 1,
        justifyContent: "center",
    },
    logo: {
        width: "70%",
        maxHeight: 125,
        maxWidth: 125,
        marginTop: 30,
        marginBottom: 200,
    },
});

export default SignUpScreen;