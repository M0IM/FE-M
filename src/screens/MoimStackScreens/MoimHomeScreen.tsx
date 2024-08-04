import {ScreenContainer} from 'components/ScreenContainer.tsx';
import {MoimStackNavigationProp} from '../../navigators/types';
import MoimActiveEvent from '../../components/screens/MoimHomeScreens/MoimActiveEvent.tsx';

interface IMoimHomeScreenProps {
  navigation: MoimStackNavigationProp;
}

export default function MoimHomeScreen({navigation}: IMoimHomeScreenProps) {
  return (
    <ScreenContainer>
      <MoimActiveEvent />
    </ScreenContainer>
  );
}
