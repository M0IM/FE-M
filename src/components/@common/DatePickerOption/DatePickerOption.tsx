import {Modal, Pressable, SafeAreaView, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {Typography} from '../Typography/Typography.tsx';
import BottomSheet from '../BottomSheet/BottomSheet.tsx';
import {CustomButton} from '../CustomButton/CustomButton.tsx';
import React from 'react';

interface IDatePickerOption {
  isVisible: boolean;
  date: Date;
  onChangeDate: (date: Date) => void;
  onConfirmDate: () => void;
  onOpen: () => void;
  onClose: () => void;
  mode?: 'date' | 'time';
}

export function DatePickerOption({
  isVisible,
  date,
  onChangeDate,
  onConfirmDate,
  onOpen,
  onClose,
  mode = 'date',
}: IDatePickerOption) {
  return (
    <BottomSheet
      isBottomSheetOpen={isVisible}
      onOpen={onOpen}
      onClose={onClose}
      height={400}
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
            textStyle="text-white text-base font-bold w-full items-center justify-center text-center"
          />
        </View>
      }
    />
  );
}
