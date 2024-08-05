import {ScreenContainer} from 'components/ScreenContainer.tsx';
import {Typography} from 'components/@common/Typography/Typography.tsx';
import {MoimTopTabRouteProp} from '../../navigators/types';

interface IMoimDetailScreenProps {
  route: MoimTopTabRouteProp;
}

export default function MoimDetailScreen({
  route,
}: IMoimDetailScreenProps) {
  // console.log(route);
  return (
    <ScreenContainer>
      <Typography fontWeight={'MEDIUM'}>
        {/* {route.params?.id}번 모임 세부 게시글 */}
        dd
      </Typography>
    </ScreenContainer>
  );
}
