import { View, Text, StyleSheet } from "react-native";

import Colors from "../../Constants/Colors";


const LoadScreen = ({style}) => {

    return (
       <View style={[styles.root, style]}>
            <Text style={styles.text}>
                ... LOADING ...
            </Text>
        </View>
    )
}


const styles = StyleSheet.create({
    root: {
        // flex: 1,
        height: "100%",
        width: "100%",
        alignItems: "center",
        top: "10%",
    },
    text: {
        fontSize: 13,
        color: Colors.green,
    },
});

export default LoadScreen;