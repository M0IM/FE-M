import {Image, Platform, Pressable, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useState} from 'react';
import Toast from 'react-native-toast-message';

import {CustomButton} from 'components/@common/CustomButton/CustomButton';
import {InputField} from 'components/@common/InputField/InputField';
import {Typography} from 'components/@common/Typography/Typography';
import CustomDropdown from 'components/@common/Dropdown/CustomDropdown';
import {ScreenContainer} from 'components/ScreenContainer';

import usePermission from 'hooks/usePermission';
import useCreateMoim from 'hooks/queries/MoimCreateScreen/useCreateMoim';
import useSingleImagePicker from 'hooks/useSingleImagePicker';
import useDropdown from 'hooks/useDropdown';

import {HomeStackNavigationProp} from 'navigators/types';
import {queryClient} from 'containers/TanstackQueryContainer';
import {CATEGORIES_LIST_DATA} from 'constants/screens/MoimSearchScreen/CategoryList';

interface MoimCreateScreenProps {
  navigation: HomeStackNavigationProp;
}

const MoimCreateScreen = ({navigation}: MoimCreateScreenProps) => {
  usePermission('PHOTO');

  // const {tags, addTagField, handleTagChange, removeTagField} = useTags();
  const {imageUri, uploadUri, handleChange, deleteImageUri} =
    useSingleImagePicker({});
  const {isPressed, category, handleCategory, handleSelectedCategory} =
    useDropdown();
  const createMoimMutation = useCreateMoim();
  const platform = Platform.OS;
  const [data, setData] = useState({
    title: '',
    location: '',
    introduceVideoKeyName: 'string',
    introduceVideoTitle: 'string',
    introduction: '',
  });
  const [error, setError] = useState({
    title: '',
    location: '',
  });

  const createIsLoading = createMoimMutation.isPending;

  const handleOnSubmit = () => {
    if (data?.title && data?.location && data?.introduction && category?.key) {
      createMoimMutation.mutate(
        {
          title: data?.title,
          location: data?.location,
          moimCategory: category?.key,
          introduceVideoKeyName: data?.introduceVideoKeyName,
          introduceVideoTitle: data?.introduceVideoTitle,
          introduction: data?.introduction,
          imageKeyName: uploadUri,
        },
        {
          onSuccess: () => {
            navigation.goBack();
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
          onSettled: () => {
            queryClient.invalidateQueries({
              queryKey: ['myMoim'],
            });
          },
        },
      );
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
      if (!data?.location)
        setError(prev => ({
          ...prev,
          location: '모임 활동 지역을 입력해주세요.',
        }));
      if (!data?.introduction)
        Toast.show({
          type: 'error',
          text1: '모임 소개를 작성해주세요.',
          visibilityTime: 2000,
          position: 'bottom',
        });
    }
  };

  return (
    <ScreenContainer
      fixedBottomComponent={
        <CustomButton
          label="모임 만들기"
          textStyle="text-white font-bold text-base"
          onPress={() => handleOnSubmit()}
          isLoading={createIsLoading}
        />
      }>
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
            <InputField
              touched
              placeholder="활동 지역 찾기"
              error={data?.location ? '' : error.location}
              value={data?.location}
              onChangeText={text =>
                setData(prev => ({...prev, location: text}))
              }
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
        menuList={CATEGORIES_LIST_DATA.map(item => item.label)}
        handleSelect={(label: any) => {
          const selected = CATEGORIES_LIST_DATA.find(
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

      <View className={platform === 'android' ? 'mt-16' : 'mt-6'} />
    </ScreenContainer>
  );
};

export default MoimCreateScreen;
