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
                    headerTitle: '모임 생성',
                    headerTintColor: '#000',
                    headerLeftLabelVisible: false
                }}
            />
            <HomeStack.Screen 
                name={'MOIM_SEARCH'}
                component={MoimSearchScreen}
                options={{
                    headerTitle: '모임 찾기',
                    headerTintColor: '#000',
                    headerLeftLabelVisible: false
                }}
            />
        </HomeStack.Navigator>
    );
}