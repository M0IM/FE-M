import {ScreenContainer} from 'components/ScreenContainer.tsx';
import {HomeStackNavigationProp} from '../../navigators/types';
import MoimActiveEvent from '../../components/screens/MoimHomeScreens/MoimActiveEvent.tsx';

interface IMoimHomeScreenProps {
  navigation: HomeStackNavigationProp;
}

export default function MoimHomeScreen({navigation}: IMoimHomeScreenProps) {
  return (
    <ScreenContainer>
      <MoimActiveEvent navigation={navigation} />
    </ScreenContainer>
  );
}
