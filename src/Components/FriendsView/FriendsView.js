import { useEffect, useState } from "react";
import { getFriends, respondFriendRequest } from "../../Api/PeopleAPI/PeopleApi";
import { View, FlatList, StyleSheet, TouchableOpacity, Text, Image } from "react-native";

import Colors from "../../Constants/Colors";
import LoadScreen from "../Loading/LoadScreen";

import Splash from "../../../assets/miniIcon.png"

const FriendsView = (props) => {

    const [friends, setFriends] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const showLoading = () => {
        setIsLoading(true);
    }

    const hideLoading = () => {
        setIsLoading(false);        
    }

    const respondFriendRequestCall = (username, isAccepted) => {
        respondFriendRequest(username, isAccepted)
        .then((result) => {
            getFriendsCall(true);
        })
        
    }
    const getFriendsCall = async (overrideCache) => {
        getFriends(overrideCache)
        .then((result) => {
            setFriends(result.friends)
            hideLoading();
        }).catch((error) => {
            console.error(error.message)
        })
    }

    useEffect(() => {
        let isCancelled = false;
        showLoading();
        getFriendsCall(false);
            
        return () => {
            isCancelled = true;
        }
    },[]);

    return (
        isLoading ? <LoadScreen/> :
        <FlatList 
            style={styles.itemContainer}
            data={friends}
            renderItem={({item}) => (
                <View style={item.accepted ? styles.friend: styles.pendingFriend}>
                    <Text style={styles.friendUsernameText}>{item.username}</Text>
                    {item.accepted ? 
                        <></>
                        :
                        <View style={styles.pendingFriendButtonContainer}>
                            <TouchableOpacity style={styles.respondFriendButton}
                                onPress={() => respondFriendRequestCall(item.username, true)}>

                                <Image source={Splash} resizeMode='contain' style={{flex: 0.1}}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.respondFriendButton}
                                onPress={() => respondFriendRequestCall(item.username, false)}>

                            <Image source={Splash} resizeMode='contain' style={{flex: 0.1}}/>
                            </TouchableOpacity>
                        </View>
                    }
                    
                </View>
            )}
            numColumns={1}>
        </FlatList>
    );
}

const styles = StyleSheet.create({
    root: {
        flexDirection: "row"
    },
    itemContainer: {
        padding: 10,
        
    },
        friend: {
            borderRadius: 10,
            borderColor: Colors.black,
            borderWidth: 3,
            margin: 10,
            padding: 10,

            backgroundColor: Colors.lightBlueGray,
            flexDirection: "row"
        },
        pendingFriend: {
            borderRadius: 10,
            borderColor: Colors.black,
            borderWidth: 3,
            margin: 10,
            padding: 10,

            backgroundColor: Colors.red,
            flexDirection: "row",

        },
            friendUsernameText: {
                flex: 1,
                alignSelf: "center"
            },
            pendingFriendButtonContainer: {
                flexDirection: "row"
            },
                respondFriendButton: {

                },
            

    button: {
        flex: 1
    }
});

export default FriendsView;