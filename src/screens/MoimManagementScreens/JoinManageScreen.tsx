import {useState} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';

import Avatar from 'components/@common/Avatar/Avatar';
import {InputField} from 'components/@common/InputField/InputField';
import {Typography} from 'components/@common/Typography/Typography';

import {MoimManagementRouteProp} from 'navigators/types';
import useMoimManagment from 'hooks/queries/MoimManagement/useMoimManagement';
import {queryClient} from 'containers/TanstackQueryContainer';

interface JoinManageScreenProps {
  route: MoimManagementRouteProp;
}

const JoinManageScreen = ({route}: JoinManageScreenProps) => {
  const moimId = route?.params?.id;
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
    refetch,
    isPending,
    isError,
  } = useGetInfinityMoimRequest(moimId);
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

  const handleAcceptRequest = (userId: number) => {
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
          onSettled: () => {
            queryClient.invalidateQueries({
              queryKey: ['moimRequests', moimId],
            });
          },
        },
      );
    }
  };

  const handleRejectRequest = (userId: number) => {
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
  };

  if (isPending) {
    return <Typography fontWeight="MEDIUM">로딩 중</Typography>;
  }

  if (isError) {
    return <Typography fontWeight="MEDIUM">에러</Typography>;
  }

  const renderHeader = () => (
    <View className="flex flex-row items-center justify-between mt-5">
      <View className="w-[90%]">
        <InputField touched placeholder="멤버 검색" />
      </View>
      <TouchableOpacity>
        <Ionicons name="search" size={27} color={'#1D2002'} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1 bg-white p-4 pt-0">
      <FlatList
        ListHeaderComponent={renderHeader}
        data={moimRequests.pages.flatMap(page => page.userPreviewDTOList)}
        renderItem={({item}) => (
          <View key={item.userId} className="flex flex-row items-center py-4">
            <Avatar uri={item.imageKeyName} />
            <Typography
              fontWeight="MEDIUM"
              className="text-dark-800 text-sm ml-3">
              {item.nickname}
            </Typography>
            <View className="flex flex-row ml-auto">
              <TouchableOpacity
                className="p-2 px-4 rounded-xl bg-gray-200 mr-2"
                onPress={() => handleRejectRequest(item.userId)}>
                <Typography
                  fontWeight="MEDIUM"
                  className="text-gray-600 text-xs">
                  반려
                </Typography>
              </TouchableOpacity>
              <TouchableOpacity
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
        )}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
      />
    </View>
  );
};

export default JoinManageScreen;
