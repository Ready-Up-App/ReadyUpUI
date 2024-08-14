import React from "react";
import { View, TextInput, StyleSheet, Text, } from "react-native";

import Colors from "../../Constants/Colors";

const CustomInput = ({ value, setValue, placeholder, secureTextEntry, style, errors}) => {
    return (
        <>
        {errors && <Text style={{color: Colors.red, textAlign: "center"}}>{errors}</Text>}

        <View style={errors === undefined ? [styles.container, style] : [styles.container, style, styles.errorStyle]}>
            <TextInput
                value={value}
                placeholder={placeholder}
                placeholderTextColor={Colors.gray}
                style={styles.input}
                onChangeText={(val) => setValue(placeholder.toString().toLowerCase(), val)}
                secureTextEntry={secureTextEntry}
                autoCapitalize='none'
            />
        </View>
        </>
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
        justifyContent: "center",
    },
    input: {
        textAlign: "center",
    },
    errorStyle: {
        // textAlign: "center",
        borderColor: Colors.red,
        borderWidth: 2
    },
});

export default CustomInput;