import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";

import Colors from "../../Constants/Colors";

import Splash from "../../../assets/miniIcon.png"
import { respondFriendRequest } from "../../Api/PeopleAPI/PeopleApi";
import { useState } from "react";

const FriendItem = ({friendProp}) => {
    

    const [friend, setFriend] = useState(friendProp);
    const [toggleActive, setToggleActive] = useState(true);

    const respondFriendRequestCall = async (username, isAccepted) => {
        setToggleActive(isAccepted)
        setFriend(prev => ({
            ...prev,
            accepted : isAccepted,
        }))
        await respondFriendRequest(username, isAccepted)
    }

    return (
        <View style={[friend.accepted ? styles.friend: styles.pendingFriend, toggleActive ? {}:{backgroundColor: Colors.gray}]}>
            <Text style={styles.friendUsernameText}>{friend.username}</Text>
            
            {friend.accepted  || !toggleActive ? 
                <View style={styles.pendingFriendButtonContainer}>
                    <TouchableOpacity style={styles.respondFriendButton}
                        // onPress={() => respondFriendRequestCall(friend.username, true)}
                        >
                        <Image source={Splash} resizeMode='contain' style={{flex: 0.1}}/>
                    </TouchableOpacity>
                </View>
            :
                <View style={styles.pendingFriendButtonContainer}>
                    <TouchableOpacity style={styles.respondFriendButton}
                        onPress={() => respondFriendRequestCall(friend.username, true)}>

                        <Image source={Splash} resizeMode='contain' style={{flex: 0.1}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.respondFriendButton}
                        onPress={() => respondFriendRequestCall(friend.username, false)}>

                        <Image source={Splash} resizeMode='contain' style={{flex: 0.1}}/>
                    </TouchableOpacity>
                </View>
            }
        </View>           
    )
}


const styles = StyleSheet.create({
    friend: {
        borderRadius: 10,
        borderColor: Colors.black,
        borderWidth: 3,
        padding: 10,
        marginBottom: 10,

        backgroundColor: Colors.lightBlueGray,
        flexDirection: "row"
    },
    pendingFriend: {
        borderRadius: 10,
        borderColor: Colors.black,
        borderWidth: 3,
        padding: 10,
        marginBottom: 10,
        
        backgroundColor: Colors.red,
        flexDirection: "row",
    },
    friendUsernameText: {
        width: "70%",
        alignSelf: "center",
        paddingLeft: 10,
    },
    pendingFriendButtonContainer: {
        flexDirection: "row",
    },
    respondFriendButton: {
    },
})

export default FriendItem;