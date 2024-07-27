import {Platform, View} from 'react-native';

import {
  getProfile,
  loginWithKakaoAccount,
} from '@react-native-seoul/kakao-login';

import {Logo} from 'components/@common/Logo/Logo.tsx';
import {SocialButton} from 'components/@common/SocialButton/SocialButton.tsx';
import {Typography} from '../../components/@common/Typography/Typography.tsx';
import {CustomButton} from 'components/@common/CustomButton/CustomButton.tsx';

import {AuthHome} from '../../constants/screens/AuthStackScreens/AuthHome.ts';

import {
  appleAuth,
  AppleButton,
} from '@invertase/react-native-apple-authentication';
import {AuthStackNavigationProp} from '../../navigators/types';

type TAuthHomeScreenProps = {
  navigation: AuthStackNavigationProp;
  onNext: (type: string) => void;
};

export default function AuthHomeScreen({
  navigation,
  onNext,
}: TAuthHomeScreenProps) {
  const handlePressKakaoLoginButton = async () => {
    try {
      const {idToken} = await loginWithKakaoAccount();
      const profile = await getProfile();

      console.log(idToken, profile);
    } catch (error) {
      console.log(error);
    }
  };
  const handlePressAppleLoginButton = async () => {
    try {
      const {identityToken, fullName} = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });
      console.log('identity', identityToken, 'fullName', fullName);
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
          <Typography className="text-xl" fontWeight={'MEDIUM'}>
            {AuthHome.SUB_TITLE}
          </Typography>
        </View>
      </View>
      <View className="w-full gap-y-10">
        <View className="flex-row items-center justify-center gap-10">
          <SocialButton provider={'GOOGLE'} size={'MD'} />
          <SocialButton provider={'NAVER'} size={'MD'} />
          <SocialButton
            provider={'KAKAO'}
            size={'MD'}
            onPress={handlePressKakaoLoginButton}
          />
        </View>

        <View className="flex-col gap-y-3 w-full">
          {Platform.OS === 'ios' && (
            <AppleButton
              buttonStyle={AppleButton.Style.BLACK}
              buttonType={AppleButton.Type.SIGN_IN}
              style={{
                height: 56,
              }}
              cornerRadius={15}
              onPress={handlePressAppleLoginButton}
            />
          )}
          <CustomButton
            label={AuthHome.EMAIL_LOGIN}
            textStyle={'text-white font-bold text-xl'}
            variant={'filled'}
            size={'large'}
            onPress={() => {
              navigation.navigate('LOGIN');
            }}
          />
          <CustomButton
            textStyle={'text-sm'}
            variant={'outlined'}
            label={AuthHome.SIGN_UP}
            onPress={() => onNext('REGISTER')}
          />
        </View>
      </View>
    </View>
  );
}
