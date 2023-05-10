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
