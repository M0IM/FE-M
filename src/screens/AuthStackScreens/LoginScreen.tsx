import {SafeAreaView, TextInput, View} from 'react-native';
import {useRef} from 'react';

import {InputField} from 'components/@common/InputField/InputField.tsx';
import {Typography} from 'components/@common/Typography/Typography.tsx';
import {CustomButton} from 'components/@common/CustomButton/CustomButton.tsx';
import {Login} from 'constants/screens/AuthStackScreens/LoginScreen.ts';

import useForm from 'hooks/useForm.ts';
import {validateLogin} from 'utils/validate.ts';

export default function LoginScreen() {
  const passwordRef = useRef<TextInput | null>(null);

  const login = useForm({
    initialValue: {email: '', password: ''},
    validate: validateLogin,
  });

  return (
    <SafeAreaView className="m-10 my-20 flex-1">
      <View className="flex flex-col items-center justify-center mt-6 mb-20">
        <Typography className="text-5xl" fontWeight={'BOLD'}>
          {Login.TITLE}
        </Typography>
        <Typography className="text-xl" fontWeight={'MEDIUM'}>
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
