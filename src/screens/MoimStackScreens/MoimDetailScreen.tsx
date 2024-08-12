import MoimDashboardContainer from '../../components/screens/MoimDetailScreen/MoimDashboardContainer';
import {MoimTopTabRouteProp} from '../../navigators/types';
import MoimImageBox from '../../components/screens/MoimDetailScreen/MoimImageBox';
import MoimInfoContainer from '../../components/screens/MoimDetailScreen/MoimInfoContainer';
import {SafeAreaView, ScrollView} from 'react-native';
import MoimContentsPreview from '../../components/screens/MoimDetailScreen/MoimContentsPreview';
import {CustomButton} from 'components/@common/CustomButton/CustomButton';
import {View} from 'react-native';

interface IMoimDetailScreenProps {
  route: MoimTopTabRouteProp;
}

export default function MoimDetailScreen({route}: IMoimDetailScreenProps) {
  console.log('hi', route.params.id);
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <MoimImageBox />
        <MoimInfoContainer />
        <MoimDashboardContainer />
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
