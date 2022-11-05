import React, { useState } from "react";

import { View, TextInput, StyleSheet } from "react-native";

import Colors from "../../Constants/Colors";

const CustomInput = ({ value, setValue, placeholder, secureTextEntry, placeholderTextColor }) => {
    
    return (
        <View style={styles.container}>
            <TextInput
                value={value}
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
                style={styles.input}
                onChangeText={setValue}
                secureTextEntry={secureTextEntry}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        width: "100%",

        borderColor: Colors.gray,
        borderWidth: 1,
        borderRadius: 50,

        paddingVertical: 10,
        marginVertical: 5,
    },
    input: {
        textAlign: "center",
        // marginHorizontal: 5,
    },
});

export default CustomInput;