import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {Typography} from 'components/@common/Typography/Typography.tsx';
import {InputField} from 'components/@common/InputField/InputField.tsx';
import Avatar from 'components/@common/Avatar/Avatar.tsx';

import {MoimManagementRouteProp} from 'navigators/types';
import useDebounce from 'hooks/useDebounce.ts';
import useMoimManagement from 'hooks/queries/MoimManagement/useMoimManagement';

export default function MoimOutMemberScreen({
  route,
}: {
  route: MoimManagementRouteProp;
}) {
  const moimId = route.params?.id as number;
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 1000);
  const {useGetInfinityMoimMembersWithOutOwner} = useMoimManagement();

  const {
    data: moimMembers,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isPending,
    isError,
  } = useGetInfinityMoimMembersWithOutOwner(moimId, debouncedSearch);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  if (isError) {
    return <Typography fontWeight="MEDIUM">에러</Typography>;
  }

  if (isPending) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color={'#00F0A1'} />
        </View>
      </SafeAreaView>
    );
  }

  const userList = moimMembers.pages.flatMap(page => page.userPreviewDTOList);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="p-4 pt-0">
        <View className="flex flex-row items-center justify-between mt-5">
          <View className="w-[90%]">
            <InputField
              touched
              placeholder="멤버 검색"
              value={search}
              onChangeText={text => setSearch(text)}
            />
          </View>
          <TouchableOpacity>
            <Ionicons name="search" size={27} color={'#1D2002'} />
          </TouchableOpacity>
        </View>
      </View>
      {userList.length !== 0 ? (
        <FlatList
          data={userList}
          renderItem={({item}) => {
            return (
              <View
                key={item.userId}
                className="flex-1 flex-row justify-between py-3">
                <View className="flex-row items-center justify-center">
                  <Avatar uri={item.imageKeyName} />
                  <Typography
                    fontWeight="MEDIUM"
                    numberOfLines={1}
                    className="text-dark-800 text-sm ml-3 mr-3 w-[120] truncate">
                    {item.nickname}
                  </Typography>
                </View>
                <TouchableOpacity className="p-2 rounded-xl bg-error ml-2 items-center justify-center">
                  <Typography fontWeight="BOLD" className="text-xs text-white">
                    탈퇴
                  </Typography>
                </TouchableOpacity>
              </View>
            );
          }}
          keyExtractor={item => String(item.userId)}
          numColumns={1}
          contentContainerStyle={{paddingHorizontal: 30, gap: 10}}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
          scrollIndicatorInsets={{right: 1}}
          indicatorStyle={'black'}
        />
      ) : (
        <View className="flex items-center justify-center h-[50%]">
          <Typography fontWeight={'BOLD'}>
            {debouncedSearch} 검색어의 유저가 존재하지 않습니다.
          </Typography>
        </View>
      )}
    </SafeAreaView>
  );
}
