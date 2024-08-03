import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import GroupsScreen from '../GroupsScreen';
import FriendsView from '../../Components/FriendsView/FriendsView';

const Drawer = createDrawerNavigator();

const HomeScreen = (props) => {


    return (
        <Drawer.Navigator
            screenOptions={{headerShown: false}}
            initialRouteName="Groups">
                <Drawer.Screen name="Groups" component={GroupsScreen} />
                <Drawer.Screen name="FriendList" component={FriendsView} />
        </Drawer.Navigator>
    );
}


export default HomeScreen;