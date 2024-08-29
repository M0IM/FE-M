import {
  CalendarStackNavigationProp,
  CalendarStackRouteProp,
} from 'navigators/types';
import CalendarPostForm from '../../components/calendar/CalendarPostForm.tsx';

interface ICalendarDetailScreenProps {
  route: CalendarStackRouteProp;
  navigation: CalendarStackNavigationProp;
}

export default function CalendarModifyScreen({
  route,
  navigation,
}: ICalendarDetailScreenProps) {
  return <CalendarPostForm navigation={navigation} />;
}
