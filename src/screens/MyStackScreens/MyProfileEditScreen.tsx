import {View} from 'react-native';
import {useState} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import {useNavigation} from '@react-navigation/native';
import Config from 'react-native-config';

import {ScreenContainer} from 'components/ScreenContainer';
import {Typography} from 'components/@common/Typography/Typography';
import {InputField} from 'components/@common/InputField/InputField';
import {CustomButton} from 'components/@common/CustomButton/CustomButton';
import Avatar from 'components/@common/Avatar/Avatar';

import useForm from 'hooks/useForm';
import useUpdateMyProfile from 'hooks/queries/MyScreen/useUpdateMyProfile';
import usePermission from 'hooks/usePermission';
import useMutateImages from 'hooks/queries/MoimCreateScreen/useMutateImages';
import useCreatePresignedURL from 'hooks/queries/MyScreen/useCreatePresignedURL';
import {getFormDataImage, validateEditProfile} from 'utils';
import useDetailProfileStore from 'stores/useDetailProfileStore';
import {queryClient} from 'containers/TanstackQueryContainer.tsx';

export default function MyProfileEditScreen() {
  const {detailProfile} = useDetailProfileStore();
  const [isEdit, setIsEdit] = useState(true);
  const {mutate} = useUpdateMyProfile();
  const [moimList, setMoimList] = useState([]);
  const uploadImages = useMutateImages();
  const {mutate: createPresignedUrl} = useCreatePresignedURL();
  const [keyName, setKeyName] = useState<string | null>(
    isEdit && detailProfile && detailProfile.imageUrl
      ? detailProfile.imageUrl.match(/(?<=com\/).+/)?.[0] || ''
      : '',
  );
  const navigation = useNavigation();
  const isEditMode = isEdit && detailProfile;
  const [imageUrl, setImageUrl] = useState(detailProfile?.imageUrl);
  usePermission('PHOTO');

  const editProfile = useForm({
    initialValue: {
      nickname: isEditMode ? detailProfile.nickname : '',
      residence: isEditMode ? detailProfile.residence : '',
      introduction: isEditMode ? detailProfile.introduction : '',
    },
    validate: validateEditProfile,
  });

  const handleSubmit = () => {
    mutate(
      {
        imageKey: keyName,
        nickname: editProfile.values.nickname,
        residence: editProfile.values.residence,
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
  };

  console.log(detailProfile.imageUrl.match(/(?<=com\/).+/)[0]);

  return (
    <ScreenContainer
      fixedBottomComponent={
        <CustomButton label={'수정 완료'} onPress={handleSubmit} />
      }>
      <View className="flex items-center justify-center mt-4">
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
                  console.log('받은 키네임', keyName);
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
        <View className="flex flex-col">
          <Typography
            fontWeight={'MEDIUM'}
            className="text-sm text-gray-500 mb-2">
            대표 이미지
          </Typography>
        </View>
      </View>
      <View className="mt-5">
        <Typography className="mb-3" fontWeight={'BOLD'}>
          닉네임
        </Typography>
        <InputField
          {...editProfile.getTextInputProps('nickname')}
          error={editProfile.errors.nickname}
          touched={editProfile.touched.nickname}
          returnKeyType="next"
        />
      </View>
      <View>
        <Typography className="mb-3" fontWeight={'BOLD'}>
          거주지역
        </Typography>
        <InputField
          {...editProfile.getTextInputProps('residence')}
          error={editProfile.errors.residence}
          touched={editProfile.touched.residence}
          returnKeyType="next"
        />
      </View>
      <View>
        <Typography className="mb-3" fontWeight={'BOLD'}>
          소개
        </Typography>
        <InputField
          {...editProfile.getTextInputProps('introduction')}
          error={editProfile.errors.introduction}
          touched={editProfile.touched.introduction}
          returnKeyType="next"
          multiline={true}
        />
      </View>
    </ScreenContainer>
  );
}
