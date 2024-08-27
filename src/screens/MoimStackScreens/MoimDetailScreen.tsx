import React, {useState} from 'react';
import {RefreshControl, View} from 'react-native';
import {SafeAreaView, ScrollView} from 'react-native';
import Toast from 'react-native-toast-message';

import MoimDashboardContainer from '../../components/screens/MoimDetailScreen/MoimDashboardContainer';
import MoimImageBox from '../../components/screens/MoimDetailScreen/MoimImageBox';
import MoimInfoContainer from '../../components/screens/MoimDetailScreen/MoimInfoContainer';
import MoimContentsPreview from '../../components/screens/MoimDetailScreen/MoimContentsPreview';
import MoimMemberBottomSheet from 'components/screens/MoimDetailScreen/MoimMemberBottomSheet';
import {CustomButton} from 'components/@common/CustomButton/CustomButton';
import {Typography} from 'components/@common/Typography/Typography';

import {
  MoimPostStackNavigationProp,
  MoimTopTabRouteProp,
} from '../../navigators/types';
import useGetMoimSpaceInfo from 'hooks/queries/MoimSpace/useGetMoimSpaceInfo';
import useRequestMoimJoin from 'hooks/queries/MoimSpace/useRequestMoimJoin';
import {MOIM_JOIN_STATUS} from 'types/enums';
import {queryClient} from 'containers/TanstackQueryContainer';

interface IMoimDetailScreenProps {
  route: MoimTopTabRouteProp;
  navigation: MoimPostStackNavigationProp;
}

export default function MoimDetailScreen({
  route,
  navigation,
}: IMoimDetailScreenProps) {
  const moimId = route.params.id;
  const {data, isError, isPending, refetch} = useGetMoimSpaceInfo(moimId);
  const requestMoimJoimMutation = useRequestMoimJoin();
  const [refreshing, setRefreshing] = useState(false);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const handleRequestMoimJoin = () => {
    requestMoimJoimMutation.mutate(
      {
        moimId,
      },
      {
        onSuccess: () => {
          Toast.show({
            type: 'success',
            text1: '가입 신청되었습니다.',
            visibilityTime: 2000,
            position: 'bottom',
          });
          queryClient.invalidateQueries({
            queryKey: ['moimSpaceInfo', moimId],
          });
        },
        onError: error => {
          console.error(error?.response);
          Toast.show({
            type: 'error',
            text1:
              error?.response?.data.message ||
              '가입 신청 중 오류가 발생했습니다.',
            visibilityTime: 2000,
            position: 'bottom',
          });
        },
      },
    );
  };

  const onRefresh = async () => {
    console.log('handleRefreshStore');
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  if (isError) {
    return <Typography fontWeight="MEDIUM">에러입니다.</Typography>;
  }

  if (isPending) {
    return <Typography fontWeight="MEDIUM">로딩 중</Typography>;
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <MoimImageBox
          backgroundImage={data?.profileImageUrl}
          memberCount={data?.femaleCount + data?.maleCount}
          category={data?.category}
          address={data?.address}
        />
        <MoimInfoContainer
          title={data?.title}
          description={data?.description}
          moimId={moimId}
          onOpen={open}
          moimMembers={data?.userPreviewDTOList}
        />
        <MoimDashboardContainer
          femaleCount={data?.femaleCount}
          maleCount={data?.maleCount}
          averageAge={data?.averageAge}
          diaryCount={data?.diaryCount}
          moimReviewCount={data?.moimReviewCount}
        />
        <MoimContentsPreview moimId={moimId} navigation={navigation} />
      </ScrollView>
      {!(data?.joinStatus === MOIM_JOIN_STATUS.COMPLETE) && (
        <View className="p-3 pt-0">
          <CustomButton
            label={
              data?.joinStatus === MOIM_JOIN_STATUS.LOADING
                ? '신청 확인 중'
                : '가입하기'
            }
            textStyle="font-bold text-white text-base"
            onPress={handleRequestMoimJoin}
            inValid={data?.joinStatus === MOIM_JOIN_STATUS.LOADING}
          />
        </View>
      )}
      {data?.joinStatus === MOIM_JOIN_STATUS.COMPLETE && (
        <MoimMemberBottomSheet
          moimId={moimId}
          isOpen={isOpen}
          onOpen={open}
          onClose={close}
        />
      )}
    </SafeAreaView>
  );
}
