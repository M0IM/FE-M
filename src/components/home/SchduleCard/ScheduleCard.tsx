import { View, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import React from 'react';

interface ScheduleCardProps extends TouchableOpacityProps {
    schedule: string;
    date: string;
    time: string;
    spaceName: string;
}

const ScheduleCard = ({
    schedule,
    date,
    time,
    spaceName,
    ...props
}: ScheduleCardProps) => {
  return (
    <TouchableOpacity
        {...props}
        activeOpacity={0.8}
        className='flex flex-col p-6 bg-gray-50 border-gray-200 border-[1px] rounded-xl max-w-[280]'
    >
        <View className='flex gap-3 flex-row items-center'>
            <View className='w-[5] h-[27] rounded-lg bg-main' />
            <Text className='text-dark-800 text-lg font-medium'>{schedule}</Text>
        </View>
        <Text className='mt-1 ml-[17] text-gray-300'>{date}</Text>
        <Text className='mt-1 ml-[17] text-gray-300'>{time}</Text>
        <Text className='font-bold mt-6 text-dark-800'>{spaceName}</Text>
    </TouchableOpacity>
  )
}

export default ScheduleCard