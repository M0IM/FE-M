import {View, Pressable, Alert} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';

import Avatar from 'components/@common/Avatar/Avatar';
import {Typography} from 'components/@common/Typography/Typography';
import PopoverMenu from 'components/@common/Popover/PopoverMenu/PopoverMenu';

import usePopover from 'hooks/usePopover';
import usePost from 'hooks/queries/MoimBoard/usePost';
import {useGetMyProfile} from 'hooks/queries/MyScreen/useGetProfile';

import PostRecommentContainer from './PostRecommentContainer';
import {queryClient} from 'containers/TanstackQueryContainer';
import {formatKoreanDate} from 'utils';
import {COMMENT_STATUS} from 'types/enums';
import {TPostCommentDto} from 'types/dtos/post';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {
  MoimPostStackNavigationProp,
  MyStackNavigationProp,
} from '../../../../navigators/types';
import useThrottle from 'hooks/useThrottle';

interface PostCommentContainerProps {
  moimId?: number;
  postId?: number;
  commentData: TPostCommentDto;
  handleUpdateCommentId: (commentId: any) => void;
  targetCommentId?: number | null;
}

const PostCommentContainer = ({
  moimId,
  postId,
  commentData,
  handleUpdateCommentId,
  targetCommentId,
}: PostCommentContainerProps) => {
  const navigation =
    useNavigation<
      CompositeNavigationProp<
        MoimPostStackNavigationProp,
        MyStackNavigationProp
      >
    >();
  const {isPopover, handlePopover} = usePopover();
  const {data: userInfo} = useGetMyProfile();
  const {
    deleteMoimPostCommentMutation,
    reportMoimPostCommentMutation,
    blockMoimPostCommentMutation,
    likeMoimPostCommentMutation,
  } = usePost();
  const isDeleted = commentData?.commentStatus === COMMENT_STATUS.DELETED;
  const isBlocked =
    !isDeleted && commentData?.writer === null && commentData?.content === null;

  const handleMoimPostCommentLike = useThrottle((commentId: number) => {
    likeMoimPostCommentMutation.mutate(
      {
        commentId,
      },
      {
        onError: error => {
          console.error(error);
          Toast.show({
            type: 'error',
            text1:
              error?.response?.data.message ||
              '댓글 좋아요 중 에러가 발생했습니다.',
            visibilityTime: 2000,
            position: 'bottom',
          });
        },
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['postComments', moimId, postId],
          });
        },
      },
    );
  }, 2 * 1000);

  const handleBlockComment = useThrottle(() => {
    if (moimId && postId) {
      blockMoimPostCommentMutation.mutate(
        {
          moimId,
          postId,
          commentId: commentData.commentId,
        },
        {
          onSuccess: () => {
            Toast.show({
              type: 'success',
              text1: isBlocked
                ? '댓글 차단이 취소되었습니다.'
                : '댓글이 차단되었습니다.',
              visibilityTime: 2000,
              position: 'bottom',
            });
          },
          onError: error => {
            Toast.show({
              type: 'error',
              text1: error.message || '댓글 차단 중 에러가 발생했습니다.',
              visibilityTime: 2000,
              position: 'bottom',
            });
          },
          onSettled: () => {
            queryClient.invalidateQueries({
              queryKey: ['postComments', moimId, postId],
            });
          },
        },
      );
    }
  });

  const handleReportComment = useThrottle(() => {
    if (moimId && postId) {
      reportMoimPostCommentMutation.mutate(
        {
          moimId,
          postId,
          commentId: commentData.commentId,
        },
        {
          onSuccess: () => {
            Toast.show({
              type: 'success',
              text1: '댓글이 신고되었습니다.',
              visibilityTime: 2000,
              position: 'bottom',
            });
          },
          onError: error => {
            Toast.show({
              type: 'error',
              text1: error.message || '댓글 신고 중 에러가 발생했습니다.',
              visibilityTime: 2000,
              position: 'bottom',
            });
          },
          onSettled: () => {
            queryClient.invalidateQueries({
              queryKey: ['postComments', moimId, postId],
            });
          },
        },
      );
    }
  });

  const handleDeleteComment = useThrottle(() => {
    deleteMoimPostCommentMutation.mutate(
      {
        commentId: commentData.commentId,
      },
      {
        onSuccess: () => {
          Toast.show({
            type: 'success',
            text1: '댓글이 삭제되었습니다.',
            visibilityTime: 2000,
            position: 'bottom',
          });
        },
        onError: error => {
          Toast.show({
            type: 'error',
            text1: error.message || '댓글 삭제 중 에러가 발생했습니다.',
            visibilityTime: 2000,
            position: 'bottom',
          });
        },
        onSettled: () => {
          queryClient.invalidateQueries({
            queryKey: ['postComments', moimId, postId],
          });
        },
      },
    );
  });

  const PostMenuList = [
    {
      title: '댓글 신고',
      onPress: () => handleReportComment(),
    },
    {
      title: isBlocked ? '댓글 차단 취소' : '댓글 차단',
      onPress: () => handleBlockComment(),
    },
  ];

  const PostMyMenuList = [
    {
      title: '댓글 삭제',
      onPress: () => handleDeleteComment(),
    },
  ];

  return (
    <Pressable onPress={() => targetCommentId && handleUpdateCommentId(null)}>
      <View className="flex flex-col">
        <View
          className="flex flex-col border-b-[0.5px] border-gray-200 py-4 px-4"
          style={{
            backgroundColor:
              targetCommentId === commentData.commentId
                ? 'rgba(2, 186, 125, 0.069)'
                : 'white',
          }}>
          <View className="flex flex-row items-center">
            <Avatar
              onPress={() => {
                if (
                  commentData.writerId !== null &&
                  commentData.writer !== null
                ) {
                  navigation.navigate('MOIM_MEMBER_PROFILE', {
                    id: commentData.writerId as number,
                    userName: commentData.writer
                      ? commentData.writer
                      : '프로필',
                  });
                } else {
                  Alert.alert('접근할 수 없는 유저입니다.');
                }
              }}
              size="XS"
              uri={commentData?.profileImage}
            />
            <View className="flex flex-col justify-center ml-2">
              <Typography fontWeight="MEDIUM" className="text-dark-800 text-xs">
                {/* TODO: 탈퇴한 유저, 차단한 유저 분리해서 백엔드 요구사항 받은 후 처리 */}
                {commentData?.writer ?? '알 수 없는 사용자'}
              </Typography>
              <Typography fontWeight="MEDIUM" className="text-gray-300 text-xs">
                {formatKoreanDate(new Date(commentData?.createAt))}
              </Typography>
            </View>
            {!isDeleted && !isBlocked && (
              <View className="flex flex-row gap-x-2 ml-auto">
                <Pressable className="ml-auto" onPress={handlePopover}>
                  <PopoverMenu
                    menu={
                      userInfo?.result.userId === commentData?.writerId
                        ? PostMyMenuList
                        : PostMenuList
                    }
                    isPopover={isPopover}
                    onPress={handlePopover}>
                    <Ionicons
                      name="ellipsis-vertical"
                      size={15}
                      color={'#C9CCD1'}
                    />
                  </PopoverMenu>
                </Pressable>
                <Pressable
                  onPress={() => {
                    targetCommentId
                      ? handleUpdateCommentId(null)
                      : handleUpdateCommentId(commentData.commentId);
                  }}>
                  <Ionicons
                    name="chatbubble-outline"
                    size={15}
                    color={'#C9CCD1'}
                  />
                </Pressable>
                <Pressable
                  onPress={() =>
                    handleMoimPostCommentLike(commentData.commentId)
                  }>
                  {commentData.isLike ? (
                    <Ionicons name="heart" size={15} color={'#00F0A1'} />
                  ) : (
                    <Ionicons
                      name="heart-outline"
                      size={15}
                      color={'#C9CCD1'}
                    />
                  )}
                </Pressable>
              </View>
            )}
          </View>
          <Typography
            fontWeight="MEDIUM"
            className={
              isBlocked
                ? 'text-gray-500 text-sm mt-3 pl-2'
                : 'text-dark-800 text-sm mt-3 pl-2'
            }>
            {isBlocked ? '차단된 댓글입니다.' : commentData?.content}
            {isDeleted && '삭제된 댓글입니다.'}
          </Typography>
          <Typography
            fontWeight="MEDIUM"
            className="text-gray-300 text-sm ml-auto">
            좋아요 {commentData?.likeCount}
          </Typography>
        </View>
        {commentData?.commentResponseDTOList.map(item => (
          <View key={item.commentId}>
            <PostRecommentContainer
              moimId={moimId}
              postId={postId}
              recommentData={item}
            />
          </View>
        ))}
      </View>
    </Pressable>
  );
};

export default PostCommentContainer;
