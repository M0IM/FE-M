import {MyStackRouteProp} from '../../navigators/types';
import {ScreenContainer} from '../../components/ScreenContainer.tsx';
import {Typography} from '../../components/@common/Typography/Typography.tsx';

interface IMyProfileEditScreenProps {
  route: MyStackRouteProp;
}

export default function MyProfileEditScreen({
  route,
}: IMyProfileEditScreenProps) {
  return (
    <ScreenContainer>
      <Typography fontWeight={'BOLD'}>{route.params?.id}</Typography>
    </ScreenContainer>
  );
}
