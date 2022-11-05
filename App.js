import React from 'react';
import { SafeAreaView, StyleSheet,  View } from "react-native"
import Colors from './src/Constants/Colors';
import SignInScreen from './src/Screens/SignInScreen/SignInScreen';
import SignUpScreen from './src/Screens/SignUpScreen/SignUpScreen';

const App = () => {

    return (
        //Very first thing should be checking storage to see if their login was saved
        //if (SignIn!= saved and session != saved ), go straight to main app navigation
        //else, go to signin screen

        <SafeAreaView style={styles.root}>
            <SignInScreen />
            <SignUpScreen />
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: Colors.blueGray,
    },
});

export default App;