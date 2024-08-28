import {useCallback, useRef, useState} from 'react';
import {View, TouchableOpacity, ScrollView} from 'react-native';
import {RefreshControl} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {InputField} from 'components/@common/InputField/InputField';
import {Typography} from 'components/@common/Typography/Typography';

import {queryClient} from 'containers/TanstackQueryContainer';
import MoimMembersScrollView from './MoimMembersScrollView';

interface MoimMembersViewProps {
  moimId: number;
}

const MoimMembersView = ({moimId}: MoimMembersViewProps) => {
  const wait = (timeout: any) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const [search, setSearch] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isEndReached, setIsEndReached] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const onRefresh = async () => {
    setIsRefreshing(true);
    wait(2000).then(() => setIsRefreshing(false));
  };

  const handleSearchUser = () => {
    queryClient.invalidateQueries({
      queryKey: ['moimMembers', moimId],
    });
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
    <View className="flex flex-col">
      <View className="flex flex-col mt-6 mb-3 px-4">
        <Typography
          fontWeight="BOLD"
          className="text-dark-800 text-base self-center">
          모임 멤버
        </Typography>
        <View className="flex flex-row items-center justify-between mt-5 mb-3">
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
      </View>
      <ScrollView
        ref={scrollViewRef}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
        onScroll={handleScroll}
        contentContainerStyle={{paddingHorizontal: 20, gap: 20}}
        scrollEventThrottle={400}>
        <MoimMembersScrollView
          isRefreshing={isRefreshing}
          isEndReached={isEndReached}
          search={search}
          moimId={moimId}
        />
      </ScrollView>
    </View>
  );
};

export default MoimMembersView;
