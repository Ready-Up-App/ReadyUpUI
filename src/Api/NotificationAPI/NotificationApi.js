import url from "../urls";

import * as SecureStore from 'expo-secure-store';


export const getPushToken = async () => {
    var token = await SecureStore.getItemAsync("token");
    
    const result = await fetch(url.getPushToken,
        {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token.toString()
            }
        }
    )
    return result;
}


export const setPushToken = async (pushToken) => {

    var token = await SecureStore.getItemAsync("token");
    const result = await fetch(url.setPushToken,
        {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token.toString()
            },
            body: pushToken
        }
    )
    return result;
}