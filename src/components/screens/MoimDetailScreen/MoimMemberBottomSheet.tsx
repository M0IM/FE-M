import {useState} from 'react';
import {View, TouchableOpacity, FlatList} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Avatar from 'components/@common/Avatar/Avatar';
import BottomSheet from 'components/@common/BottomSheet/BottomSheet';
import {InputField} from 'components/@common/InputField/InputField';
import Label from 'components/@common/Label/Label';
import {Typography} from 'components/@common/Typography/Typography';

import {queryClient} from 'containers/TanstackQueryContainer';
import useGetInfinityMoimMembers from 'hooks/queries/MoimSpace/useGetInfinityMoimMembers';

interface MoimMemberBottomSheetProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  moimId: number;
}

const MoimMemberBottomSheet = ({
  isOpen,
  onOpen,
  onClose,
  moimId,
}: MoimMemberBottomSheetProps) => {
  const [search, setSearch] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const {
    data: members,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isPending,
    isError,
  } = useGetInfinityMoimMembers(moimId, search);

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

  if (isPending) {
    return <Typography fontWeight="MEDIUM">로딩 중</Typography>;
  }

  if (isError) {
    return <Typography fontWeight="MEDIUM">에러입니다.</Typography>;
  }

  const handleSearchUser = () => {
    queryClient.invalidateQueries({
      queryKey: ['moimMembers', moimId],
    });
  };

  const renderHeader = () => (
    <View className="flex flex-col">
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
  );

  return (
    <BottomSheet
      isBottomSheetOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      height={700}>
      <FlatList
        ListHeaderComponent={renderHeader}
        data={members?.pages.flatMap(page => page.userPreviewDTOList)}
        renderItem={({item}) => (
          <TouchableOpacity className="flex flex-row w-full">
            <View className="flex flex-row items-center">
              <Avatar uri={item.imageKeyName} />
              <Typography
                fontWeight="MEDIUM"
                className="text-dark-800 text-sm mx-4">
                {item.nickname}
              </Typography>
              {item.moimRole === 'OWNER' && (
                <View>
                  <Label label="모임장" />
                </View>
              )}
            </View>

            <Ionicons
              name="chevron-forward"
              size={24}
              color={'#E9ECEF'}
              style={{marginLeft: 'auto'}}
            />
          </TouchableOpacity>
        )}
        contentContainerStyle={{
          justifyContent: 'center',
          padding: 30,
          gap: 20,
        }}
        keyExtractor={item => String(item.userId)}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        scrollIndicatorInsets={{right: 1}}
      />
    </BottomSheet>
  );
};

export default MoimMemberBottomSheet;
