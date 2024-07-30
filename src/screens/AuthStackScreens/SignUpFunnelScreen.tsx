import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import AuthHomeScreen from './AuthHomeScreen.tsx';
import SignUpSecondStepScreen from './SignupSecondStepScreen.tsx';
import SignUpThirdStepScreen from './SignupThridStepScreen.tsx';
import SignUpFourthStepScreen from './SignupFourthStepScreen.tsx';
import SignupLastStepScreen from './SignupLastStepScreen.tsx';

import {AuthStackNavigationProp, AuthStackParamList} from 'navigators/types';
import {AuthStack} from 'navigators/constants';
import {TSignup} from '../../apis';

export default function SignUpFunnelScreen() {
  const navigation = useNavigation<AuthStackNavigationProp>();
  const [signUpInfo, setSignUpInfo] = useState<TSignup>({
    provider: 'LOCAL',
    providerId: '',
    nickname: '',
    email: '',
    password: '',
    role: 'ROLE_USER',
    gender: 'MALE',
    birth: '',
    residence: '',
  });

  const stepInfoList = {
    STEP_1: (
      <AuthHomeScreen
        setSignUpInfo={setSignUpInfo}
        navigation={navigation}
        onNext={(type: string) => {
          if (type === 'REGISTER') {
            navigation.navigate('STEP_4');
          } else {
            setSignUpInfo({
              ...signUpInfo,
            });
          }
        }}
      />
    ),
    STEP_2: (
      <SignUpSecondStepScreen
        setSignUpInfo={setSignUpInfo}
        onNext={() => navigation.navigate('STEP_3')}
      />
    ),
    STEP_3: (
      <SignUpThirdStepScreen
        setSignUpInfo={setSignUpInfo}
        onNext={() => navigation.navigate('STEP_4')}
      />
    ),
    STEP_4: (
      <SignUpFourthStepScreen onNext={() => navigation.navigate('STEP_5')} />
    ),
    STEP_5: (
      <SignupLastStepScreen
        setSignUpInfo={setSignUpInfo}
        signUpInfo={signUpInfo}
      />
    ),
  };
  return (
    <AuthStack.Navigator>
      {Object.entries(stepInfoList).map(([name, component]) => {
        const ScreenComponent = () => component;
        return (
          <AuthStack.Screen
            key={name}
            name={name as keyof AuthStackParamList}
            component={ScreenComponent}
            options={{headerShown: false}}
          />
        );
      })}
    </AuthStack.Navigator>
  );
}
