import React, { useEffect, useState } from "react";

    import { View, SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";
    
    import Colors from "../../Constants/Colors";
    
    import GroupsView from "../../Components/GroupsView/GroupsView";
    import ThreeLineButton from "../../Components/ThreeLineButton";
import FriendsView from "../../Components/FriendsView/FriendsView";

const FriendScreen = ({navigation}) => {
     
    
    return (
        <SafeAreaView style={styles.root}>
            <View style={styles.banner}>
                <ThreeLineButton onPress={() => navigation.navigate("Groups")}/>
                <Text style={{flex: 1}}>Friends</Text>
            </View>
            <View style={styles.topView}>
                <FriendsView style={styles.friendsView} />
            </View>
            <View style={styles.bottomView}>
            </View>
        </SafeAreaView>
    )
        
        
        

}

const styles = StyleSheet.create({
    root: {
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
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    friendsView: {
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

export default FriendScreen;