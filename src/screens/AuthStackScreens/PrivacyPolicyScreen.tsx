import {ScrollView, View} from 'react-native';
import {ScreenContainer} from '../../components/ScreenContainer.tsx';
import {Typography} from '../../components/@common/Typography/Typography.tsx';
import {PRIVACY_POLICY_CONTENT} from '../../constants/screens/MyScreens/MyPrivacyPolicyScreen.ts';

export default function PrivacyPolicyScreen() {
  return (
    <ScreenContainer>
      <Typography className="text-xl mt-10" fontWeight={'BOLD'}>
        개인 정보 처리방침에 대해
      </Typography>
      <Typography className="text-xl" fontWeight={'BOLD'}>
        동의해주세요.
      </Typography>
      <Typography fontWeight="MEDIUM" className="text-gray-500">
        {PRIVACY_POLICY_CONTENT}
      </Typography>
    </ScreenContainer>
  );
}
