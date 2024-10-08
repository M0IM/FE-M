import {TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import IonIcons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';

import {CustomButton} from '../@common/CustomButton/CustomButton.tsx';
import {DatePickerOption} from '../@common/DatePickerOption/DatePickerOption.tsx';
import {TimePickerOption} from '../@common/TimePickerOption/TimePickerOption.tsx';
import {ScreenContainer} from '../ScreenContainer.tsx';
import {Typography} from '../@common/Typography/Typography.tsx';
import {InputField} from '../@common/InputField/InputField.tsx';
import ScheduleEditEvent from '../screens/MoimWriteScreen/ScheduleEditEvent.tsx';
import ScheduleEvent from '../screens/MoimWriteScreen/ScheduleEvent.tsx';

import {
  formatTime,
  getDateWithSeparator,
  getMonthYearDetails,
  parseTimeStringToDate,
  validateAddMoimPosts,
} from 'utils';

import useForm from 'hooks/useForm.ts';
import useModal from 'hooks/useModal.ts';
import usePostDetailMoimCalendar from 'hooks/queries/MoimWriteScreen/usePostDetailMoimCalendar.ts';
import useThrottle from 'hooks/useThrottle.ts';
import useUpdateDetailMoimCalendar from '../../hooks/queries/MoimWriteScreen/useUpdateDetailMoimCalendar.ts';

import {MoimPlanStackNavigationProp} from 'navigators/types';
import {queryClient} from 'containers/TanstackQueryContainer.tsx';
import useMoimCalendarStore from 'stores/useMoimCalendarStore.ts';
import RegionBottomSheet from '../screens/RegionBottomSheet/RegionBottomSheet.tsx';

interface IPostForm {
  moimId: number;
}

// type TNavigationProps = StackNavigationProp<MoimStackParamList, 'MOIM_WRITE'>;

type TSchedules = {
  title: string;
  startTime: string;
};

export default function PostForm({moimId}: IPostForm) {
  const currentMonthYear = getMonthYearDetails(new Date());
  const navigation = useNavigation<MoimPlanStackNavigationProp>();
  const datePickerModal = useModal();
  const timePickerModal = useModal();
  const {moimCalendar, setIsEditMode, isEditMode} = useMoimCalendarStore();
  const isEdit = moimCalendar && isEditMode;
  const [isPicked, setIsPicked] = useState(false);
  const [isPickedTime, setIsPickedTime] = useState<boolean | Date>(
    isEdit ? new Date(moimCalendar.startTime) : new Date(),
  );
  const [date, setDate] = useState(
    isEdit ? new Date(moimCalendar?.date) : new Date(),
  );
  const [schedules, setSchedules] = useState<TSchedules[]>(
    isEdit ? moimCalendar?.schedules : [],
  );

  const [selectedTime, setSelectedTime] = useState(new Date());
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const regionPickerModal = useModal();
  const [region, setRegion] = useState(isEdit ? moimCalendar?.location : '');
  const [isPickedRegion, setIsPickedRegion] = useState(false);
  const handleConfirmRegion = () => {
    setIsPickedRegion(true);
    regionPickerModal.hide();
  };

  const addPost = useForm({
    initialValue: {
      title: isEdit ? moimCalendar.title : '',
      date: isEdit ? moimCalendar.date : '',
      locationDetail: isEdit ? (moimCalendar.locationDetail ?? '') : '',
      cost: isEdit ? moimCalendar.cost : '',
    },
    validate: validateAddMoimPosts,
  });

  const {mutate: writePost, isPending: writePostIsLoading} =
    usePostDetailMoimCalendar();
  const {mutate: updatePost, isPending: updateIsLoading} =
    useUpdateDetailMoimCalendar();

  const handleSubmit = useThrottle(() => {
    const postData = {
      moimId,
      title: addPost.values.title,
      date: moment(date).format('YYYY-MM-DD'),
      location: region,
      locationDetail: addPost.values.locationDetail,
      startTime: moment(selectedTime).format('HH:mm:ss'),
      cost: addPost.values.cost,
      schedules: schedules.map(schedule => {
        const dateObject = parseTimeStringToDate(schedule.startTime);
        return {
          ...schedule,
          startTime: moment(dateObject.toISOString()).format('HH:mm:ss'),
        };
      }),
    };

    if (!postData?.title) {
      Toast.show({
        type: 'error',
        text1: '일정 제목을 입력해주세요.',
        visibilityTime: 2000,
        position: 'bottom',
      });
      return;
    } else if (!postData.location) {
      Toast.show({
        type: 'error',
        text1: '활동 장소를 입력해주세요.',
        visibilityTime: 2000,
        position: 'bottom',
      });
      return;
    } else if (!postData.locationDetail) {
      Toast.show({
        type: 'error',
        text1: '세부 활동 장소를 입력해주세요.',
        visibilityTime: 2000,
        position: 'bottom',
      });
      return;
    } else if (!postData.cost) {
      Toast.show({
        type: 'error',
        text1: '활동 비용을 입력해주세요.',
        visibilityTime: 2000,
        position: 'bottom',
      });
      return;
    }

    isEdit
      ? updatePost(
          {
            ...postData,
            planId: moimCalendar?.planId,
          },
          {
            onSuccess: () => {
              setIsEditMode(false);
              navigation.goBack();
              queryClient.invalidateQueries({
                queryKey: ['detailCalendar', moimId, moimCalendar?.planId],
              });
              queryClient.invalidateQueries({
                queryKey: [
                  'moimCalendar',
                  moimId,
                  currentMonthYear.month,
                  currentMonthYear.year,
                ],
              });
            },
          },
        )
      : writePost(
          {...postData},
          {
            onSuccess: () => {
              setIsEditMode(false);
              navigation.navigate('MOIM_PLAN_HOME', {id: moimId});
              queryClient.invalidateQueries({
                queryKey: ['detailCalendar', moimId, moimCalendar?.planId],
              });
              queryClient.invalidateQueries({queryKey: ['moimCalendar']});
            },
          },
        );
  });

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

  return (
    <ScreenContainer
      fixedBottomComponent={
        <CustomButton
          label="일정 작성"
          textStyle="text-white font-bold text-base"
          onPress={handleSubmit}
          isLoading={writePostIsLoading || updateIsLoading}
        />
      }>
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
        <CustomButton
          variant="gray"
          label={isPickedRegion || isEdit ? region : '지역 선택'}
          onPress={regionPickerModal.show}
        />
      </View>
      <InputField
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
      <View className="flex flex-col mb-14">
        {schedules.map((schedule, index) => (
          <View
            key={index}
            className="flex-col p-5 border-gray-300 border-2 rounded-2xl mb-3">
            {isEditing === index ? (
              <ScheduleEditEvent
                schedule={schedule}
                onSave={saveSchedule}
                onChange={(key, value) =>
                  handleScheduleChange(index, key, value)
                }
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
      </View>
      <RegionBottomSheet
        isOpen={regionPickerModal.isVisible}
        onClose={regionPickerModal.hide}
        onOpen={regionPickerModal.show}
        setRegion={setRegion}
        handleConfirmRegion={handleConfirmRegion}
      />
    </ScreenContainer>
  );
}
