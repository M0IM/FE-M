import MoimDashboardContainer from 'components/screens/MoimDetilScreen/MoimDashboardContainer';
import {MoimTopTabRouteProp} from '../../navigators/types';
import MoimImageBox from 'components/screens/MoimDetilScreen/MoimImageBox';
import MoimInfoContainer from 'components/screens/MoimDetilScreen/MoimInfoContainer';
import {SafeAreaView, ScrollView} from 'react-native';
import MoimContentsPreview from 'components/screens/MoimDetilScreen/MoimContentsPreview';

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
    </SafeAreaView>
  );
}
