import {View, TouchableOpacity, ActivityIndicator} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';

import {InputField} from 'components/@common/InputField/InputField';
import useCommentStore from 'stores/useCommentStore';
import {queryClient} from 'containers/TanstackQueryContainer';
import usePost from 'hooks/queries/MoimBoard/usePost';

interface CommentInputProps {
  id?: number;
  postId?: number;
}

const CommentInput = ({id, postId}: CommentInputProps) => {
  const {
    commentId,
    comment,
    recomment,
    setComment,
    setRecomment,
    handleUpdateCommentId,
  } = useCommentStore();
  const {postWriteCommentMutation, postWriteRecommentMutation} = usePost();

  const isCommentLoading = postWriteCommentMutation.isPending;
  const isRecommentLoading = postWriteRecommentMutation.isPending;

  const handleWriteComment = () => {
    if (id && postId && comment) {
      postWriteCommentMutation.mutate(
        {
          moimId: id,
          postId: postId,
          content: comment,
        },
        {
          onSuccess: () => {
            setComment('');
          },
          onError: error => {
            Toast.show({
              type: 'error',
              text1:
                error?.response?.data.message ||
                '댓글 작성 중 에러가 발생했습니다.',
              visibilityTime: 2000,
              position: 'bottom',
            });
          },
          onSettled: () => {
            queryClient.invalidateQueries({
              queryKey: ['postComments', id, postId],
            });
            queryClient.invalidateQueries({
              queryKey: ['moimPost', id, postId],
            });
          },
        },
      );
    }
  };

  const handleWriteRecomment = () => {
    if (id && postId && recomment && commentId) {
      postWriteRecommentMutation.mutate(
        {
          moimId: id,
          commentId: commentId,
          postId: postId,
          content: recomment,
        },
        {
          onSuccess: () => {
            setRecomment('');
            handleUpdateCommentId(null);
          },
          onError: error => {
            console.error(error);
            Toast.show({
              type: 'error',
              text1:
                error?.response?.data.message ||
                '대댓글 작성 중 에러가 발생했습니다.',
              visibilityTime: 2000,
              position: 'bottom',
            });
          },
          onSettled: () => {
            queryClient.invalidateQueries({
              queryKey: ['postComments', id, postId],
            });
          },
        },
      );
    }
  };

  return (
    <View className="items-center justify-between flex-row p-3">
      <View className="w-[90%]">
        <InputField
          value={commentId ? recomment : comment}
          onChangeText={text =>
            commentId ? setRecomment(text) : setComment(text)
          }
          className="flex-3"
          placeholder={
            commentId ? '대댓글을 입력해주세요.' : '댓글을 입력해주세요.'
          }
          touched
        />
      </View>
      <TouchableOpacity
        className="m-3"
        onPress={commentId ? handleWriteRecomment : handleWriteComment}
        disabled={isCommentLoading || isRecommentLoading}>
        {isCommentLoading || isRecommentLoading ? (
          <ActivityIndicator />
        ) : (
          <Ionicons
            name="send"
            size={25}
            color={'#00F0A1'}
            style={{transform: [{rotate: '-45deg'}]}}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CommentInput;
