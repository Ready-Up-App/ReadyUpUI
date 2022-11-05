import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton/CustomButton";

import { signInCall } from "../../Api/Api";

const SignInScreen = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errors, setErrors] = useState({});
    const onSignInPressed = () => {
        if (validate()) {
            signInCall(email, password);
        }
    }

    const validate = () => {
        var valid = true;

        if (email.trim().length === 0) {
            valid = false;
            errors["email"] = "Please enter an email address."
            console.warn("enter an email for sign in");
        }

        if (password.trim().length === 0) {
            valid = false;
            errors["password"] = "Please enter an email address."
            console.warn("enter a password for sign in");
        }

        return valid;
    }

    return (
        <View style={styles.root}>

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
                placeholderTextColor="black"
                secureTextEntry={true}
            />

            <CustomButton
                text="Sign In"
                onPress={onSignInPressed}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        alignItems: "center",
        padding: 20,
    },
});

export default SignInScreen;