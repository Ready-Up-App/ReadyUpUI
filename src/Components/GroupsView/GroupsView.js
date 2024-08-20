import { useEffect, useState } from "react"
import { View, FlatList, StyleSheet, TouchableOpacity, Text, RefreshControl, SafeAreaView, Platform } from "react-native"

import { getGroupsCall, joinGroup } from "../../Api/GroupsAPI/GroupsApi"
import Colors from "../../Constants/Colors"

import LoadScreen from "../Loading/LoadScreen"


const GroupsView = ({ setInGroup }) => {

    const [refreshing, setRefreshing] = useState(false);
    const [groups, setGroups] = useState([]);

    const [errors, setErrors] = useState({});

    const [selectedGroup, setSelectedGroup] = useState(null);

    const [isLoading, setIsLoading] = useState(true);

    const showLoading = () => {
        setIsLoading(true);
    }

    const hideLoading = () => {
        setIsLoading(false);        
    }

    const select = (group) => {
        setSelectedGroup(group);
    }

    const joinGroupCall = async (groupId) => {
        showLoading();
        const result = await joinGroup(groupId);
        
        hideLoading();
        if (result.ok){ 
            setInGroup(true)
        }
    }

    const getGroups = async (overrideCache) => {
        showLoading();
        setSelectedGroup(null);
        await getGroupsCall(overrideCache)
        .then((groups) => {
            setGroups(groups);
            setErrors({});
        }).catch((error) => {
            setErrors(prev => ({
                ...prev,
                network: error.message,
            }));
        })
        hideLoading();
    }

    const onRefresh = () => {
        getGroups(true)
    }

    useEffect(() => {
        let isCancelled = false;
        getGroups(true)
        return () => {
            isCancelled = true;
        }
    }, [])


    return (
        <SafeAreaView style={styles.root} 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            enabled={false}>
            
            {isLoading && <LoadScreen/>}
            {selectedGroup === null ? 
                <FlatList 
                    ListHeaderComponent={ 
                        errors["network"] && <Text style={styles.refreshErrorText}>{errors["network"]}</Text>
                    }
                    style={styles.itemContainer}
                    data={groups}
                    renderItem={({item}) => (
                        <View style={{flex: 1}}> 
                            <TouchableOpacity style={styles.items} 
                            onPress={() => select(item)}>
                                <Text>{item.name}</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    numColumns={1}
                    refreshControl={ 
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
                    }/>
            :
                <View style={styles.selectedGroupContainer}>
                    <TouchableOpacity
                        style={styles.items} 
                        onPress={() => select(null)}>
                        <Text>BACK</Text>
                    </TouchableOpacity>
                    {selectedGroup && selectedGroup.name && <Text>{selectedGroup.name}</Text> }
                    {selectedGroup && selectedGroup.description && <Text>{selectedGroup.description}</Text> }
                    {selectedGroup && selectedGroup.attendees &&  
                    <FlatList
                        style={styles.itemContainer}
                        data={selectedGroup.attendees}
                        renderItem={({item}) => (
                            <View style={styles.items}> 
                                <Text>{item.firstname}</Text>
                            </View>
                        )}
                        numColumns={5}
                    />}
                    {selectedGroup && 
                        <TouchableOpacity style={styles.joinGroupButton}
                            onPress={() => joinGroupCall(selectedGroup.id)}>
                            <Text>Join group</Text>
                        </TouchableOpacity>}
                </View>
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
        padding: 10,
        
    },
    selectedGroupContainer: {
        padding: 10,
        backgroundColor: Colors.gray
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
    },
    refreshErrorText: {
        textAlign: "center",
        color: Colors.gray,
    },
    joinGroupButton: {
        backgroundColor: Colors.lightBlueGray
    },
});

export default GroupsView;