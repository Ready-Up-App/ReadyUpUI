import { NavigationContainer } from '@react-navigation/native';

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


export default App;