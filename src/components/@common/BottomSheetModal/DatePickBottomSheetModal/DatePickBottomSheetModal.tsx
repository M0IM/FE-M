import React, { forwardRef } from 'react';
import { View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import CustomBottomSheetModal from 'components/@common/CustomBottomSheetModal/CustomBottomSheetModal';
import { CustomButton } from 'components/@common/CustomButton/CustomButton';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Typography } from 'components/@common/Typography/Typography';

interface DatePickBottomSheetModalProps {
  ref: React.Ref<BottomSheetModal>;
  date: Date;
  onChangeDate: (date: Date) => void;
  onConfirmDate: () => void;
  mode?: 'date' | 'time';
}

const DatePickBottomSheetModal = forwardRef<BottomSheetModal, DatePickBottomSheetModalProps>(
  ({ date, onChangeDate, onConfirmDate, mode = 'date' }, ref) => {
    return (
      <CustomBottomSheetModal
        ref={ref}
        minHeight="55%"
        maxHeight="55%"
      >
        <View className='flex flex-col h-full gap-2 p-4 items-center'>
            <Typography fontWeight='BOLD'>{mode === 'date' ? '날짜 선택' : '시간 선택'}</Typography>
                <DatePicker 
                    mode={mode}
                    date={date}
                    onDateChange={onChangeDate}
                    locale='ko-KR'
                    theme='light'
                    className='flex-1'
                />
            <CustomButton label="적용하기" onPress={onConfirmDate} textStyle='text-white text-base font-bold' />
        </View>
      </CustomBottomSheetModal>
    );
  }
);

DatePickBottomSheetModal.displayName = 'DatePickBottomSheetModal';

export default DatePickBottomSheetModal;
