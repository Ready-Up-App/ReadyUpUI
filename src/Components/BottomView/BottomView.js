import { StyleSheet, TouchableOpacity, View, Text } from "react-native"
import Colors from "../../Constants/Colors";
import { ConstStyles } from "../../Constants/Styles";

const BottomView = ({navigation, settingsDisabled}) => {

    const SettingsPressed = () => {
        navigation.navigate("Settings");
    }

    return (
        <View style={ConstStyles.bottomView}>
            {settingsDisabled ? 
                <></>
            : 
                <TouchableOpacity
                    style={styles.settingsButton}
                    onPress={SettingsPressed}>

                    <Text style={{textAlign: "center"}}>SETTINGS</Text>
                </TouchableOpacity>
            }
            

        </View>
    )
}

const styles = StyleSheet.create({
    
    settingsButton: {
        width: "25%",
        aspectRatio: 2,
        backgroundColor: Colors.gray,
        justifyContent: "center"
    },
});

export default BottomView;