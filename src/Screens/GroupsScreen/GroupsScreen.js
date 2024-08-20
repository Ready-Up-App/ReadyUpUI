import React, { useEffect, useState } from "react";

import { View, SafeAreaView, StyleSheet, Platform, StatusBar } from "react-native";

import Colors from "../../Constants/Colors";

import GroupsView from "../../Components/GroupsView/GroupsView";
import CreateGroupView from "../../Components/CreateGroupView/CreateGroupView";

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CurrentGroupView from "../../Components/CurrentGroupView";
import { getCurrentGroup } from "../../Api/GroupsAPI/GroupsApi";

const InGroupNav = createMaterialTopTabNavigator()
const OutOfGroupNav = createMaterialTopTabNavigator()

const GroupsScreen = ({navigation}) => {

    const [inGroup, setInGroup] = useState(false)

    const handleUpdate = (value) => {
        setInGroup(value);
    }

    useEffect(() => {

        getCurrentGroup().then((result) => {
            setInGroup(result.group != null);
        });
    },[])

    return (
        <SafeAreaView style={styles.root}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            enabled={false}>

            <View style={styles.topView}>
                
                {inGroup && 
                    <InGroupNav.Navigator screenOptions={{headerShown: false}} >
                        <InGroupNav.Screen name="CurrentGroup">
                            {(setInGroup) => <CurrentGroupView setInGroup={handleUpdate}/>}
                        </InGroupNav.Screen>
                    </InGroupNav.Navigator>}

                {!inGroup &&
                    <OutOfGroupNav.Navigator>
                        <OutOfGroupNav.Screen name="JoinableGroups">
                            {(setInGroup) => <GroupsView setInGroup={handleUpdate}/>}
                        </OutOfGroupNav.Screen>
                        <OutOfGroupNav.Screen name="CreateGroup">
                            {(setInGroup) => <CreateGroupView setInGroup={handleUpdate}/>}
                        </OutOfGroupNav.Screen>
                    </OutOfGroupNav.Navigator>}
            
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