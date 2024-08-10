import { useEffect, useState } from "react";
import { getFriends, respondFriendRequest } from "../../Api/PeopleAPI/PeopleApi";
import { View, FlatList, StyleSheet, TouchableOpacity, Text, Image, RefreshControl } from "react-native";

import LoadScreen from "../Loading/LoadScreen";
import FriendItem from "../FriendItem";


const FriendsView = (props) => {

    const [refreshing, setRefreshing] = useState(false);
    const [friends, setFriends] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const showLoading = () => {
        setIsLoading(true);
    }

    const hideLoading = () => {
        setIsLoading(false);        
    }

    const getFriendsCall = async (overrideCache) => {
        const result = await getFriends(overrideCache);
        setFriends(result.friends)
        hideLoading();
    }

    const onRefresh = () => {
        showLoading();
        getFriendsCall(true);
    }

    useEffect(() => {
        let isCancelled = false;
        showLoading();
        getFriendsCall(refreshing);
            
        return () => {
            isCancelled = true;
        }
    },[refreshing]);

    return (
        isLoading ? <LoadScreen/> :
        <FlatList 
            style={styles.itemContainer}
            data={friends}
            renderItem={({item}) => (
                    <FriendItem friendProp={item}/>
            )}
            numColumns={1}
            refreshControl={ 
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
            }
            />
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        height: "100%",
        marginVertical: 10,
        marginHorizontal: 10,
    },
});

export default FriendsView;