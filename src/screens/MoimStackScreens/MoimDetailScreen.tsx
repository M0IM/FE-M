import {MoimTopTabRouteProp} from '../../navigators/types';
import MoimImageBox from 'components/screens/MoimDetilScreen/MoimImageBox';
import { SafeAreaView, ScrollView } from 'react-native';

interface IMoimDetailScreenProps {
  route: MoimTopTabRouteProp;
}

export default function MoimDetailScreen({
  route,
}: IMoimDetailScreenProps) {
  console.log(route);
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <ScrollView>
        <MoimImageBox />
      </ScrollView>
    </SafeAreaView>
  );
}
