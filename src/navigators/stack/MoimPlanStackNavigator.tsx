import {MoimPlanStack} from 'navigators/constants';
import MoimPlanHomeScreen from 'screens/MoimCalenderStackScreens/MoimPlanHomeScreen';
import MoimPlanDetailScreen from '../../screens/MoimCalenderStackScreens/MoimPlanDetailScreen.tsx';

export default function MoimPlanStackNavigator() {
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
      />
      <MoimPlanStack.Screen
        name={'MOIM_PLAN_DETAIL'}
        component={MoimPlanDetailScreen}
      />
    </MoimPlanStack.Navigator>
  );
}
