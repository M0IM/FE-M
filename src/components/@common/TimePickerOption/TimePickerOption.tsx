import React from 'react';
import {View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {CustomButton} from '../CustomButton/CustomButton.tsx';
import BottomSheet from '../BottomSheet/BottomSheet.tsx';

interface ITimePickerOption {
  isVisible: boolean;
  time: Date;
  onChangeTime: (time: Date) => void;
  onConfirmTime: () => void;
  onOpen: () => void;
  onClose: () => void;
}

export function TimePickerOption({
  isVisible,
  time,
  onChangeTime,
  onConfirmTime,
  onOpen,
  onClose,
}: ITimePickerOption) {
  return (
    <BottomSheet
      isBottomSheetOpen={isVisible}
      onOpen={onOpen}
      onClose={onClose}
      height={400}>
      <View className="flex-1 flex-col justify-between items-center p-3.5">
        <DatePicker
          mode="time"
          date={time}
          onDateChange={onChangeTime}
          locale="ko-KR"
          theme="light"
          className="flex-1"
        />
        <CustomButton
          label="적용하기"
          onPress={onConfirmTime}
          textStyle="text-white text-base font-bold w-full items-center justify-center text-center"
        />
      </View>
    </BottomSheet>
  );
}
