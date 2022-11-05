import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton/CustomButton";

import { signUpCall } from "../../Api/Api";
import Colors from "../../Constants/Colors";

const SignUpScreen = () => {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [errors, setErrors] = useState({});

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
        <View style={styles.root}>

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

        </View>
    )
}


const styles = StyleSheet.create({
    root: {
        alignItems: "center",
        padding: 20,
    },
});

export default SignUpScreen;