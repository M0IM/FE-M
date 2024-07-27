import {useState} from 'react';
import {Pressable, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CheckBox from '@react-native-community/checkbox';

import {CustomButton} from 'components/@common/CustomButton/CustomButton.tsx';
import {ScreenContainer} from 'components/ScreenContainer.tsx';
import {Typography} from 'components/@common/Typography/Typography.tsx';

type TSignUpScreenProps = {
  onNext: (type: string) => void;
};

export default function SignUpSecondStepScreen({onNext}: TSignUpScreenProps) {
  const navigation = useNavigation();

  const [allCheck, setAllCheck] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showTermsOfService, setShowTermsOfService] = useState(false);

  const handleNext = () => {
    onNext('STEP_3');
  };

  const handleAllCheck = (newValue: boolean) => {
    setAllCheck(newValue);
    setShowPrivacyPolicy(newValue);
    setShowTermsOfService(newValue);
  };

  const handlePrivacyPolicyCheck = (newValue: boolean) => {
    setShowPrivacyPolicy(newValue);

    if (newValue && showTermsOfService) {
      setAllCheck(true);
    } else {
      setAllCheck(false);
    }
  };

  const handleTermsOfServiceCheck = (newValue: boolean) => {
    setShowTermsOfService(newValue);
    if (newValue && showPrivacyPolicy) {
      setAllCheck(true);
    } else {
      setAllCheck(false);
    }
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
        <CustomButton label={'다음'} onPress={handleNext} inValid={!allCheck} />
      }>
      <Typography fontWeight={'BOLD'} className="text-2xl mt-5">
        약관 동의
      </Typography>
      <Typography fontWeight={'MEDIUM'}>
        필수 항목에 대한 약관 동의를 완료해주세요.
      </Typography>

      <View className="w-full mt-10 flex-row items-center">
        <CheckBox
          disabled={false}
          value={allCheck}
          onValueChange={handleAllCheck}
          onFillColor={'#00F0A1'}
          onCheckColor={'#FFFFFF'}
          onTintColor={'#FFFFFF'}
        />
        <Typography className="ml-5 text-xl" fontWeight={'MEDIUM'}>
          전체 동의
        </Typography>
      </View>

      <View className="ml-5">
        <View className="w-full mt-10 flex-row items-center">
          <CheckBox
            disabled={false}
            value={showPrivacyPolicy}
            onValueChange={handlePrivacyPolicyCheck}
            onFillColor={'#00F0A1'}
            onCheckColor={'#FFFFFF'}
            onTintColor={'#FFFFFF'}
          />
          <Typography className="ml-5 text-xl" fontWeight={'MEDIUM'}>
            개인 정보 처리 방침
          </Typography>
        </View>

        <View className="w-full mt-10 flex-row items-center">
          <CheckBox
            disabled={false}
            value={showTermsOfService}
            onValueChange={handleTermsOfServiceCheck}
            onFillColor={'#00F0A1'}
            onCheckColor={'#FFFFFF'}
            onTintColor={'#FFFFFF'}
          />
          <Typography className="ml-5 text-xl" fontWeight={'MEDIUM'}>
            서비스 이용약관
          </Typography>
        </View>
      </View>
    </ScreenContainer>
  );
}
