import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {MoimStackParamList} from 'navigators/types';
import AddPostHeaderRight from './AddPostHeaderRight.tsx';
import {StackNavigationProp} from '@react-navigation/stack';
import {ScreenContainer} from '../ScreenContainer.tsx';
import {Typography} from '../@common/Typography/Typography.tsx';
import {InputField} from '../@common/InputField/InputField.tsx';
import useForm from '../../hooks/useForm.ts';
import {
  formatTime,
  getDateWithSeparator,
  validateAddMoimPosts,
} from '../../utils';
import {CustomButton} from '../@common/CustomButton/CustomButton.tsx';
import useModal from '../../hooks/useModal.ts';
import {DatePickerOption} from '../@common/DatePickerOption/DatePickerOption.tsx';
import {TimePickerOption} from '../@common/TimePickerOption/TimePickerOption.tsx'; // Import the TimePickerOption
import Octicons from 'react-native-vector-icons/Octicons';
import IonIcons from 'react-native-vector-icons/Ionicons';

interface IPostForm {
  moimId?: number;
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

  console.log(date);

  const handleSubmit = () => {
    console.log({
      moimId,
      title: addPost.values.title,
      date,
      location: '주소나중에 추가됨',
      locationDetail: addPost.values.locationDetail,
      startTime: selectedTime,
      cost: addPost.values.cost,
      schedules,
    });
  };
  console.log(selectedTime);

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
          날짜
        </Typography>
        <CustomButton
          variant={'gray'}
          label={isPicked || isEdit ? formatTime(selectedTime) : '시작 시간'}
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
          시간별 스케쥴
        </Typography>
        <TouchableOpacity onPress={addSchedule}>
          <IonIcons name={'add'} size={24} color="lightgray" />
        </TouchableOpacity>
      </View>
      {schedules.map((schedule, index) => (
        <View
          key={index}
          className="flex-col p-5 border-gray-300 border-2 rounded-2xl mt-3">
          <View className="gap-y-4">
            {isEditing === index ? (
              <>
                <View className="flex-row">
                  <TextInput
                    className="flex-1"
                    placeholder="스케줄 제목을 작성해주세요."
                    value={schedule.title}
                    onChangeText={text =>
                      handleScheduleChange(index, 'title', text)
                    }
                  />
                  <TouchableOpacity
                    className="border-b-2 border-b-black"
                    onPress={saveSchedule}>
                    <Typography fontWeight={'BOLD'}>저장</Typography>
                  </TouchableOpacity>
                </View>
                <View className="flex-row">
                  <Typography
                    fontWeight={'LIGHT'}
                    className="text-gray-300 basis-1/5">
                    시간
                  </Typography>
                  <TextInput
                    className="basis-4/5"
                    placeholder="스케줄 시작 시간을 입력해주세요."
                    value={schedule.startTime}
                    onChangeText={text =>
                      handleScheduleChange(index, 'startTime', text)
                    }
                  />
                </View>
              </>
            ) : (
              <>
                <View className="flex-row justify-between items-center">
                  <Typography fontWeight={'BOLD'}>{schedule.title}</Typography>
                  <View className="flex-row items-center justify-center gap-x-3">
                    <TouchableOpacity onPress={() => editSchedule(index)}>
                      <IonIcons name={'pencil'} size={24} color="lightgray" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => deleteSchedule(index)}>
                      <IonIcons name={'trash'} size={24} color="lightgray" />
                    </TouchableOpacity>
                  </View>
                </View>
                <View className="flex-row items-center">
                  <Typography
                    fontWeight={'LIGHT'}
                    className="text-gray-300 basis-1/5">
                    시간
                  </Typography>
                  <Typography fontWeight={'LIGHT'} className="basis-4/5">
                    {schedule.startTime}
                  </Typography>
                </View>
              </>
            )}
          </View>
        </View>
      ))}
    </ScreenContainer>
  );
}
