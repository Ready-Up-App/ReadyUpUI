import React, { useEffect, useState } from "react";

import { View, SafeAreaView, StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";

import Colors from "../../Constants/Colors";

import GroupsView from "../../Components/GroupsView/GroupsView";
import BottomView from "../../Components/BottomView";
import { ConstStyles } from "../../Constants/Styles";
import CreateGroupView from "../../Components/CreateGroupView/CreateGroupView";

const GroupsScreen = ({navigation}) => {
            
    const [selectedGroup, setSelectedGroup] = useState();
    const [goGroupCreate, setGoGroupCreate] = useState(false);

    const updateSelectedGroup = (group) => {
        setSelectedGroup(group);
    }

    const navCreateGroup = (val) => {
        setGoGroupCreate(val)
    }
    return (
        <SafeAreaView style={styles.root}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            enabled={false}>
                
            <View style={ConstStyles.banner}>

                {goGroupCreate ? 
                    <><TouchableOpacity onPress={() => navCreateGroup(false)} style={styles.friendsButton}>
                        <Text>Back</Text>
                    </TouchableOpacity>
                    <Text style={styles.bannerTitle}>Groups</Text></>
                :
                    <><TouchableOpacity onPress={() => navigation.navigate("FriendsList")} style={styles.friendsButton}>
                        <Text>Friends</Text>
                    </TouchableOpacity>
                    <Text style={styles.bannerTitle}>Groups</Text>
                    <TouchableOpacity onPress={() => navCreateGroup(true)} style={styles.friendsButton}>
                        <Text>Create</Text>
                    </TouchableOpacity></>
                }
                
            </View>
            <View style={ConstStyles.topView}>
                {goGroupCreate ? 
                    <CreateGroupView callable={navCreateGroup}/>
                : 
                    <GroupsView style={styles.groupsView} selectGroup={updateSelectedGroup}/>
                }
            </View>
            <BottomView navigation={navigation}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
root: {
    paddingTop: "10%",
    backgroundColor: Colors.black,
    flex: 1,
    flexDirection: "column",
}, 
    topView: {
        flex: 10,
        backgroundColor: Colors.blueGray,
        flexDirection: "row",
    },
    banner: {
        flex: 1,
        backgroundColor: Colors.black,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
    },
        bannerTitle: {
            width: "62.6%",
            justifyContent: "center",
            alignContent: "center",
            textAlign: "center"
        },
        friendsButton: {
            backgroundColor: Colors.blue,
            margin: "4%",
        },
    groupsView: {
        flex: 8,
        backgroundColor: Colors.blueGray
    },
    bottomView: {
        flex: 1,
        borderColor: Colors.black,
        borderWidth: 1,
        backgroundColor: Colors.black
    },
    
});

export default GroupsScreen;