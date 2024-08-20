import url from "../urls";
import * as SecureStore from 'expo-secure-store';
import { asyncGetItem, asyncSetItem } from "../../../Utility/Cache/Cache";
import { callWithTimeout } from "../Util/Timeout";
import { continuousSignIn } from "../AuthenticationAPI/AuthApi";


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

const callGetFriendsApi = async (isRetry) => {

    var token = await SecureStore.getItemAsync("token");

    const result = await callWithTimeout(fetch(url.getFriends, 
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
        } else if (!isRetry && result.status == 401) {
            return continuousSignIn().then((result) => {
                if (result.ok) {
                    return callGetFriendsApi(true)
                }
            })
        }
    }));
    return result;
}

export const searchPeople = async (username, isRetry) => {
    if (username === undefined || username.length == 0) {
        return null;
    }

    var token = await SecureStore.getItemAsync("token");
    
    const result = await callWithTimeout(fetch(url.searchPerson,
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
    )).then((result) => {
        if (!isRetry && result.status == 401) {
            return continuousSignIn().then((result) => {
                if (result.ok) {
                    return searchPeople(username, true)
                }
            })
        }
        return result;
    });
    return result;
}

export const sendFriendRequest = async (username, isRetry) => {
    var token = await SecureStore.getItemAsync("token");
    
    const result = await callWithTimeout(fetch(url.sendFriendRequest,
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
    )).then((result) => {
        if (!isRetry && result.status == 401) {
            return continuousSignIn().then((result) => {
                if (result.ok) {
                    return sendFriendRequest(username, true)
                }
            })
        }
        return result;
    });
    return result;
}


export const respondFriendRequest = async (username, isAccepted, isRetry) => {

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
    ).then((result) => {
        if (!isRetry && result.status == 401) {
            return continuousSignIn().then((result) => {
                if (result.ok) {
                    return respondFriendRequest(username, isAccepted, true)
                }
            })
        }
        return result;
    });
    return result;
}