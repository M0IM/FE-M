import BottomSheet from '../BottomSheet/BottomSheet.tsx';
import {View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import React from 'react';
import {CustomButton} from '../CustomButton/CustomButton.tsx';

type TDateSelectorBottomSheet = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  date: Date;
  onChangeDate: (date: Date) => void;
  onConfirmDate: () => void;
  mode?: 'date' | 'time';
};

export function DateSelectorBottomSheet({
  isOpen,
  onOpen,
  onClose,
  date,
  onChangeDate,
  onConfirmDate,
  mode = 'date',
}: TDateSelectorBottomSheet) {
  return (
    <BottomSheet
      isBottomSheetOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      children={
        <View className="flex-1 flex-col justify-between items-center p-3.5">
          <DatePicker
            mode={mode}
            date={date}
            onDateChange={onChangeDate}
            locale="ko-KR"
            theme="light"
            className="flex-1"
          />
          <CustomButton
            label="적용하기"
            onPress={onConfirmDate}
            textStyle="text-white text-base font-bold"
          />
        </View>
      }
      height={400}
    />
  );
}
