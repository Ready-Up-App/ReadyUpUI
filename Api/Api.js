import React from "react";


export const getApiCall = (url) => {
    let response;
    fetch(url,
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