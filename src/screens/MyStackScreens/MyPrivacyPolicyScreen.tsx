import {ScreenContainer} from 'components/ScreenContainer.tsx';
import {Typography} from 'components/@common/Typography/Typography.tsx';
import {PRIVACY_POLICY_CONTENT} from 'constants/screens/MyScreens/MyPrivacyPolicyScreen';

export default function MyPrivacyPolicyScreen() {
  return (
    <ScreenContainer>
      <Typography fontWeight={'BOLD'} className="text-lg text-dark-800 mt-4">
        MOIM 개인정보 처리방침
      </Typography>
      <Typography fontWeight="MEDIUM" className="text-gray-500">
        {PRIVACY_POLICY_CONTENT}
      </Typography>
    </ScreenContainer>
  );
}
