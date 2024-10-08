import {useRoute} from '@react-navigation/native';
import {MoimManagementStack} from 'navigators/constants';
import {MoimManagementRouteProp} from 'navigators/types';
import JoinManageScreen from 'screens/MoimManagementScreens/JoinManageScreen';
import MoimManageListScreen from 'screens/MoimManagementScreens/MoimManageListScreen';
import PermissionManageScreen from 'screens/MoimManagementScreens/PermissionManageScreen';
import DelegationAuthorityScreen from 'screens/MoimManagementScreens/DelegationAuthorityScreen.tsx';
import MoimCreateTodoScreen from 'screens/MoimManagementScreens/MoimCreateTodoScreen.tsx';
import MoimGetTodoScreen from 'screens/MoimManagementScreens/MoimGetTodoScreen.tsx';
import MoimTodoDetailScreen from 'screens/MoimManagementScreens/MoimTodoDetailScreen.tsx';
import MyMoimAssignmentCheckScreen from 'screens/MoimManagementScreens/MyMoimAssignmentCheckScreen.tsx';
import MoimCreateScreen from 'screens/MoimCreateScreens/MoimCreateScreen';
import MoimAddMemberScreen from 'screens/MoimManagementScreens/MoimAddMemberScreen.tsx';
import MoimDeleteMemberScreen from 'screens/MoimManagementScreens/MoimDeleteMemberScreen.tsx';
import MoimOutMemberScreen from '../../screens/MoimManagementScreens/MoimOutMemberScreen.tsx';

const MoimManagementStackNavigator = () => {
  const route = useRoute<MoimManagementRouteProp>();
  const id = route.params.id;

  return (
    <MoimManagementStack.Navigator initialRouteName={'MOIM_MANAGE_LIST'}>
      <MoimManagementStack.Screen
        name={'MOIM_MANAGE_LIST'}
        initialParams={{id}}
        component={MoimManageListScreen}
        options={{
          headerShown: false,
        }}
      />
      <MoimManagementStack.Screen
        name={'PERMISSION_MANAGEMENT'}
        component={PermissionManageScreen}
        options={{
          headerTitle: '관리자 권한 수정',
          headerTintColor: '#000',
          headerTitleAlign: 'center',
          headerLeftLabelVisible: false,
        }}
      />
      <MoimManagementStack.Screen
        name={'JOIN_MANAGEMENT'}
        component={JoinManageScreen}
        options={{
          headerTitle: '가입 관리',
          headerTintColor: '#000',
          headerTitleAlign: 'center',
          headerLeftLabelVisible: false,
        }}
      />
      <MoimManagementStack.Screen
        name={'DELEGATION_AUTHORITY_SCREEN'}
        component={DelegationAuthorityScreen}
        options={{
          headerTitle: '모임장 위임',
          headerTintColor: '#000',
          headerTitleAlign: 'center',
          headerLeftLabelVisible: false,
        }}
      />
      <MoimManagementStack.Screen
        name={'MOIM_INFO_EDIT'}
        component={MoimCreateScreen}
        options={{
          headerTitle: '모임 정보 수정',
          headerTintColor: '#000',
          headerTitleAlign: 'center',
          headerLeftLabelVisible: false,
        }}
      />
      <MoimManagementStack.Screen
        name={'MOIM_CREATE_TODO'}
        component={MoimCreateTodoScreen}
        options={{
          headerTitle: '할 일 배정',
          headerTintColor: '#000',
          headerTitleAlign: 'center',
          headerLeftLabelVisible: false,
        }}
      />
      <MoimManagementStack.Screen
        name={'MOIM_GET_TODO'}
        component={MoimGetTodoScreen}
        options={{
          headerTitle: '모임 할 일 확인',
          headerTintColor: '#000',
          headerTitleAlign: 'center',
          headerLeftLabelVisible: false,
        }}
      />
      <MoimManagementStack.Screen
        name={'MOIM_DETAIL_TODO'}
        component={MoimTodoDetailScreen}
        options={{
          headerTitle: '할 일 자세히 보기',
          headerTintColor: '#000',
          headerTitleAlign: 'center',
          headerLeftLabelVisible: false,
        }}
      />
      <MoimManagementStack.Screen
        name={'MOIM_ASSIGNMENT_TODO'}
        component={MyMoimAssignmentCheckScreen}
        options={{
          headerTitle: '내가 할당한 할 일 확인',
          headerTintColor: '#000',
          headerTitleAlign: 'center',
          headerLeftLabelVisible: false,
        }}
      />
      <MoimManagementStack.Screen
        name={'MOIM_ADD_MEMBER'}
        component={MoimAddMemberScreen}
        options={{
          headerTitle: '할 일 멤버 추가',
          headerTintColor: '#000',
          headerTitleAlign: 'center',
          headerLeftLabelVisible: false,
        }}
      />
      <MoimManagementStack.Screen
        name={'MOIM_DELETE_MEMBER'}
        component={MoimDeleteMemberScreen}
        options={{
          headerTitle: '할 일 멤버 삭제',
          headerTintColor: '#000',
          headerTitleAlign: 'center',
          headerLeftLabelVisible: false,
        }}
      />
      <MoimManagementStack.Screen
        name={'MOIM_OUT_MEMBER'}
        component={MoimOutMemberScreen}
        options={{
          headerTitle: '모임 멤버 탈퇴',
          headerTintColor: '#000',
          headerTitleAlign: 'center',
          headerLeftLabelVisible: false,
        }}
      />
    </MoimManagementStack.Navigator>
  );
};

export default MoimManagementStackNavigator;
