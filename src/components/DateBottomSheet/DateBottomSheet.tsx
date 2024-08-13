import DatePicker from 'react-native-date-picker';
import {CustomButton} from '../@common/CustomButton/CustomButton.tsx';
import BottomSheet from '../@common/BottomSheet/BottomSheet.tsx';

type TDateBottomSheetProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  date: Date;
  onDateChange: (date: Date) => void;
  onPress: () => void;
};

export default function DateBottomSheet({
  isOpen,
  onOpen,
  onClose,
  date,
  onDateChange,
  onPress,
}: TDateBottomSheetProps) {
  return (
    <BottomSheet
      isBottomSheetOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      height={350}>
      <DatePicker
        date={date}
        onDateChange={onDateChange}
        locale={'ko'}
        mode={'date'}
      />
      <CustomButton
        variant={'outlined'}
        label={'날짜 선택하기'}
        textStyle={'font-bold text-lg'}
        onPress={onPress}
      />
    </BottomSheet>
  );
}
