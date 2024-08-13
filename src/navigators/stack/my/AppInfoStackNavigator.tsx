import { AppInfoStack } from "navigators/constants";
import AppInfoDetailScreen from "screens/MyStackScreens/AppInfoDetailScreen";
import AppInfoScreen from "screens/MyStackScreens/AppInfoScreen";

export default function AppInfoStackNavigator() {
    return (
        <AppInfoStack.Navigator>
            <AppInfoStack.Screen 
                name={'APP_INFO_LIST'}
                component={AppInfoScreen}
                options={{
                    headerTitle: '앱 정보',
                    headerTintColor: '#000',
                    headerBackTitleVisible: false,
                    headerTitleAlign: 'center'
                }}
            />
            <AppInfoStack.Screen 
                name={'APP_INFO_DETAIL'}
                component={AppInfoDetailScreen}
                options={{
                    headerTitle: '앱 정보',
                    headerTintColor: '#000',
                    headerBackTitleVisible: false,
                    headerTitleAlign: 'center'
                }}
            />
        </AppInfoStack.Navigator>
    );
}