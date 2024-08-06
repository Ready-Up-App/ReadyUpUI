import url from "../urls";
import * as SecureStore from 'expo-secure-store';
import { asyncDeleteItem, asyncGetItem, asyncSetItem } from "../../../Utility/Cache/Cache";


export const getFriends = async (overrideCache) => {
    if (overrideCache) {
        return callGetFriendsApi();
    }
    var friends = await asyncGetItem("friends")
    .catch((error) => {
        return error;
    })

    if (friends == null) {
        return callGetFriendsApi();
    }
    return friends;    
}

const callGetFriendsApi = async () => {

    var token = await SecureStore.getItemAsync("token");

    const result = await fetch(url.getFriends, 
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
            asyncSetItem("friends", result.clone())
            return result.json();
        }
    });
    return result;
}

export const searchPeople = async (username) => {
    if (username === undefined || username.length == 0) {
        return null;
    }

    var token = await SecureStore.getItemAsync("token");
    
    const result = await fetch(url.searchPerson,
        {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token.toString()
            },
            body: JSON.stringify({
                username: username
            })
        }
    );
    return result;
}

export const sendFriendRequest = async (username) => {
    var token = await SecureStore.getItemAsync("token");
    
    const result = await fetch(url.sendFriendRequest,
        {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token.toString()
            },
            body: JSON.stringify({
                toUsername: username
            })
        }
    );
    return result;
}


export const respondFriendRequest = async (username, isAccepted) => {

    var token = await SecureStore.getItemAsync("token");
    
    const result = await fetch(url.respondFriendRequest,
        {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token.toString()
            },
            body: JSON.stringify({
                otherUsername: username,
                accept: isAccepted
            })
        }
    );
    return result;
}