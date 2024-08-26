import {TouchableOpacity, View} from 'react-native';
import {InputField} from '../../../components/@common/InputField/InputField.tsx';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useState} from 'react';
import Toast from 'react-native-toast-message';
import {queryClient} from '../../../containers/TanstackQueryContainer.tsx';
import usePost from '../../../hooks/queries/MoimBoard/usePost.ts';

interface ICommentInputProps {
  id: number;
  postId: number;
  commentId: number;
  handleUpdateCommentId: (commentId: number) => void;
}

export function CommentInput({
  id,
  postId,
  commentId,
  handleUpdateCommentId,
}: ICommentInputProps) {
  const [comment, setComment] = useState('');
  const [recomment, setRecomment] = useState('');

  const {postWriteCommentMutation, postWriteRecommentMutation} = usePost();
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
          value={comment}
          onChangeText={text => setComment(text)}
          className="flex-3"
          placeholder={
            commentId ? '대댓글을 입력해주세요.' : '댓글을 입력해주세요.'
          }
          touched
        />
      </View>
      <TouchableOpacity
        className="m-3"
        onPress={commentId ? handleWriteRecomment : handleWriteComment}>
        <Ionicons
          name="send"
          size={25}
          color={'#00F0A1'}
          style={{transform: [{rotate: '-45deg'}]}}
        />
      </TouchableOpacity>
    </View>
  );
}
