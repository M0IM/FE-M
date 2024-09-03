import {
  View,
  TouchableOpacity,
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import {queryClient} from 'containers/TanstackQueryContainer';
import {CustomButton} from 'components/@common/CustomButton/CustomButton';
import {InputField} from 'components/@common/InputField/InputField';
import {Typography} from 'components/@common/Typography/Typography';
import {ScreenContainer} from 'components/ScreenContainer';
// import MoimTagContainer from 'components/screens/MoimCreateScreen/MoimTagContainer';
import CustomDropdown from 'components/@common/Dropdown/CustomDropdown';
import SelectRegionBottomSheet from 'components/@common/SelectRegionBottomSheet/SelectRegionBottomSheet';

import useMoimManagment from 'hooks/queries/MoimManagement/useMoimManagement';
import useModal from 'hooks/useModal';
// import useTags from 'hooks/useTags';
import useSingleImagePicker from 'hooks/useSingleImagePicker';
import useDropdown from 'hooks/useDropdown';
import useGetMoimSpaceInfo from 'hooks/queries/MoimSpace/useGetMoimSpaceInfo';

import {CREATE_CATEGORIES_LIST_DATA} from 'constants/screens/MoimSearchScreen/CategoryList';
import {
  MoimManagementNavigationProp,
  MoimManagementRouteProp,
} from 'navigators/types';

interface MoimInfoEditScreenProps {
  navigation: MoimManagementNavigationProp;
}

const MoimInfoEditScreen = ({navigation}: MoimInfoEditScreenProps) => {
  const route = useRoute<MoimManagementRouteProp>();
  const platform = Platform.OS;
  const moimId = route.params.id;

  const [region, setRegion] = useState('');

  const regionPickerModal = useModal();
  // const {tags, addTagField, handleTagChange, removeTagField} = useTags();
  const {updateMoimInfoMutation} = useMoimManagment();
  const {data: moimData, isPending} = useGetMoimSpaceInfo(moimId);

  const isImgUri =
    moimData?.profileImageUrl?.split('com/') &&
    moimData?.profileImageUrl?.split('com/')[1]
      ? true
      : false;

  const {imageUri, uploadUri, handleChange, deleteImageUri} =
    useSingleImagePicker(
      isImgUri ? {initialImage: moimData?.profileImageUrl} : {},
    );
  const {isPressed, category, handleCategory, handleSelectedCategory} =
    useDropdown();
  const [data, setData] = useState({
    title: moimData?.title,
    introduction: moimData?.description,
  });
  const [error, setError] = useState({
    title: '',
  });

  const updateIsLoading = updateMoimInfoMutation.isPending;

  useEffect(() => {
    if (moimData?.category) {
      const selected = CREATE_CATEGORIES_LIST_DATA.find(
        item => item.key === moimData?.category,
      );
      handleSelectedCategory(selected);
    }
    if (moimData?.address) {
      setRegion(moimData?.address);
    }
  }, [moimData]);

  const handleOnSubmit = () => {
    console.log(data);
    console.log(category?.key);

    if (
      data?.title &&
      region &&
      data?.introduction &&
      moimId &&
      category?.key
    ) {
      updateMoimInfoMutation.mutate(
        {
          moimId: moimId,
          title: data?.title,
          address: region,
          moimCategory: category?.key || moimData?.category,
          description: data?.introduction,
          imageKeyName: uploadUri || moimData?.profileImageUrl,
        },
        {
          onSuccess: () => {
            navigation.goBack();
            Toast.show({
              type: 'success',
              text1: '모임 정보가 수정되었습니다.',
              visibilityTime: 2000,
              position: 'bottom',
            });
          },
          onError: error => {
            console.error(error?.response);
            Toast.show({
              type: 'error',
              text1:
                error?.response?.data?.message ||
                '모임 수정 중 오류가 발생했습니다.',
              visibilityTime: 2000,
              position: 'bottom',
            });
          },
          onSettled: () => {
            queryClient.invalidateQueries({
              queryKey: ['myMoim'],
            });
          },
        },
      );
    } else {
      if (!data?.title)
        setError(prev => ({...prev, title: '모임 이름을 입력해주세요.'}));
      if (!region)
        Toast.show({
          type: 'error',
          text1: '모임 활동 지역을 선택해주세요.',
          visibilityTime: 2000,
          position: 'bottom',
        });
      if (!data?.introduction)
        Toast.show({
          type: 'error',
          text1: '모임 소개를 작성해주세요.',
          visibilityTime: 2000,
          position: 'bottom',
        });
      if (!category?.key) {
        Toast.show({
          type: 'error',
          text1: '카테고리를 선택해주세요.',
          visibilityTime: 2000,
          position: 'bottom',
        });
      }
    }
  };

  const handleConfirmRegion = () => {
    regionPickerModal.hide();
  };

  if (isPending) {
    return (
      <SafeAreaView className="flex flex-col flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <ScreenContainer
      fixedBottomComponent={
        <CustomButton
          label="모임 정보 수정"
          textStyle="text-white font-bold text-base"
          onPress={handleOnSubmit}
          isLoading={updateIsLoading}
        />
      }>
      <View className="flex flex-col">
        <Typography
          fontWeight={'MEDIUM'}
          className="text-sm text-gray-500 mb-2 mt-4">
          모임 이름
        </Typography>
        <InputField
          touched
          placeholder="모임 이름 입력"
          error={data?.title ? '' : error.title}
          value={data.title}
          onChangeText={text => setData(prev => ({...prev, title: text}))}
        />
      </View>
      <View className="flex flex-col">
        <Typography
          fontWeight={'MEDIUM'}
          className="text-sm text-gray-500 mb-2">
          활동 지역
        </Typography>
        <View className="flex flex-row w-full items-center justify-around gap-x-2">
          <View className="flex-1">
            <CustomButton
              variant="gray"
              label={region ? region : '활동 지역 선택'}
              onPress={regionPickerModal.show}
            />
          </View>
          <TouchableOpacity activeOpacity={0.8}>
            <Ionicons name="search" size={30} color={'#C9CCD1'} />
          </TouchableOpacity>
        </View>
      </View>

      {/* 카테고리 드롭다운 */}
      <CustomDropdown
        isPressed={isPressed}
        selectedMenu={category}
        placeholder="카테고리"
        menuList={CREATE_CATEGORIES_LIST_DATA.map(item => item.label)}
        handleSelect={(label: any) => {
          const selected = CREATE_CATEGORIES_LIST_DATA.find(
            item => item.label === label,
          );
          handleSelectedCategory(selected);
        }}
        onPress={handleCategory}
        height={200}
      />

      {/* 카메라 연결 */}
      <View className="flex flex-col">
        <Typography
          fontWeight={'MEDIUM'}
          className="text-sm text-gray-500 mb-2">
          대표 이미지
        </Typography>
        <View className="flex flex-row items-center gap-x-6">
          <TouchableOpacity activeOpacity={0.8} onPress={handleChange}>
            <Ionicons
              name="camera"
              size={40}
              color={'#9EA4AA'}
              style={{padding: 10}}
            />
          </TouchableOpacity>
          {imageUri && (
            <View className="w-[80] h-[100]">
              <Image
                source={{uri: imageUri}}
                className="w-full h-full rounded-2xl"
              />
              <Pressable
                onPress={() => deleteImageUri()}
                className="flex flex-col items-center justify-center absolute bottom-0 w-[80] bg-white h-2/5 rounded-b-2xl border-[1px] border-gray-200">
                <Ionicons name="trash" size={15} color={'#9EA4AA'} />
              </Pressable>
            </View>
          )}
        </View>
      </View>

      <View className="flex flex-col mb-28">
        <Typography
          fontWeight={'MEDIUM'}
          className="text-sm text-gray-500 mb-2">
          모임 소개
        </Typography>
        <View className="max-h-[800px]">
          <InputField
            touched
            placeholder="모임 소개 입력"
            multiline
            value={data?.introduction}
            onChangeText={text =>
              setData(prev => ({...prev, introduction: text}))
            }
          />
        </View>
      </View>

      {/* 태그 컴포넌트 */}
      {/* TODO: 다음 버전에서 추가 */}
      {/* <MoimTagContainer
        tags={tags}
        addTagField={addTagField}
        removeTagField={removeTagField}
        handleTagChange={handleTagChange}
      /> */}

      {/* 모임 소개 영상 게시 */}
      {/* TODO: 다음 버전에서 추가 */}
      {/* <MoimIntroVideo /> */}
      <SelectRegionBottomSheet
        isBottomSheetOpen={regionPickerModal.isVisible}
        onOpen={regionPickerModal.show}
        onClose={regionPickerModal.hide}
        setRegion={setRegion}
        handleConfirmRegion={handleConfirmRegion}
      />
      <View className={platform === 'android' ? 'mt-16' : 'mt-6'} />
    </ScreenContainer>
  );
};

export default MoimInfoEditScreen;
