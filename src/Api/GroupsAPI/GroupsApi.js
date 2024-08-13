import AsyncStorage from "@react-native-async-storage/async-storage";
import url from "../urls";

import * as SecureStore from 'expo-secure-store';
import { asyncGetItem, asyncSetItem } from "../../../Utility/Cache/Cache";
import { callWithTimeout } from "../Util/Timeout";
import { continuousSignIn } from "../AuthenticationAPI/AuthApi";


export const getGroupsCall = async (overrideCache) => {    
    if (overrideCache) {
        return callGroupsApi();
    }
    var groups = await asyncGetItem("groups")
    .catch((error) => {
        return error;
    })

    if (groups == null) {
        return callGroupsApi()
    }
    return groups;
    
}

const callGroupsApi = async (isRetry) => {

    var token = await SecureStore.getItemAsync("token");
    const result = await callWithTimeout(fetch(url.getJoinable,
        {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token.toString()
            }
        }
    ).then((result) => {
        if(result.ok) {
            asyncSetItem("groups", result.clone())
            return result.json();
        } else if (!isRetry && result.status == 401) {
            console.log("CONTSIGN IN")
            return continuousSignIn().then((result) => {
                if (result.ok) {
                    return callGroupsApi(true)
                }
            })
        }
    }));
    return result;
}



export const createGroupCall = async (props, isRetry) => {
    var token = await SecureStore.getItemAsync("token");
    const result = await callWithTimeout(fetch(url.createGroup, 
        {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token.toString()
            },
            body: JSON.stringify({
                group: { name: props.title, description: props.description }
            })
        }
    )).then((result) => {
        if (!isRetry && result.status == 401) {
            return continuousSignIn().then((result) => {
                if (result.ok) {
                    return createGroupCall(props, true)
                }
            })
        }
        return result.json()
    });

    return result;
}