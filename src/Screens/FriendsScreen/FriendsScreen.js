import React, { useEffect, useState } from "react";

import { View, SafeAreaView, StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Colors from "../../Constants/Colors";

import FriendsView from "../../Components/FriendsView/FriendsView";
import SearchPeopleView from "../../Components/SearchPeopleView";
import BottomView from "../../Components/BottomView";
import { ConstStyles } from "../../Constants/Styles";

const FriendsNav = createMaterialTopTabNavigator()


const FriendScreen = ({navigation}) => {
     
    
    const [toggleSearch, setToggleSearch] = useState(false)

    const toggleSearchChange = () => {
        setToggleSearch(prev => (!prev));
    }

    const goToGroups = () => {
        setToggleSearch(false);
        navigation.navigate("Groups")
    }

    return (
        <SafeAreaView style={styles.root}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            enabled={false}>

            {/* <View style={ConstStyles.banner}>
                <TouchableOpacity style={styles.bannerGroupsButton} onPress={goToGroups}>
                    <Text style={{}}>Groups</Text>

                </TouchableOpacity>
                <Text style={styles.bannerTitle}>Friends</Text>
                <TouchableOpacity style={styles.searchFriendsButton} onPress={toggleSearchChange}>
                    <Text style={{}}>Search</Text>

                </TouchableOpacity>
            </View> */}
            <View style={styles.topView}>
                
                <FriendsNav.Navigator>
                    <FriendsNav.Screen name="FriendsView" component={FriendsView} />
                    <FriendsNav.Screen name="SearchPeople" component={SearchPeopleView} />
                </FriendsNav.Navigator>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
root: {
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
        flex: 1,
        backgroundColor: Colors.black,
        // justifyContent: "space-evenly",
        alignItems: "center",
        flexDirection: "row",
    },
        bannerTitle: {
            justifyContent: "center",
            alignContent: "center",
            textAlign: "center",
            alignSelf: "center",
            width: "62.6%"
        },
        bannerGroupsButton: {
            backgroundColor: Colors.blue,
            // aspectRatio: 1,
            // height: "40%",
            // borderRadius: 100,
            margin: "4%"
        },
        searchFriendsButton: {
            backgroundColor: Colors.blue,
            // aspectRatio: 1,
            // height: "40%",
            // borderRadius: 100,
            margin: "4%"

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