import {Alert, Platform, Text, View} from 'react-native';
import {
  getProfile,
  loginWithKakaoAccount,
} from '@react-native-seoul/kakao-login';
import {
  appleAuth,
  AppleButton,
} from '@invertase/react-native-apple-authentication';
import NaverLogin from '@react-native-seoul/naver-login';

import {Logo} from 'components/@common/Logo/Logo.tsx';
import {SocialButton} from 'components/@common/SocialButton/SocialButton.tsx';
import {Typography} from 'components/@common/Typography/Typography.tsx';
import {CustomButton} from 'components/@common/CustomButton/CustomButton.tsx';

import {AuthHome} from 'constants/screens/AuthStackScreens/AuthHome.ts';
import {AuthStackNavigationProp} from 'navigators/types';
import Config from 'react-native-config';
import {useEffect} from 'react';

type TAuthHomeScreenProps = {
  navigation: AuthStackNavigationProp;
  onNext: (type: string) => void;
};

const consumerKey = Config.NAVER_CLIENT_ID;
const consumerSecret = Config.NAVER_CLIENT_SECRET;
const appName = Config.NAVER_APP_NAME;
const serviceUrlSchemeIOS = Config.NAVER_URL_SCHEME;

export default function AuthHomeScreen({
  navigation,
  onNext,
}: TAuthHomeScreenProps) {
  useEffect(() => {
    // @ts-ignore
    NaverLogin.initialize({
      appName,
      consumerKey,
      consumerSecret,
      serviceUrlSchemeIOS,
      disableNaverAppAuthIOS: true,
    });
  }, []);

  const handlePressNaverLoginButton = async () => {
    try {
      console.log('클릭');
      const {failureResponse, successResponse} = await NaverLogin.login();
      console.log('클릭2');
      const profileNaver = await NaverLogin.getProfile(
        successResponse?.accessToken,
      );
      console.log(successResponse, profileNaver);
      console.log('에러시', failureResponse);

      Alert.alert(
        '야호',
        `${profileNaver.response.name}님 환영합니다. 생년월일은 ${profileNaver.response.birthday}이며, 
                  성별은 ${profileNaver.response.gender}입니다. 폰 번호는 ${profileNaver.response.mobile}입니다. 
                  나이대는 ${profileNaver.response.age}입니다. 이메일 주소는 ${profileNaver.response.email}입니다.`,
      );
    } catch (error) {
      console.log(error);
    }
  };

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
          <Typography className="text-6xl" fontWeight={'MANGO'}>
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
          <SocialButton
            provider={'NAVER'}
            size={'MD'}
            onPress={handlePressNaverLoginButton}
          />
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
