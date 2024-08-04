import React, { useEffect, useState } from "react";

import { View, SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";

import Colors from "../../Constants/Colors";

import ThreeLineButton from "../../Components/ThreeLineButton";
import FriendsView from "../../Components/FriendsView/FriendsView";
import SearchPeopleView from "../../Components/SearchPeopleView";

const FriendScreen = ({navigation}) => {
     
    
    const [toggleSearch, setToggleSearch] = useState(false)

    const toggleSearchChange = () => {
        setToggleSearch(prev => (!prev));
    }

    const navigateAway = () => {
        setToggleSearch(false);
        navigation.navigate("Groups")
    }

    return (
        <SafeAreaView style={styles.root}>
            <View style={styles.banner}>
                <View><ThreeLineButton onPress={navigateAway}/></View>
                <Text>Friends</Text>
                <View><ThreeLineButton onPress={toggleSearchChange}/></View>
            </View>
            <View style={styles.topView}>
                {toggleSearch ? 
                    <SearchPeopleView />
                :
                    <FriendsView />
                }
                
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
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
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
    bannerTitle: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        alignSelf: "center",
        flexBasis: "auto"
        // marginStart: "33.333%"
    }
});

export default FriendScreen;