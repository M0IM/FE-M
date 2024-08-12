import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Typography} from '../../@common/Typography/Typography.tsx';
import IonIcons from 'react-native-vector-icons/Ionicons';

type TSchedules = {
  title: string;
  startTime: string;
};

interface ScheduleDisplayProps {
  schedule: TSchedules;
  onEdit: () => void;
  onDelete: () => void;
}

const ScheduleEvent = ({schedule, onEdit, onDelete}: ScheduleDisplayProps) => (
  <View className="flex-col gap-y-4">
    <View className="flex-row justify-between items-center">
      <Typography fontWeight={'BOLD'}>{schedule.title}</Typography>
      <View className="flex-row items-center justify-center gap-x-3">
        <TouchableOpacity onPress={onEdit}>
          <IonIcons name={'pencil'} size={24} color="lightgray" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete}>
          <IonIcons name={'trash'} size={24} color="lightgray" />
        </TouchableOpacity>
      </View>
    </View>
    <View className="flex-row items-center">
      <Typography fontWeight={'LIGHT'} className="text-gray-300 basis-1/5">
        시간
      </Typography>
      <Typography fontWeight={'LIGHT'} className="basis-4/5">
        {schedule.startTime}
      </Typography>
    </View>
  </View>
);

export default ScheduleEvent;
