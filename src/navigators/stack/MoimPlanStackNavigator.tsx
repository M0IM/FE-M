import {MoimPlanStack} from 'navigators/constants';
import MoimPlanHomeScreen from 'screens/MoimCalenderStackScreens/MoimPlanHomeScreen';
import MoimPlanDetailScreen from 'screens/MoimCalenderStackScreens/MoimPlanDetailScreen.tsx';
import {useRoute} from '@react-navigation/native';
import {MoimPlanStackRouteProp} from 'navigators/types';

export default function MoimPlanStackNavigator() {
  const route = useRoute<MoimPlanStackRouteProp>();
  const id = route?.params?.id;

  return (
    <MoimPlanStack.Navigator
      initialRouteName={'MOIM_PLAN_HOME'}
      screenOptions={{
        cardStyle: {
          backgroundColor: 'white',
        },
        headerShown: false,
      }}>
      <MoimPlanStack.Screen
        name={'MOIM_PLAN_HOME'}
        component={MoimPlanHomeScreen}
        initialParams={{id}}
      />
      <MoimPlanStack.Screen
        name={'MOIM_PLAN_DETAIL'}
        component={MoimPlanDetailScreen}
        initialParams={{id}}
      />
    </MoimPlanStack.Navigator>
  );
}
