import {ScreenContainer} from 'components/ScreenContainer.tsx';
import {Typography} from 'components/@common/Typography/Typography.tsx';
import { View } from 'react-native';
import { InputField } from 'components/@common/InputField/InputField';
import { CustomButton } from 'components/@common/CustomButton/CustomButton';
import { useEffect, useState } from 'react';
import { REGEX_PASSORD } from 'constants/regexps/auth';

// TODO: 이후에 실제 비밀번호로 변경
const testNowPassword = 'ekdlsdl12!';

export default function MyPasswordChangeScreen() {
  const [nowValue, setNowValue] = useState({
    nowPassword: '',
    nowPasswordError: ''
  });
  const [newValue, setNewValue] = useState({
    newPassword: '',
    newPasswordError: '',
    newPasswordCheck: '',
    newPasswordCheckError: '',
  });

  const submitPossible = !(
    nowValue.nowPasswordError ||
    newValue.newPasswordError ||
    newValue.newPasswordCheckError ||
    !nowValue.nowPassword ||
    !newValue.newPassword ||
    !newValue.newPasswordCheck
  );

  const handleNowPasswordError = () => {
    if (testNowPassword !== nowValue.nowPassword) {
      setNowValue(prev => ({ ...prev, nowPasswordError: '현재 비밀번호가 일치하지 않습니다.'}));
    } else if (!nowValue.nowPassword) {
      setNowValue(prev => ({ ...prev, nowPasswordError: '현재 비밀번호를 입력해주세요.'}));
    } else 
    return setNowValue(prev => ({ ...prev, nowPasswordError: '' }));;
  };

  const handleNewPasswordError = () => {
    if (!REGEX_PASSORD.test(newValue.newPassword)) {
      setNewValue(prev => ({ ...prev, newPasswordError: '형식을 바르게 입력해주세요.'}));
    } else if (!newValue.newPassword) {
    setNewValue(prev => ({ ...prev, newPasswordError: '새로운 비밀번호를 입력해주세요.'}));
    } else if (nowValue.nowPassword === newValue.newPassword) {
      setNewValue(prev => ({ ...prev, newPasswordError: '현재 비밀번호와 다른 비밀번호를 입력해주세요.'}));
    } else return setNewValue(prev => ({ ...prev, newPasswordError: '' }));
  };

  const handleNewPasswordCheckError = () => {
      if (!REGEX_PASSORD.test(newValue.newPasswordCheck)) {
        setNewValue(prev => ({ ...prev, newPasswordCheckError: '형식을 바르게 입력해주세요.'}));
      } else if (!newValue.newPasswordCheck) {
        setNewValue(prev => ({ ...prev, newPasswordCheckError: '새로운 비밀번호를 다시 입력해주세요.'}));
      } else if (newValue.newPassword !== newValue.newPasswordCheck) {
        setNewValue(prev => ({ ...prev, newPasswordCheckError: '새로운 비밀번호가 일치하지 않습니다.' }));
      }
  };

  useEffect(() => {
    handleNowPasswordError();
  }, [nowValue.nowPassword]);

  useEffect(() => {
    handleNewPasswordError();
  }, [newValue.newPassword]);

  useEffect(() => {
    handleNewPasswordCheckError();
  }, [newValue.newPasswordCheck]);

  useEffect(() => {
    setNowValue({
      nowPassword: '',
      nowPasswordError: ''
    });
    setNewValue({
      newPassword: '',
      newPasswordError: '',
      newPasswordCheck: '',
      newPasswordCheckError: '',
    });
  }, []);

  return (
    <ScreenContainer
      fixedBottomComponent={<CustomButton label='변경하기' textStyle='font-bold text-white text-lg' inValid={!submitPossible} />}
    >
      <View className='flex flex-col px-3 mt-5'>
        <Typography fontWeight='MEDIUM' className='text-sm text-gray-500 mb-2'>현재 비밀번호</Typography>
        <InputField 
          touched
          placeholder='현재 비밀번호 입력'
          value={nowValue.nowPassword}
          onChangeText={text => setNowValue(prev => ({ ...prev, nowPassword: text}))}
          error={nowValue.nowPasswordError}
          secureTextEntry
        />
      </View>
      <View className='flex flex-col px-3 mt-6'>
        <Typography fontWeight='MEDIUM' className='text-sm text-gray-500'>새로운 비밀번호</Typography>
        <Typography fontWeight='LIGHT' className='text-xs text-gray-300 mb-2'>8~16자리 영문, 숫자, 특수문자를 조합해 작성해주세요.</Typography>
        <InputField 
          touched 
          placeholder='새로운 비밀번호 입력'
          value={newValue.newPassword}
          onChangeText={text => setNewValue(prev => ({ ...prev, newPassword: text}))}
          error={newValue.newPasswordError}
          secureTextEntry
        />
      </View>
      <View className='flex flex-col px-3'>
        <Typography fontWeight='MEDIUM' className='text-sm text-gray-500 mb-2'>새로운 비밀번호 확인</Typography>
        <InputField 
          touched 
          placeholder='새로운 비밀번호 다시 입력' 
          value={newValue.newPasswordCheck}
          onChangeText={text => setNewValue(prev => ({ ...prev, newPasswordCheck: text }))}
          error={newValue.newPasswordCheckError}
          secureTextEntry
        />
      </View>
    </ScreenContainer>
  );
}
