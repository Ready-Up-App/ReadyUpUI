import { useEffect, useState } from "react"
import { View, FlatList, StyleSheet, Text } from "react-native"

import { getGroupsCall } from "../../Api/GroupsAPIs/GroupsAPI"
import Colors from "../../Constants/Colors"

const GroupsView = (props) => {

    const [groups, setGroups] = useState([]);

    console.log(groups)
    useEffect(() => {
        try {
                if(groups[0] === undefined){
                    getGroupsCall()
                    .then((result) => setGroups(result));        
                }else {
                    getGroupsCall()
                    .then((result) => setGroups((oldGroups) => [...oldGroups, result]));
                }

        } catch (error) {
            console.log(error)
            console.log("failed")            
        }
    }, [])

    return (
        <View style={[styles.root, props.style]}>
            <FlatList 
                style={styles.itemContainer}
                data={groups}
                renderItem={({item}) => (
                    <View style={styles.items}>
                        <Text>{item.name}</Text>
                    </View>
                )}
                numColumns={2}>
            </FlatList>
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
    }
});

export default GroupsView;