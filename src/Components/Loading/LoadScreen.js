import { View, Text, StyleSheet } from "react-native";

import Colors from "../../Constants/Colors";


const LoadScreen = () => {

    return (
       <View style={styles.root}>
            <Text style={styles.text}>
                ... LOADING ...
            </Text>
        </View>
    )
}


const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: "center",
        top: "10%",
    },
    text: {
        fontSize: 13,
        color: Colors.green,
    },
});

export default LoadScreen;