import {useState} from 'react';
import {View} from 'react-native';
import {SafeAreaView, ScrollView} from 'react-native';
import Toast from 'react-native-toast-message';

import MoimDashboardContainer from '../../components/screens/MoimDetailScreen/MoimDashboardContainer';
import MoimImageBox from '../../components/screens/MoimDetailScreen/MoimImageBox';
import MoimInfoContainer from '../../components/screens/MoimDetailScreen/MoimInfoContainer';
import MoimContentsPreview from '../../components/screens/MoimDetailScreen/MoimContentsPreview';
import {CustomButton} from 'components/@common/CustomButton/CustomButton';
import {Typography} from 'components/@common/Typography/Typography';

import {MoimTopTabRouteProp} from '../../navigators/types';
import useGetMoimSpaceInfo from 'hooks/queries/MoimSpace/useGetMoimSpaceInfo';
import useRequestMoimJoin from 'hooks/queries/MoimSpace/useRequestMoimJoin';
import MoimMemberBottomSheet from 'components/screens/MoimDetailScreen/MoimMemberBottomSheet';

interface IMoimDetailScreenProps {
  route: MoimTopTabRouteProp;
}

export default function MoimDetailScreen({route}: IMoimDetailScreenProps) {
  const moimId = route.params.id;
  const {data, isError, isPending} = useGetMoimSpaceInfo(moimId);
  const requestMoimJoimMutation = useRequestMoimJoin();
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

  if (isError) {
    return <Typography fontWeight="MEDIUM">에러입니다.</Typography>;
  }

  if (isPending) {
    return <Typography fontWeight="MEDIUM">로딩 중</Typography>;
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
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
        />
        <MoimDashboardContainer
          femaleCount={data?.femaleCount}
          maleCount={data?.maleCount}
        />
        <MoimContentsPreview />
      </ScrollView>
      {!data?.isJoin && (
        <View className="p-3 pt-0">
          <CustomButton
            label="가입하기"
            textStyle="font-bold text-white text-base"
            onPress={handleRequestMoimJoin}
          />
        </View>
      )}
      <MoimMemberBottomSheet
        moimId={moimId}
        isOpen={isOpen}
        onOpen={open}
        onClose={close}
      />
    </SafeAreaView>
  );
}
