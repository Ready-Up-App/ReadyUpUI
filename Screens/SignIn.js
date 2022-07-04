
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import Colors from "../Constants/Colors";
import { getApiCall, signInCall } from "../Api/Api"; 

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
 
  return (
    <View style={styles.container}>
 
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Username"
          placeholderTextColor={"white"}
          onChangeText={(username) => setUsername(username)}
        />
      </View>
 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor={"white"}
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
 
      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>
 
      <TouchableOpacity 
        style={styles.loginBtn}
        onPress={ () => getApiCall("items") }
      >
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blueGray,
    alignItems: "center",
    justifyContent: "center",
  },
 
  image: {
    marginBottom: 40,
  },
 
  inputView: {
    backgroundColor: Colors.darkGray,
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
 
    alignItems: "center",
  },
 
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
 
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
 
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: Colors.teal,
  },
});

// class SignIn extends React.Component {
//     constructor(){
//         super();
//         this.state = {
//             username: "",
//             password: "",
//             result: false,
//         }
//     }

//     updateState = () => {
//         this.setState({ myState: 'Updated state' })
//     }

//     _userLogin() {
//         var username = this.state.username;
//         var pword = this.state.password;

//     }

//     handleUsername = (text) => {
//         this.setState({ username: text });
//     }

//     handlePassword = (text) => {
//         this.setState({ password: text });
//     }

//     renderResults = () => {
//         if(responseData){
//              this.setState({
//                  result: true
//              })
//         }
//     }

//     render() {
//         return (
//            <View>
//               {this.state.result ?
//                    <PresentationalComponent/>
//                    :
//                    <View>
//                       <TextInput
//                         underlineColorAndroid = "transparent"
//                         placeholder = "Username"
//                         placeholderTextColor = "#9a73ef"
//                         autoCapitalize = "none"
//                         onChangeText = {this.handleUsername}
//                       />
//                       <TextInput
//                          underlineColorAndroid = "transparent"
//                          placeholder = "Password"
//                          placeholderTextColor = "#9a73ef"
//                          autoCapitalize = "none"
//                          onChangeText = {this.handlePassword}
//                       />
//                       <Button
//                            onPress={this._userLogin}
//                            title="Learn More"
//                            color="#841584"
//                            accessibilityLabel="Learn more about this purple button"
//                        />
//                    </View>
//               }
//            </View>
//         );
//      }
// }