import url from "../urls";
import * as SecureStore from 'expo-secure-store';


export const signInCall = async (props) => {

    try {
        const result = await fetch(url.root + url.signIn,
            {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    Username_Email: props.username_email,
                    IsEmail: props.isEmail,
                    Password: props.password
                })
            }
        ).then(response => 
            response.json()
        )
        return result;
    } catch (error) {
        return error;   
    }
}

export const signUpCall = async (props) => {

    try {
        const result = await fetch(url.root + url.signUp,
            {
                method: "POST",
                withCredentials: true,
                credentials: "include",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    Username: props.username,
                    Email: props.email.toLowerCase(),
                    Password: props.password
                })
            }
        ).then(response => 
            response.json()
        )
        return result;
    } catch (error) {
        return error;
    }
    
}

export const continuousSignIn = async (props) => {
    let username_email = await SecureStore.getItemAsync("username");
    let password = await SecureStore.getItemAsync("password");
    let isEmail = false;

    if (username_email === undefined) {
        username_email = await SecureStore.getItemAsync("email");
        isEmail = true;
    } 

    try {
        const result = await fetch(url.root + url.signUp,
            {
                method: "POST",
                withCredentials: true,
                credentials: "include",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    Username_Email: username_email,
                    IsEmail: isEmail,
                    Password: password
                })
            }
        ).then(response => 
            response.json()
        )
        return result;
    } catch (error) {
        //USER MUST SIGN IN AGAIN.... SecureStore failure
        console.log("CRITICAL SECURE STORE FAILURE");
        return error;
    }
    
}
