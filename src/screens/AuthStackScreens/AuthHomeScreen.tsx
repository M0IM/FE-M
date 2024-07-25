import {SafeAreaView, Text, View} from 'react-native';
import {Logo} from '../../components/@common/Logo/Logo.tsx';
import {SocialButton} from '../../components/@common/SocialButton/SocialButton.tsx';
import {Typography} from '../../components/@common/Typography/Typography.tsx';
import React from 'react';
import {CustomButton} from '../../components/@common/CustomButton/CustomButton.tsx';

export default function AuthHomeScreen() {
  return (
    <View className="flex flex-1 bg-white flex-col items-center justify-around p-10">
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
      <CustomButton
        label={'이메일로 로그인'}
        textStyle={'text-white font-bold text-xl'}
        variant={'filled'}
        size={'large'}
      />
      <View className="flex-col items-center justify-center ">
        <Typography fontWeight={'BOLD'}>회원가입</Typography>
      </View>
    </View>
  );
}
