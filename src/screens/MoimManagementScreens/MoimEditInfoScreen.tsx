import { View, TouchableOpacity, Image, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { CustomButton } from 'components/@common/CustomButton/CustomButton';
import { ImageInput } from 'components/@common/ImageInput/ImageInput';
import { InputField } from 'components/@common/InputField/InputField';
import { Typography } from 'components/@common/Typography/Typography';
import { ScreenContainer } from 'components/ScreenContainer';
import CategoryDropdown from 'components/screens/MoimCreateScreen/CategoryDropdown';
import MoimTagContainer from 'components/screens/MoimCreateScreen/MoimTagContainer';
import useImagePicker from 'hooks/useImagePicker';
import usePermission from 'hooks/usePermission';
import useTags from 'hooks/useTags';
import { MoimManagementRouteProp } from 'navigators/types';
import { CATEGORY_MENU_LIST } from 'constants/screens/MoimSearchScreen/CategoryList';
import useMoimManagment from 'hooks/queries/MoimManagement/useMoimManagement';

const MoimInfoEditScreen = () => {
  const route = useRoute<MoimManagementRouteProp>();
  const {tags, addTagField, handleTagChange, removeTagField} = useTags();
  const { updateMoimInfoMutation } = useMoimManagment();
  const platform = Platform.OS;
  const moimdId = route.params.id;
  const [isPressed, setIsPressed] = useState(false);
  const [category, setCategory] = useState('');
  const [data, setData] = useState({
    title: '',
    description: ''
  });
  console.log('moimId: ', moimdId);

  const handleSelectedCategory = (selected: any) => {
    setCategory(selected);
  };

  const handleCategory = () => {
    setIsPressed(prev => !prev);
  };

  // TODO: 최대 이미지 개수 변경 필요
  const imagePicker = useImagePicker({
    initialImages: [],
  });
  usePermission('PHOTO');

  const hahndleOnSubmit = () => {
    console.log(category);
    const moimId = route?.params?.id;
    if (moimId && category) {
      updateMoimInfoMutation.mutate({
        moimId,
        title: data.title,
        address: '',
        category,
        description: data.description,
        imageKeyNames: []
      });
    }
  };

  return (
    <ScreenContainer
      fixedBottomComponent={
        <CustomButton
          label="모임 정보 수정"
          textStyle="text-white font-bold text-base"
          onPress={hahndleOnSubmit}
        />
      }>
      <View className="flex flex-col">
        <Typography
          fontWeight={'MEDIUM'}
          className="text-sm text-gray-500 mb-2 mt-4">
          모임 이름
        </Typography>
        <InputField touched placeholder="모임 이름 입력" value={data.title} onChangeText={(text) => setData(prev => ({...prev, title: text}))} />
      </View>
      <View className="flex flex-col">
        <Typography
          fontWeight={'MEDIUM'}
          className="text-sm text-gray-500 mb-2">
          활동 지역
        </Typography>
        <View className="flex flex-row w-full items-center justify-around gap-x-2">
          <View className="flex-1">
            <InputField touched placeholder="활동 지역 찾기" />
          </View>
          <TouchableOpacity activeOpacity={0.8}>
            <Ionicons name="search" size={30} color={'#C9CCD1'} />
          </TouchableOpacity>
        </View>
      </View>

      {/* 카테고리 드롭다운 */}
      <CategoryDropdown 
        onPress={handleCategory} 
        isPressed={isPressed} 
        menuList={CATEGORY_MENU_LIST}
        handleSelect={handleSelectedCategory}
        selectedMenu={category}
        placeholder='카테고리'
      />

      {/* 카메라 연결 */}
      <View className="flex flex-col">
        <Typography
          fontWeight={'MEDIUM'}
          className="text-sm text-gray-500 mb-2">
          대표 이미지
        </Typography>
        <ImageInput onChange={imagePicker.handleChange} />
        {/* TODO: PreviewImage Component 분리 (실제 DB 연결이후) */}
        <View>
          {imagePicker.imageUris.map(({uri}, index) => {
            return (
              <Image
                key={index}
                source={{
                  uri: `http:s3address/${uri}`,
                }}
              />
            );
          })}
        </View>
      </View>

      <View className="flex flex-col">
        <Typography
          fontWeight={'MEDIUM'}
          className="text-sm text-gray-500 mb-2">
          모임 소개
        </Typography>
        <View className="max-h-[800px]">
          <InputField touched placeholder="모임 소개 입력" multiline value={data.description} onChangeText={(text) => setData((prev) => ({...prev, description: text}))} />
        </View>
      </View>

      {/* 태그 컴포넌트 */}
      <MoimTagContainer
        tags={tags}
        addTagField={addTagField}
        removeTagField={removeTagField}
        handleTagChange={handleTagChange}
      />

      {/* 모임 소개 영상 게시 */}
      {/* <MoimIntroVideo /> */}

      <View className={platform === 'android' ? 'mt-16' : 'mt-6'} />
    </ScreenContainer>
  );
};

export default MoimInfoEditScreen;