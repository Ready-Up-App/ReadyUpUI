import { useEffect, useState } from "react";
import { getFriends } from "../../Api/PeopleAPI/PeopleApi";
import { View, FlatList, StyleSheet, TouchableOpacity, Text } from "react-native";

import Colors from "../../Constants/Colors";
import LoadScreen from "../Loading/LoadScreen";

const FriendsView = (props) => {

    const [friends, setFriends] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const showLoading = () => {
        setIsLoading(true);
    }

    const hideLoading = () => {
        setIsLoading(false);        
    }

    useEffect(() => {
        let isCancelled = false;
        showLoading();
        getFriends()
        .then((result) => {
            if(!isCancelled && result.ok) {
                return result.json();
            }
        }).then((result) => {
            setFriends(result.friends)
            hideLoading();
        }).catch((error) => {
            console.error(error.message)
        })
            
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
                <View style={{flex: 1}}> 
                    <TouchableOpacity style={styles.items} 
                    // onPress={() => select(item.name)}
                    >
                        <Text>{item.username}</Text>
                    </TouchableOpacity>
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
    items: {
        borderRadius: 10,
        borderColor: Colors.black,
        borderWidth: 1,
        margin: 10,
        padding: 10,

        backgroundColor: Colors.lightBlueGray
    },
    button: {
        flex: 1
    }
});

export default FriendsView;