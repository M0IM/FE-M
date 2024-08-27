import {useState} from 'react';
import {View, TouchableOpacity, FlatList} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Avatar from 'components/@common/Avatar/Avatar';
import BottomSheet from 'components/@common/BottomSheet/BottomSheet';
import Label from 'components/@common/Label/Label';
import {Typography} from 'components/@common/Typography/Typography';
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
  const {
    data: members,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isPending,
    isError,
  } = useGetInfinityMoimMembers(moimId);
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

  if (isPending) {
    return <Typography fontWeight="MEDIUM">로딩 중</Typography>;
  }

  if (isError) {
    return <Typography fontWeight="MEDIUM">에러입니다.</Typography>;
  }

  return (
    <BottomSheet
      isBottomSheetOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      height={700}>
      <FlatList
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
        }}
        ListHeaderComponent={() => (
          <Typography
            fontWeight="BOLD"
            className="text-dark-800 text-base self-center mb-6">
            모임 멤버
          </Typography>
        )}
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
