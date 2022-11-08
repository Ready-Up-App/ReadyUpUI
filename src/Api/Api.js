const root = "https://localhost:5001/api/";
const signIn = "signIn";
const signUp = "signUp";
const verify = "auth/verifyToken";

export const signInCall = async (props) => {

    try {
        const result = await fetch(root + signIn,
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    Email: props.email,
                    Password: props.password
                })
            }
        )
        return result;
    } catch (error) {
        return error.response.data   
    }
}

export const tokenSignInCall = async (token) => {

    try {
        const result = await fetch(root + signIn,
            {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    Token: token,
                })
            }
        )
        return result;
    } catch (error) {
        return error.response.data
    }
}


export const signUpCall = async (props) => {

    try {
        const result = await fetch(root + signUp,
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    Username: props.username,
                    Password: props.password,
                    Email: props.email.toLowerCase()
                })
            }
        )
        return result;
    } catch (error) {
        console.log(error)
        return error.response.data
    }
    
}
