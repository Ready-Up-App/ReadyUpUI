import { useEffect, useState, useMemo } from "react"
import { View, FlatList, StyleSheet, Text } from "react-native"

import { getGroupsCall } from "../../Api/GroupsAPIs/GroupsAPI"
import Colors from "../../Constants/Colors"

import LoadScreen from "../Loading/LoadScreen"

const GroupsView = (props) => {

    const [groups, setGroups] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    console.log(groups)

    const showLoading = () => {
        setIsLoading(true);
    }

    const hideLoading = () => {
        setIsLoading(false);        
    }

    useEffect(() => {
        showLoading();
        try {
            getGroupsCall()
            .then((result) => setGroups(result))
            .then(hideLoading);

        } catch (error) {
            console.log(error)
        }
    }, [])

    
    return (
        <View style={[styles.root, props.style]}>
            {/* conditional loading for whether data is loaded from api */}
            {isLoading ? <LoadScreen/> : <FlatList 
                style={styles.itemContainer}
                data={groups}
                renderItem={({item}) => (
                    <View style={styles.items}>
                        <Text>{item.name}</Text>
                    </View>
                )}
                numColumns={2}>
            </FlatList>}
        </View>
    )




}

const styles = StyleSheet.create({
    root: {
        flexDirection: "row"
    },
    itemContainer: {
        padding: 10,
        
    },
    items: {
        flex: 1,
        borderRadius: 10,
        borderColor: Colors.black,
        borderWidth: 1,
        width: "50%",
        margin: 10,
        padding: 10,

        backgroundColor: Colors.lightBlueGray
    },
    temp: {
        backgroundColor: Colors.pink,
        flex: 1
    }
});

export default GroupsView;