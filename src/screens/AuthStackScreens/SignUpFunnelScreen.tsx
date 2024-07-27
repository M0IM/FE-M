import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import AuthHomeScreen from './AuthHomeScreen.tsx';
import SignUpSecondStepScreen from './SignUpSecondStepScreen.tsx';
import SignUpThirdStepScreen from './SignUpThirdStepScreen.tsx';
import SignUpFourthStepScreen from './SignUpFourthStepScreen.tsx';
import SignUpLastStepScreen from './SignUpLastStepScreen.tsx';

import {AuthStackNavigationProp, AuthStackParamList} from 'navigators/types';
import {AuthStack} from 'navigators/constants';
import {TJoinRequestDto} from 'types/dtos/auth.ts';

export default function SignUpFunnelScreen() {
  const navigation = useNavigation<AuthStackNavigationProp>();
  const [signUpInfo, setSignUpInfo] = useState<TJoinRequestDto>({
    nickname: '',
    email: '',
    password: '',
    passwordCheck: '',
    role: 'ROLE_USER',
    gender: 'MALE',
    age: '',
    birth: '',
    residence: '',
  });

  const stepInfoList = {
    STEP_1: (
      <AuthHomeScreen
        navigation={navigation}
        onNext={(type: string) => {
          if (type === 'REGISTER') {
            navigation.navigate('STEP_2');
          } else {
            setSignUpInfo({
              ...signUpInfo,
            });
          }
        }}
      />
    ),
    STEP_2: (
      <SignUpSecondStepScreen onNext={() => navigation.navigate('STEP_3')} />
    ),
    STEP_3: (
      <SignUpThirdStepScreen
        setSignUpInfo={setSignUpInfo}
        onNext={() => navigation.navigate('STEP_4')}
      />
    ),
    STEP_4: (
      <SignUpFourthStepScreen
        setSignUpInfo={setSignUpInfo}
        onNext={() => navigation.navigate('STEP_5')}
      />
    ),
    STEP_5: (
      <SignUpLastStepScreen
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
