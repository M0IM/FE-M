import {ActiveMoimCard} from '../../calendar/ActiveMoimCard.tsx';

import {HomeStackNavigationProp} from 'navigators/types/index.ts';
import {TMoimDTOResponse} from 'types/dtos/moim.ts';

export default function MoimActiveEvent({
  navigation,
  moim,
}: {
  navigation: HomeStackNavigationProp;
  moim: TMoimDTOResponse;
}) {
  return <ActiveMoimCard navigation={navigation} moim={moim} />;
}
