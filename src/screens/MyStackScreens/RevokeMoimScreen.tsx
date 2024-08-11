import {ScreenContainer} from 'components/ScreenContainer.tsx';
import {Typography} from 'components/@common/Typography/Typography.tsx';
import { RevokeMoimStackNavigatorProp } from 'navigators/types';
import { CustomButton } from 'components/@common/CustomButton/CustomButton';

interface RevokeMoimScreenProps {
  navigation: RevokeMoimStackNavigatorProp
}

export default function RevokeMoimScreen({ navigation }: RevokeMoimScreenProps) {
  return (
    <ScreenContainer>
      <Typography fontWeight={'MEDIUM'}>회원 탈퇴 스크린</Typography>
      <CustomButton label='페이지로 이동' onPress={() => navigation.navigate('REVOKE_MOIM_DETAIL', { id: 2 })} />
    </ScreenContainer>
  );
}
