
const root = "http://10.0.2.2:8080/api";

const endpoints = {
    person: root + "/person",
    auth: root + "/auth",
    groups: root + "/groups",
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
}

export default url;