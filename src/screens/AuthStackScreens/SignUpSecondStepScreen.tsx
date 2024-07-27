import {CustomButton} from '../../components/@common/CustomButton/CustomButton.tsx';
import {ScreenContainer} from '../../components/ScreenContainer.tsx';
import {Typography} from '../../components/@common/Typography/Typography.tsx';
import {useState} from 'react';
import {Pressable, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {TJoinRequestDto} from '../../types/dtos/auth.ts';

type TSignUpScreenProps = {
  setSignUpInfo: React.Dispatch<React.SetStateAction<TJoinRequestDto>>;
  onNext: (type: string) => void;
};

export default function SignUpSecondStepScreen({
  onNext,
  setSignUpInfo,
}: TSignUpScreenProps) {
  const navigation = useNavigation();
  const [sex, setSex] = useState('MALE');

  const handleNext = () => {
    // Example of updating signUpInfo
    setSignUpInfo(prevInfo => ({
      ...prevInfo,
      gender: 'MALE',
    }));
    onNext('STEP_3');
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
        <CustomButton label={'다음'} onPress={handleNext} />
      }>
      <Typography fontWeight={'BOLD'} className="text-2xl mt-5">
        약관 동의
      </Typography>
      <Typography fontWeight={'MEDIUM'}>
        필수 항목에 대한 약관 동의를 완료해주세요.
      </Typography>
      <View className="mt-10">
        <Typography fontWeight={'BOLD'}>체크 박스</Typography>
        <Typography fontWeight={'BOLD'}>체크 박스</Typography>
      </View>
    </ScreenContainer>
  );
}
