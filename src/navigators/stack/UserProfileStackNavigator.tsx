import {UserProfileStack} from 'navigators/constants';
import UserDetailProfileScreen from 'screens/UserProfileScreens/UserDetailProfileScreen';
import UserParticipantMoimScreen from 'screens/UserProfileScreens/UserParticipantMoimScreen';
import UserReviewScreen from 'screens/UserProfileScreens/UserReviewScreen';

export default function UserProfileStackNavigator() {
  return (
    <UserProfileStack.Navigator>
      <UserProfileStack.Screen
        name={'USER_PROFILE'}
        component={UserDetailProfileScreen}
        options={({route}) => ({
          headerTitle: route.params.userName,
          headerShown: true,
          headerTintColor: '#000',
          headerTitleAlign: 'center',
          headerLeftLabelVisible: false,
        })}
      />
      <UserProfileStack.Screen
        name={'USER_PARTICIPANT_MOIM'}
        component={UserParticipantMoimScreen}
        options={({route}) => ({
          headerTitle: route.params.userName,
          headerShown: true,
          headerTintColor: '#000',
          headerTitleAlign: 'center',
          headerLeftLabelVisible: false,
        })}
      />
      <UserProfileStack.Screen
        name={'USER_REVIEW'}
        component={UserReviewScreen}
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
