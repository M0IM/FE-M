import {useCallback, useRef, useState} from 'react';
import {RefreshControl, ScrollView, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {InputField} from 'components/@common/InputField/InputField';

import {MoimManagementRouteProp} from 'navigators/types';
import {queryClient} from 'containers/TanstackQueryContainer';
import MoimJoinRequestScrollView from 'components/screens/MoimHomeScreens/MoimJoinRequestScrollView';
import {wait} from 'utils/wait';

interface JoinManageScreenProps {
  route: MoimManagementRouteProp;
}

const JoinManageScreen = ({route}: JoinManageScreenProps) => {
  const moimId = route?.params?.id;
  const [search, setSearch] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isEndReached, setIsEndReached] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

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

  const handleSearchUser = () => {
    queryClient.invalidateQueries({
      queryKey: ['moimRequests', moimId],
    });
  };

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
        onScroll={handleScroll}
        scrollEventThrottle={400}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{marginTop: 10}}>
        <MoimJoinRequestScrollView
          moimId={moimId}
          search={search}
          isEndReached={isEndReached}
          isRefreshing={isRefreshing}
        />
      </ScrollView>
    </View>
  );
};

export default JoinManageScreen;
