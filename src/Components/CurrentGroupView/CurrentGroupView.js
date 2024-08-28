import { useEffect, useState } from "react";
import { FlatList, View, SafeAreaView, StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native";
import { getCurrentGroup, leaveGroup } from "../../Api/GroupsAPI/GroupsApi";
import Colors from "../../Constants/Colors";
import LoadScreen from "../Loading/LoadScreen";
import * as SecureStore from 'expo-secure-store';
import { setReadyStatus } from "../../Api/PeopleAPI/PeopleApi";


const CurrentGroupView = ({setInGroup}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [currentGroup, setCurrentGroup] = useState();
    const [groupedUser, setGroupedUser] = useState();
    const [refreshing, setRefreshing] = useState(false);

    const getCurrentGroupCall = async () => {
        setIsLoading(true);
        const result = await getCurrentGroup();
        setCurrentGroup(result.group);

        let username = await SecureStore.getItemAsync("username");

        setGroupedUser(result.group.attendees.find((person) => {return person.username === username}));
        setIsLoading(false);
    }
    
    const leaveGroupCall = async () => {
        setIsLoading(true);
        const result = await leaveGroup();
        if (result.ok) {
            setInGroup(false);
        }
        setIsLoading(false);
    }

    const setReadyStatusCall = async () => {
        setIsLoading(true);
        const result = await setReadyStatus(!groupedUser.readyStatus);
        if (result.ok) {
            setGroupedUser(prev => ({
                ...prev,
                readyStatus: !prev.readyStatus,
            })) 
        }
        setIsLoading(false);
    }
    const onRefresh = () => {
        getCurrentGroupCall();
    }

    useEffect(() => {
        getCurrentGroupCall();
    },[]);
    console.log(groupedUser)

    return (

        <SafeAreaView style={styles.root}>
            {isLoading && <LoadScreen/> }
            
            {currentGroup && 
                <><FlatList
                    style={styles.membersContainer}
                    data={currentGroup.attendees}
                    renderItem={({item}) => (
                            <View style={[styles.member, {backgroundColor: item.readyStatus ? Colors.green: Colors.red}]}> 
                                <Text>{item.firstname}</Text>
                            </View>
                    )}
                    numColumns={5}
                    contentContainerStyle={styles.container}
                    ListHeaderComponent={
                        <View >
                            <Text style={{textAlign: "center"}}>Title</Text>
                            {currentGroup && <Text style={styles.groupTitleText}>{currentGroup.name}</Text>}
                            <Text style={{textAlign: "center"}}>Description</Text>
                            {currentGroup && <Text style={styles.groupTitleText}>{currentGroup.description}</Text>}
                            <Text style={{textAlign:"center"}}>Attendees</Text> 
                        </View>
                    }
                    ListFooterComponent={
                        groupedUser && 
                        <TouchableOpacity style={groupedUser.readyStatus ? styles.notReadyButtonContainer : styles.readyButtonContainer}
                            onPress={setReadyStatusCall}>
                            {!groupedUser.readyStatus ?  
                                <Text style={styles.readyupText}>Ready</Text> 
                            :
                                <Text style={styles.readyupText}>UnReady</Text>     
                            }
                        </TouchableOpacity>
                    }
                />
                
                <TouchableOpacity style={styles.leaveGroupButton} onPress={() => leaveGroupCall()}>
                    <Text>Leave Group</Text>
                </TouchableOpacity>
                </>
            }
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: Colors.blueGray,
    },
    container: {
        margin: 10,
        backgroundColor: Colors.black,
        borderRadius: 25,
        // flex:1,
    },
    groupContainer: {
        flex : 3,
        flexDirection: "column",
        backgroundColor: Colors.black,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },
    readyButtonContainer: {
        flex: 1,
        backgroundColor: Colors.green,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
    notReadyButtonContainer: {
        flex: 1,
        backgroundColor: Colors.red,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
    membersContainer: {
        padding: 10
        
    },
    readyupText: {
        textAlign: "center",
        fontSize: 75,
        flexWrap: "wrap"
    },
    groupTitleText: {
        textAlign: "center",
    },
    member: {
        backgroundColor: Colors.gray,
        padding: 10,
        margin: 10,
        borderRadius: 25,
    },
    memberSeparator: {
        borderWidth: 1
    },
    leaveGroupButton: {
        // flex: 1,
        padding: 10,
        margin: 20,
        backgroundColor: Colors.red,
    }
})

export default CurrentGroupView;