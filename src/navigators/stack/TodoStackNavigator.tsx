import {TodoStack} from 'navigators/constants';
import MyAssignmentTodoScreen from 'screens/MyStackScreens/TodoStackScreens/MyAssignmentTodoScreen';
import MyTodoDetailScreen from 'screens/MyStackScreens/TodoStackScreens/MyTodoDetailScreen';
import TodoAddMemberScreen from 'screens/MyStackScreens/TodoStackScreens/TodoAddMemberScreen';
import TodoCreateScreen from 'screens/MyStackScreens/TodoStackScreens/TodoCreateScreen';
import TodoMemberDeleteScreen from 'screens/MyStackScreens/TodoStackScreens/TodoMemberDeleteScreen';

export default function TodoNavigator() {
  return (
    <TodoStack.Navigator
      initialRouteName="GET_TODO"
      screenOptions={{
        headerShown: true,
        cardStyle: {
          backgroundColor: 'white',
        },
        headerTintColor: '#000',
        headerBackTitle: ' ',
      }}>
      <TodoStack.Screen
        name={'GET_TODO'}
        component={MyAssignmentTodoScreen}
        options={{
          headerTitle: '내가 할당한 할 일 확인',
          headerTintColor: '#000',
          headerBackTitleVisible: false,
          headerTitleAlign: 'center',
        }}
      />
      <TodoStack.Screen
        name={'DETAIL_TODO'}
        component={MyTodoDetailScreen}
        options={{
          headerTitle: '할 일 자세히 보기',
          headerTintColor: '#000',
          headerBackTitleVisible: false,
          headerTitleAlign: 'center',
        }}
      />
      <TodoStack.Screen
        name={'ADD_MEMBER_TODO'}
        component={TodoAddMemberScreen}
        options={{
          headerTitle: '멤버 추가',
          headerTintColor: '#000',
          headerBackTitleVisible: false,
          headerTitleAlign: 'center',
        }}
      />
      <TodoStack.Screen
        name={'DELETE_MEMBER_TODO'}
        component={TodoMemberDeleteScreen}
        options={{
          headerTitle: '멤버 삭제',
          headerTintColor: '#000',
          headerBackTitleVisible: false,
          headerTitleAlign: 'center',
        }}
      />
      <TodoStack.Screen
        name={'CREATE_TODO'}
        component={TodoCreateScreen}
        options={{
          headerTitle: '할 일 배정',
          headerTintColor: '#000',
          headerBackTitleVisible: false,
          headerTitleAlign: 'center',
        }}
      />
    </TodoStack.Navigator>
  );
}
