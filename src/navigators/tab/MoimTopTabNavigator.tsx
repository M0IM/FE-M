import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import CustomTabBar from 'components/@common/CustomTabBar/CustomTabBar';
import useGetMoimSpaceInfo from 'hooks/queries/MoimSpace/useGetMoimSpaceInfo';
import MoimManagementStackNavigator from 'navigators/stack/MoimManagementStackNavigator';
import MoimPlanStackNavigator from 'navigators/stack/MoimPlanStackNavigator';
import MoimPostStackNavigator from 'navigators/stack/MoimPostStackNavigator';
import {MoimTopTabParamList, MoimTopTabRouteProp} from 'navigators/types';
import MoimDetailScreen from 'screens/MoimStackScreens/MoimDetailScreen';

const Tab = createMaterialTopTabNavigator<MoimTopTabParamList>();

export default function MoimTopTabNavigator({
  route,
}: {
  route: MoimTopTabRouteProp;
}) {
  // TODO: Route Type 다시 잡기
  const id = route.params?.params?.id;
  const {data} = useGetMoimSpaceInfo(id);

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
      {data?.isJoin && (
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

          <Tab.Screen
            name={'MOIM_MANAGEMENT'}
            component={MoimManagementStackNavigator}
            initialParams={{id}}
            options={{
              tabBarLabel: '관리',
            }}
          />
        </>
      )}
    </Tab.Navigator>
  );
}
