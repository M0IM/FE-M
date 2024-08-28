import {useEffect} from 'react';
import {View, TouchableOpacity, ActivityIndicator} from 'react-native';
import Toast from 'react-native-toast-message';

import Label from 'components/@common/Label/Label';
import {Typography} from 'components/@common/Typography/Typography';
import Avatar from 'components/@common/Avatar/Avatar';

import useMoimManagment from 'hooks/queries/MoimManagement/useMoimManagement';
import {TMoimRole} from 'types/dtos/moimManage';
import {queryClient} from 'containers/TanstackQueryContainer';
import {SafeAreaView} from 'react-native';

interface MoimPermissionScrollViewProps {
  moimId?: number;
  search: string;
  isEndReached: boolean;
  isRefreshing: boolean;
}

const MoimPermissionScrollView = ({
  moimId,
  search,
  isEndReached,
  isRefreshing,
}: MoimPermissionScrollViewProps) => {
  const {useGetInfinityMoimMembers, updateMoimAuthoritiesMutation} =
    useMoimManagment();
  const {
    data: moimMembers,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch: refetchMoimMembers,
    isPending,
    isError,
  } = useGetInfinityMoimMembers(moimId, search);

  const handleNowRole = (role: TMoimRole) => {
    if (role === 'ADMIN') {
      return '관리자';
    } else if (role === 'MEMBER') {
      return '멤버';
    } else if (role === 'OWNER') {
      return '모임장';
    }
    return '';
  };

  useEffect(() => {
    if (hasNextPage && !isFetchingNextPage && isEndReached) {
      fetchNextPage();
    }
  }, [isEndReached]);

  useEffect(() => {
    const refetch = async () => {
      if (isRefreshing) {
        await refetchMoimMembers();
      }
    };
    refetch();
  }, [isRefreshing, refetchMoimMembers]);

  const handleMemberAuth = (userId: number, moimRole: TMoimRole) => {
    const newRole = moimRole === 'MEMBER' ? 'ADMIN' : 'MEMBER';
    if (moimId && userId && moimRole) {
      updateMoimAuthoritiesMutation.mutate(
        {
          moimId,
          moimRole: newRole,
          userId,
        },
        {
          onError: error => {
            console.error(error.response);
            Toast.show({
              type: 'error',
              text1:
                error.response?.data.message ||
                '권한 변경 중 에러가 발생했습니다.',
              visibilityTime: 2000,
              position: 'bottom',
            });
          },
          onSettled: () => {
            queryClient.invalidateQueries({
              queryKey: ['moimMembers', moimId],
            });
          },
        },
      );
    }
  };

  if (isPending) {
    return (
      <SafeAreaView className="flex flex-col items-center justify-center bg-white">
        <ActivityIndicator size="large" className="mt-10" />
      </SafeAreaView>
    );
  }

  if (isError) {
    return <Typography fontWeight="MEDIUM">에러</Typography>;
  }

  return (
    <>
      {moimMembers?.pages
        .flatMap(page => page.userPreviewDTOList)
        .map(item => {
          const translatedRole = handleNowRole(item.moimRole);
          return (
            <View key={item.userId} className="flex flex-row items-center py-3">
              <Avatar uri={item.imageKeyName} />
              <Typography
                fontWeight="MEDIUM"
                className="text-dark-800 text-sm ml-3 mr-3">
                {item.nickname}
              </Typography>
              <Label label={translatedRole} color="dark" />
              {item.moimRole !== 'OWNER' && (
                <TouchableOpacity
                  className="p-2 rounded-xl bg-gray-200 ml-auto"
                  onPress={() => handleMemberAuth(item.userId, item.moimRole)}>
                  <Typography
                    fontWeight="MEDIUM"
                    className="text-gray-600 text-xs">
                    {item.moimRole === 'ADMIN' ? '권한 취소' : '권한 부여'}
                  </Typography>
                </TouchableOpacity>
              )}
            </View>
          );
        })}
    </>
  );
};

export default MoimPermissionScrollView;
