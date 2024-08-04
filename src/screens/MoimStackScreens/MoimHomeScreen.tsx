import {ScreenContainer} from 'components/ScreenContainer.tsx';
import {Typography} from 'components/@common/Typography/Typography.tsx';
import {MoimStackNavigationProp} from '../../navigators/types';

interface IMoimHomeScreenProps {
  navigation: MoimStackNavigationProp;
}

export default function MoimHomeScreen({navigation}: IMoimHomeScreenProps) {
  return (
    <ScreenContainer>
      <Typography fontWeight={'MEDIUM'}>모임 홈 페이지</Typography>
    </ScreenContainer>
  );
}
