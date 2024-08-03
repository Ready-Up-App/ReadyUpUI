import { useEffect, useState, useMemo } from "react"
import { View, FlatList, StyleSheet, TouchableOpacity, Text } from "react-native"

import { getGroupsCall } from "../../Api/GroupsAPI/GroupsApi"
import Colors from "../../Constants/Colors"

import LoadScreen from "../Loading/LoadScreen"


const GroupsView = ({ style, selectGroup}) => {

    const [groups, setGroups] = useState([]);

    const [selectedGroup, setSelectedGroup] = useState("");

    const [isLoading, setIsLoading] = useState(true);

    const showLoading = () => {
        setIsLoading(true);
    }

    const hideLoading = () => {
        setIsLoading(false);        
    }

    const select = (group) => {
        selectGroup(group);
        setSelectedGroup(group);
    }

    useEffect(() => {
        let isCancelled = false;
        showLoading();
        setSelectedGroup("");
        getGroupsCall()
        .then((groups) => {
            setGroups(groups);
            hideLoading();
        })
        .catch((error) => {
            console.error(error)
        });
            
        return () => {
            isCancelled = true;
        }
    }, [])


    return (isLoading ? <LoadScreen/> :
        
        selectedGroup === "" ? 
        <FlatList 
            style={styles.itemContainer}
            data={groups}
            renderItem={({item}) => (
                <View style={{flex: 1}}> 
                    <TouchableOpacity style={styles.items} 
                    onPress={() => select(item.name)}>
                        <Text>{item.name}</Text>
                    </TouchableOpacity>
                </View>
            )}
            numColumns={1}>
        </FlatList>
        :
        <View>
            <TouchableOpacity
                style={styles.items} 
                onPress={() => select("")}>
                <Text>BACK</Text>
            </TouchableOpacity>
            <Text>{selectedGroup}</Text>
        </View>
        
            
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

export default GroupsView;