import {ScreenContainer} from 'components/ScreenContainer.tsx';
import {Typography} from '../../components/@common/Typography/Typography.tsx';
import {MoimPlanStackRouteProp} from '../../navigators/types';

interface IMoimPlanDetailScreenProps {
  route: MoimPlanStackRouteProp;
}

export default function MoimPlanDetailScreen({
  route,
}: IMoimPlanDetailScreenProps) {
  return (
    <ScreenContainer>
      <Typography fontWeight={'BOLD'}>
        MoimPlanDetailScreen {route.params?.id}
      </Typography>
    </ScreenContainer>
  );
}
