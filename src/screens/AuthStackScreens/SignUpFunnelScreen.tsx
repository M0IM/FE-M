import {useNavigation} from '@react-navigation/native';
import {
  AuthStackNavigationProp,
  AuthStackParamList,
} from '../../navigators/types';
import {useState} from 'react';

import SignUpSecondStepScreen from './SignUpSecondStepScreen.tsx';
import SignUpThirdStepScreen from './SignUpThirdStepScreen.tsx';
import {AuthStack} from '../../navigators/constants';

import AuthHomeScreen from './AuthHomeScreen.tsx';
import SignUpLastStepScreen from './SignUpLastStepScreen.tsx';

export default function SignUpFunnelScreen() {
  const navigation = useNavigation<AuthStackNavigationProp>();
  const [signUpInfo, setSignUpInfo] = useState({
    nickname: '',
    email: '',
    password: '',
    role: '',
    gender: '',
    age: '',
    birth: '',
    residence: '',
  });

  console.log(signUpInfo);

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
