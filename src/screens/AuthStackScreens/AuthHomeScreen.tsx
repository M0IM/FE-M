import {View} from 'react-native';

import {
  loginWithKakaoAccount,
  getProfile,
} from '@react-native-seoul/kakao-login';

import {Logo} from 'components/@common/Logo/Logo.tsx';
import {SocialButton} from 'components/@common/SocialButton/SocialButton.tsx';
import {Typography} from '../../components/@common/Typography/Typography.tsx';
import {CustomButton} from 'components/@common/CustomButton/CustomButton.tsx';

import {AuthHome} from '../../constants/screens/AuthStackScreens/AuthHome.ts';
import {useState} from "react";

export default function AuthHomeScreen() {
  const [token, setToken] = useState('')
  const handlePressKakaoLoginButton = async () => {
    try {
      console.log('click')
      const { idToken } = await loginWithKakaoAccount();
      const profile = await getProfile();
      setToken(idToken);

      console.log(idToken, profile)
    } catch (error) {
      console.log(error);
    }

  };
  return (
    <View className="flex flex-1 bg-white flex-col items-center justify-around p-10">
      <View className="flex flex-col items-center justify-center">
        <Logo background={'TRANSPARENT'} />
        <View className="flex flex-col items-center justify-center mt-6">
          <Typography className="text-5xl" fontWeight={'BOLD'}>
            {AuthHome.TITLE}
          </Typography>
          <Typography fontWeight={'BOLD'}>
            {token}
          </Typography>
          <Typography className="text-xl" fontWeight={'MEDIUM'}>
            {AuthHome.SUB_TITLE}
          </Typography>
        </View>
      </View>
      <View className="w-full gap-y-10">
        <View className="flex-row items-center justify-center gap-10">
          <SocialButton provider={'GOOGLE'} size={'MD'} />
          <SocialButton provider={'APPLE'} size={'MD'} />
          <SocialButton provider={'KAKAO'} size={'MD'} onPress={handlePressKakaoLoginButton} />
        </View>
        <CustomButton
          label={AuthHome.EMAIL_LOGIN}
          textStyle={'text-white font-bold text-xl'}
          variant={'filled'}
          size={'large'}
        />
        <CustomButton
          textStyle={'text-sm'}
          variant={'outlined'}
          label={AuthHome.SIGN_UP}
        />
      </View>
    </View>
  );
}
