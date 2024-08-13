import React, {useState} from 'react';
import {TextInput, TouchableOpacity, View} from 'react-native';

import {Typography} from '../../@common/Typography/Typography.tsx';
import {TimePickerOption} from '../../@common/TimePickerOption/TimePickerOption.tsx';
import {formatTime} from 'utils';

type TSchedules = {
  title: string;
  startTime: string;
};

interface ScheduleEditProps {
  schedule: TSchedules;
  onSave: () => void;
  onChange: (key: 'title' | 'startTime', value: string) => void;
}

const ScheduleEditEvent = ({schedule, onSave, onChange}: ScheduleEditProps) => {
  const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());

  const handleConfirmTime = () => {
    onChange('startTime', formatTime(selectedTime));
    setIsTimePickerVisible(false);
  };

  return (
    <View className="flex-col gap-y-4">
      <View className="flex-row">
        <TextInput
          className="flex-1"
          placeholder="스케줄 제목을 작성해주세요."
          value={schedule.title}
          onChangeText={text => onChange('title', text)}
        />
        <TouchableOpacity
          className="border-b-2 border-b-black"
          onPress={onSave}>
          <Typography fontWeight={'BOLD'}>저장</Typography>
        </TouchableOpacity>
      </View>
      <View className="flex-row">
        <Typography fontWeight={'LIGHT'} className="text-gray-300 basis-1/5">
          시간
        </Typography>
        <TouchableOpacity
          className="basis-4/5"
          onPress={() => setIsTimePickerVisible(true)}>
          <Typography fontWeight={'BOLD'}>
            {schedule.startTime || '시간 선택'}
          </Typography>
        </TouchableOpacity>
      </View>
      <TimePickerOption
        isVisible={isTimePickerVisible}
        onOpen={() => setIsTimePickerVisible(true)}
        onClose={() => setIsTimePickerVisible(false)}
        time={selectedTime}
        onChangeTime={setSelectedTime}
        onConfirmTime={handleConfirmTime}
      />
    </View>
  );
};
export default ScheduleEditEvent;