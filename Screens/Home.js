import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Colors from "../Constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { getApiCall } from "../Api/Api";

export default () => {
    return(
      <View style={styles.container}>
        <TouchableOpacity onPress={ () => getApiCall("https://catfact.ninja/fact") } style={styles.itemContainer}>
            <View>
                <Text style={styles.itemTitle}> API Call </Text>
            </View>

            <View>
                <TouchableOpacity onPress={ () => {} }>
                    <Ionicons name="options-outline" size={24} color="white"/>
                </TouchableOpacity>
            </View>


        </TouchableOpacity>
      </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    itemTitle: { fontSize: 24, padding: 5, color: "white" },
    itemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 100,
        flex: 1,
        borderRadius: 20,
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 15,
        backgroundColor: Colors.blue,
    },
    icon: {
        padding: 5,
        fontSize: 24,
    },
    centeredView: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50,
    },
    modalView: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});