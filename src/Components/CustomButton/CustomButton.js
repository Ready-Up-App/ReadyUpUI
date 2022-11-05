import React from "react";

import { Text, StyleSheet, Pressable } from "react-native";

import Colors from "../../Constants/Colors";

const CustomButton = ({ onPress, text }) => {

    return (
        <Pressable onPress={onPress} style={styles.container}>
            <Text style={styles.text}>{text}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.green,

        width: "100%",

        padding: 15,
        marginVertical: 15,

        alignItems: "center",
        borderRadius: 50
    },
    text: {},
});

export default CustomButton;