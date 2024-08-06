import React, { useEffect, useState } from "react";
import { SafeAreaView, View, StyleSheet, Image, useWindowDimensions, KeyboardAvoidingView, Platform } from "react-native";
import * as SecureStore from 'expo-secure-store';

import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton/CustomButton";

import { signUpCall } from "../../Api/AuthenticationAPI/AuthApi";
import Colors from "../../Constants/Colors";

import Logo from "../../../assets/regularIcon.png";
import SignIn_SignUp_Buttons from "../../Components/SignIn_SignUp_Buttons";
import { useLogin } from "../../AppContext/LoginProvider";
import LoadScreen from "../../Components/Loading/LoadScreen";
import { validateSignUp } from "../../../Utility/FormValidator/FormValidator";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignUpScreen = ({ navigation }) => {

    const {setIsLoggedIn} = useLogin();
    const [formSubmitted, setFormSubmitted] = useState(false);


    const [form, setForm] = useState({username:"", password: "", firstname:"", email:""})

    const [errors, setErrors] = useState({});

    const [isFocused] = useState({signUp: navigation.isFocused(), signIn: !navigation.isFocused()});

    const {height} = useWindowDimensions();

    const options = { keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY }

    async function saveOnValidSignUp(token) {
        //TODO: find best way to safely store data
        if (await SecureStore.isAvailableAsync()) {
            await SecureStore.setItemAsync("username", form.username, options);
            await SecureStore.setItemAsync("password", form.password, options);
            await SecureStore.setItemAsync("token", token, options);
        }
    }

    const handleChange = (name, value) => {
        setForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const signUp = async () => {
        if (validate()) {
            await signUpCall({form})
            .then(result => {
                if (result.ok) {
                    saveOnValidSignUp(result.accessToken)
                    setIsLoggedIn(true);
                    return result.json()
                } else if (result.status == 401) {
                    errors["API"] = "Invalid username/password"
                    // console.log("Invalid username/password");
                }
            }).then(result => 
                console.log(result)
            ).catch(error => 
                console.log(error)
            );
        }
    }

    const validate = () => {
        setErrors(validateSignUp(form));
        if (Object.keys(errors).length > 0) {
            return false;
        }
        return true;
    }

    useEffect(() => {
        AsyncStorage.clear();
        if (formSubmitted) {
            signUp()
            .then(() =>{
                //print out errors required
                setFormSubmitted(false);
            })
            .finally()
        }
    }, [formSubmitted]);

    return ( formSubmitted ? <LoadScreen/> :
        
            <SafeAreaView style={[styles.root, {height: height}]}>
                
            <KeyboardAvoidingView style={[styles.mainView, {height: height}]} 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

                <View style={styles.logoView}>
                    <Image source={Logo} style={[styles.logo, {alignSelf: "center"}]} resizeMode="contain" />
                </View>

                <View style={styles.inputView}>
                    <SignIn_SignUp_Buttons navigation={navigation} focus={isFocused}/>
                    <CustomInput
                        value={form.firstname}
                        setValue={handleChange}
                        placeholder="Firstname"
                        placeholderTextColor="black"
                    />
                    <CustomInput
                        value={form.email}
                        setValue={handleChange}
                        placeholder="Email"
                        placeholderTextColor="black"
                    />
                    <CustomInput
                        value={form.username}
                        setValue={handleChange}
                        placeholder="Username"
                        placeholderTextColor="black"
                    />
                    <CustomInput
                        value={form.password}
                        setValue={handleChange}
                        placeholder="Password"
                        secureTextEntry={true}
                        placeholderTextColor="black"
                    />
                    <CustomButton
                        text="Sign Up"
                        onPress={() => setFormSubmitted(true)}
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
        flexDirection: "column",
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