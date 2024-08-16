import { useRoute } from '@react-navigation/native';
import { MoimManagementStack } from 'navigators/constants';
import { MoimManagementRouteProp } from 'navigators/types';
import JoinManageScreen from 'screens/MoimManagementScreens/JoinManageScreen';
import MoimInfoEditScreen from 'screens/MoimManagementScreens/MoimInfoEditScreen';
import MoimManageListScreen from 'screens/MoimManagementScreens/MoimManageListScreen';
import PermissionManageScreen from 'screens/MoimManagementScreens/PermissionManageScreen';

const MoimManagementStackNavigator = () => {
    const route = useRoute<MoimManagementRouteProp>();
    const id = route.params.id;
    
    return (
        <MoimManagementStack.Navigator
            initialRouteName={'MOIM_MANAGE_LIST'}
        >
            <MoimManagementStack.Screen 
                name={'MOIM_MANAGE_LIST'}
                initialParams={{ id }}
                component={MoimManageListScreen}
                options={{
                    headerShown: false,
                }}
            />
            <MoimManagementStack.Screen 
                name={'PERMISSION_MANAGEMENT'}
                component={PermissionManageScreen}
            />
            <MoimManagementStack.Screen 
                name={'JOIN_MANAGEMENT'}
                component={JoinManageScreen}
            />
            <MoimManagementStack.Screen 
                name={'MOIM_INFO_EDIT'}
                component={MoimInfoEditScreen}
            />
        </MoimManagementStack.Navigator>
    );
};

export default MoimManagementStackNavigator;