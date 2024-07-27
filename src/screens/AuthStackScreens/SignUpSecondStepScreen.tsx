import {CustomButton} from '../../components/@common/CustomButton/CustomButton.tsx';
import {ScreenContainer} from '../../components/ScreenContainer.tsx';
import {Typography} from '../../components/@common/Typography/Typography.tsx';
import {useState} from 'react';
import {Pressable, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

type TSignUpScreenProps = {
  setSignUpInfo: React.Dispatch<React.SetStateAction<any>>;
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
      gender: sex,
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
      <Typography fontWeight={'BOLD'}>회원가입 두번쨰</Typography>
      <Typography fontWeight={'BOLD'}>HI</Typography>
      <Typography fontWeight={'BOLD'}>HI</Typography>
      <Typography fontWeight={'BOLD'}>HI</Typography>
    </ScreenContainer>
  );
}
