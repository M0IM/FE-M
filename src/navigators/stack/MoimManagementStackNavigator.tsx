import { MoimManagementStack } from 'navigators/constants';
import JoinManageScreen from 'screens/MoimManagementScreens/JoinManageScreen';
import MoimInfoEditScreen from 'screens/MoimManagementScreens/MoimInfoEditScreen';
import MoimManageListScreen from 'screens/MoimManagementScreens/MoimManageListScreen';
import PermissionManageScreen from 'screens/MoimManagementScreens/PermissionManageScreen';

const MoimManagementStackNavigator = () => {
  return (
    <MoimManagementStack.Navigator
        initialRouteName={'MOIM_MANAGE_LIST'}
    >
        <MoimManagementStack.Screen 
            name={'MOIM_MANAGE_LIST'}
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