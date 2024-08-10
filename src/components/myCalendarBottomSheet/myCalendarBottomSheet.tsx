import React, {useRef} from 'react';
import {TextInput, View} from 'react-native';
import {Typography} from '../@common/Typography/Typography.tsx';
import {CustomButton} from '../@common/CustomButton/CustomButton.tsx';
import BottomSheet from '../@common/BottomSheet/BottomSheet.tsx';
import {InputField} from '../@common/InputField/InputField.tsx';
import useForm from '../../hooks/useForm.ts';
import {validateCalendarWrite} from '../../utils';
import DatePicker from 'react-native-date-picker';

type TMyCalendarBottomSheet = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export default function MyCalendarBottomSheet({
  isOpen,
  onOpen,
  onClose,
}: TMyCalendarBottomSheet) {
  const dateRef = useRef<TextInput | null>(null);

  // Initialize form state and validation
  const writeMyCalendar = useForm({
    initialValue: {
      title: '',
      date: '',
    },
    validate: validateCalendarWrite,
  });

  const handlePressWriteCalendar = () => {
    console.log({
      title: writeMyCalendar.values.title,
      date: writeMyCalendar.values.date,
    });
    onClose();
  };

  return (
    <BottomSheet
      isBottomSheetOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      height={450}>
      <View className="flex-col w-full px-10 justify-center m-5 gap-y-10">
        <View className="w-full">
          <Typography className="mb-5" fontWeight={'BOLD'}>
            개인 일정
          </Typography>
          <InputField
            autoFocus
            placeholder={'개인 일정 입력'}
            error={writeMyCalendar.errors.title}
            touched={writeMyCalendar.touched.title}
            inputMode="text"
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => dateRef.current?.focus()}
            {...writeMyCalendar.getTextInputProps('title')}
          />
        </View>
        <View>
          <Typography className="mb-5" fontWeight={'BOLD'}>
            날짜
          </Typography>
          <InputField
            ref={dateRef}
            placeholder={'날짜를 입력해주세요.'}
            error={writeMyCalendar.errors.date}
            touched={writeMyCalendar.touched.date}
            secureTextEntry={false}
            returnKeyType="done"
            onSubmitEditing={handlePressWriteCalendar}
            {...writeMyCalendar.getTextInputProps('date')}
          />
        </View>
        <CustomButton
          variant={'filled'}
          label={'작성 완료'}
          textStyle={'font-bold text-white text-lg'}
          onPress={handlePressWriteCalendar} // Connect button to form submission
        />
      </View>
    </BottomSheet>
  );
}
