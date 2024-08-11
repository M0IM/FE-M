import {ScreenContainer} from 'components/ScreenContainer.tsx';
import {Typography} from 'components/@common/Typography/Typography.tsx';
import { AppInfoStackNavigatorProp } from 'navigators/types';
import { CustomButton } from 'components/@common/CustomButton/CustomButton';

interface AppInfoScreenProps {
  navigation: AppInfoStackNavigatorProp;
}

export default function AppInfoScreen({navigation}: AppInfoScreenProps) {
  return (
    <ScreenContainer>
      <Typography fontWeight={'MEDIUM'}>앱 정보</Typography>
      <CustomButton label='앱 정보 상세 페이지로 이동' onPress={() => navigation.navigate('APP_INFO_DETAIL', { id: 1 })} />
    </ScreenContainer>
  );
}
