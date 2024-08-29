import { cva } from 'class-variance-authority';
import { View, Platform, PressableProps, Pressable } from 'react-native';
import { cn } from 'utils';
import Label from '../Label/Label';
import { Typography } from '../Typography/Typography';

interface ScheduleBoxProps extends PressableProps {
  title: string;
  startTime: string;
  bottomText: string;
  isRegistered?: boolean;
}

const ScheduleBox = ({
  title,
  startTime,
  bottomText,
  isRegistered,
  ...props
}: ScheduleBoxProps) => {
  const platform = Platform.OS;

  return (
    <Pressable
        {...props}
        className={cn(ScheduleBoxVariants({platform}))}
    >
      <View className='bg-white w-[99%] p-6 rounded-lg absolute top-0 left-1.5 h-[140px]'>
        <View className='flex flex-row'>
          <Typography fontWeight='BOLD' className='text-lg text-dark-800 w-[245]' numberOfLines={1}>{title}</Typography>
          <View className='ml-auto'>
            {isRegistered && <Label label='신청완료' />}
          </View>
        </View>
        <Typography fontWeight='MEDIUM' className='mt-auto text-gray-300'>{startTime}</Typography>
        <View className='flex flex-row mt-0.5 items-center'>
          <Typography fontWeight='MEDIUM' className='text-gray-300'>{bottomText}</Typography>
        </View>
      </View>
    </Pressable>
  );
};

const ScheduleBoxVariants = cva('bg-main w-full rounded-lg relative h-[140px]', {
    variants: {
      platform: {
        ios: 'shadow-md shadow-gray-200',
        android: 'elevation-lg',
        windows: 'shadow-md shadow-gray-200',
        macos: 'shadow-md shadow-gray-200',
        web: 'shadow-md shadow-gray-200'
      }
    }
});

export default ScheduleBox;