import {useEffect} from 'react';
import {View, TouchableOpacity, ActivityIndicator} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Avatar from 'components/@common/Avatar/Avatar';
import Label from 'components/@common/Label/Label';
import {Typography} from 'components/@common/Typography/Typography';

import useGetInfinityMoimMembers from 'hooks/queries/MoimSpace/useGetInfinityMoimMembers';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {
  MoimPostStackNavigationProp,
  MyStackNavigationProp,
} from 'navigators/types';

interface MoimMembersScrollViewProps {
  isRefreshing: boolean;
  isEndReached: boolean;
  search: string;
  moimId: number;
  onClose: () => void;
}

const MoimMembersScrollView = ({
  isRefreshing,
  isEndReached,
  search,
  moimId,
  onClose,
}: MoimMembersScrollViewProps) => {
  const navigation =
    useNavigation<
      CompositeNavigationProp<
        MoimPostStackNavigationProp,
        MyStackNavigationProp
      >
    >();
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
    return (
      <View className="flex-col items-center justify-center h-[300]">
        <ActivityIndicator size="large" color={'#00F0A1'} />
      </View>
    );
  }

  if (isError) {
    return <Typography fontWeight="MEDIUM">에러입니다.</Typography>;
  }

  return (
    <>
      {members?.pages
        .flatMap(page => page.userPreviewDTOList)
        .map(item => (
          <TouchableOpacity
            key={item.userId}
            className="flex flex-row w-full"
            onPress={() => {
              navigation.navigate('MOIM_MEMBER_PROFILE', {
                id: item.userId as number,
                userName: item.nickname ? item.nickname : '프로필',
              });
              onClose();
            }}>
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
