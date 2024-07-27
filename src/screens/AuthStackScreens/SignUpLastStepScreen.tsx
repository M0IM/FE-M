import {CustomButton} from '../../components/@common/CustomButton/CustomButton.tsx';
import {ScreenContainer} from '../../components/ScreenContainer.tsx';
import {Typography} from '../../components/@common/Typography/Typography.tsx';
import {useState} from 'react';
import {Pressable, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TJoinRequestDto} from '../../types/dtos/auth.ts';

type TSignUpScreenProps = {
  setSignUpInfo: React.Dispatch<React.SetStateAction<TJoinRequestDto>>;
  signUpInfo: object;
};

export default function SignUpLastStepScreen({
  setSignUpInfo,
  signUpInfo,
}: TSignUpScreenProps) {
  const [password, setPassword] = useState('비밀인뎁쇼?');
  const navigation = useNavigation();
  const handleSubmit = () => {
    // Example of updating signUpInfo
    setSignUpInfo(prevInfo => ({
      ...prevInfo,
      password,
    }));

    console.log(signUpInfo);
  };
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
          label={'가입 후 로그인 하기'}
          onPress={handleSubmit}
        />
      }>
      <Typography fontWeight={'BOLD'}>회원가입 마지막</Typography>
      <Typography fontWeight={'BOLD'}>HI</Typography>
      <Typography fontWeight={'BOLD'}>HI</Typography>
      <Typography fontWeight={'BOLD'}>HI</Typography>
    </ScreenContainer>
  );
}
