import React, { useState } from "react";
import { View, StyleSheet, Image, useWindowDimensions, KeyboardAvoidingView, Platform } from "react-native";

import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton/CustomButton";

import { signUpCall } from "../../Api/Api";
import Colors from "../../Constants/Colors";

import Logo from "../../../assets/regularIcon.png";
import SignIn_SignUp_Buttons from "../../Components/SignIn_SignUp_Buttons";
import { useLogin } from "../../AppContext/LoginProvider";
import { ScrollView } from "react-native-web";

import { SafeAreaView } from "react-native-safe-area-context";

const SignUpScreen = ({ navigation }) => {

    const { setIsLoggedIn } = useLogin();

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [errors, setErrors] = useState({});

    const [isFocused] = useState({signUp: navigation.isFocused(), signIn: !navigation.isFocused()});

    const {height} = useWindowDimensions();

    const onSignUpPressed = async () => {
        try {
            const result = await signUpCall({email, username, password});
            if (validate() && result) {
                setIsLoggedIn(true);
            }
            
        } catch (error) {
            console.log(error)
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
        <SafeAreaView>
            <ScrollView style={styles.root}>
            
                <Image source={Logo} style={[styles.logo, { height: height * 0.3 }]} resizeMode="contain" />

                <SignIn_SignUp_Buttons navigation={navigation} focus={isFocused}/>

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
                    style={{ backgroundColor: Colors.green }}
            />
            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    root: {
        // alignItems: "center",
        paddingBottom: 50,
        paddingHorizontal: 20,
        backgroundColor: Colors.blueGray,
        flex: 1,
        // justifyContent: "flex-end",
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