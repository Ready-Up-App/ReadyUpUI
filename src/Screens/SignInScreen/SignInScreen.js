import React, { useState } from "react";
import { View, StyleSheet, Image, useWindowDimensions } from "react-native";

import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton/CustomButton";

import Colors from "../../Constants/Colors";

import { signInCall } from "../../Api/Api";
import { useLogin } from "../../AppContext/LoginProvider";

import Logo from "../../../assets/regularIcon.png";

const SignInScreen = ({ navigation }) => {

    const { setIsLoggedIn } = useLogin();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errors, setErrors] = useState({});

    const { height } = useWindowDimensions();

    const onSignInPressed = async () => {
        if (validate()) {
            try {
                const result = await signInCall(email, password);
                if (result.success) {
                    setIsLoggedIn(true);
                }

            } catch (error) {
                console.log(error)
            }
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

            <Image source={Logo} style={[styles.logo, { height: height * 0.3 }]} resizeMode="contain" />
            <CustomButton
                text="New User?"
                onPress={() => navigation.navigate("SignUp")}
                padding={5}
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
                placeholderTextColor="black"
                secureTextEntry={true}
            />

            <CustomButton
                text="Sign In"
                onPress={onSignInPressed}
                color={Colors.green}
            />

        </View>
    );
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

export default SignInScreen;