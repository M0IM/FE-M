import {ScreenContainer} from 'components/ScreenContainer.tsx';
import {Typography} from 'components/@common/Typography/Typography.tsx';
import {MoimStackRouteProp} from '../../navigators/types';

interface IMoimDetailScreenProps {
  route: MoimStackRouteProp;
}

export default function MoimDetailScreen({route}: IMoimDetailScreenProps) {
  return (
    <ScreenContainer>
      <Typography fontWeight={'MEDIUM'}>
        {route.params?.id}번 모임 세부 게시글
      </Typography>
    </ScreenContainer>
  );
}
