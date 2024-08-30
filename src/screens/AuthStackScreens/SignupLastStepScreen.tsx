import {useState} from 'react';
import {Pressable, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CheckBox from '@react-native-community/checkbox';
import moment from 'moment';

import {CustomButton} from 'components/@common/CustomButton/CustomButton.tsx';
import {ScreenContainer} from 'components/ScreenContainer.tsx';
import {Typography} from 'components/@common/Typography/Typography.tsx';
import {DatePickerOption} from 'components/@common/DatePickerOption/DatePickerOption.tsx';

import useForm from 'hooks/useForm.ts';
import useModal from 'hooks/useModal.ts';
import useAuth from 'hooks/queries/AuthScreen/useAuth.ts';

import {validateSignUpStep5} from 'utils/validate.ts';
import {getDateWithSeparator} from 'utils';
import {AuthStackNavigationProp} from 'navigators/types';
import {TSignup} from 'types/dtos/auth.ts';
import {FIFTH_STEP} from 'constants/screens/SignUpScreens/SignUpFunnelScreen.ts';
import RegionBottomSheet from '../../components/screens/RegionBottomSheet/RegionBottomSheet.tsx';
import useFcmTokenStore from '../../stores/useFcmTokenStore.ts';

type TSignUpScreenProps = {
  setSignUpInfo: React.Dispatch<React.SetStateAction<TSignup>>;
  signUpInfo: TSignup;
};

export default function SignupLastStepScreen({
  setSignUpInfo,
  signUpInfo,
}: TSignUpScreenProps) {
  const navigation = useNavigation<AuthStackNavigationProp>();
  const [gender, setGender] = useState<'FEMALE' | 'MALE'>('MALE');
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

  const handleSubmit = () => {
    setSignUpInfo(prevInfo => ({
      ...prevInfo,
      gender,
      birth: form.values.birth,
      residence: region,
    }));
    signUpMutation.mutate({
      provider: signUpInfo.provider,
      providerId: signUpInfo.providerId,
      nickname: signUpInfo.nickname,
      email: signUpInfo.email,
      password: signUpInfo.password,
      role: 'ROLE_USER',
      gender: signUpInfo.gender,
      birth: moment(date).format('YYYY-MM-DD'),
      residence: region,
      fcmToken: fcmToken as string,
    });
  };

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
          textStyle={'text-sm font-bold'}
          label={'가입 후 로그인 하기'}
          onPress={handleSubmit}
          inValid={isDisabled}
        />
      }>
      <View className="mb-10">
        <Typography fontWeight={'BOLD'} className="text-xl mt-10">
          {FIFTH_STEP.DESC_1}
        </Typography>
        <Typography fontWeight={'BOLD'} className="text-xl">
          {FIFTH_STEP.DESC_2}
        </Typography>
      </View>

      <View className="flex-col gap-y-10">
        <View>
          <Typography fontWeight={'MEDIUM'}>{FIFTH_STEP.GENDER}</Typography>
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
              <Typography fontWeight={'MEDIUM'}>{FIFTH_STEP.FEMALE}</Typography>
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
        </View>
        <View>
          <Typography className="mb-4" fontWeight={'MEDIUM'}>
            생년월일
          </Typography>
          <CustomButton
            variant="gray"
            label={
              isPicked ? `${getDateWithSeparator(date, '. ')}` : '날짜 선택'
            }
            onPress={datePickerModal.show}
          />
        </View>
        <View>
          <Typography className="mb-4" fontWeight={'MEDIUM'}>
            {FIFTH_STEP.RESIDENCE}
          </Typography>
          <CustomButton
            variant="gray"
            label={isPickedRegion ? region : '지역 선택'}
            onPress={regionPickerModal.show}
          />
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
