import React, { useEffect, useState } from "react";
import { SafeAreaView, View, StyleSheet, Image, useWindowDimensions, KeyboardAvoidingView, Platform, Text } from "react-native";
import * as SecureStore from 'expo-secure-store';


import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton/CustomButton";

import Colors from "../../Constants/Colors";

import { signInCall } from "../../Api/AuthenticationAPI/AuthApi";
import { useLogin } from "../../AppContext/LoginProvider";

import Logo from "../../../assets/regularIcon.png";
import SignIn_SignUp_Buttons from "../../Components/SignIn_SignUp_Buttons/SignIn_SignUp_Buttons";
import LoadScreen from "../../Components/Loading/LoadScreen";
import { validateSignIn } from "../../../Utility/FormValidator/FormValidator";

const SignInScreen = ({ navigation }) => {

    const { setIsLoggedIn } = useLogin();
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [form, setForm] = useState({ username: "", password: "" })

    const [errors, setErrors] = useState({});

    const [isFocused] = useState({signIn: navigation.isFocused(), signUp: !navigation.isFocused()});

    const { height } = useWindowDimensions();

    const options = { keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY }

    async function saveOnValidSignIn(token) {
        //TODO: find best way to safely store data
        if (await SecureStore.isAvailableAsync()) {
            await SecureStore.setItemAsync("username", form.username, options);
            await SecureStore.setItemAsync("password", form.password, options);
            await SecureStore.setItemAsync("token", token, options);
        }
    }

    const signIn = async () => {
        await signInCall(form)
            .then(result => {
                if (result.status == 401) {
                    throw new Error("Invalid username/password");
                }
                return result.json();
            }).then(result => {
                saveOnValidSignIn(result.accessToken);
                setIsLoggedIn(true);
            });
    }

    const submitForm = () => {
        setFormSubmitted(true)
    }

    const handleChange = (name, value) => {
        setForm(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    const validate = () => {
        let errorList = validateSignIn(form);
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
        
            // AsyncStorage.clear()
            signIn()
            .catch(error => {
                setErrors(prev => ({
                    ...prev,
                    network: error.message,
                }));
            }).finally(() => {
                setIsLoading(false);
                setFormSubmitted(false);
            })
        }
        setFormSubmitted(false)
    }, [formSubmitted])

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
                        
                        {errors["network"] && <Text style={styles.apiError}>{errors["network"]}</Text>}
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
                            placeholderTextColor="black"
                            secureTextEntry={true}
                            errors={errors["password"]}
                        />
                        <CustomButton
                            text="Sign In"
                            onPress={submitForm}
                            style={{ backgroundColor: Colors.green }}
                        />
                    </>}

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
    apiError: {
        textAlign: "center",
        color: Colors.red,
    },
});

export default SignInScreen;