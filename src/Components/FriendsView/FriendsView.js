import { useEffect, useState } from "react";
import { getFriends, respondFriendRequest } from "../../Api/PeopleAPI/PeopleApi";
import { View, FlatList, StyleSheet, TouchableOpacity, Text, Image, RefreshControl, SafeAreaView } from "react-native";

import LoadScreen from "../Loading/LoadScreen";
import FriendItem from "../FriendItem";
import Colors from "../../Constants/Colors";


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
        <SafeAreaView style={styles.root}>
            {
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
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    root: {
        height: "100%",
        backgroundColor: Colors.blueGray,
    },
    itemContainer: {
        height: "100%",
        marginVertical: 10,
        marginHorizontal: 10,
    },
});

export default FriendsView;