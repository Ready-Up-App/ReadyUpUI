import React, { useState } from "react";
import { SafeAreaView, View, StyleSheet, Image, useWindowDimensions, KeyboardAvoidingView, Platform } from "react-native";
import * as SecureStore from 'expo-secure-store';

import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton/CustomButton";

import Colors from "../../Constants/Colors";

import { signInCall } from "../../Api/AuthenticationAPIs/AuthApi";
import { useLogin } from "../../AppContext/LoginProvider";

import Logo from "../../../assets/regularIcon.png";
import SignIn_SignUp_Buttons from "../../Components/SignIn_SignUp_Buttons/SignIn_SignUp_Buttons";

const SignInScreen = ({ navigation }) => {

    const { setIsLoggedIn } = useLogin();

    const [username_email, setUsername_Email] = useState("");
    const [password, setPassword] = useState("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const [errors, setErrors] = useState({});

    const [isFocused] = useState({signIn: navigation.isFocused(), signUp: !navigation.isFocused()});

    const { height, width } = useWindowDimensions();
    
    const options = { keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY }

    async function saveOnValidSignIn(token) {
        await SecureStore.setItemAsync("username", username_email, options);
        await SecureStore.setItemAsync("password", password, options);
        await SecureStore.setItemAsync("token", token, options);
    }

    const onSignInPressed = async () => {
        if (validate()) {
            let isEmail = emailRegex.test(username_email);
            const result = await signInCall({username_email, isEmail, password})
            .then(result => {
                console.log(result)
                if (result instanceof Error) {
                    //error handle
                    console.log("Error handle")
                } else {
                    if (result.success) {
                        saveOnValidSignIn(result.token);
                        setIsLoggedIn(true);
                    }else {
                        console.log(result.reason);
                    }
                }

            });
        }
    }

    const validate = () => {
        var valid = true;

        if (username_email.trim().length === 0) {
            valid = false;
            errors["email"] = "Please enter either a username or an email address."
            console.warn("enter either a username or an email for sign in");
        }

        if (password.trim().length === 0) {
            valid = false;
            errors["password"] = "Please enter an email address."
            console.warn("enter a password for sign in");
        }

        return valid;
    }

    return (
        <SafeAreaView style={[styles.root, {height: height}]}>
            
            <KeyboardAvoidingView style={[styles.mainView, {height: height}]} 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

                <View style={styles.logoView}>
                    <Image source={Logo} style={[styles.logo, {alignSelf: "center"}]} resizeMode="contain" />
                </View>
                
                <View style={styles.inputView}>
                    <SignIn_SignUp_Buttons navigation={navigation} focus={isFocused}/>
                    <CustomInput
                        value={username_email}
                        setValue={setUsername_Email}
                        placeholder="Username or Email"
                        placeholderTextColor="black"
                        style={{}}
                    />
                    <CustomInput
                        value={password}
                        setValue={setPassword}
                        placeholder="Password"
                        placeholderTextColor="black"
                        secureTextEntry={true}
                        style={{}}
                    />
                    <CustomButton
                        text="Sign In"
                        onPress={onSignInPressed}
                        style={{ backgroundColor: Colors.green }}
                    />
                </View>

                </KeyboardAvoidingView>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: Colors.blueGray,
        flex: 1,
    }, 
    mainView: {
        justifyContent: "row",
        alignItems: "center",

    },
    inputView: {
        flex:2,
        justifyContent: "flex-start",
        width: "75%",
    },
    logoView: {
        flex:1,
        width: "100%",
        justifyContent: "center",
        flexDirection: "row"
    },
    logo: {
        width: 125,
        height: 125,
        maxHeight: 125,
        maxWidth: 125,
    },
});

export default SignInScreen;