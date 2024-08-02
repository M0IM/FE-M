import {Platform, View} from 'react-native';
import React, {useEffect} from 'react';
import Config from 'react-native-config';
import {
  getProfile,
  loginWithKakaoAccount,
} from '@react-native-seoul/kakao-login';
import {appleClient} from 'apis';
import {
  appleAuth,
  AppleButton,
} from '@invertase/react-native-apple-authentication';
import NaverLogin from '@react-native-seoul/naver-login';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import {Logo} from 'components/@common/Logo/Logo.tsx';
import {SocialButton} from 'components/@common/SocialButton/SocialButton.tsx';
import {Typography} from 'components/@common/Typography/Typography.tsx';
import {CustomButton} from 'components/@common/CustomButton/CustomButton.tsx';

import {AuthHome} from 'constants/screens/AuthStackScreens/AuthHome.ts';
import useAuth from 'hooks/queries/AuthScreen/useAuth.ts';
import {TSignup} from 'types/dtos/auth.ts';
import {AuthStackNavigationProp} from 'navigators/types';

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
    const profile = await NaverLogin.getProfile(successResponse!.accessToken);

    socialIdTokenMutation.mutate(
      {
        type: 'NAVER',
        idToken: String(successResponse?.accessToken),
      },
      {
        onSuccess: ({result}) => {
          if (result.provider === 'UNREGISTERED') {
            setSignUpInfo(prevInfo => ({
              ...prevInfo,
              provider: 'NAVER',
              providerId: profile.response.id,
              nickname: String(profile.response.nickname),
              role: 'ROLE_USER',
              email: profile.response.email,
            }));
            onNext(result.provider);
          } else {
            onNext('NAVER');
          }
        },
        onError: error => {
          console.log(error);
        },
      },
    );
  };
  const handlePressKakaoLoginButton = async () => {
    const {idToken} = await loginWithKakaoAccount();
    const {nickname, email} = await getProfile();
    console.log(idToken, '카카오 아이디');
    socialIdTokenMutation.mutate(
      {
        type: 'KAKAO',
        idToken: idToken,
      },
      {
        onSuccess: ({result}) => {
          console.log('hi');
          if (result.provider === 'UNREGISTERED') {
            setSignUpInfo(prevInfo => ({
              ...prevInfo,
              provider: 'KAKAO',
              providerId: idToken,
              nickname,
              role: 'ROLE_USER',
              email,
            }));
            onNext(result.provider);
          } else {
            onNext('KAKAO');
          }
        },
        onError: error => {
          console.log(error);
        },
      },
    );
  };
  const handlePressAppleLoginButton = async () => {
    const {
      user,
      fullName,
      email,
      identityToken: idToken,
    } = await appleClient.fetchLogin();

    const authState = await appleClient.getUserAuthState(user);
    console.log(authState);

    if (idToken && authState === appleAuth.State.AUTHORIZED) {
      socialIdTokenMutation.mutate(
        {
          type: 'APPLE',
          idToken: idToken,
        },
        {
          onSuccess: ({result}) => {
            if (result.provider === 'UNREGISTERED') {
              setSignUpInfo(prevInfo => ({
                ...prevInfo,
                provider: 'KAKAO',
                providerId: String(idToken),
                nickname: String(fullName),
                role: 'ROLE_USER',
                email: String(email),
              }));
              onNext(result.provider);
            } else {
              onNext('APPLE');
            }
          },
          onError: error => {
            console.log(error);
          },
        },
      );
    }
  };
  const handlePressGoogleLoginButton = async () => {
    await GoogleSignin.hasPlayServices();
    const response = await GoogleSignin.signIn();
    console.log(response.idToken);

    socialIdTokenMutation.mutate(
      {
        type: 'GOOGLE',
        idToken: String(response.idToken),
      },
      {
        onSuccess: ({result}) => {
          console.log('hi', result.provider);
          if (result.provider === 'UNREGISTERED') {
            setSignUpInfo(prevInfo => ({
              ...prevInfo,
              provider: 'GOOGLE',
              providerId: String(response.idToken),
              nickname: String(response.user.name),
              role: 'ROLE_USER',
              email: response.user.email,
            }));
            onNext(result.provider);
          } else {
            onNext('GOOGLE');
          }
        },
        onError: error => {
          console.log(error);
        },
      },
    );
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
