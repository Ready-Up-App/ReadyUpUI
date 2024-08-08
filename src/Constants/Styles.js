import { StyleSheet } from "react-native";
import Colors from "./Colors";

export const ConstStyles = StyleSheet.create({
    root: {
        paddingTop: 10,
        height: "100%",
        width: "100%",
    },
    topView: {
        height: "84%",
        backgroundColor: Colors.blueGray,
        flexDirection: "column",
    },
    banner: {
        height: "8%",
        backgroundColor: Colors.black,
        alignItems: "center",
        flexDirection: "row",
    },
    bottomView: {
        height: "8%",
        borderColor: Colors.black,
        borderWidth: 1,
        backgroundColor: Colors.black,
        justifyContent: "center",
        alignItems: "center",
    },
})