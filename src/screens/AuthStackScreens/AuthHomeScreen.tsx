import {Platform, View} from 'react-native';
import {
  getProfile,
  login,
  loginWithKakaoAccount,
} from '@react-native-seoul/kakao-login';
import {
  appleAuth,
  AppleButton,
} from '@invertase/react-native-apple-authentication';
import NaverLogin from '@react-native-seoul/naver-login';
import Toast from 'react-native-toast-message';

import {Logo} from 'components/@common/Logo/Logo.tsx';
import {SocialButton} from 'components/@common/SocialButton/SocialButton.tsx';
import {Typography} from 'components/@common/Typography/Typography.tsx';
import {CustomButton} from 'components/@common/CustomButton/CustomButton.tsx';

import {AuthHome} from 'constants/screens/AuthStackScreens/AuthHome.ts';
import {AuthStackNavigationProp} from 'navigators/types';
import Config from 'react-native-config';
import React, {useEffect} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import useAuth from '../../hooks/queries/AuthScreen/useAuth.ts';

import {TSignup} from '../../apis';

type TAuthHomeScreenProps = {
  navigation: AuthStackNavigationProp;
  onNext: (type: string) => void;
  setSignUpInfo: React.Dispatch<React.SetStateAction<TSignup>>;
};

const consumerKey = Config.NAVER_CLIENT_ID;
const consumerSecret = Config.NAVER_CLIENT_SECRET;
const appName = Config.NAVER_APP_NAME;
const serviceUrlSchemeIOS = Config.NAVER_URL_SCHEME;

export default function AuthHomeScreen({
  navigation,
  onNext,
  setSignUpInfo,
}: TAuthHomeScreenProps) {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: Config.GOOGLE_WEB_CLIENT_ID,
      iosClientId: Config.GOOGLE_IOS_CLIENT_ID,
      offlineAccess: true,
      hostedDomain: '',
    });
  }, []);

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

  const {socialIdTokenMutation} = useAuth();

  const handlePressNaverLoginButton = async () => {
    const {successResponse} = await NaverLogin.login();
    const {nickname, id, email} = await NaverLogin.getProfile(
      successResponse.accessToken,
    );

    socialIdTokenMutation.mutate(
      {
        type: 'NAVER',
        idToken: String(successResponse?.accessToken),
      },
      {
        onSuccess: ({type}) => {
          if (type === 'REGISTER') {
            setSignUpInfo(prevInfo => ({
              ...prevInfo,
              provider: 'NAVER',
              providerId: String(id),
              nickname,
              role: 'ROLE_USER',
              email,
            }));
            onNext('REGISTER');
          } else {
            onNext('NAVER');
          }
        },
        onError: error => {
          console.log(error);
          navigation.navigate('AUTH_HOME');
        },
      },
    );
  };
  const handlePressKakaoLoginButton = async () => {
    const {idToken} = await loginWithKakaoAccount();
    const {nickname, email, id} = await getProfile();

    socialIdTokenMutation.mutate(
      {type: 'KAKAO', idToken},
      {
        onSuccess: ({type}) => {
          onNext(type);
          setSignUpInfo(prevInfo => ({
            ...prevInfo,
            provider: 'KAKAO',
            providerId: String(id),
            nickname,
            role: 'ROLE_USER',
            email,
          }));
          onNext(type);
        },
        onError: error => {
          console.log(error);
        },
      },
    );
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
  const handlePressGoogleLoginButton = async () => {
    await GoogleSignin.hasPlayServices();
    try {
      const response = await GoogleSignin.signIn();
      console.log(response);
      if (!response.idToken) {
        return null;
      }

      return {
        idToken: response.idToken,
      };
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View className="flex flex-1 bg-white flex-col items-center justify-around p-10">
      <View className="flex flex-col items-center justify-center">
        <Logo background={'TRANSPARENT'} />
        <View className="flex flex-col items-center justify-center mt-6">
          <Typography
            style={{fontFamily: 'MangoByeolbyeol'}}
            className="text-6xl"
            fontWeight={'MANGO'}>
            {AuthHome.TITLE}
          </Typography>
          <Typography
            style={{fontFamily: 'Pretendard-Medium'}}
            className="text-xl"
            fontWeight={'MEDIUM'}>
            {AuthHome.SUB_TITLE}
          </Typography>
        </View>
      </View>
      <View className="w-full gap-y-10">
        <View className="flex-row items-center justify-center gap-10">
          <SocialButton
            provider={'GOOGLE'}
            size={'MD'}
            onPress={handlePressGoogleLoginButton}
          />
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
            onPress={() => {
              navigation.navigate('STEP_2');
            }}
          />
        </View>
      </View>
    </View>
  );
}
