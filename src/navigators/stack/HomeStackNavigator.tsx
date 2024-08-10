import { HomeStack } from 'navigators/constants';
import FeedTabNavigator from 'navigators/tab/FeedTabNavigator';
import MoimCreateScreen from 'screens/MoimCreateScreens/MoimCreateScreen';
import MoimSearchScreen from 'screens/MoimSearchScreens/MoimSearchScreen';

export default function HomeStackNavigator() {
    return (
        <HomeStack.Navigator
            initialRouteName={'HOME'}
        >
            <HomeStack.Screen 
                name={'HOME'}
                component={FeedTabNavigator}
                options={{
                    headerShown: false
                }}
            />
            <HomeStack.Screen 
                name={'MOIM_CREATE'}
                component={MoimCreateScreen}
                options={{
                    headerShown: false
                }}
            />
            <HomeStack.Screen 
                name={'MOIM_SEARCH'}
                component={MoimSearchScreen}
                options={{
                    headerShown: false
                }}
            />
        </HomeStack.Navigator>
    );
}