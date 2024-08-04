import {Text} from 'react-native';

import {ScreenContainer} from 'components/ScreenContainer.tsx';

import {CalendarStackRouteProp} from 'navigators/types';

interface ICalendarDetailScreenProps {
  route: CalendarStackRouteProp;
}

export default function CalendarDetailScreen({
  route,
}: ICalendarDetailScreenProps) {
  return (
    <ScreenContainer>
      <Text className={'text-blue'}>
        {route.params?.id}번 캘린더 상세 스크린
      </Text>
    </ScreenContainer>
  );
}
