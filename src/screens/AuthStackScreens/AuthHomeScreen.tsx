import {Text, View} from 'react-native';
import {Logo} from '../../components/@common/Logo/Logo.tsx';
import {SocialButton} from '../../components/@common/SocialButton/SocialButton.tsx';
import {Typography} from '../../components/@common/Typography/Typography.tsx';
import React from 'react';

export default function AuthHomeScreen() {
  return (
    <View className="flex flex-1 bg-white flex-col items-center justify-around">
      <View className="flex flex-col items-center justify-center">
        <Logo background={'TRANSPARENT'} />
        <View className="flex flex-col items-center justify-center mt-6">
          <Typography className="text-5xl" fontWeight={'BOLD'}>
            moim
          </Typography>
          <Typography className="text-xl" fontWeight={'MEDIUM'}>
            완벽한 모임의 시작, moim
          </Typography>
        </View>
      </View>
      <View className="flex-row items-center justify-center gap-10">
        <SocialButton provider={'GOOGLE'} size={'MD'} />
        <SocialButton provider={'APPLE'} size={'MD'} />
        <SocialButton provider={'KAKAO'} size={'MD'} />
      </View>
    </View>
  );
}
