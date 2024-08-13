import {Platform, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {CustomButton} from 'components/@common/CustomButton/CustomButton';
import {InputField} from 'components/@common/InputField/InputField';
import {Typography} from 'components/@common/Typography/Typography';
import {ScreenContainer} from 'components/ScreenContainer';
import CategoryDropdown from 'components/screens/MoimCreateScreen/CategoryDropdown';
import MoimIntroVideo from 'components/screens/MoimCreateScreen/MoimIntroVideo';
import MoimTagContainer from 'components/screens/MoimCreateScreen/MoimTagContainer';
import useTags from 'hooks/useTags';
import {ImageInput} from '../../components/@common/ImageInput/ImageInput.tsx';
import usePermission from '../../hooks/usePermission.ts';

const MoimCreateScreen = () => {
  const {tags, addTagField, handleTagChange, removeTagField} = useTags();
  const platform = Platform.OS;
  usePermission('PHOTO');

  return (
    <ScreenContainer
      fixedBottomComponent={
        <CustomButton
          label="모임 만들기"
          textStyle="text-white font-bold text-base"
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
        <InputField touched placeholder="모임 이름 입력" />
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
      <CategoryDropdown />

      {/* 카메라 연결 */}
      <View className="flex flex-col">
        <Typography
          fontWeight={'MEDIUM'}
          className="text-sm text-gray-500 mb-2">
          대표 이미지
        </Typography>
        <ImageInput onChange={() => {}} />
      </View>

      <View className="flex flex-col">
        <Typography
          fontWeight={'MEDIUM'}
          className="text-sm text-gray-500 mb-2">
          모임 소개
        </Typography>
        <View className="max-h-[800px]">
          <InputField touched placeholder="모임 소개 입력" multiline />
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
      <MoimIntroVideo />

      <View className={platform === 'android' ? 'mt-16' : 'mt-6'} />
    </ScreenContainer>
  );
};

export default MoimCreateScreen;
