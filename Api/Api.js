import React from "react";


export const root = "https://localhost:5001/api/";
export const signIn = "signIn";
export const signUp = "signUp";

export const getApiCall = (url) => {
    let response;
    fetch(root + url,
        {
            "method": "GET",
            "mode": "no-cors"
        }
    ).then( 
        //response => JSON.parse(response._bodyText)
    ).then(
        
        response => {console.log(response)}
        
    ).catch((err) => {
        console.error(err)
    });

}

export const signInCall = (email, password) => {
    let response;

    //check if already signed in!!
    fetch(root + signIn,
        {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: {
                Email: email,
                Password: password
            }
        }
    ).then((response) => response.json()
    ).catch((err) => {
        console.error(err)
    });
}

export const signUpCall = (username, password, email) => {
    let response;

    //check if already signed up!!
    fetch(root + signUp,
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
        
        (json) => {return data.id}
        
    ).catch((err) => {
        console.error(err)
    });

    
}