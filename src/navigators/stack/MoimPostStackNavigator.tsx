import React from 'react';
import {useRoute} from '@react-navigation/native';

import MoimBoardScreen from 'screens/MoimBoardStackScreens/MoimBoardScreen';
import MoimPostDetailScreen from 'screens/MoimBoardStackScreens/MoimPostDetailScreen';
import MoimPostEditScreen from 'screens/MoimBoardStackScreens/MoimPostEditScreen';
import MoimPostWriteScreen from 'screens/MoimBoardStackScreens/MoimPostWriteScreen';
import MoimMemberDetailProfileScreen from 'screens/MoimBoardStackScreens/MoimMemberDetailProfileScreen.tsx';

import {MoimPostStackRouteProp} from 'navigators/types';
import {MoimPostStack} from 'navigators/constants';

export default function MoimPostStackNavigator() {
  const route = useRoute<MoimPostStackRouteProp>();
  const id = route?.params?.id;

  return (
    <MoimPostStack.Navigator
      initialRouteName={'MOIM_BOARD_HOME'}
      screenOptions={{
        cardStyle: {
          backgroundColor: 'white',
        },
        headerShown: false,
      }}>
      <MoimPostStack.Screen
        name={'MOIM_BOARD_HOME'}
        component={MoimBoardScreen}
        initialParams={{id}}
      />
      <MoimPostStack.Screen
        name={'MOIM_POST_DETAIL'}
        component={MoimPostDetailScreen}
        initialParams={{id}}
        options={{
          headerTitle: '게시글',
          headerShown: true,
          headerTintColor: '#000',
          headerTitleAlign: 'center',
          headerLeftLabelVisible: false,
        }}
      />
      <MoimPostStack.Screen
        name={'MOIM_POST_WRITE'}
        component={MoimPostWriteScreen}
        options={{
          headerTitle: '게시글 작성',
          headerShown: true,
          headerTintColor: '#000',
          headerTitleAlign: 'center',
          headerLeftLabelVisible: false,
        }}
      />
      <MoimPostStack.Screen
        name={'MOIM_POST_EDIT'}
        component={MoimPostEditScreen}
        initialParams={{id}}
        options={{
          headerTitle: '게시글 수정',
          headerShown: true,
          headerTintColor: '#000',
          headerTitleAlign: 'center',
          headerLeftLabelVisible: false,
        }}
      />
      <MoimPostStack.Screen
        name={'MOIM_MEMBER_PROFILE'}
        component={MoimMemberDetailProfileScreen}
        options={({route}) => ({
          headerTitle: route.params.userName,
          headerShown: true,
          headerTintColor: '#000',
          headerTitleAlign: 'center',
          headerLeftLabelVisible: false,
        })}
      />
    </MoimPostStack.Navigator>
  );
}
