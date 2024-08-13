import React from 'react';
import {TextInput, TouchableOpacity, View} from 'react-native';
import {Typography} from '../../@common/Typography/Typography.tsx';

type TSchedules = {
  title: string;
  startTime: string;
};

interface ScheduleEditProps {
  schedule: TSchedules;
  onSave: () => void;
  onChange: (key: 'title' | 'startTime', value: string) => void;
}

const ScheduleEditEvent = ({schedule, onSave, onChange}: ScheduleEditProps) => (
  <View className="flex-col gap-y-4">
    <View className="flex-row">
      <TextInput
        className="flex-1"
        placeholder="스케줄 제목을 작성해주세요."
        value={schedule.title}
        onChangeText={text => onChange('title', text)}
      />
      <TouchableOpacity className="border-b-2 border-b-black" onPress={onSave}>
        <Typography fontWeight={'BOLD'}>저장</Typography>
      </TouchableOpacity>
    </View>
    <View className="flex-row">
      <Typography fontWeight={'LIGHT'} className="text-gray-300 basis-1/5">
        시간
      </Typography>
      <TextInput
        className="basis-4/5"
        placeholder="스케줄 시작 시간을 입력해주세요."
        value={schedule.startTime}
        onChangeText={text => onChange('startTime', text)}
      />
    </View>
  </View>
);

export default ScheduleEditEvent;
