import React, { useEffect, useState } from "react";

import { Text, StyleSheet, Pressable } from "react-native";

import Colors from "../../Constants/Colors";

const CustomButton = ({ onPress, text, style }) => {

    return (
        <Pressable
            onPress={onPress}
            style={[styles.container, style]}
        >
            <Text style={styles.text}>{text}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.blue,

        width: "100%",

        padding: 15,
        marginVertical: 25,

        alignItems: "center",
        borderRadius: 50
    },
    text: {},
});

export default CustomButton;