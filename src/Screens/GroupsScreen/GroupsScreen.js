import React, { useEffect, useState } from "react";

import { View, SafeAreaView, StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Colors from "../../Constants/Colors";

import GroupsView from "../../Components/GroupsView/GroupsView";
import BottomView from "../../Components/BottomView";
import { ConstStyles } from "../../Constants/Styles";
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
                
            {/* <View style={styles.banner}>

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
                
            </View> */}
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
    paddingTop: "10%",
    backgroundColor: Colors.black,
    height: "100%",
    flexDirection: "column",
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