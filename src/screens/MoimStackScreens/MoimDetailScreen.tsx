import {View} from 'react-native';
import {SafeAreaView, ScrollView} from 'react-native';

import MoimDashboardContainer from '../../components/screens/MoimDetailScreen/MoimDashboardContainer';
import MoimImageBox from '../../components/screens/MoimDetailScreen/MoimImageBox';
import MoimInfoContainer from '../../components/screens/MoimDetailScreen/MoimInfoContainer';
import MoimContentsPreview from '../../components/screens/MoimDetailScreen/MoimContentsPreview';
import {CustomButton} from 'components/@common/CustomButton/CustomButton';
import {Typography} from 'components/@common/Typography/Typography';

import {MoimTopTabRouteProp} from '../../navigators/types';
import useGetMoimSpaceInfo from 'hooks/queries/MoimSpace/useGetMoimSpaceInfo';

interface IMoimDetailScreenProps {
  route: MoimTopTabRouteProp;
}

export default function MoimDetailScreen({route}: IMoimDetailScreenProps) {
  const moimId = route.params.id;
  const {data, isError, isPending} = useGetMoimSpaceInfo(moimId);

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
        />
        <MoimDashboardContainer
          femaleCount={data?.femaleCount}
          maleCount={data?.maleCount}
        />
        <MoimContentsPreview />
      </ScrollView>
      <View className="p-3 pt-0">
        <CustomButton
          label="가입하기"
          textStyle="font-bold text-white text-base"
        />
      </View>
    </SafeAreaView>
  );
}
