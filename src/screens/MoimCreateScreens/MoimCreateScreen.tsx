import {Image, Platform, Pressable, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useEffect, useState} from 'react';
import Toast from 'react-native-toast-message';

import {CustomButton} from 'components/@common/CustomButton/CustomButton';
import {InputField} from 'components/@common/InputField/InputField';
import {Typography} from 'components/@common/Typography/Typography';
import CustomDropdown from 'components/@common/Dropdown/CustomDropdown';
import {ScreenContainer} from 'components/ScreenContainer';
import RegionBottomSheet from '../../components/screens/RegionBottomSheet/RegionBottomSheet.tsx';

import usePermission from 'hooks/usePermission';
import useCreateMoim from 'hooks/queries/MoimCreateScreen/useCreateMoim';
import useMoimManagment from 'hooks/queries/MoimManagement/useMoimManagement.ts';
import useSingleImagePicker from 'hooks/useSingleImagePicker';
import useDropdown from 'hooks/useDropdown';
import useThrottle from 'hooks/useThrottle.ts';
import useModal from 'hooks/useModal';

import {HomeStackNavigationProp} from 'navigators/types';
import {queryClient} from 'containers/TanstackQueryContainer';
import {CREATE_CATEGORIES_LIST_DATA} from 'constants/screens/MoimSearchScreen/CategoryList';
import useMoimInfoStore from 'stores/useMoimInfoStore.ts';

interface MoimCreateScreenProps {
  navigation: HomeStackNavigationProp;
}

const MoimCreateScreen = ({navigation}: MoimCreateScreenProps) => {
  usePermission('PHOTO');
  const {moimInfo} = useMoimInfoStore();
  const isEdit = !!moimInfo;
  const regionPickerModal = useModal();
  // const {tags, addTagField, handleTagChange, removeTagField} = useTags();
  const {imageUri, uploadUri, handleChange, deleteImageUri} =
    useSingleImagePicker({
      initialImage: moimInfo?.profileImageUrl || '',
    });
  const {isPressed, category, handleCategory, handleSelectedCategory} =
    useDropdown();
  const createMoimMutation = useCreateMoim();
  const {updateMoimInfoMutation} = useMoimManagment();
  const platform = Platform.OS;

  const [region, setRegion] = useState(moimInfo?.address);
  const [isPickedRegion, setIsPickedRegion] = useState(
    moimInfo?.address ? true : false,
  );
  const [data, setData] = useState({
    title: moimInfo?.title || '',
    introduceVideoKeyName: 'string',
    introduceVideoTitle: 'string',
    introduction: moimInfo?.description,
  });
  const [error, setError] = useState({
    title: '',
    location: '',
  });

  useEffect(() => {
    if (moimInfo?.category) {
      const selected = CREATE_CATEGORIES_LIST_DATA.find(
        item => item.key === moimInfo?.category,
      );
      handleSelectedCategory(selected);
    }
  }, [moimInfo]);

  const createIsLoading = createMoimMutation.isPending;
  const updateIsLoading = updateMoimInfoMutation.isPending;

  const handleOnSubmit = useThrottle(() => {
    if (data?.title && region && data?.introduction && category?.key) {
      if (isEdit) {
        updateMoimInfoMutation.mutate(
          {
            moimId: moimInfo.moimId,
            title: data?.title,
            address: region,
            moimCategory: category?.key || moimInfo.category,
            description: data?.introduction,
            imageKeyName: uploadUri || imageUri?.split('.com/')[1],
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
              queryClient.invalidateQueries({
                queryKey: ['myMoim'],
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
          },
        );
      } else {
        createMoimMutation.mutate(
          {
            title: data?.title,
            location: region,
            moimCategory: category?.key,
            introduceVideoKeyName: data?.introduceVideoKeyName,
            introduceVideoTitle: data?.introduceVideoTitle,
            introduction: data?.introduction,
            imageKeyName: uploadUri,
          },
          {
            onSuccess: () => {
              navigation.goBack();
              queryClient.invalidateQueries({
                queryKey: ['myMoim'],
              });
            },
            onError: error => {
              console.error(error?.response);
              Toast.show({
                type: 'error',
                text1:
                  error?.response?.data?.message ||
                  '모임 생성 중 오류가 발생했습니다.',
                visibilityTime: 2000,
                position: 'bottom',
              });
            },
          },
        );
      }
    } else {
      if (!category?.key) {
        Toast.show({
          type: 'error',
          text1: '카테고리를 선택해주세요.',
          visibilityTime: 2000,
          position: 'bottom',
        });
      }
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
    }
  });

  const handleConfirmRegion = () => {
    setIsPickedRegion(true);
    regionPickerModal.hide();
  };

  return (
    <ScreenContainer
      fixedBottomComponent={
        <CustomButton
          label={isEdit ? '모임 수정하기' : '모임 만들기'}
          textStyle="text-white font-bold text-base"
          onPress={handleOnSubmit}
          isLoading={createIsLoading || updateIsLoading}
        />
      }>
      {isEdit ? (
        <View className="pt-1" />
      ) : (
        <View className="flex flex-col gap-y-2 pt-7">
          <Typography fontWeight={'BOLD'} className="text-xl mt-10">
            모임 만들기
          </Typography>
          <Typography fontWeight={'MEDIUM'} className="text-sm text-dark-800">
            새로운 모임을 만들어 다양한 사람들과 즐거움을 공유해보세요.
          </Typography>
          {/* <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
            <Typography fontWeight={'BOLD'} className='text-sm text-main underline pt-5'>
              AI로 3초만에 모임 만들어 보기 {'>>'}
            </Typography>
          </TouchableOpacity> */}
        </View>
      )}

      <View className="flex flex-col">
        <Typography
          fontWeight={'MEDIUM'}
          className="text-sm text-gray-500 mb-2">
          모임 이름
        </Typography>
        <InputField
          touched
          placeholder="모임 이름 입력"
          error={data?.title ? '' : error.title}
          value={data?.title}
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
              label={isPickedRegion ? region : '활동 지역 선택'}
              onPress={regionPickerModal.show}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={regionPickerModal.show}>
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

      <View className="flex flex-col">
        <Typography
          fontWeight={'MEDIUM'}
          className="text-sm text-gray-500 mb-2">
          모임 소개
        </Typography>
        <View className="max-h-[800px]">
          <InputField
            touched
            placeholder="모임 소개 입력 (최대 255자입니다.)"
            multiline
            value={data?.introduction}
            onChangeText={text =>
              setData(prev => ({...prev, introduction: text}))
            }
            maxLength={255}
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
      <RegionBottomSheet
        isOpen={regionPickerModal.isVisible}
        onClose={regionPickerModal.hide}
        onOpen={regionPickerModal.show}
        setRegion={setRegion}
        handleConfirmRegion={handleConfirmRegion}
      />
      <View className={platform === 'android' ? 'mt-16' : 'mt-14'} />
    </ScreenContainer>
  );
};

export default MoimCreateScreen;
