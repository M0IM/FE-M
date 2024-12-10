import {UserProfileStack} from 'navigators/constants';
import MoimPostReviewScreen from 'screens/UserProfileScreens/MoimPostReviewScreen';
import UserDetailProfileScreen from 'screens/UserProfileScreens/UserDetailProfileScreen';
import UserParticipantMoimScreen from 'screens/UserProfileScreens/UserParticipantMoimScreen';
import UserReviewScreen from 'screens/UserProfileScreens/UserReviewScreen';

export default function UserProfileStackNavigator({route}: {route: any}) {
  const userName = route.params.userName;
  const id = route.params.id;
  return (
    <UserProfileStack.Navigator>
      <UserProfileStack.Screen
        name={'USER_PROFILE'}
        initialParams={{id, userName}}
        component={UserDetailProfileScreen}
        options={() => ({
          headerTitle: userName,
          headerShown: true,
          headerTintColor: '#000',
          headerTitleAlign: 'center',
          headerLeftLabelVisible: false,
        })}
      />
      <UserProfileStack.Screen
        name={'USER_PARTICIPANT_MOIM'}
        initialParams={{id, userName}}
        component={UserParticipantMoimScreen}
        options={{
          headerTitle: '가입 모임',
          headerShown: true,
          headerTintColor: '#000',
          headerTitleAlign: 'center',
          headerLeftLabelVisible: false,
        }}
      />
      <UserProfileStack.Screen
        name={'USER_REVIEW'}
        initialParams={{id, userName}}
        component={UserReviewScreen}
        options={{
          headerTitle: '유저 후기',
          headerShown: true,
          headerTintColor: '#000',
          headerTitleAlign: 'center',
          headerLeftLabelVisible: false,
        }}
      />
      <UserProfileStack.Screen
        name={'POST_REVIEW'}
        component={MoimPostReviewScreen}
        options={({route}) => ({
          headerTitle: route.params.userName,
          headerShown: true,
          headerTintColor: '#000',
          headerTitleAlign: 'center',
          headerLeftLabelVisible: false,
        })}
      />
    </UserProfileStack.Navigator>
  );
}
