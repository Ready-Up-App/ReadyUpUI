import Constants from "expo-constants"

// const root = "http://localhost:8080/api";

const root =
  'http://'.concat(Constants.expoConfig?.hostUri?.split(':').shift()?.concat(':8080/api') ??
  'localhost:8080/api');
const endpoints = {
    person: root + "/person",
    auth: root + "/auth",
    groups: root + "/groups",
    notification: root + "/pushNotification"
}

const url = {

    signIn : endpoints.auth + "/signIn",
    signUp : endpoints.auth + "/signUp",

    getJoinable: endpoints.groups + "/getJoinable",
    createGroup: endpoints.groups + "/create",

    getFriends: endpoints.person + "/getFriends",
    searchPerson: endpoints.person + "/searchUsername",
    sendFriendRequest: endpoints.person + "/friendRequest",
    respondFriendRequest: endpoints.person + "/respondFriendRequest",

    getPushToken: endpoints.notification + "/getToken",
    setPushToken: endpoints.notification + "/setToken",
}

export default url;