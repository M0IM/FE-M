import {useRef} from 'react';
import {Pressable, TextInput, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {ScreenContainer} from 'components/ScreenContainer.tsx';
import {CustomButton} from 'components/@common/CustomButton/CustomButton.tsx';
import {Typography} from 'components/@common/Typography/Typography.tsx';
import {InputField} from 'components/@common/InputField/InputField.tsx';

import {TJoinRequestDto} from 'types/dtos/auth.ts';
import useForm from 'hooks/useForm.ts';
import {validateSignUpStep4} from 'utils/validate.ts';

type TSignUpScreenProps = {
  setSignUpInfo: React.Dispatch<React.SetStateAction<TJoinRequestDto>>;
  onNext: (type: string) => void;
};

export default function SignUpFourthStepScreen({
  setSignUpInfo,
  onNext,
}: TSignUpScreenProps) {
  const passwordCheckRef = useRef<TextInput | null>(null);

  const form = useForm({
    initialValue: {
      password: '',
      passwordCheck: '',
    },
    validate: validateSignUpStep4,
  });

  const navigation = useNavigation();
  const handleSubmit = () => {
    // Example of updating signUpInfo
    setSignUpInfo(prevInfo => ({
      ...prevInfo,
      password: form.values.password,
      passwordCheck: form.values.passwordCheck,
    }));

    onNext('STEP_4');
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
          onPress={handleSubmit}
          inValid={isDisabled}
        />
      }>
      <View className="mb-10">
        <Typography fontWeight={'BOLD'} className="text-xl mt-10">
          비밀번호를
        </Typography>
        <Typography fontWeight={'BOLD'} className="text-xl">
          입력해주세요.
        </Typography>
      </View>

      <View className=" flex-col gap-y-10">
        <View>
          <Typography fontWeight={'MEDIUM'}>비밀번호</Typography>
          <Typography className="my-2 text-sm" fontWeight={'LIGHT'}>
            8~16자리 영문, 숫자, 특수문자를 조합해 작성해주세요.
          </Typography>
          <InputField
            autoFocus
            placeholder="비밀번호를 입력해주세요."
            error={form.errors.password}
            touched={form.touched.password}
            secureTextEntry
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => passwordCheckRef.current?.focus()}
            {...form.getTextInputProps('password')}
          />
        </View>
        <View>
          <Typography className="mb-2" fontWeight={'MEDIUM'}>
            비밀번호 확인
          </Typography>
          <InputField
            ref={passwordCheckRef}
            placeholder="동일한 비밀번호를 입력해주세요."
            error={form.errors.passwordCheck}
            touched={form.touched.passwordCheck}
            secureTextEntry
            returnKeyType="join"
            onSubmitEditing={() => (isDisabled ? null : onNext('STEP_4'))}
            {...form.getTextInputProps('passwordCheck')}
          />
        </View>
      </View>
    </ScreenContainer>
  );
}