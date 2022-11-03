import { Button, StyleSheet, TouchableOpacity } from "react-native";
import React ,{ Component } from "react";
import { View, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-web";
import { getApiCall, signInCall } from "../Api/Api";
import Colors from "../Constants/Colors";



export default class Authentication extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Email: "",
            Username: "",
            Password: ""
        }
    }

    setPassword=(email)=>{
        this.setState({Email: email})
    }

    setUsername=(uname)=>{
        this.setState({Username: uname})
    }

    setPassword=(pword)=>{
        this.setState({Password: pword})
    }

    signIn(){
        signInCall(this.state.Email, this.state.Password);
        // getApiCall("items");
    }

    render() {
        return (
            <SafeAreaView >
                <SafeAreaView style={styles.titleContainer}>
                    <Text
                        style={styles.itemTitle}
                    >
                        Welcome to
                    </Text>
                    <Text
                        style={styles.itemTitle}
                    >
                        ReadyUp
                    </Text>
                </SafeAreaView>

                <SafeAreaView style={styles.signInContainer}>
                    <TextInput 
                        style={styles.input}
                        onChangeText={(text) => this.setUsername(text)}
                        value={this.state.Username}
                        placeholder="Username"
                    />
                    <TextInput 
                        style={styles.input}
                        onChangeText={(text) => this.setPassword(text)}
                        value={this.state.Password}
                        placeholder="Password"
                    />

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.signIn()}
                    >
                        <Text style={styles.itemTitle}>
                            Login
                        </Text>
                        
                    </TouchableOpacity>
                </SafeAreaView>
            </SafeAreaView>

        );
    }
}

const styles = StyleSheet.create({
    button: {
        fontSize: 24,
        height: "50%",
        width: "50%",
        margin: "5%",
        backgroundColor: Colors.green,
    },
    input: {
        height: "50%",
        width: "50%",
        margin: "5%",
        borderWidth: 1,
        padding: "5%",
    },
    titleContainer: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        flex: 1,
        // backgroundColor: Colors.green,
    },
    title: {
        height: "100%",
        fontSize: 100,
    },


    container: {
        flex: 1,
        // backgroundColor: "#57687C",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        margin: 0,
        flexWrap: "wrap",
        height: "100%"
    },
    itemTitle: { fontSize: 24, padding: 5, color: "white" },
    signInContainer: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        // height: "100%",
        flex: 1,
        // borderRadius: 20,
        // marginHorizontal: 20,
        // marginVertical: "0%",
        // padding: 15,
        // backgroundColor: Colors.blueGray,
    },
});

