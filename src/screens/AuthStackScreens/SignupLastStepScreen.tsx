import React, {useRef, useState} from 'react';
import {Pressable, TextInput, View} from 'react-native';
import {CompositeScreenProps, useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CheckBox from '@react-native-community/checkbox';

import {CustomButton} from 'components/@common/CustomButton/CustomButton.tsx';
import {ScreenContainer} from 'components/ScreenContainer.tsx';
import {Typography} from 'components/@common/Typography/Typography.tsx';
import {InputField} from 'components/@common/InputField/InputField.tsx';

import useForm from 'hooks/useForm.ts';
import {validateSignUpStep5} from 'utils/validate.ts';

import useAuth from '../../hooks/queries/AuthScreen/useAuth.ts';
import {AuthStackNavigationProp} from '../../navigators/types';
import {TSignup} from '../../types/dtos/auth.ts';
import {FIFTH_STEP} from '../../constants/screens/SignUpScreens/SignUpFunnelScreen.ts';

type TSignUpScreenProps = {
  setSignUpInfo: React.Dispatch<React.SetStateAction<TSignup>>;
  signUpInfo: TSignup;
};

export default function SignupLastStepScreen({
  setSignUpInfo,
  signUpInfo,
}: TSignUpScreenProps) {
  const navigation = useNavigation<AuthStackNavigationProp>();
  const residenceRef = useRef<TextInput | null>(null);
  const [gender, setGender] = useState<'FEMALE' | 'MALE'>('MALE');
  const {signUpMutation} = useAuth();

  const form = useForm({
    initialValue: {
      gender: 'MALE',
      birth: '',
      residence: '',
    },
    validate: validateSignUpStep5,
  });

  const handleGenderChange = (selectedGender: 'FEMALE' | 'MALE') => {
    setGender(selectedGender);
  };

  const handleSubmit = () => {
    setSignUpInfo(prevInfo => ({
      ...prevInfo,
      gender,
      birth: form.values.birth,
      residence: form.values.residence,
    }));
    signUpMutation.mutate(
      {
        provider: signUpInfo.provider,
        providerId: signUpInfo.providerId,
        nickname: signUpInfo.nickname,
        email: signUpInfo.email,
        password: signUpInfo.password,
        role: 'ROLE_USER',
        gender: signUpInfo.gender,
        birth: form.values.birth,
        residence: form.values.residence,
      },
      {
        onSuccess: data => {
          console.log(data);
          console.log('성공');
        },
        onError: error => {
          navigation.navigate('AUTH_HOME');
          console.log(error, '에러입니다');
        },
      },
    );
  };

  const isDisabled = Object.values(form.errors).some(error => error);

  return (
    <ScreenContainer
      enabled={false}
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
          label={'가입 후 로그인 하기'}
          onPress={handleSubmit}
          inValid={isDisabled}
        />
      }>
      <View className="mb-10">
        <Typography fontWeight={'BOLD'} className="text-xl mt-10">
          {FIFTH_STEP.DESC_1}
        </Typography>
        <Typography fontWeight={'BOLD'} className="text-xl">
          {FIFTH_STEP.DESC_2}
        </Typography>
      </View>

      <View className="flex-col gap-y-10">
        <View>
          <Typography fontWeight={'MEDIUM'}>{FIFTH_STEP.GENDER}</Typography>
          <View className="flex flex-row justify-around">
            <View className="flex flex-col items-center gap-y-2">
              <Typography fontWeight={'MEDIUM'}>{FIFTH_STEP.MALE}</Typography>
              <CheckBox
                disabled={false}
                value={gender === 'MALE'}
                onValueChange={() => handleGenderChange('MALE')}
                onFillColor={'#00F0A1'}
                onCheckColor={'#FFFFFF'}
                onTintColor={'#FFFFFF'}
              />
            </View>
            <View className="flex flex-col items-center gap-y-2">
              <Typography fontWeight={'MEDIUM'}>{FIFTH_STEP.FEMALE}</Typography>
              <CheckBox
                disabled={false}
                value={gender === 'FEMALE'}
                onValueChange={() => handleGenderChange('FEMALE')}
                onFillColor={'#00F0A1'}
                onCheckColor={'#FFFFFF'}
                onTintColor={'#FFFFFF'}
              />
              <CustomButton label={'HI'} onPress={handleSubmit} />
            </View>
          </View>
        </View>
        <View>
          <Typography className="mb-4" fontWeight={'MEDIUM'}>
            나이
          </Typography>
          <InputField
            placeholder={FIFTH_STEP.WRITE_AGE}
            error={form.errors.age}
            touched={form.touched.age}
            inputMode="text"
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => residenceRef.current?.focus()}
            {...form.getTextInputProps('birth')}
          />
        </View>
        <View>
          <Typography className="mb-4" fontWeight={'MEDIUM'}>
            {FIFTH_STEP.RESIDENCE}
          </Typography>
          <InputField
            ref={residenceRef}
            placeholder={FIFTH_STEP.WRITE_RESIDENCE}
            error={form.errors.residence}
            touched={form.touched.residence}
            inputMode="text"
            returnKeyType="join"
            onSubmitEditing={() => {
              // 데이터 통신 로직
              if (!isDisabled) {
                // console.log(signUpInfo);
              }
            }}
            {...form.getTextInputProps('residence')}
          />
        </View>
      </View>
    </ScreenContainer>
  );
}
