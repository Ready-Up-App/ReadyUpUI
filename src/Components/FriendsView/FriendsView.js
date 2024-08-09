import { useEffect, useState } from "react";
import { getFriends, respondFriendRequest } from "../../Api/PeopleAPI/PeopleApi";
import { View, FlatList, StyleSheet, TouchableOpacity, Text, Image } from "react-native";

import LoadScreen from "../Loading/LoadScreen";
import FriendItem from "../FriendItem";


const FriendsView = (props) => {

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

    useEffect(() => {
        let isCancelled = false;
        showLoading();
        getFriendsCall(true);
            
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
                    <FriendItem friendProp={item}/>
            )}
            numColumns={1}>
        </FlatList>
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