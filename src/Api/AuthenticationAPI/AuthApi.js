import url from "../urls";
import * as SecureStore from 'expo-secure-store';


export const signInCall = async (props) => {

    const result = await fetch(url.root + url.signIn,
        {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: props.form.username,
                password: props.form.password,
            })
        }
    );
    return result;
}

export const signUpCall = async (props) => {

    
    const result = await fetch(url.root + url.signUp,
        {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: props.form.username,
                email: props.form.email.toLowerCase(),
                firstname: props.form.firstname,
                password: props.form.password
            })
        }
    )
    return result;
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
