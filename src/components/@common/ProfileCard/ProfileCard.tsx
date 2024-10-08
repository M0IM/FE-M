import {View} from 'react-native';
import moment from 'moment';

import Avatar from '../Avatar/Avatar.tsx';
import {Typography} from '../Typography/Typography.tsx';

import {TUserDTO} from 'types/dtos/user.ts';

interface IProfileCardProps {
  userInfo: TUserDTO;
}

export function ProfileCard({userInfo}: IProfileCardProps) {
  return (
    <View className="flex flex-row items-center gap-x-4 mb-4 px-4">
      <Avatar size={'LG'} uri={userInfo?.imageUrl} disabled />
      <View className="flex-col gap-y-2">
        <Typography
          numberOfLines={1}
          fontWeight={'BOLD'}
          className="text-lg w-[200]">
          {userInfo?.nickname}
        </Typography>
        <View className="w-full flex flex-col items-start gap-y-1">
          <Typography
            numberOfLines={1}
            fontWeight={'MEDIUM'}
            className="text-gray-500 w-[200]">
            {userInfo?.residence ?? '거주지역 정보가 없습니다.'}
          </Typography>
          <Typography
            numberOfLines={1}
            fontWeight={'MEDIUM'}
            className="text-gray-500">
            {userInfo?.birth
              ? moment(userInfo?.birth).format('YYYY년 MM월 DD일')
              : '생년월일을 선택하지 않았습니다.'}
          </Typography>
        </View>
      </View>
    </View>
  );
}
