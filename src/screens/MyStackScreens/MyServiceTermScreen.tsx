import {ScreenContainer} from 'components/ScreenContainer.tsx';
import {Typography} from 'components/@common/Typography/Typography.tsx';
import {SEARVICE_CONTENT} from 'constants/screens/MyScreens/MyServiceTermScreen';

export default function MyServiceTermScreen() {
  return (
    <ScreenContainer>
      <Typography fontWeight={'BOLD'} className="text-lg text-dark-800 mt-4">
        MOIM 서비스 이용약관
      </Typography>
      <Typography fontWeight="MEDIUM" className="text-gray-500">
        {SEARVICE_CONTENT}
      </Typography>
    </ScreenContainer>
  );
}
