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
    const [isLoading, setIsLoading] = useState(false);

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
        setIsLoading(true);

        await signUpCall({form})
        .then(result => {
            if (result.status != 200) {
                throw new Error("Username is taken!");
            }
            return result.json();
        }).then(result => {
            saveOnValidSignUp(result.accessToken)
            setIsLoggedIn(true);
        }).catch((error) =>{
            setErrors(prev => ({
                ...prev,
                network: error.message,
            }));            
        });
        
        setIsLoading(false);
        setFormSubmitted(false);
    }

    const validate = () => {
        let errorList = validateSignUp(form);
        if (Object.keys(errorList).length > 0) {
            setErrors(errorList);
            return false;
        }
        setErrors({});
        return true;
    }

    useEffect(() => {
        if (formSubmitted && validate()) {
            setIsLoading(true);
            AsyncStorage.clear();
            signUp()
        }
        setFormSubmitted(false)
    }, [formSubmitted]);

    return ( 
        
        <SafeAreaView style={[styles.root, {height: height}]}>
                
            <KeyboardAvoidingView style={[styles.mainView, {height: height}]} 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

                <View style={styles.logoView}>
                    <Image source={Logo} style={[styles.logo, {alignSelf: "center"}]} resizeMode="contain" />
                </View>

                <View style={styles.inputView}>
                    {isLoading ? <LoadScreen/> :
                        <><SignIn_SignUp_Buttons navigation={navigation} focus={isFocused}/>
                        <CustomInput
                            value={form.firstname}
                            setValue={handleChange}
                            placeholder="Firstname"
                            placeholderTextColor="black"
                            errors={errors["firstname"]}
                        />
                        <CustomInput
                            value={form.email}
                            setValue={handleChange}
                            placeholder="Email"
                            placeholderTextColor="black"
                            errors={errors["email"]}
                        />
                        <CustomInput
                            value={form.username}
                            setValue={handleChange}
                            placeholder="Username"
                            placeholderTextColor="black"
                            errors={errors["username"]}
                        />
                        <CustomInput
                            value={form.password}
                            setValue={handleChange}
                            placeholder="Password"
                            secureTextEntry={true}
                            placeholderTextColor="black"
                            errors={errors["password"]}
                        />
                        <CustomButton
                            text="Sign Up"
                            onPress={() => setFormSubmitted(true)}
                            style={{ backgroundColor: Colors.green }}
                        /></>
                    }
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