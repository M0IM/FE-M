import React, {useState} from 'react';
import {View} from 'react-native';
import moment from 'moment';

import {queryClient} from 'containers/TanstackQueryContainer.tsx';
import {ScreenContainer} from '../ScreenContainer.tsx';
import {CustomButton} from '../@common/CustomButton/CustomButton.tsx';
import {Typography} from '../@common/Typography/Typography.tsx';
import {InputField} from '../@common/InputField/InputField.tsx';
import {DatePickerOption} from '../@common/DatePickerOption/DatePickerOption.tsx';

import useModal from 'hooks/useModal.ts';
import usePostMyCalendarSchedule from 'hooks/queries/CalendarHomeScreen/usePostMyCalendarSchedule.ts';
import useForm from 'hooks/useForm.ts';
import {formatTime, getDateWithSeparator, validateCalendarWrite} from 'utils';
import {CalendarStackNavigationProp} from 'navigators/types';
import useMyCalendarStore from 'stores/useMyCalendarStore.ts';
import useUpdateMyCalendarSchedule from 'hooks/queries/CalendarHomeScreen/useUpdateMyCalendarSchedule.ts';
import {TimePickerOption} from '../@common/TimePickerOption/TimePickerOption.tsx';
import {useNavigation} from '@react-navigation/native';

function CalendarPostForm() {
  const datePickerModal = useModal();
  const timePickerModal = useModal();
  const [isDatePicked, setIsDatePicked] = useState(false);
  const [isTimePicked, setIsTimePicked] = useState(false);
  const {myCalendar, isEditMode, setIsEditMode} = useMyCalendarStore();
  const isEdit = myCalendar && isEditMode;
  const [date, setDate] = useState(
    isEdit ? new Date(myCalendar?.time) : new Date(),
  );
  const [time, setTime] = useState(new Date());
  const handleChangeDate = (pickedDate: Date) => {
    setDate(pickedDate);
  };
  const handleConfirmDate = () => {
    setIsDatePicked(true);
    datePickerModal.hide();
  };
  const handleChangeTime = (pickedTime: Date) => {
    setTime(pickedTime);
  };
  const handleConfirmTime = () => {
    setIsTimePicked(true);
    timePickerModal.hide();
  };

  const {mutate: postCalendar} = usePostMyCalendarSchedule();
  const {mutate: modifyCalendar} = useUpdateMyCalendarSchedule();
  const navigation = useNavigation<CalendarStackNavigationProp>();

  const writeMyCalendar = useForm({
    initialValue: {
      title: isEdit ? myCalendar.title : '',
      location: isEdit ? myCalendar.location : '',
      locationDetail: isEdit ? myCalendar.locationDetail : '',
      memo: isEdit ? myCalendar.memo : '',
    },
    validate: validateCalendarWrite,
  });

  const handleSubmitMySchedule = () => {
    postCalendar(
      {
        title: writeMyCalendar.values.title,
        date: moment(date).format('YYYY-MM-DD'),
        startTime: moment(time).format('HH:mm:ss'),
        location: writeMyCalendar.values.location,
        locationDetail: writeMyCalendar.values.locationDetail,
        memo: writeMyCalendar.values.memo,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({queryKey: ['calendar']});
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
          title: writeMyCalendar.values.title,
          date: moment(date).format('YYYY-MM-DD'),
          startTime: moment(time).format('HH:mm:ss'),
          location: writeMyCalendar.values.location,
          locationDetail: writeMyCalendar.values.locationDetail,
          memo: writeMyCalendar.values.memo,
        },
        {
          onSuccess: () => {
            setIsEditMode(false);
            queryClient.invalidateQueries({queryKey: ['calendar']});
            queryClient.invalidateQueries({queryKey: ['myScheduleCount']});
            queryClient.invalidateQueries({queryKey: ['todaySchedules']});

            navigation.navigate('CALENDAR_HOME');
          },
          onError: error => console.log(error.response?.data),
        },
      );
  };

  return (
    <ScreenContainer>
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
            isDatePicked || isEdit
              ? `${getDateWithSeparator(date, '. ')}`
              : '날짜 선택'
          }
          onPress={datePickerModal.show}
        />
      </View>
      <View className="mt-2">
        <Typography className="text-gray-500 mb-3" fontWeight={'BOLD'}>
          시작 시간
        </Typography>
        <CustomButton
          variant="gray"
          label={isTimePicked || isEdit ? formatTime(time) : '시작 시간'}
          onPress={timePickerModal.show}
        />
      </View>
      <View className="mt-5">
        <Typography className="text-gray-500 mb-3" fontWeight={'BOLD'}>
          주소
        </Typography>
        <InputField
          autoFocus
          placeholder={'주소를 입력해주세요.'}
          error={writeMyCalendar.errors.location}
          touched={writeMyCalendar.touched.location}
          inputMode="text"
          returnKeyType="next"
          blurOnSubmit={false}
          {...writeMyCalendar.getTextInputProps('location')}
        />
      </View>
      <View className="mt-5">
        <Typography className="text-gray-500 mb-3" fontWeight={'BOLD'}>
          상세 주소
        </Typography>
        <InputField
          autoFocus
          placeholder={'상세 주소를 입력해주세요.'}
          error={writeMyCalendar.errors.locationDetail}
          touched={writeMyCalendar.touched.locationDetail}
          inputMode="text"
          returnKeyType="next"
          blurOnSubmit={false}
          {...writeMyCalendar.getTextInputProps('locationDetail')}
        />
      </View>
      <View className="mt-5">
        <Typography className="text-gray-500 mb-3" fontWeight={'BOLD'}>
          메모
        </Typography>
        <InputField
          autoFocus
          placeholder={'메모'}
          error={writeMyCalendar.errors.memo}
          touched={writeMyCalendar.touched.memo}
          inputMode="text"
          returnKeyType="join"
          blurOnSubmit={false}
          {...writeMyCalendar.getTextInputProps('memo')}
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
      <TimePickerOption
        isVisible={timePickerModal.isVisible}
        onOpen={timePickerModal.show}
        onClose={timePickerModal.hide}
        time={time}
        onChangeTime={handleChangeTime}
        onConfirmTime={handleConfirmTime}
      />
      <CustomButton
        variant={'filled'}
        label={'작성 완료'}
        textStyle={'font-bold text-white text-lg'}
        onPress={isEdit ? handleModifyMyScheule : handleSubmitMySchedule}
      />
    </ScreenContainer>
  );
}

export default CalendarPostForm;
