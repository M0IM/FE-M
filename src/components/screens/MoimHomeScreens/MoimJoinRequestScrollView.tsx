import {useEffect} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';

import Avatar from 'components/@common/Avatar/Avatar';
import {Typography} from 'components/@common/Typography/Typography';

import useMoimManagment from 'hooks/queries/MoimManagement/useMoimManagement';
import {queryClient} from 'containers/TanstackQueryContainer';
import useThrottle from 'hooks/useThrottle';

interface MoimJoinRequestScrollViewProps {
  moimId?: number;
  search: string;
  isEndReached: boolean;
  isRefreshing: boolean;
}

const MoimJoinRequestScrollView = ({
  moimId,
  search,
  isEndReached,
  isRefreshing,
}: MoimJoinRequestScrollViewProps) => {
  const {
    useGetInfinityMoimRequest,
    acceptMoimJoinRequestMutation,
    rejectMoimJoinRequestMutation,
  } = useMoimManagment();
  const {
    data: moimRequests,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch: refetchMoimRequests,
    isPending,
    isError,
  } = useGetInfinityMoimRequest(moimId, search);

  useEffect(() => {
    if (hasNextPage && !isFetchingNextPage && isEndReached) {
      fetchNextPage();
    }
  }, [isEndReached]);

  useEffect(() => {
    const refetch = async () => {
      if (isRefreshing) {
        await refetchMoimRequests();
      }
    };
    refetch();
  }, [isRefreshing, refetchMoimRequests]);

  const handleAcceptRequest = useThrottle((userId: number) => {
    if (moimId && userId) {
      acceptMoimJoinRequestMutation.mutate(
        {
          moimId,
          userId,
        },
        {
          onSuccess: () => {
            Toast.show({
              type: 'success',
              text1: '신청이 승인되었습니다.',
              visibilityTime: 2000,
              position: 'bottom',
            });
            queryClient.invalidateQueries({
              queryKey: ['moimRequests', moimId],
            });
            queryClient.invalidateQueries({
              queryKey: ['moimMembers', moimId],
            });
          },
          onError: error => {
            console.error(error.response);
            Toast.show({
              type: 'error',
              text1:
                error.response?.data.message ||
                '신청 승인 중 에러가 발생했습니다.',
              visibilityTime: 2000,
              position: 'bottom',
            });
          },
        },
      );
    }
  }, 2 * 1000);

  const handleRejectRequest = useThrottle((userId: number) => {
    if (moimId && userId) {
      rejectMoimJoinRequestMutation.mutate(
        {
          moimId,
          userId,
        },
        {
          onSuccess: () => {
            Toast.show({
              type: 'success',
              text1: '신청이 반려되었습니다.',
              visibilityTime: 2000,
              position: 'bottom',
            });
          },
          onError: error => {
            console.error(error.response);
            Toast.show({
              type: 'error',
              text1:
                error.response?.data.message ||
                '신청 반려 중 에러가 발생했습니다.',
              visibilityTime: 2000,
              position: 'bottom',
            });
          },
          onSettled: () => {
            queryClient.invalidateQueries({
              queryKey: ['moimRequests', moimId],
            });
          },
        },
      );
    }
  }, 2 * 1000);

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
      {moimRequests.pages.flatMap(page => page.userPreviewDTOList).length <=
        0 && (
        <Typography fontWeight="MEDIUM" className="text-gray-400 mt-3">
          가입 신청이 없습니다.
        </Typography>
      )}
      {moimRequests.pages
        .flatMap(page => page.userPreviewDTOList)
        .map(item => (
          <View key={item.userId} className="flex flex-row items-center py-4">
            <Avatar uri={item.imageKeyName} />
            <Typography
              fontWeight="MEDIUM"
              className="text-dark-800 text-sm ml-3">
              {item.nickname}
            </Typography>
            <View className="flex flex-row ml-auto">
              <TouchableOpacity
                disabled={rejectMoimJoinRequestMutation.isPending}
                className="p-2 px-4 rounded-xl bg-gray-200 mr-2"
                onPress={() => handleRejectRequest(item.userId)}>
                <Typography
                  fontWeight="MEDIUM"
                  className="text-gray-600 text-xs">
                  반려
                </Typography>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={acceptMoimJoinRequestMutation.isPending}
                className="p-2 px-4 rounded-xl bg-gray-200"
                onPress={() => handleAcceptRequest(item.userId)}>
                <Typography
                  fontWeight="MEDIUM"
                  className="text-gray-600 text-xs">
                  승인
                </Typography>
              </TouchableOpacity>
            </View>
          </View>
        ))}
    </>
  );
};

export default MoimJoinRequestScrollView;
