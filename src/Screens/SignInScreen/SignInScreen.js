import React, { useState } from "react";
import { View, StyleSheet, Image, useWindowDimensions, Text } from "react-native";

import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton/CustomButton";

import Colors from "../../Constants/Colors";

import { signInCall } from "../../Api/Api";
import { useLogin } from "../../AppContext/LoginProvider";

import Logo from "../../../assets/regularIcon.png";
import SignIn_SignUp_Buttons from "../../Components/SignIn_SignUp_Buttons/SignIn_SignUp_Buttons";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-web";

const SignInScreen = ({ navigation }) => {

    const { setIsLoggedIn } = useLogin();


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errors, setErrors] = useState({});

    const [isFocused] = useState({signIn: navigation.isFocused(), signUp: !navigation.isFocused()});

    const { height, width } = useWindowDimensions();

    const onSignInPressed = async () => {
        if (validate()) {
            try {
                const result = await signInCall({email, password});
                if (result.status == 200) {
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
        <SafeAreaView style={[styles.root, {height: height}]}>
            <View style={[styles.mainView, {height: height}]}>

                {/* Fix Image positioning with new ScrollView */}
                <View style={styles.logoView}>
                    <Image source={Logo} style={styles.logo} resizeMode="contain" />
                </View>

                
                <View style={styles.inputView}>
                    <SignIn_SignUp_Buttons navigation={navigation} focus={isFocused}/>
                    <CustomInput
                        value={email}
                        setValue={setEmail}
                        placeholder="Email"
                        placeholderTextColor="black"
                        style={{  }}
                    />
                    <CustomInput
                        value={password}
                        setValue={setPassword}
                        placeholder="Password"
                        placeholderTextColor="black"
                        secureTextEntry={true}
                        style={{  }}
                    />
                    <CustomButton
                    text="Sign In"
                    onPress={onSignInPressed}
                    style={{ backgroundColor: Colors.green }}
                    />
                </View>
                
                
                </View>
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
        flex:1,
        justifyContent: "flex-end",
        width: "75%",
        paddingBottom: "1%",
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
        // flexDirection: "column",
        // marginTop: 30,
        // marginBottom: 200,
    },
});

export default SignInScreen;