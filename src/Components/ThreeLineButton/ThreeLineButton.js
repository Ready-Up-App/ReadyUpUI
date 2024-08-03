import { View, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../../Constants/Colors";


const ThreeLineButton = ({onPress}) => {

    return (
        <TouchableOpacity 
        onPress={onPress}
        style={styles.root}>
            <View style={styles.item}/>
            <View style={styles.item}/>
            <View style={styles.item}/>
        </TouchableOpacity>

    );
}



const styles = StyleSheet.create({
    root: {
        // flex: 0.3,
        margin: 4,
        flexDirection: "column",
        padding: 4,
        opacity: 0.5
    }, 
    item: {
        borderRadius: 10,
        borderColor: Colors.black,
        borderWidth: 1,
        margin: 1,
        padding: 3,
        backgroundColor: Colors.green,
    }
});
export default ThreeLineButton;