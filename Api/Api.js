import React from "react";


export const root = "https://localhost:5001/";

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

export const signInCall = (username, password) => {
    let response;

    //check if already signed in!!
    fetch(root + "items",
        {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
            //,
            // body: JSON.stringify({
            //     Username: username,
            //     Password: password
            // })
        }
    ).then((response) => response.json()
    ).then(
        
        (json) => {return data.id}
        
    ).catch((err) => {
        console.error(err)
    });

    
}