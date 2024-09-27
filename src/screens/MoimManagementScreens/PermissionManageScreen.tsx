import {useCallback, useRef, useState} from 'react';
import {View, TouchableOpacity, ScrollView, RefreshControl} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RouteProp} from '@react-navigation/native';

import {InputField} from 'components/@common/InputField/InputField';

import {MoimManagementParamList} from 'navigators/types';
import {queryClient} from 'containers/TanstackQueryContainer';
import MoimPermissionScrollView from 'components/screens/MoimHomeScreens/MoimPermissionScrollView';
import {wait} from 'utils/wait';
import useDebounce from '../../hooks/useDebounce.ts';

interface PermissionManageScreenProps {
  route: RouteProp<MoimManagementParamList, 'PERMISSION_MANAGEMENT'>;
}

const PermissionManageScreen = ({route}: PermissionManageScreenProps) => {
  const params = route?.params;
  const moimId = params.id;
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isEndReached, setIsEndReached] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 1000);

  const handleSearchUser = () => {
    queryClient.invalidateQueries({
      queryKey: ['moimMembers', moimId, debouncedSearch],
    });
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    wait(1000).then(() => setIsRefreshing(false));
  };

  const handleScroll = useCallback((event: any) => {
    const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent;
    const contentHeight = contentSize.height;
    const scrollHeight = layoutMeasurement.height + contentOffset.y;

    if (scrollHeight >= contentHeight - 100) {
      setIsEndReached(true);
    }
  }, []);

  return (
    <View className="flex-1 bg-white p-4 pt-0">
      <View className="flex flex-row items-center justify-between mt-5">
        <View className="w-[90%]">
          <InputField
            touched
            placeholder="멤버 검색"
            value={search}
            onChangeText={text => setSearch(text)}
          />
        </View>
        <TouchableOpacity onPress={handleSearchUser}>
          <Ionicons name="search" size={27} color={'#1D2002'} />
        </TouchableOpacity>
      </View>
      <ScrollView
        ref={scrollViewRef}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
        onScroll={handleScroll}
        contentContainerStyle={{gap: 10, marginTop: 10}}
        scrollEventThrottle={400}>
        <MoimPermissionScrollView
          moimId={moimId}
          search={debouncedSearch}
          isEndReached={isEndReached}
          isRefreshing={isRefreshing}
        />
      </ScrollView>
    </View>
  );
};

export default PermissionManageScreen;
