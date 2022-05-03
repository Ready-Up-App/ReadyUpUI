import React from "react";


export const root = "https://catfact.ninja/";

export const getApiCall = (url) => {
    let response;
    fetch(root + url,
        {
            "method": "GET"
        }
    ).then( 
        response => response.json()
    ).then(
        
        response => console.log(response.fact)
        
    ).catch( 
        err=> {console.log(err)}
    );

}

export const signInCall = (username, password) => {
    let response;

    //check if already signed in!!
    fetch(root + "fact",
        {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Username: username,
                Password: password
            })
        }
    ).then( 
        response => response.json()
    ).then(
        
        response => console.log(response)
        
    ).catch( 
        err=> {console.log(err)}
    );

    
}