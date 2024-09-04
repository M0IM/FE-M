import {useEffect, useState} from 'react';
import Toast from 'react-native-toast-message';
import {
  FlatList,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {InputField} from 'components/@common/InputField/InputField';
import {Typography} from 'components/@common/Typography/Typography';
import {CustomButton} from 'components/@common/CustomButton/CustomButton';
import CustomDropdown from 'components/@common/Dropdown/CustomDropdown';
import ReadersBottomSheet from 'components/screens/MoimBoardStackScreens/ReadersBottomSheet';
import {ScreenContainer} from 'components/ScreenContainer';

import useDropdown from 'hooks/useDropdown';
import usePost from 'hooks/queries/MoimBoard/usePost';
import useSingleImagePicker from 'hooks/useSingleImagePicker.ts';
import usePermission from 'hooks/usePermission.ts';
import useGetMoimSpaceInfo from 'hooks/queries/MoimSpace/useGetMoimSpaceInfo.ts';

import {
  POST_WRITE_LIST,
  POST_WRITE_MEMBER_LIST,
} from 'constants/screens/MoimBoardStackScreens/PostList';
import {
  MoimPostStackNavigationProp,
  MoimPostStackRouteProp,
} from 'navigators/types';
import {queryClient} from '../../containers/TanstackQueryContainer.tsx';
import useMoimPostStore from 'stores/useMoimPostStore.ts';

interface MoimPostWriteScreenProps {
  route: MoimPostStackRouteProp;
  navigation: MoimPostStackNavigationProp;
}

const MoimPostWriteScreen = ({route, navigation}: MoimPostWriteScreenProps) => {
  usePermission('PHOTO');
  const {postInfo} = useMoimPostStore();
  const isEdit = !!postInfo;
  const moimId = route?.params?.id;
  const postType = route?.params?.postType;
  const {isPressed, category, handleCategory, handleSelectedCategory} =
    useDropdown();
  // const [readers, setReaders] = useState('전체 대상');
  const [data, setData] = useState({
    title: postInfo?.title || '',
    content: postInfo?.content || '',
    imageKeyNames: postInfo?.imageKeyNames || [],
  });
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const {
    moimPostMutation,
    createAnnouncementPostMutation,
    updateMoimPostMutation,
  } = usePost();
  const {imageUri, uploadUri, handleChange, deleteImageUri} =
    useSingleImagePicker({initialImage: postInfo?.imageKeyNames[0] || ''});
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const {data: moimInfo} = useGetMoimSpaceInfo(moimId);
  const isMember = moimInfo?.myMoimRole === 'MEMBER';

  const handleToggleSelect = (id: number) => {
    setSelectedIds(prevSelectedIds =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter(selectedId => selectedId !== id)
        : [...prevSelectedIds, id],
    );
  };

  const announcementIsLoading = createAnnouncementPostMutation.isPending;
  const postIsLoading = moimPostMutation.isPending;

  const handleOnSubmit = () => {
    if (moimId && category && data.title) {
      if (isEdit) {
        updateMoimPostMutation.mutate(
          {
            moimId: moimId,
            postId: postInfo?.moimPostId,
            title: data.title,
            content: data.content,
            imageKeyNames: uploadUri
              ? [uploadUri]
              : [imageUri?.split('.com/')[1]],
          },
          {
            onSuccess: () => {
              Toast.show({
                type: 'success',
                text1: '게시글이 수정되었습니다.',
                visibilityTime: 2000,
                position: 'bottom',
              });
              navigation.navigate('MOIM_POST_DETAIL', {
                id: moimId,
                postId: postInfo?.moimPostId,
              });
              queryClient.invalidateQueries({
                queryKey: ['moimPost', moimId, postInfo?.moimPostId],
              });
            },
            onError: error => {
              console.log(error.response);
              Toast.show({
                type: 'error',
                text1: error.message || '게시글 수정 중 에러가 발생했습니다.',
                visibilityTime: 2000,
                position: 'bottom',
              });
            },
          },
        );
      } else {
        if (category.key === 'ANNOUNCEMENT') {
          createAnnouncementPostMutation.mutate(
            {
              moimId: moimId,
              title: data.title,
              content: data.content,
              imageKeyNames: [uploadUri],
              userIds: selectedIds,
            },
            {
              onSuccess: () => {
                navigation.navigate('MOIM_BOARD_HOME', {id: moimId});
                queryClient.invalidateQueries({
                  queryKey: ['moim', 'post', 'ALL', moimId],
                });
              },
              onError: error => {
                Toast.show({
                  type: 'error',
                  text1: error.response?.data.message,
                  visibilityTime: 2000,
                  position: 'bottom',
                });
              },
            },
          );
        } else {
          moimPostMutation.mutate(
            {
              moimId: moimId,
              title: data.title,
              content: data.content,
              imageKeyNames: [uploadUri],
              postType: category?.key,
            },
            {
              onSuccess: () => {
                navigation.navigate('MOIM_BOARD_HOME', {id: moimId});
                queryClient.invalidateQueries({
                  queryKey: ['moim', 'post', 'ALL', moimId],
                });
              },
              onError: error => {
                Toast.show({
                  type: 'error',
                  text1: error.response?.data.message,
                  visibilityTime: 2000,
                  position: 'bottom',
                });
              },
            },
          );
        }
      }
    } else {
      Toast.show({
        type: 'error',
        text1: '제목 및 카테고리를 입력해주세요.',
        visibilityTime: 2000,
        position: 'bottom',
      });
    }
  };

  useEffect(() => {
    const selected = POST_WRITE_LIST.find(item => item.key === postType);
    handleSelectedCategory(selected);
  }, [postType]);

  useEffect(() => {
    if (postInfo) {
      const selected = POST_WRITE_LIST.find(
        item => item.key === postInfo?.postType,
      );
      handleSelectedCategory(selected);
    }
  }, [postInfo]);

  return (
    <ScreenContainer>
      <View className="mt-1" />
      {isEdit ? (
        <></>
      ) : (
        <CustomDropdown
          isPressed={isPressed}
          selectedMenu={category}
          placeholder="카테고리 선택"
          menuList={
            isMember
              ? POST_WRITE_MEMBER_LIST.map(item => item.label)
              : POST_WRITE_LIST.map(item => item.label)
          }
          handleSelect={(label: any) => {
            const selected = POST_WRITE_LIST.find(item => item.label === label);
            handleSelectedCategory(selected);
          }}
          onPress={handleCategory}
          height={isMember ? 130 : 160}
        />
      )}
      {category && category?.label === '공지사항' && (
        <TouchableOpacity
          onPress={open}
          activeOpacity={0.8}
          className="flex flex-row border-0.5 border-gray-100 rounded-xl bg-gray-100 p-4">
          <Typography fontWeight="MEDIUM" className="text-sm text-gray-400">
            {selectedIds.length > 0
              ? `${selectedIds.length}명`
              : '읽을 사람 선택'}
          </Typography>
          <Ionicons
            name="chevron-up-outline"
            color={'#535353'}
            size={15}
            style={{marginLeft: 'auto'}}
          />
        </TouchableOpacity>
      )}
      <InputField
        touched
        placeholder="제목을 입력해주세요."
        value={data.title}
        onChangeText={text => setData(prev => ({...prev, title: text}))}
      />
      <TextInput
        placeholder="내용을 입력해주세요."
        className="p-2 min-h-[300] max-h-[800] text-dark-800"
        multiline
        placeholderTextColor={'#72787F'}
        textAlignVertical="top"
        value={data.content}
        onChangeText={text => setData(prev => ({...prev, content: text}))}
      />
      <View className="flex flex-col gap-y-3">
        <Typography fontWeight="LIGHT" className="text-gray-300 text-xs">
          [ 모임 게시판 이용 안내 ]
        </Typography>
        <Typography fontWeight="LIGHT" className="text-gray-300 text-xs">
          게시판 주제에 맞지 않는 글, 커뮤니티 이용자에게 불쾌감을 줄 수 있는
          내용, 차별 및 혐오표현, 유해 정보, 음란물, 불법 컨텐츠, 개인정보,
          욕설, 명예쉐손 등이 포함된 게시글은 신고 대상입니다.
        </Typography>
        <Typography fontWeight="LIGHT" className="text-gray-300 text-xs">
          해당 게시글이 5번 이상 신고 되면 더 이상 게시판에 노출되지 않거나,
          관리자 판단 하에 삭제 대상이 될 수 있습니다.
        </Typography>
      </View>
      {/* 이미지는 추후에 다시 연결 */}
      <View className="flex flex-row items-center">
        <TouchableOpacity activeOpacity={0.8} onPress={() => handleChange()}>
          <Ionicons
            name="camera"
            size={30}
            color={'#9EA4AA'}
            style={{padding: 10}}
          />
        </TouchableOpacity>
        {imageUri && (
          <FlatList
            horizontal
            data={[imageUri]}
            contentContainerStyle={{marginLeft: 20}}
            renderItem={({item}) => (
              <View className="w-[80] h-[100]">
                <Image
                  source={{uri: item}}
                  className="w-full h-full rounded-2xl"
                />
                <Pressable
                  onPress={() => deleteImageUri()}
                  className="flex flex-col items-center justify-center absolute bottom-0 w-[80] bg-white h-2/5 rounded-b-2xl border-[1px] border-gray-200">
                  <Ionicons name="trash" size={15} color={'#9EA4AA'} />
                </Pressable>
              </View>
            )}
            ItemSeparatorComponent={() => <View className="w-2" />}
          />
        )}
      </View>
      <CustomButton
        onPress={handleOnSubmit}
        label={isEdit ? '수정하기' : '게시하기'}
        textStyle="text-white text-base font-bold"
        className="mt-3"
        isLoading={announcementIsLoading || postIsLoading}
      />
      <ReadersBottomSheet
        moimId={moimId}
        isOpen={isOpen}
        onOpen={open}
        onClose={close}
        handleToggleSelect={handleToggleSelect}
        selectedIds={selectedIds}
      />
    </ScreenContainer>
  );
};

export default MoimPostWriteScreen;
