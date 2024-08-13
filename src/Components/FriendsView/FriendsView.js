import { useEffect, useState } from "react";
import { getFriends } from "../../Api/PeopleAPI/PeopleApi";
import { FlatList, StyleSheet, Text, RefreshControl, SafeAreaView } from "react-native";

import LoadScreen from "../Loading/LoadScreen";
import FriendItem from "../FriendItem";
import Colors from "../../Constants/Colors";


const FriendsView = (props) => {

    const [refreshing, setRefreshing] = useState(false);
    const [friends, setFriends] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [errors, setErrors] = useState({});


    const showLoading = () => {
        setIsLoading(true);
    }

    const hideLoading = () => {
        setIsLoading(false);        
    }

    const getFriendsCall = async (overrideCache) => {
        showLoading();

        await getFriends(overrideCache)
        .then((result) => {
            if (result) {
                setFriends(result.friends)    
                setErrors({})
            }
        }).catch((error) => {
            setErrors(prev => ({
                ...prev,
                network: error.message,
            }))
        });
        hideLoading();
    }

    const onRefresh = () => {
        showLoading();
        getFriendsCall(true);
    }

    useEffect(() => {
        let isCancelled = false;
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
                        ListHeaderComponent={ 
                            errors["network"] && <Text style={styles.refreshErrorText}>{errors["network"]}</Text>
                        }
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
    refreshErrorText: {
        textAlign: "center",
        color: Colors.gray,
    },
});

export default FriendsView;