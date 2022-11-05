const root = "https://localhost:5001/api/";
const signIn = "signIn";
const signUp = "signUp";

export const signInCall = async (email, password) => {
    let response;

    //check if already signed in!!
    return await fetch(root + signIn,
        {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Email: email,
                Password: password
            })
        }
    ).then(response => response.json()
    ).catch((err) => {
        console.error(err)
    });
}

export const signUpCall = async (username, password, email) => {
    let response;

    //check if already signed up!!
    return await fetch(root + signUp,
        {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Username: username,
                Password: password,
                Email: email
            })
        }
    ).then((response) => response.json()
    ).then(
        (json) => { return data.id }
    ).catch((err) => {
        console.error(err)
    });
}