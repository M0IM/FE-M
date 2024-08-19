import React, {useState} from 'react';
import {View} from 'react-native';

import {Typography} from 'components/@common/Typography/Typography.tsx';
import {InputField} from 'components/@common/InputField/InputField.tsx';
import {CustomButton} from 'components/@common/CustomButton/CustomButton.tsx';
import {DatePickerOption} from 'components/@common/DatePickerOption/DatePickerOption.tsx';
import {ScreenContainer} from 'components/ScreenContainer.tsx';

import useForm from 'hooks/useForm.ts';
import useModal from 'hooks/useModal.ts';
import usePostMyCalendarSchedule from 'hooks/queries/CalendarHomeScreen/usePostMyCalendarSchedule.ts';

import {getDateWithSeparator, validateCalendarWrite} from 'utils';
import {CalendarStackNavigationProp} from 'navigators/types';
import {queryClient} from 'containers/TanstackQueryContainer.tsx';

function CalendarWriteScreen({
  navigation,
}: {
  navigation: CalendarStackNavigationProp;
}) {
  const datePickerModal = useModal();
  const [isPicked, setIsPicked] = useState(false);
  const [date, setDate] = useState(new Date());
  const handleChangeDate = (pickedDate: Date) => {
    setDate(pickedDate);
  };
  const handleConfirmDate = () => {
    setIsPicked(true);
    datePickerModal.hide();
  };
  const {mutate} = usePostMyCalendarSchedule();

  const writeMyCalendar = useForm({
    initialValue: {
      title: '',
    },
    validate: validateCalendarWrite,
  });

  const handleSubmitMySchedule = () => {
    mutate(
      {
        date,
        content: writeMyCalendar.values.title,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({queryKey: ['myCalendar']});
          navigation.navigate('CALENDAR_HOME');
        },
        onError: error => console.log(error),
      },
    );
  };

  return (
    <ScreenContainer
      fixedBottomComponent={
        <CustomButton
          variant={'filled'}
          label={'작성 완료'}
          textStyle={'font-bold text-white text-lg'}
          onPress={handleSubmitMySchedule}
        />
      }>
      <View className="mt-5">
        <Typography className="text-gray-500 mb-3" fontWeight={'BOLD'}>
          개인 일정
        </Typography>
        <InputField
          autoFocus
          placeholder={'개인 일정을 입력해주세요.'}
          error={writeMyCalendar.errors.title}
          touched={writeMyCalendar.touched.title}
          inputMode="text"
          returnKeyType="next"
          blurOnSubmit={false}
          {...writeMyCalendar.getTextInputProps('title')}
        />
      </View>
      <View className="mt-2">
        <Typography className="text-gray-500 mb-3" fontWeight={'BOLD'}>
          날짜
        </Typography>
        <CustomButton
          variant="gray"
          label={isPicked ? `${getDateWithSeparator(date, '. ')}` : '날짜 선택'}
          onPress={datePickerModal.show}
        />
      </View>
      <DatePickerOption
        isVisible={datePickerModal.isVisible}
        onOpen={datePickerModal.show}
        onClose={datePickerModal.hide}
        date={date}
        onChangeDate={handleChangeDate}
        onConfirmDate={handleConfirmDate}
      />
    </ScreenContainer>
  );
}

export default CalendarWriteScreen;
