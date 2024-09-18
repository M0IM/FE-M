import {ActivityIndicator, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import {useNavigation} from '@react-navigation/native';
import Config from 'react-native-config';
import moment from 'moment';
import CheckBox from '@react-native-community/checkbox';

import {ScreenContainer} from 'components/ScreenContainer';
import {Typography} from 'components/@common/Typography/Typography';
import {InputField} from 'components/@common/InputField/InputField';
import {CustomButton} from 'components/@common/CustomButton/CustomButton';
import Avatar from 'components/@common/Avatar/Avatar';
import RegionBottomSheet from 'components/screens/RegionBottomSheet/RegionBottomSheet.tsx';
import {DatePickerOption} from 'components/@common/DatePickerOption/DatePickerOption.tsx';

import useForm from 'hooks/useForm';
import useUpdateMyProfile from 'hooks/queries/MyScreen/useUpdateMyProfile';
import usePermission from 'hooks/usePermission';
import useMutateImages from 'hooks/queries/MoimCreateScreen/useMutateImages';
import useCreatePresignedURL from 'hooks/queries/MyScreen/useCreatePresignedURL';
import useThrottle from 'hooks/useThrottle';

import {
  getDateWithSeparator,
  getFormDataImage,
  validateEditProfile,
} from 'utils';
import useDetailProfileStore from 'stores/useDetailProfileStore';
import {queryClient} from 'containers/TanstackQueryContainer.tsx';
import useModal from 'hooks/useModal.ts';
import {FIFTH_STEP} from 'constants/screens/SignUpScreens/SignUpFunnelScreen.ts';

export default function MyProfileEditScreen() {
  usePermission('PHOTO');
  const {detailProfile} = useDetailProfileStore();
  const [isEdit, setIsEdit] = useState(true);
  const {mutate, isPending} = useUpdateMyProfile();
  const [moimList, setMoimList] = useState([]);
  const uploadImages = useMutateImages();
  const {mutate: createPresignedUrl, isPending: presignedUrlIsPending} =
    useCreatePresignedURL();
  const [keyName, setKeyName] = useState<string | null>(
    isEdit && detailProfile && detailProfile.imageUrl
      ? detailProfile?.imageUrl?.match(/(?<=com\/).+/)?.[0] || ''
      : '',
  );
  const navigation = useNavigation();
  const isEditMode = isEdit && detailProfile;
  const [imageUrl, setImageUrl] = useState(detailProfile?.imageUrl);

  // TODO: 성별 관련
  const [gender, setGender] = useState<'FEMALE' | 'MALE' | null>(
    isEditMode ? detailProfile.gender : null,
  );
  const [isSelectGender, setIsSelectGender] = useState(
    isEditMode && detailProfile.gender === null ? false : true,
  );
  const handleGenderChange = (selectedGender: 'FEMALE' | 'MALE') => {
    setGender(selectedGender);
  };

  // TODO: DATE 관련
  const [isSelectBirth, setIsSelectBirth] = useState(
    isEditMode && detailProfile?.birth === null ? false : true,
  );
  const [date, setDate] = useState<Date>(
    isEditMode ? (new Date(detailProfile.birth) ?? '날짜 선택') : new Date(),
  );
  const [isPicked, setIsPicked] = useState(false);
  const handleChangeDate = (pickedDate: Date) => {
    setDate(pickedDate);
  };
  const datePickerModal = useModal();
  const handleConfirmDate = () => {
    setIsPicked(true);
    datePickerModal.hide();
  };

  // TODO: REGION 관련
  const [isSelectRegion, setIsSelectRegion] = useState(
    isEditMode && detailProfile?.residence === null ? false : true,
  );
  const [isPickedRegion, setIsPickedRegion] = useState(false);
  const [region, setRegion] = useState(
    isEditMode ? (detailProfile.residence ?? '지역 선택') : '',
  );
  const regionPickerModal = useModal();
  const handleConfirmRegion = () => {
    setIsPickedRegion(true);
    regionPickerModal.hide();
  };

  const editProfile = useForm({
    initialValue: {
      nickname: isEditMode ? detailProfile.nickname : '',
      introduction: isEditMode ? detailProfile.introduction : '',
    },
    validate: validateEditProfile,
  });

  const handleSubmit = useThrottle(() => {
    mutate(
      {
        imageKey: keyName,
        nickname: editProfile.values.nickname,
        residence: isSelectRegion ? region : null,
        birth: isSelectBirth ? moment(date).format('YYYY-MM-DD') : null,
        gender: isSelectGender ? gender : null,
        introduction: editProfile.values.introduction,
        publicMoimList: moimList,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({queryKey: ['profile']});
          navigation.goBack();
        },
        onError: error => {
          console.log(error);
        },
      },
    );
  });

  const handleDeleteImage = () => {
    setImageUrl('');
    setKeyName(null);
  };

  return (
    <ScreenContainer>
      <View className="flex items-center justify-center mt-4">
        {presignedUrlIsPending ? (
          <View className="flex flex-col items-center justify-center w-20 h-20">
            <ActivityIndicator />
          </View>
        ) : (
          <Avatar
            size={'LG'}
            uri={imageUrl}
            onPress={async () => {
              try {
                const image = await ImagePicker.openPicker({
                  mediaType: 'photo',
                  multiple: false,
                  includeBase64: true,
                  maxFiles: 1,
                  cropperChooseText: '완료',
                  cropperCancelText: '취소',
                });
                const {formData, fileName, fileType, fileUri} =
                  getFormDataImage(image);
                console.log(formData);
                createPresignedUrl(fileName, {
                  onSuccess: data => {
                    const {keyName} = data;
                    setKeyName(keyName);

                    uploadImages.mutate(
                      {
                        url: data.url,
                        file: formData,
                        fileType,
                        fileUri: fileUri,
                      },
                      {
                        onSuccess: () => {
                          setImageUrl(`${Config.AWS_S3_URL}${keyName}`);
                        },
                      },
                    );
                  },
                });
              } catch (error) {
                console.log('Error picking image: ', error);
              }
            }}
          />
        )}

        <TouchableOpacity className="flex flex-col" onPress={handleDeleteImage}>
          <Typography
            fontWeight={'MEDIUM'}
            className="text-sm text-gray-500 my-2">
            대표 이미지
          </Typography>
        </TouchableOpacity>
      </View>
      <View className="mt-5">
        <Typography className="mb-3" fontWeight={'BOLD'}>
          닉네임
        </Typography>
        <InputField
          {...editProfile.getTextInputProps('nickname')}
          // error={editProfile.errors.nickname}
          touched={editProfile.touched.nickname}
          returnKeyType="next"
        />
      </View>
      <View>
        <Typography className="mb-3" fontWeight={'BOLD'}>
          성별
        </Typography>
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
        ) : null}
      </View>
      <View>
        {/* TODO: 거주지역 */}
        <Typography className="mb-3" fontWeight={'BOLD'}>
          거주지역
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
            label={isPickedRegion || isEditMode ? region : '지역 선택'}
            onPress={regionPickerModal.show}
          />
        ) : null}
      </View>
      <View>
        <Typography className="mb-3" fontWeight={'BOLD'}>
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
              isPicked || isEditMode
                ? `${getDateWithSeparator(date, '. ')}`
                : '날짜 선택'
            }
            onPress={datePickerModal.show}
          />
        ) : null}
      </View>
      <View>
        <Typography className="mb-3" fontWeight={'BOLD'}>
          소개
        </Typography>
        <InputField
          {...editProfile.getTextInputProps('introduction')}
          // error={editProfile.errors.introduction}
          touched={editProfile.touched.introduction}
          returnKeyType="next"
          multiline={true}
          placeholder="소개를 입력해주세요."
        />
      </View>
      <CustomButton
        label={'수정 완료'}
        onPress={handleSubmit}
        className="mt-auto"
        textStyle="text-white text-base font-bold"
        isLoading={isPending}
        inValid={isPending}
      />

      <DatePickerOption
        isVisible={datePickerModal.isVisible}
        onOpen={datePickerModal.show}
        onClose={datePickerModal.hide}
        date={date}
        onChangeDate={handleChangeDate}
        onConfirmDate={handleConfirmDate}
      />
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
