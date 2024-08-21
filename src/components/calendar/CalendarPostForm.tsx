import React, {useState} from 'react';
import {View} from 'react-native';

import {queryClient} from 'containers/TanstackQueryContainer.tsx';
import {ScreenContainer} from '../ScreenContainer.tsx';
import {CustomButton} from '../@common/CustomButton/CustomButton.tsx';
import {Typography} from '../@common/Typography/Typography.tsx';
import {InputField} from '../@common/InputField/InputField.tsx';
import {DatePickerOption} from '../@common/DatePickerOption/DatePickerOption.tsx';

import useModal from 'hooks/useModal.ts';
import usePostMyCalendarSchedule from 'hooks/queries/CalendarHomeScreen/usePostMyCalendarSchedule.ts';
import useForm from 'hooks/useForm.ts';
import {getDateWithSeparator, validateCalendarWrite} from 'utils';
import {CalendarStackNavigationProp} from 'navigators/types';
import useMyCalendarStore from 'stores/useMyCalendarStore.ts';
import useUpdateMyCalendarSchedule from 'hooks/queries/CalendarHomeScreen/useUpdateMyCalendarSchedule.ts';

function CalendarPostForm({
  navigation,
}: {
  navigation: CalendarStackNavigationProp;
}) {
  const datePickerModal = useModal();
  const [isPicked, setIsPicked] = useState(false);
  const {myCalendar, isEditMode, setIsEditMode} = useMyCalendarStore();
  const isEdit = myCalendar && isEditMode;
  const [date, setDate] = useState(
    isEdit ? new Date(myCalendar?.time) : new Date(),
  );

  const handleChangeDate = (pickedDate: Date) => {
    setDate(pickedDate);
  };
  const handleConfirmDate = () => {
    setIsPicked(true);
    datePickerModal.hide();
  };
  const {mutate: postCalendar} = usePostMyCalendarSchedule();
  const {mutate: modifyCalendar} = useUpdateMyCalendarSchedule();

  const writeMyCalendar = useForm({
    initialValue: {
      title: isEdit ? myCalendar.title : '',
    },
    validate: validateCalendarWrite,
  });

  const handleSubmitMySchedule = () => {
    postCalendar(
      {
        date,
        content: writeMyCalendar.values.title,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({queryKey: ['myCalendar']});
          queryClient.invalidateQueries({queryKey: ['myScheduleCount']});
          queryClient.invalidateQueries({queryKey: ['todaySchedules']});
          navigation.navigate('CALENDAR_HOME');
        },
        onError: error => console.log(error),
      },
    );
  };

  const handleModifyMyScheule = () => {
    isEdit &&
      modifyCalendar(
        {
          planId: myCalendar.planId,
          date,
          content: writeMyCalendar.values.title,
        },
        {
          onSuccess: () => {
            setIsEditMode(false);
            queryClient.invalidateQueries({queryKey: ['myCalendar']});
            queryClient.invalidateQueries({queryKey: ['myScheduleCount']});
            queryClient.invalidateQueries({queryKey: ['todaySchedules']});

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
          onPress={isEdit ? handleModifyMyScheule : handleSubmitMySchedule}
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
          label={
            isPicked || isEdit
              ? `${getDateWithSeparator(date, '. ')}`
              : '날짜 선택'
          }
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

export default CalendarPostForm;
