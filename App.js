import React from 'react';

import { StyleSheet } from "react-native"
import { NavigationContainer } from '@react-navigation/native';

import Colors from './src/Constants/Colors';

import MainNavigator from './src/Navigation/MainNavigator';
import LoginProvider from './src/AppContext/LoginProvider';

const App = () => {

    return (
        <LoginProvider>
            <NavigationContainer>
                <MainNavigator />
            </NavigationContainer>
        </LoginProvider>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: Colors.blueGray,
    },
});

export default App;