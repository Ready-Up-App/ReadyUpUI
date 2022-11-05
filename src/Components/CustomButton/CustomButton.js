import React, { useEffect, useState } from "react";

import { Text, StyleSheet, Pressable } from "react-native";

import Colors from "../../Constants/Colors";

const CustomButton = ({ onPress, text, color, padding }) => {

    function hasCustomStyles() {
        return (typeof(color) !== "undefined" || typeof(padding) !== "undefined");
    }

    return (
        <Pressable
            onPress={onPress}
            style={styles(color, padding).container}
        >
            <Text style={styles.text}>{text}</Text>
        </Pressable>
    );
}

const defaultColor = Colors.blue;
const defaultPadding = 15;

const styles = (color, padding) => StyleSheet.create({
    container: {
        backgroundColor: color ? color : defaultColor,

        width: "100%",

        padding: padding ? padding : defaultPadding,
        marginVertical: 25,

        alignItems: "center",
        borderRadius: 50
    },
    text: {},
});

export default CustomButton;