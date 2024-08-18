import {TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import {MoimStackParamList} from 'navigators/types';
import {StackNavigationProp} from '@react-navigation/stack';

import {CustomButton} from '../@common/CustomButton/CustomButton.tsx';
import {DatePickerOption} from '../@common/DatePickerOption/DatePickerOption.tsx';
import {TimePickerOption} from '../@common/TimePickerOption/TimePickerOption.tsx';
import AddPostHeaderRight from './AddPostHeaderRight.tsx';
import {ScreenContainer} from '../ScreenContainer.tsx';
import {Typography} from '../@common/Typography/Typography.tsx';
import {InputField} from '../@common/InputField/InputField.tsx';
import ScheduleEditEvent from '../screens/MoimWriteScreen/ScheduleEditEvent.tsx';
import ScheduleEvent from '../screens/MoimWriteScreen/ScheduleEvent.tsx';
import Octicons from 'react-native-vector-icons/Octicons';
import IonIcons from 'react-native-vector-icons/Ionicons';
import useForm from 'hooks/useForm.ts';
import {
  formatTime,
  getDateWithSeparator,
  parseTimeStringToDate,
  validateAddMoimPosts,
} from 'utils';
import useModal from 'hooks/useModal.ts';
import usePostDetailMoimCalendar from 'hooks/queries/MoimWriteScreen/usePostDetailMoimCalendar.ts';

interface IPostForm {
  moimId: number;
}

type TNavigationProps = StackNavigationProp<MoimStackParamList, 'MOIM_WRITE'>;

type TSchedules = {
  title: string;
  startTime: string;
};

export default function PostForm({moimId}: IPostForm) {
  const navigation = useNavigation<TNavigationProps>();
  const datePickerModal = useModal();
  const timePickerModal = useModal(); // Time picker modal for managing time selection
  const [isPicked, setIsPicked] = useState(false);
  const [isPickedTime, setIsPickedTime] = useState(false);
  const [date, setDate] = useState(new Date());
  const [isEdit, setIsEdit] = useState(false);
  const [schedules, setSchedules] = useState<TSchedules[]>([]);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const addPost = useForm({
    initialValue: {
      title: '',
      date: '',
      locationDetail: '',
      cost: '',
    },
    validate: validateAddMoimPosts,
  });

  const {mutate} = usePostDetailMoimCalendar();

  const handleSubmit = () => {
    mutate(
      {
        moimId,
        title: addPost.values.title,
        date,
        // TODO: 지역 API 추가시, SelectBox 형태로 추가하기.
        location: '주소나중에 추가됨',
        locationDetail: addPost.values.locationDetail,
        startTime: selectedTime,
        cost: addPost.values.cost,
        schedules: schedules.map(schedule => {
          const dateObject = parseTimeStringToDate(schedule.startTime);
          return {
            ...schedule,
            startTime: dateObject.toISOString(),
          };
        }),
      },
      {
        onSuccess: () => {
          // TODO: 글 작성 후 해당 게시글로 돌아갈지, 아니면 뒤로가기 할 시 상의 후 설정하기.
          navigation.goBack();
        },
      },
    );
  };

  const handleChangeDate = (pickedDate: Date) => {
    setDate(pickedDate);
  };

  const handleChangeTime = (pickedTime: Date) => {
    setSelectedTime(pickedTime);
  };

  const handleConfirmDate = () => {
    setIsPicked(true);
    datePickerModal.hide();
  };

  const handleConfirmTime = () => {
    const updatedSchedules = schedules.map((schedule, index) => {
      if (index === isEditing) {
        return {...schedule, startTime: selectedTime.toLocaleTimeString()};
      }
      return schedule;
    });
    setSchedules(updatedSchedules);
    setIsPickedTime(true);
    timePickerModal.hide();
  };

  const addSchedule = () => {
    setSchedules([...schedules, {title: '', startTime: ''}]);
    setIsEditing(schedules.length);
  };

  const saveSchedule = () => {
    setIsEditing(null);
  };

  const editSchedule = (index: number) => {
    setIsEditing(index);
  };

  const deleteSchedule = (index: number) => {
    const updatedSchedules = schedules.filter((_, i) => i !== index);
    setSchedules(updatedSchedules);
    if (isEditing === index) {
      setIsEditing(null);
    }
  };

  const handleScheduleChange = (
    index: number,
    key: 'title' | 'startTime',
    value: string,
  ) => {
    const updatedSchedules = schedules.map((schedule, i) => {
      if (i === index) {
        return {...schedule, [key]: value};
      }
      return schedule;
    });
    setSchedules(updatedSchedules);
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => AddPostHeaderRight(handleSubmit),
    });
  }, [handleSubmit, navigation]);

  return (
    <ScreenContainer>
      <View className="mt-2">
        <Typography className="text-gray-500 mb-3" fontWeight={'BOLD'}>
          일정 제목
        </Typography>
        <InputField
          autoFocus
          {...addPost.getTextInputProps('title')}
          error={addPost.errors.title}
          touched={addPost.touched.title}
          placeholder="제목을 입력하세요."
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => {}}
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
      <View className="mt-2">
        <Typography className="text-gray-500 mb-3" fontWeight={'BOLD'}>
          위치
        </Typography>
        <InputField
          className="flex-1"
          touched={true}
          placeholder={'위치를 입력해주세요.'}
          icon={<Octicons name={'location'} size={24} color="lightgray" />}
        />
      </View>
      <InputField
        className="flex-1"
        placeholder={'세부 주소를 입력해주세요.'}
        {...addPost.getTextInputProps('locationDetail')}
        error={addPost.errors.locationDetail}
        touched={addPost.touched.locationDetail}
        returnKeyType="next"
        blurOnSubmit={false}
        onSubmitEditing={() => {}}
      />
      <View className="mt-2">
        <Typography className="text-gray-500 mb-3" fontWeight={'BOLD'}>
          비용
        </Typography>
        <InputField
          className="flex-1"
          placeholder={'비용을 입력해주세요.'}
          {...addPost.getTextInputProps('cost')}
          error={addPost.errors.cost}
          touched={addPost.touched.cost}
          returnKeyType="next"
          keyboardType={'numeric'}
          blurOnSubmit={false}
          onSubmitEditing={() => {}}
        />
      </View>
      <View className="mt-2">
        <Typography className="text-gray-500 mb-3" fontWeight={'BOLD'}>
          시작 시간
        </Typography>
        <CustomButton
          variant={'gray'}
          label={
            isPickedTime || isEdit ? formatTime(selectedTime) : '시작 시간'
          }
          onPress={timePickerModal.show}
        />
      </View>
      <TimePickerOption
        isVisible={timePickerModal.isVisible}
        onOpen={timePickerModal.show}
        onClose={timePickerModal.hide}
        time={selectedTime}
        onChangeTime={handleChangeTime}
        onConfirmTime={handleConfirmTime}
      />
      <View className="flex-row items-center">
        <Typography className="text-gray-500 flex-1" fontWeight={'BOLD'}>
          시간별 스케줄
        </Typography>
        <TouchableOpacity onPress={addSchedule}>
          <IonIcons name={'add'} size={24} color="lightgray" />
        </TouchableOpacity>
      </View>
      {schedules.map((schedule, index) => (
        <View
          key={index}
          className="flex-col p-5 border-gray-300 border-2 rounded-2xl mt-3">
          {isEditing === index ? (
            <ScheduleEditEvent
              schedule={schedule}
              onSave={saveSchedule}
              onChange={(key, value) => handleScheduleChange(index, key, value)}
            />
          ) : (
            <ScheduleEvent
              schedule={schedule}
              onEdit={() => editSchedule(index)}
              onDelete={() => deleteSchedule(index)}
            />
          )}
        </View>
      ))}
    </ScreenContainer>
  );
}
