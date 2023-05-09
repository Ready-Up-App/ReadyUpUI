import React, { useEffect, useState } from "react";

import { View, SafeAreaView, StyleSheet, Text } from "react-native";

import Colors from "../../Constants/Colors";

import GroupsView from "../../Components/GroupsView/GroupsView";

const GroupsScreen = () => {
            
    const [selectedGroup, setSelectedGroup] = useState();

    const updateSelectedGroup = (group) => {
        setSelectedGroup(group);
    }

    return (
        <SafeAreaView style={styles.root}>
            <View style={styles.banner}>
                <Text> READY UP </Text>
            </View>
            <View style={styles.topView}>
                <GroupsView style={styles.groupsView} selectGroup={updateSelectedGroup}/>
            </View>

            <View style={styles.bottomView}>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: Colors.blueGray,
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
    },
    groupsView: {
        flex: 8,
    },
    bottomView: {
        flex: 1,
        borderColor: Colors.black,
        borderWidth: 1,
        backgroundColor: Colors.black
    },
});

export default GroupsScreen;