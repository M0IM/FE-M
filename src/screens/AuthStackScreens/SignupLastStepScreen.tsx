import React, {useState} from 'react';
import {Pressable, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CheckBox from '@react-native-community/checkbox';
import moment from 'moment';

import {CustomButton} from 'components/@common/CustomButton/CustomButton.tsx';
import {ScreenContainer} from 'components/ScreenContainer.tsx';
import {Typography} from 'components/@common/Typography/Typography.tsx';
import {DatePickerOption} from 'components/@common/DatePickerOption/DatePickerOption.tsx';
import RegionBottomSheet from 'components/screens/RegionBottomSheet/RegionBottomSheet.tsx';

import useForm from 'hooks/useForm.ts';
import useModal from 'hooks/useModal.ts';
import useAuth from 'hooks/queries/AuthScreen/useAuth.ts';
import useThrottle from 'hooks/useThrottle.ts';

import {validateSignUpStep5} from 'utils/validate.ts';
import {getDateWithSeparator} from 'utils';
import {AuthStackNavigationProp} from 'navigators/types';
import {TSignup} from 'types/dtos/auth.ts';
import {FIFTH_STEP} from 'constants/screens/SignUpScreens/SignUpFunnelScreen.ts';
import useFcmTokenStore from 'stores/useFcmTokenStore.ts';

type TSignUpScreenProps = {
  setSignUpInfo: React.Dispatch<React.SetStateAction<TSignup>>;
  signUpInfo: TSignup;
};

export default function SignupLastStepScreen({
  setSignUpInfo,
  signUpInfo,
}: TSignUpScreenProps) {
  const navigation = useNavigation<AuthStackNavigationProp>();
  const [gender, setGender] = useState<'FEMALE' | 'MALE' | null>('MALE');
  const {signUpMutation} = useAuth();
  const datePickerModal = useModal();
  const regionPickerModal = useModal();
  const [date, setDate] = useState<Date>(new Date());
  const [isPicked, setIsPicked] = useState(false);
  const [isPickedRegion, setIsPickedRegion] = useState(false);
  const [region, setRegion] = useState('');
  const {fcmToken} = useFcmTokenStore();

  const handleChangeDate = (pickedDate: Date) => {
    setDate(pickedDate);
  };
  const handleConfirmDate = () => {
    setIsPicked(true);
    datePickerModal.hide();
  };

  const handleConfirmRegion = () => {
    setIsPickedRegion(true);
    regionPickerModal.hide();
  };

  const form = useForm({
    initialValue: {
      gender: 'MALE',
      birth: '',
    },
    validate: validateSignUpStep5,
  });

  const handleGenderChange = (selectedGender: 'FEMALE' | 'MALE') => {
    setGender(selectedGender);
  };

  const [isSelectGender, setIsSelectGender] = useState(false);
  const [isSelectBirth, setIsSelectBirth] = useState(false);
  const [isSelectRegion, setIsSelectRegion] = useState(false);

  const handleSubmit = useThrottle(() => {
    signUpMutation.mutate({
      provider: signUpInfo.provider,
      providerId: signUpInfo.providerId,
      nickname: signUpInfo.nickname,
      email: signUpInfo.email,
      password: signUpInfo.password,
      role: 'ROLE_USER',
      gender: isSelectGender ? form.values.gender : null,
      birth: isSelectBirth ? moment(date).format('YYYY-MM-DD') : null,
      residence: isSelectRegion ? region : null,
      fcmToken: fcmToken as string,
    });
  });

  const isDisabled = Object.values(form.errors).some(error => error);

  return (
    <ScreenContainer
      enabled={false}
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
          textStyle={'text-base text-white font-bold'}
          label={'가입 후 로그인 하기'}
          onPress={handleSubmit}
          inValid={isDisabled}
          isLoading={signUpMutation.isPending}
        />
      }>
      <View className="mb-1">
        <Typography fontWeight={'BOLD'} className="text-xl mt-10">
          {FIFTH_STEP.DESC_1}
        </Typography>
        <Typography fontWeight={'BOLD'} className="text-xl">
          {FIFTH_STEP.DESC_2}
        </Typography>
        <Typography fontWeight="MEDIUM" className="text-xs text-gray-400 mt-2">
          성별, 생년월일, 거주지역 정보는{'\n'}모임 스페이스의 대시보드 통계
          정보로 활용됩니다.
        </Typography>
      </View>

      <View className="flex-col gap-y-10">
        <View>
          <Typography fontWeight={'MEDIUM'}>{FIFTH_STEP.GENDER}</Typography>
          <View className="flex-row items-center gap-x-2 py-3">
            <TouchableOpacity onPress={() => setIsSelectGender(prev => !prev)}>
              <View className="flex-row items-center w-full">
                <View className="flex flex-col items-center justify-center border-gray-400 border-[1px] p-[5] rounded-full w-[15] h-[15] mr-2">
                  <View
                    className={`${
                      isSelectGender ? 'bg-main' : ''
                    } rounded-full w-[10] h-[10]`}
                  />
                </View>
                <Typography className="text-gray-500" fontWeight={'BOLD'}>
                  제공
                </Typography>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsSelectGender(prev => !prev)}>
              <View className="flex-row items-center w-full">
                <View className="flex flex-col items-center justify-center border-gray-400 border-[1px] p-[5] rounded-full w-[15] h-[15] mr-2">
                  <View
                    className={`${
                      isSelectGender ? '' : 'bg-main'
                    } rounded-full w-[10] h-[10]`}
                  />
                </View>
                <Typography className="text-gray-500" fontWeight={'BOLD'}>
                  제공하지 않음
                </Typography>
              </View>
            </TouchableOpacity>
          </View>
          {isSelectGender ? (
            <View className="flex flex-row justify-around">
              <View className="flex flex-col items-center gap-y-2">
                <Typography fontWeight={'MEDIUM'}>{FIFTH_STEP.MALE}</Typography>
                <CheckBox
                  disabled={false}
                  value={gender === 'MALE'}
                  onValueChange={() => handleGenderChange('MALE')}
                  onFillColor={'#00F0A1'}
                  onCheckColor={'#FFFFFF'}
                  onTintColor={'#FFFFFF'}
                />
              </View>
              <View className="flex flex-col items-center gap-y-2">
                <Typography fontWeight={'MEDIUM'}>
                  {FIFTH_STEP.FEMALE}
                </Typography>
                <CheckBox
                  disabled={false}
                  value={gender === 'FEMALE'}
                  onValueChange={() => handleGenderChange('FEMALE')}
                  onFillColor={'#00F0A1'}
                  onCheckColor={'#FFFFFF'}
                  onTintColor={'#FFFFFF'}
                />
              </View>
            </View>
          ) : null}
        </View>
        <View>
          <Typography className="mb-4" fontWeight={'MEDIUM'}>
            생년월일
          </Typography>
          <View className="flex-row items-center gap-x-2 py-3">
            <TouchableOpacity onPress={() => setIsSelectBirth(prev => !prev)}>
              <View className="flex-row items-center w-full">
                <View className="flex flex-col items-center justify-center border-gray-400 border-[1px] p-[5] rounded-full w-[15] h-[15] mr-2">
                  <View
                    className={`${
                      isSelectBirth ? 'bg-main' : ''
                    } rounded-full w-[10] h-[10]`}
                  />
                </View>
                <Typography className="text-gray-500" fontWeight={'BOLD'}>
                  제공
                </Typography>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsSelectBirth(prev => !prev)}>
              <View className="flex-row items-center w-full">
                <View className="flex flex-col items-center justify-center border-gray-400 border-[1px] p-[5] rounded-full w-[15] h-[15] mr-2">
                  <View
                    className={`${
                      isSelectBirth ? '' : 'bg-main'
                    } rounded-full w-[10] h-[10]`}
                  />
                </View>
                <Typography className="text-gray-500" fontWeight={'BOLD'}>
                  제공하지 않음
                </Typography>
              </View>
            </TouchableOpacity>
          </View>
          {isSelectBirth ? (
            <CustomButton
              variant="gray"
              label={
                isPicked ? `${getDateWithSeparator(date, '. ')}` : '날짜 선택'
              }
              onPress={datePickerModal.show}
            />
          ) : null}
        </View>
        <View>
          <Typography className="mb-4" fontWeight={'MEDIUM'}>
            {FIFTH_STEP.RESIDENCE}
          </Typography>
          <View className="flex-row items-center gap-x-2 py-3">
            <TouchableOpacity onPress={() => setIsSelectRegion(prev => !prev)}>
              <View className="flex-row items-center w-full">
                <View className="flex flex-col items-center justify-center border-gray-400 border-[1px] p-[5] rounded-full w-[15] h-[15] mr-2">
                  <View
                    className={`${
                      isSelectRegion ? 'bg-main' : ''
                    } rounded-full w-[10] h-[10]`}
                  />
                </View>
                <Typography className="text-gray-500" fontWeight={'BOLD'}>
                  제공
                </Typography>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsSelectRegion(prev => !prev)}>
              <View className="flex-row items-center w-full">
                <View className="flex flex-col items-center justify-center border-gray-400 border-[1px] p-[5] rounded-full w-[15] h-[15] mr-2">
                  <View
                    className={`${
                      isSelectRegion ? '' : 'bg-main'
                    } rounded-full w-[10] h-[10]`}
                  />
                </View>
                <Typography className="text-gray-500" fontWeight={'BOLD'}>
                  제공하지 않음
                </Typography>
              </View>
            </TouchableOpacity>
          </View>

          {isSelectRegion ? (
            <CustomButton
              variant="gray"
              label={isPickedRegion ? region : '지역 선택'}
              onPress={regionPickerModal.show}
            />
          ) : null}
        </View>
        <DatePickerOption
          isVisible={datePickerModal.isVisible}
          onOpen={datePickerModal.show}
          onClose={datePickerModal.hide}
          date={date}
          onChangeDate={handleChangeDate}
          onConfirmDate={handleConfirmDate}
        />
      </View>

      <RegionBottomSheet
        isOpen={regionPickerModal.isVisible}
        onClose={regionPickerModal.hide}
        onOpen={regionPickerModal.show}
        setRegion={setRegion}
        handleConfirmRegion={handleConfirmRegion}
      />
    </ScreenContainer>
  );
}
