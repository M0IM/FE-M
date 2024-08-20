import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  Pressable,
} from 'react-native';
import {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';

import {InputField} from 'components/@common/InputField/InputField';
import {Typography} from 'components/@common/Typography/Typography';
import {ScreenContainer} from 'components/ScreenContainer';
import {CustomButton} from 'components/@common/CustomButton/CustomButton';

import {
  MoimPostStackNavigationProp,
  MoimPostStackRouteProp,
} from 'navigators/types';

import usePost from 'hooks/queries/MoimBoard/usePost';
import {queryClient} from 'containers/TanstackQueryContainer';
import useSingleImagePicker from 'hooks/useSingleImagePicker';

interface MoimPostEditScreenProps {
  route: MoimPostStackRouteProp;
  navigation: MoimPostStackNavigationProp;
}

const MoimPostEditScreen = ({route, navigation}: MoimPostEditScreenProps) => {
  const {id, postId} = route.params;
  const {useGetMoimPostDetail, updateMoimPostMutation} = usePost();
  const {data: postData} = useGetMoimPostDetail(id, postId);
  const [data, setData] = useState({
    title: postData?.title,
    content: postData?.content,
  });
  const initialImage = postData?.imageKeyNames[0];
  const {imageUri, uploadUri, handleChange, deleteImageUri} =
    useSingleImagePicker({initialImage});

  const handleSelectImages = async () => {
    handleChange();
  };

  const handleOnSubmit = () => {
    const initialImages = postData?.imageKeyNames.map(
      item => item.split('com/')[1],
    );
    console.log(initialImages);
    if (id && postId && data.title && data.content) {
      updateMoimPostMutation.mutate(
        {
          moimId: id,
          postId,
          title: data.title,
          content: data.content,
          imageKeyNames: uploadUri ? [uploadUri] : initialImages,
        },
        {
          onSuccess: () => {
            Toast.show({
              type: 'success',
              text1: '게시글이 수정되었습니다.',
              visibilityTime: 2000,
              position: 'bottom',
            });
            navigation.navigate('MOIM_POST_DETAIL', {id, postId});
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
          onSettled: () => {
            queryClient.invalidateQueries({
              queryKey: ['moimPost', id, postId],
            });
          },
        },
      );
    } else {
      Toast.show({
        type: 'error',
        text1: '게시글 제목을 입력해주세요.',
        visibilityTime: 2000,
        position: 'bottom',
      });
    }
  };

  return (
    <ScreenContainer>
      <View className="mt-1" />
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
      <View className="flex flex-row items-center">
        <TouchableOpacity activeOpacity={0.8} onPress={handleSelectImages}>
          <Ionicons
            name="camera"
            size={30}
            color={'#9EA4AA'}
            style={{padding: 10}}
          />
        </TouchableOpacity>
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
      </View>
      <CustomButton
        onPress={handleOnSubmit}
        label="수정하기"
        textStyle="text-white text-base font-bold"
        className="mt-3"
      />
    </ScreenContainer>
  );
};

export default MoimPostEditScreen;
