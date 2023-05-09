import url from "../urls";
import * as SecureStore from 'expo-secure-store';
import { useLogin } from "../../AppContext/LoginProvider";


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


//work in progress
export const signUpCall = async (props) => {
    const [ token, setToken ] = useState("");

    async function getToken() {
        setToken(await SecureStore.getItemAsync("token"));
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
                    "Authorization" : `Bearer ${token}`,
                },
                Authorization: {
                    
                },
                body: JSON.stringify({
                    Username: props.username,
                    Email: props.email.toLowerCase(),
                    Password: props.password
                })
                // method: "POST",
                // headers: {
                //     Accept: "application/json",
                //     "Content-Type": "application/json",
                // },
                // body: JSON.stringify({
                //     Username: props.username,
                //     Password: props.password,
                //     Email: props.email.toLowerCase()
                // })
            }
        )
        return result;
    } catch (error) {
        console.log(error)
        return error.response.data
    }
    
}
