import { HomeStack } from 'navigators/constants';
import FeedTabNavigator from 'navigators/tab/FeedTabNavigator';
import MoimCreateScreen from 'screens/MoimCreateScreens/MoimCreateScreen';
import MoimSearchScreen from 'screens/MoimSearchScreens/MoimSearchScreen';
import MoimTopTabNavigator from 'navigators/tab/MoimTopTabNavigator';

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
                    headerLeftLabelVisible: false,
                    headerTitleAlign: 'center'
                }}
            />
            <HomeStack.Screen 
                name={'MOIM_SEARCH'}
                component={MoimSearchScreen}
                options={{
                    headerTitle: '모임 찾기',
                    headerTintColor: '#000',
                    headerLeftLabelVisible: false,
                    headerTitleAlign: 'center'
                }}
            />
            <HomeStack.Screen 
                name={'MOIM_STACK'}
                component={MoimTopTabNavigator}
                options={{
                    headerTitle: '모임 홈',
                    headerLeft: () => <></>
                }}
            />
        </HomeStack.Navigator>
    );
}