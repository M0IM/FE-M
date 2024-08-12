import { RevokeMoimStack } from "navigators/constants";
import RevokeMoimDetailScreen from "screens/MyStackScreens/RevokeMoimDetailScreen";
import RevokeMoimScreen from "screens/MyStackScreens/RevokeMoimScreen";

export default function RevokeMoimStackNavigator() {
    return (
        <RevokeMoimStack.Navigator>
            <RevokeMoimStack.Screen 
                name={'REVOKE_MOIM_LIST'}
                component={RevokeMoimScreen}
                options={{
                    headerTitle: '모임 탈퇴',
                    headerTintColor: '#000',
                    headerBackTitleVisible: false,
                    headerTitleAlign: 'center'
                }}
            />
            <RevokeMoimStack.Screen 
                name={'REVOKE_MOIM_DETAIL'}
                component={RevokeMoimDetailScreen}
                options={{
                    headerTitle: '모임 탈퇴',
                    headerTintColor: '#000',
                    headerBackTitleVisible: false,
                    headerTitleAlign: 'center'
                }}
            />
        </RevokeMoimStack.Navigator>
    );
}