import {View} from 'react-native';

import Avatar from '../Avatar/Avatar.tsx';
import {Typography} from '../Typography/Typography.tsx';

import {TUserDTO} from 'types/dtos/user.ts';

interface IProfileCardProps {
  userInfo: TUserDTO;
}

export function ProfileCard({userInfo}: IProfileCardProps) {
  return (
    <View className="flex flex-row items-center gap-x-4 mb-4 px-4">
      <Avatar size={'LG'} uri={userInfo?.imageUrl} />
      <View className="flex-col gap-y-2">
        <Typography numberOfLines={1} fontWeight={'BOLD'} className="text-lg">
          {userInfo?.nickname}
        </Typography>
        <View className="w-full flex flex-row items-center gap-x-2">
          <Typography
            numberOfLines={1}
            fontWeight={'MEDIUM'}
            className="text-gray-500">
            {userInfo?.residence}
          </Typography>
          <Typography
            numberOfLines={1}
            fontWeight={'MEDIUM'}
            className="text-gray-500">
            {userInfo?.birth}
          </Typography>
        </View>
      </View>
    </View>
  );
}
