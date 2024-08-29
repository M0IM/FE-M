import {Pressable, PressableProps, View} from 'react-native';
import {ReactNode} from 'react';
import {Typography} from '../Typography/Typography.tsx';

interface ISettingItemProps extends PressableProps {
  title: string;
  subTitle?: string;
  icon?: ReactNode;
}

export function SettingItem({
  title,
  subTitle,
  icon,
  ...props
}: ISettingItemProps) {
  return (
    <Pressable
      {...props}
      className="flex-row items-center py-3 bg-white px-2 active:bg-hover active:rounded-lg active:overflow-hidden">
      {icon}
      <View className="flex-1 flex-row justify-between">
        <Typography className="text-base text-dark-800" fontWeight={'BOLD'}>
          {title}
        </Typography>
        {subTitle && (
          <Typography fontWeight={'MEDIUM'} className="text-gray-400">
            {subTitle}
          </Typography>
        )}
      </View>
    </Pressable>
  );
}
