import {CalendarStackNavigationProp} from 'navigators/types';
import CalendarPostForm from '../../components/calendar/CalendarPostForm.tsx';

function CalendarWriteScreen({
  navigation,
}: {
  navigation: CalendarStackNavigationProp;
}) {
  return <CalendarPostForm navigation={navigation} />;
}

export default CalendarWriteScreen;
