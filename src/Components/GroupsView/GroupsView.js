import { useEffect, useState } from "react"
import { View, FlatList, StyleSheet, TouchableOpacity, Text, RefreshControl, SafeAreaView, Platform } from "react-native"

import { getGroupsCall } from "../../Api/GroupsAPI/GroupsApi"
import Colors from "../../Constants/Colors"

import LoadScreen from "../Loading/LoadScreen"


const GroupsView = ({ style, selectGroup}) => {

    const [refreshing, setRefreshing] = useState(false);
    const [groups, setGroups] = useState([]);

    const [errors, setErrors] = useState({});

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

    const getGroups = async (overrideCache) => {
        showLoading();
        setSelectedGroup("");
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
            
            {isLoading ? <LoadScreen/> :

                selectedGroup === "" ? 
                <FlatList 
                    ListHeaderComponent={ 
                        errors["network"] && <Text style={styles.refreshErrorText}>{errors["network"]}</Text>
                    }
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
                    numColumns={1}
                    refreshControl={ 
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
                    }
                    />
                :
                <View>
                    <TouchableOpacity
                        style={styles.items} 
                        onPress={() => select("")}>
                        <Text>BACK</Text>
                    </TouchableOpacity>
                    <Text>{selectedGroup}</Text>
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
});

export default GroupsView;