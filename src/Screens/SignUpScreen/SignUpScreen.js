import React, { useState } from "react";
import { SafeAreaView, View, StyleSheet, Image, useWindowDimensions, KeyboardAvoidingView, Platform } from "react-native";

import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton/CustomButton";

import { signUpCall } from "../../Api/AuthenticationAPIs/AuthApi";
import Colors from "../../Constants/Colors";

import Logo from "../../../assets/regularIcon.png";
import SignIn_SignUp_Buttons from "../../Components/SignIn_SignUp_Buttons";
import { useLogin } from "../../AppContext/LoginProvider";

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
        <SafeAreaView style={[styles.root, {height: height}]}>
            
            <KeyboardAvoidingView style={[styles.mainView, {height: height}]} 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

                <View style={styles.logoView}>
                    <Image source={Logo} style={[styles.logo, {alignSelf: "center"}]} resizeMode="contain" />
                </View>

                <View style={styles.inputView}>
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
                </View>

                </KeyboardAvoidingView>

        </SafeAreaView>
    )
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

export default SignUpScreen;