import BottomSheet from '../@common/BottomSheet/BottomSheet.tsx';
import {
  FlatList,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import usePost from '../../hooks/queries/MoimBoard/usePost.ts';
import {useState} from 'react';
import PostCommentContainer from '../screens/MoimBoardStackScreens/postDetail/PostCommentContainer.tsx';

type TCommentBottomSheetProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  moimId: number;
  postId: number;
};

export default function CommentBottomSheet({
  isOpen,
  onOpen,
  onClose,
  moimId,
  postId,
}: TCommentBottomSheetProps) {
  const {useGetInfiniteMoimPostComment} = usePost();
  const {
    data: comments,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
  } = useGetInfiniteMoimPostComment(moimId, postId);
  const [comment, setComment] = useState('');
  const handleWriteComment = () => {};
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  return (
    <BottomSheet
      isBottomSheetOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      height={550}>
      <KeyboardAvoidingView className="w-full flex-col mb-20 ">
        <FlatList
          data={comments?.pages.flatMap(data => data.moimPreviewList)}
          keyExtractor={item => item.commentId}
          renderItem={({item}) => (
            <PostCommentContainer
              moimId={moimId}
              postId={postId}
              // targetCommentId={commentId}
              // handleUpdateCommentId={handleUpdateCommentId}
              commentData={item}
            />
          )}
          onStartReached={handleEndReached}
          onStartReachedThreshold={0.5}
          contentContainerStyle={{}}
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
        />
      </KeyboardAvoidingView>
      <View className="absolute bottom-10 flex-row items-center w-full p-4">
        <TextInput
          value={comment}
          onChangeText={text => setComment(text)}
          placeholder="메시지를 입력해주세요."
          className="flex-1 b-0 h-10 mr-4 border-gray-100 bg-gray-200 border-0.5 p-3 color-gray-600 rounded-3xl"
          onSubmitEditing={handleWriteComment} // Send message on Enter key press
        />
        <TouchableOpacity onPress={handleWriteComment} activeOpacity={0.5}>
          <IonIcons name={'send'} size={24} color={'#00F0A1'} />
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
}
