import { useEffect, useState } from "react";
import { FlatList, View, SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { getCurrentGroup, leaveGroup } from "../../Api/GroupsAPI/GroupsApi";
import Colors from "../../Constants/Colors";
import LoadScreen from "../Loading/LoadScreen";


const CurrentGroupView = ({setInGroup}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [currentGroup, setCurrentGroup] = useState();
    const [refreshing, setRefreshing] = useState(false);

    const getCurrentGroupCall = async () => {
        setIsLoading(true);
        await getCurrentGroup()
        .then((result) => {
            setCurrentGroup(result.group);
        });
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

    const onRefresh = () => {
        getCurrentGroupCall();
    }
    useEffect(() => {
        getCurrentGroupCall();
    },[]);

    return (

        <SafeAreaView style={styles.root}>
            {isLoading && <LoadScreen/> }
            <View style={styles.container} >
                <View style={styles.groupContainer}>
                    <Text style={{textAlign: "center"}}>Title</Text>
                    {currentGroup && <Text style={styles.groupTitleText}>{currentGroup.name}</Text>}
                    <Text style={{textAlign: "center"}}>Description</Text>
                    {currentGroup && <Text style={styles.groupTitleText}>{currentGroup.description}</Text>}
                    {currentGroup && 
                        <FlatList
                            style={styles.membersContainer}
                            data={currentGroup.attendees}
                            renderItem={({item}) => (
                                <View style={styles.member}> 
                                    <Text>{item.firstname}</Text>
                                </View>
                            )}
                            numColumns={5}
                            ListHeaderComponent={<Text style={{textAlign:"center"}}>Attendees</Text>}
                        />
                    }

                    {currentGroup && <TouchableOpacity style={{padding: 10}} onPress={() => leaveGroupCall()}><Text>Leave Group</Text></TouchableOpacity>}
                </View>
                <TouchableOpacity style={styles.readyButtonContainer}>
                    <Text style={styles.readyupText}>Ready</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: Colors.blueGray,
    },
    container: {
        flex: 1,
        margin: 10
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
    }
})

export default CurrentGroupView;