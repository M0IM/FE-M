import {useState} from 'react';
import {Pressable, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CheckBox from '@react-native-community/checkbox';

import {CustomButton} from 'components/@common/CustomButton/CustomButton.tsx';
import {ScreenContainer} from 'components/ScreenContainer.tsx';
import {Typography} from 'components/@common/Typography/Typography.tsx';

import {SECOND_STEP} from '../../constants/screens/SignUpScreens/SignUpFunnelScreen.ts';
import {AuthStackNavigationProp} from '../../navigators/types';

type TSignUpScreenProps = {
  onNext: (type: string) => void;
};

export default function SignUpSecondStepScreen({onNext}: TSignUpScreenProps) {
  const navigation = useNavigation<AuthStackNavigationProp>();

  const [allCheck, setAllCheck] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showTermsOfService, setShowTermsOfService] = useState(false);

  const handleNext = () => {
    onNext('STEP_5');
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
            {SECOND_STEP.SIGN_UP}
          </Typography>
        </View>
      }
      fixedBottomComponent={
        <CustomButton label={'다음'} onPress={handleNext} inValid={!allCheck} />
      }>
      <Typography fontWeight={'BOLD'} className="text-2xl mt-5">
        {SECOND_STEP.TERM_AGREEMENT}
      </Typography>
      <Typography fontWeight={'MEDIUM'}>
        {SECOND_STEP.TERM_AGREEMENT_DESCRIPTION}
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
          {SECOND_STEP.ALL_AGREE}
        </Typography>
      </View>

      <View className="ml-5">
        <View className="w-[90%] mt-10 flex-row justify-between">
          <CheckBox
            disabled={false}
            value={showPrivacyPolicy}
            onValueChange={handlePrivacyPolicyCheck}
            onFillColor={'#00F0A1'}
            onCheckColor={'#FFFFFF'}
            onTintColor={'#FFFFFF'}
          />
          <Pressable
            className="active:bg-gray-200 w-full active:rounded-lg"
            onPress={() => navigation.navigate('PRIVACY_POLICY')}>
            <View className="flex-row items-center">
              <Typography className="ml-5 text-xl flex-1" fontWeight={'MEDIUM'}>
                {SECOND_STEP.PERSONAL_INFO}
              </Typography>
              <Ionicons
                name={'chevron-forward-outline'}
                size={30}
                color={'#26282B'}
              />
            </View>
          </Pressable>
        </View>

        <View className="w-[90%] mt-10 flex-row justify-between">
          <CheckBox
            disabled={false}
            value={showTermsOfService}
            onValueChange={handleTermsOfServiceCheck}
            onFillColor={'#00F0A1'}
            onCheckColor={'#FFFFFF'}
            onTintColor={'#FFFFFF'}
          />
          <Pressable
            className="active:bg-gray-200 w-full active:rounded-lg"
            onPress={() => navigation.navigate('SERVICE_TERM')}>
            <View className="flex-row items-center">
              <Typography className="ml-5 text-xl flex-1" fontWeight={'MEDIUM'}>
                {SECOND_STEP.SERVICE_TERM}
              </Typography>
              <Ionicons
                name={'chevron-forward-outline'}
                size={30}
                color={'#26282B'}
              />
            </View>
          </Pressable>
        </View>
      </View>
    </ScreenContainer>
  );
}
