import {ScrollView, View} from 'react-native';
import {Typography} from '../../components/@common/Typography/Typography.tsx';
import {ScreenContainer} from '../../components/ScreenContainer.tsx';
import {SEARVICE_CONTENT} from '../../constants/screens/MyScreens/MyServiceTermScreen.ts';

export default function ServiceTermScreen() {
  return (
    <ScreenContainer>
      <Typography className="text-xl mt-10" fontWeight={'BOLD'}>
        서비스 이용약관에 대해
      </Typography>
      <Typography className="text-xl" fontWeight={'BOLD'}>
        동의해주세요.
      </Typography>
      <Typography fontWeight="MEDIUM" className="text-gray-500">
        {SEARVICE_CONTENT}
      </Typography>
    </ScreenContainer>
  );
}
