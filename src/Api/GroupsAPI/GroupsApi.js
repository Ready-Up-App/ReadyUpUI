import AsyncStorage from "@react-native-async-storage/async-storage";
import url from "../urls";

import * as SecureStore from 'expo-secure-store';
import { asyncGetItem, asyncSetItem } from "../../../Utility/Cache/Cache";


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

const callGroupsApi = async () => {

    var token = await SecureStore.getItemAsync("token");
    const result = await fetch(url.getJoinable,
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
        }
    });
    return result;
}



export const createGroupCall = async (props) => {
    var token = await SecureStore.getItemAsync("token");
    const result = await fetch(url.createGroup, 
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
        });

    return result;
}