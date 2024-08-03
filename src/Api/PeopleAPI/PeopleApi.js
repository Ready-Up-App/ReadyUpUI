import url from "../urls";
import * as SecureStore from 'expo-secure-store';


export const getFriends = async (props) => {
    var token = await SecureStore.getItemAsync("token");

    const result = await fetch(url.root + url.getFriends, 
        {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token.toString()
            }
        }
    );
    return result;
}