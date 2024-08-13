import React, { useState } from "react";

import { View, SafeAreaView, StyleSheet, Platform, StatusBar } from "react-native";

import Colors from "../../Constants/Colors";

import GroupsView from "../../Components/GroupsView/GroupsView";
import CreateGroupView from "../../Components/CreateGroupView/CreateGroupView";

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const GroupNav = createMaterialTopTabNavigator()

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

            <View style={styles.topView}>
                <GroupNav.Navigator screenOptions={{headerShown: false}} >
                    <GroupNav.Screen name="JoinableGroups" component={GroupsView} />
                    <GroupNav.Screen name="CreateGroup" component={CreateGroupView} />
                </GroupNav.Navigator>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
root: {
    backgroundColor: Colors.black,
    height: "100%",
    flexDirection: "column",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
}, 
    topView: {
        height: "100%",
        backgroundColor: Colors.blueGray,
        flexDirection: "row",
    },
    banner: {
        height: "10%",
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
});

export default GroupsScreen;