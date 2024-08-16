import {ScreenContainer} from 'components/ScreenContainer.tsx';
import {Typography} from 'components/@common/Typography/Typography.tsx';

import {MyStackRouteProp} from '../../navigators/types';
import useDetailProfileStore from '../../stores/useDetailProfileStore.ts';

interface IMyProfileEditScreenProps {
  route: MyStackRouteProp;
}

export default function MyProfileEditScreen({
  route,
}: IMyProfileEditScreenProps) {
  const {detailProfile} = useDetailProfileStore();
  const userId = route.params?.id;

  console.log(detailProfile);
  return (
    <ScreenContainer>
      <Typography fontWeight={'BOLD'}>{route.params?.id}</Typography>
    </ScreenContainer>
  );
}
