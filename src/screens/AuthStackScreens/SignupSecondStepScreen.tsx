import React, {useRef} from 'react';
import {Pressable, TextInput, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {CustomButton} from 'components/@common/CustomButton/CustomButton.tsx';
import {ScreenContainer} from 'components/ScreenContainer.tsx';
import {Typography} from 'components/@common/Typography/Typography.tsx';
import {InputField} from 'components/@common/InputField/InputField.tsx';

import useForm from 'hooks/useForm.ts';
import {validateSignUpStep3} from 'utils/validate.ts';
import {THIRD_STEP} from 'constants/screens/SignUpScreens/SignUpFunnelScreen.ts';
import {TSignup} from '../../apis';

type TSignUpScreenProps = {
  setSignUpInfo: React.Dispatch<React.SetStateAction<TSignup>>;
  onNext: (type: string) => void;
};

export default function SignUpThirdStepScreen({
  onNext,
  setSignUpInfo,
}: TSignUpScreenProps) {
  const navigation = useNavigation();
  const emailRef = useRef<TextInput | null>(null);

  const form = useForm({
    initialValue: {
      nickname: '',
      email: '',
    },
    validate: validateSignUpStep3,
  });

  const handleNext = () => {
    setSignUpInfo(prevInfo => ({
      ...prevInfo,
      nickname: form.values.nickname,
      email: form.values.email,
    }));
    onNext('STEP_3');
  };

  const isDisabled = Object.values(form.errors).some(error => error);

  return (
    <ScreenContainer
      fixedTopComponent={
        <View className="flex-row justify-center items-center">
          <Pressable
            className="absolute top-0 left-0 active:bg-gray-300 active:rounded-full"
            onPress={() => navigation.goBack()}>
            <Ionicons
              name={'chevron-back-outline'}
              size={30}
              color={'#26282B'}
            />
          </Pressable>

          <Typography
            className="text-lg m-auto text-dark-800"
            fontWeight={'MEDIUM'}>
            회원가입
          </Typography>
        </View>
      }
      fixedBottomComponent={
        <CustomButton
          textStyle={'text-sm font-bold'}
          label={'다음'}
          onPress={handleNext}
          inValid={isDisabled}
        />
      }>
      <View className="mb-10">
        <Typography fontWeight={'BOLD'} className="text-xl mt-10">
          이름과 이메일을
        </Typography>
        <Typography fontWeight={'BOLD'} className="text-xl">
          입력해주세요.
        </Typography>
      </View>

      <View className=" flex-col gap-y-10">
        <View>
          <Typography className="mb-2" fontWeight={'MEDIUM'}>
            {THIRD_STEP.NAME}
          </Typography>
          <InputField
            autoFocus
            placeholder={THIRD_STEP.WRITE_NAME}
            error={form.errors.nickname}
            touched={form.touched.nickname}
            inputMode="text"
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => emailRef.current?.focus()}
            {...form.getTextInputProps('nickname')}
          />
        </View>
        <View>
          <Typography className="mb-2" fontWeight={'MEDIUM'}>
            {THIRD_STEP.EMAIL}
          </Typography>
          <InputField
            ref={emailRef}
            placeholder={THIRD_STEP.WRITE_EMAIL}
            error={form.errors.email}
            touched={form.touched.email}
            inputMode="email"
            returnKeyType="join"
            onSubmitEditing={() => (isDisabled ? null : onNext('STEP_3'))}
            {...form.getTextInputProps('email')}
          />
        </View>
      </View>
    </ScreenContainer>
  );
}
