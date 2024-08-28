import {useEffect} from 'react';
import {View, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Avatar from 'components/@common/Avatar/Avatar';
import Label from 'components/@common/Label/Label';
import {Typography} from 'components/@common/Typography/Typography';

import useGetInfinityMoimMembers from 'hooks/queries/MoimSpace/useGetInfinityMoimMembers';

interface MoimMembersScrollViewProps {
  isRefreshing: boolean;
  isEndReached: boolean;
  search: string;
  moimId: number;
}

const MoimMembersScrollView = ({
  isRefreshing,
  isEndReached,
  search,
  moimId,
}: MoimMembersScrollViewProps) => {
  const {
    data: members,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch: refetchMembers,
    isPending,
    isError,
  } = useGetInfinityMoimMembers(moimId, search);

  useEffect(() => {
    if (hasNextPage && !isFetchingNextPage && isEndReached) {
      fetchNextPage();
    }
  }, [isEndReached]);

  useEffect(() => {
    const refetch = async () => {
      if (isRefreshing) {
        await refetchMembers();
      }
    };
    refetch();
  }, [isRefreshing, refetchMembers]);

  if (isPending) {
    return <Typography fontWeight="MEDIUM">로딩 중</Typography>;
  }

  if (isError) {
    return <Typography fontWeight="MEDIUM">에러입니다.</Typography>;
  }

  return (
    <>
      {members?.pages
        .flatMap(page => page.userPreviewDTOList)
        .map(item => (
          <TouchableOpacity key={item.userId} className="flex flex-row w-full">
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
        ))}
    </>
  );
};

export default MoimMembersScrollView;
