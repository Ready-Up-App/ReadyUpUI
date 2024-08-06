import React, { useEffect, useState } from "react";
import { SafeAreaView, View, StyleSheet, Image, useWindowDimensions, KeyboardAvoidingView, Platform, Text } from "react-native";
import * as SecureStore from 'expo-secure-store';


import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton/CustomButton";

import Colors from "../../Constants/Colors";
import { emailRegex } from "../../Constants/Regex";

import { signInCall } from "../../Api/AuthenticationAPI/AuthApi";
import { useLogin } from "../../AppContext/LoginProvider";

import Logo from "../../../assets/regularIcon.png";
import SignIn_SignUp_Buttons from "../../Components/SignIn_SignUp_Buttons/SignIn_SignUp_Buttons";
import LoadScreen from "../../Components/Loading/LoadScreen";
import { validateSignIn } from "../../../Utility/FormValidator/FormValidator";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignInScreen = ({ navigation }) => {

    const { setIsLoggedIn } = useLogin();
    const [formSubmitted, setFormSubmitted] = useState(false);

    const [form, setForm] = useState({ username: "", password: "" })

    const [errors, setErrors] = useState({});

    const [isFocused] = useState({signIn: navigation.isFocused(), signUp: !navigation.isFocused()});

    const { height } = useWindowDimensions();
    
    async function saveOnValidSignIn(token) {
        //TODO: find best way to safely store data
        if (await SecureStore.isAvailableAsync()) {
            await SecureStore.setItemAsync("token", token);
        }
    }

    const signIn = async () => {
        if (validate()) {
            await signInCall({form})
            .then(result => {
                if (!result.ok) {
                    errors["API"] = "Invalid username/password";
                }
                return result.json();
            }).then(result => {
                saveOnValidSignIn(result.accessToken);
                setIsLoggedIn(true);
            } 
            ).catch(error => {
                console.log(error)
            });
        }
    }

    const handleChange = (name, value) => {
        setForm(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    const validate = () => {
        setErrors(validateSignIn(form));
        if (Object.keys(errors).length > 0) {
            return false;
        }
        return true;
    }

    useEffect(() => {
        let isCancelled = false;
        if (formSubmitted) {
            AsyncStorage.clear()
            signIn()
            .then(() =>{
                if (!isCancelled){
                    //print out errors required
                    setFormSubmitted(false);
                }
            })
            .finally()
        }
        return () => {
            isCancelled = true;
        }
        
    }, [formSubmitted])

    return (formSubmitted ? <LoadScreen/> :

        <SafeAreaView style={[styles.root, {height: height}]}>
            
            <KeyboardAvoidingView style={[styles.mainView, {height: height}]} 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

                <View style={styles.logoView}>
                    <Image source={Logo} style={[styles.logo, {alignSelf: "center"}]} resizeMode="contain" />
                </View>
                
                <View style={styles.inputView}>
                    <SignIn_SignUp_Buttons navigation={navigation} focus={isFocused}/>
                    <CustomInput
                        value={form.username}
                        setValue={handleChange}
                        placeholder="Username"
                        placeholderTextColor="black"
                        style={{}}
                    />
                    <CustomInput
                        value={form.password}
                        setValue={handleChange}
                        placeholder="Password"
                        placeholderTextColor="black"
                        secureTextEntry={true}
                        style={{}}
                    />
                    <CustomButton
                        text="Sign In"
                        onPress={() => setFormSubmitted(true)}
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

export default SignInScreen;