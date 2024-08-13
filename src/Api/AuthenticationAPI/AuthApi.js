import url from "../urls";
import * as SecureStore from 'expo-secure-store';
import { callWithTimeout } from "../Util/Timeout";


export const signInCall = async (props) => {

    const result = await callWithTimeout(fetch(url.signIn,
        {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: props.username,
                password: props.password,
            })
        }
    ));
    return result;
}

export const signUpCall = async (props) => {

    
    const result = await callWithTimeout(fetch(url.signUp,
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
    ));
    return result;
}

export const continuousSignIn = async (props) => {
    let username = await SecureStore.getItemAsync("username");
    let password = await SecureStore.getItemAsync("password");
    
    const result = await signInCall({username, password})

    await saveToken(result.clone())

    return result;
}

const saveToken = async (tokenPromise) => {
    const tokenJson = await tokenPromise.json()
    SecureStore.setItemAsync("token", tokenJson.accessToken)
}