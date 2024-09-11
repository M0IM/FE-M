import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import CustomTabBar from 'components/@common/CustomTabBar/CustomTabBar';

import useMoim from 'hooks/useMoim.ts';
import MoimManagementStackNavigator from 'navigators/stack/MoimManagementStackNavigator';
import MoimPlanStackNavigator from 'navigators/stack/MoimPlanStackNavigator';
import MoimPostStackNavigator from 'navigators/stack/MoimPostStackNavigator';
import {MoimTopTabParamList, MoimTopTabRouteProp} from 'navigators/types';
import MoimDetailScreen from 'screens/MoimStackScreens/MoimDetailScreen';
import {MOIM_JOIN_STATUS, MOIM_ROLE} from 'types/enums';

const Tab = createMaterialTopTabNavigator<MoimTopTabParamList>();

export default function MoimTopTabNavigator({
  route,
}: {
  route: MoimTopTabRouteProp;
}) {
  // TODO: Route Type 다시 잡기
  const id = route.params?.params?.id;

  const {useGetMyMoimRole} = useMoim();
  const {data: role} = useGetMyMoimRole(id);

  return (
    <Tab.Navigator
      initialRouteName={'MOIM_SPACE'}
      tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen
        name={'MOIM_SPACE'}
        component={MoimDetailScreen}
        options={{
          tabBarLabel: '모임 홈',
        }}
      />
      {role?.joinStatus === MOIM_JOIN_STATUS.COMPLETE && (
        <>
          <Tab.Screen
            name={'MOIM_TOP_PLAN'}
            component={MoimPlanStackNavigator}
            initialParams={{id}}
            options={{
              tabBarLabel: '일정',
            }}
          />
          <Tab.Screen
            name={'MOIM_TOP_BOARD'}
            component={MoimPostStackNavigator}
            initialParams={{id}}
            options={{
              tabBarLabel: '게시판',
            }}
          />
          {!(role?.moimRole === MOIM_ROLE.MEMBER) && (
            <Tab.Screen
              name={'MOIM_MANAGEMENT'}
              component={MoimManagementStackNavigator}
              initialParams={{id}}
              options={{
                tabBarLabel: '관리',
              }}
            />
          )}
        </>
      )}
    </Tab.Navigator>
  );
}
