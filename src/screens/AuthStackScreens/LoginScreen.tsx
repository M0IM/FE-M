import {SafeAreaView, TextInput, View} from 'react-native';
import {useRef} from 'react';

import {InputField} from 'components/@common/InputField/InputField.tsx';
import {Typography} from 'components/@common/Typography/Typography.tsx';
import {CustomButton} from 'components/@common/CustomButton/CustomButton.tsx';

import {Login} from 'constants/screens/AuthStackScreens/LoginScreen.ts';
import Toast from 'react-native-toast-message';

import useForm from 'hooks/useForm.ts';
import {validateLogin} from 'utils/validate.ts';

import {postLogin} from '../../apis';
import {useMutation} from '@tanstack/react-query';

export default function LoginScreen() {
  const passwordRef = useRef<TextInput | null>(null);
  console.log('hi');
  const login = useForm({
    initialValue: {email: '', password: ''},
    validate: validateLogin,
  });

  // const {loginMutation} = useAuth();
  const loginMutation = useMutation({
    mutationFn: postLogin,
  });
  const handlePressLogin = () => {
    loginMutation.mutate(
      {
        email: login.values.email,
        password: login.values.password,
      },
      {
        onSuccess: data => {
          console.log(data);
        },
        onError: error => {
          console.log(error);
          Toast.show({
            type: 'error',
            text1: error.response?.data.message || '로그인 에러발생',
            visibilityTime: 2000,
            position: 'bottom',
          });
        },
      },
    );
  };

  return (
    <SafeAreaView className="m-10 my-20 flex-1">
      <View className="flex flex-col items-center justify-center mt-6 mb-20">
        <Typography
          style={{fontFamily: 'MangoByeolbyeol'}}
          className="text-6xl"
          fontWeight={'MANGO'}>
          {Login.TITLE}
        </Typography>
        <Typography
          style={{fontFamily: 'Pretendard-Medium'}}
          className="text-xl"
          fontWeight={'MEDIUM'}>
          {Login.SUB_TITLE}
        </Typography>
      </View>

      <View className="flex-col gap-10 justify-center">
        <View>
          <InputField
            autoFocus
            placeholder={Login.WRITE_EMAIL}
            error={login.errors.email}
            touched={login.touched.email}
            inputMode="email"
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => passwordRef.current?.focus()}
            {...login.getTextInputProps('email')}
          />
        </View>
        <View>
          <InputField
            ref={passwordRef}
            placeholder={Login.WRITE_PASSWORD}
            error={login.errors.password}
            touched={login.touched.password}
            secureTextEntry
            returnKeyType="join"
            onSubmitEditing={() => {}}
            {...login.getTextInputProps('password')}
          />
        </View>
      </View>

      <View className="flex-col gap-y-3 w-full mt-20">
        <CustomButton
          label={Login.LOGIN}
          textStyle={'text-white font-bold text-xl'}
          variant={'filled'}
          size={'large'}
          onPress={handlePressLogin}
        />
        <CustomButton
          textStyle={'text-sm'}
          variant={'outlined'}
          label={Login.FORGOT_PASSWORD}
        />
      </View>
    </SafeAreaView>
  );
}
