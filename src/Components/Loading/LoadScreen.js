import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

import Colors from "../../Constants/Colors";


const LoadScreen = (props) => {

    return (     
        <ActivityIndicator style={styles.root} color={Colors.lightGray} size={"large"}/>
    )
}


const styles = StyleSheet.create({
    root: {
        height: "100%",
        width: "100%",
    },
});

export default LoadScreen;