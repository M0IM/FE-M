import {View, Pressable, TouchableWithoutFeedback} from 'react-native';
import Toast from 'react-native-toast-message';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Avatar from 'components/@common/Avatar/Avatar';
import PopoverMenu from 'components/@common/Popover/PopoverMenu/PopoverMenu';
import {Typography} from 'components/@common/Typography/Typography';
import usePost from 'hooks/queries/MoimBoard/usePost';
import {useGetMyProfile} from 'hooks/queries/MyScreen/useGetProfile';
import usePopover from 'hooks/usePopover';
import {TPostRecommentDto} from 'types/dtos/post';
import {queryClient} from 'containers/TanstackQueryContainer';

interface PostRecommentContainerProps {
  moimId?: number;
  postId?: number;
  recommentData: TPostRecommentDto;
}

const PostRecommentContainer = ({
  moimId,
  postId,
  recommentData,
}: PostRecommentContainerProps) => {
  const {isPopover, handlePopover} = usePopover();
  const {data: userInfo} = useGetMyProfile();
  const {
    deleteMoimPostCommentMutation,
    reportMoimPostCommentMutation,
    blockMoimPostCommentMutation,
    likeMoimPostCommentMutation,
  } = usePost();

  const handleMoimPostCommentLike = (commentId: number) => {
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
        onSettled: () => {
          queryClient.invalidateQueries({
            queryKey: ['postComments', moimId, postId],
          });
        },
      },
    );
  };

  const handleBlockRecomment = () => {
    if (moimId && postId) {
      blockMoimPostCommentMutation.mutate(
        {
          moimId,
          postId,
          commentId: recommentData.commentId,
        },
        {
          onSuccess: () => {
            handlePopover();
            Toast.show({
              type: 'success',
              text1: '댓글이 차단되었습니다.',
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
  };

  const handleReportRecomment = () => {
    if (moimId && postId) {
      reportMoimPostCommentMutation.mutate(
        {
          moimId,
          postId,
          commentId: recommentData.commentId,
        },
        {
          onSuccess: () => {
            handlePopover();
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
              text1: error.message || '대댓글 신고 중 에러가 발생했습니다.',
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
  };

  const handleDeleteRecomment = () => {
    deleteMoimPostCommentMutation.mutate(
      {
        commentId: recommentData.commentId,
      },
      {
        onSuccess: () => {
          handlePopover();
          Toast.show({
            type: 'success',
            text1: '대댓글이 삭제되었습니다.',
            visibilityTime: 2000,
            position: 'bottom',
          });
        },
        onError: error => {
          Toast.show({
            type: 'error',
            text1: error.message || '대댓글 삭제 중 에러가 발생했습니다.',
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
  };

  const PostMenuList = [
    {
      title: '신고하기',
      onPress: () => handleReportRecomment(),
    },
    {
      title: '차단하기',
      onPress: () => handleBlockRecomment(),
    },
  ];

  const PostMyMenuList = [
    {
      title: '삭제하기',
      onPress: () => handleDeleteRecomment(),
    },
  ];

  // 삭제된 대댓글
  if (recommentData.content === null) {
    return <></>;
  }

  // 차단된 대댓글
  if (recommentData.writer === null) {
    return <></>;
  }

  return (
    <TouchableWithoutFeedback onPress={() => isPopover && handlePopover()}>
      <View className="flex flex-col border-b-[0.5px] border-gray-200 bg-gray-50 py-4 pl-5">
        <View className="flex flex-row items-center">
          <Avatar size="XS" uri={recommentData.profileImage} />
          <View className="flex flex-col justify-center ml-2">
            <Typography fontWeight="MEDIUM" className="text-dark-800 text-xs">
              {recommentData.writer}
            </Typography>
            <Typography fontWeight="MEDIUM" className="text-gray-300 text-xs">
              {recommentData.createAt}
            </Typography>
          </View>
          <View className="flex flex-row gap-x-2 ml-auto">
            <Pressable onPress={handlePopover}>
              <Ionicons name="ellipsis-vertical" size={15} color={'#C9CCD1'} />
            </Pressable>
            <Pressable
              onPress={() =>
                handleMoimPostCommentLike(recommentData.commentId)
              }>
              {recommentData.isLike ? (
                <Ionicons name="heart" size={15} color={'#00F0A1'} />
              ) : (
                <Ionicons name="heart-outline" size={15} color={'#C9CCD1'} />
              )}
            </Pressable>
          </View>
        </View>
        <Typography
          fontWeight="MEDIUM"
          className="text-dark-800 text-sm mt-3 pl-1">
          {recommentData.content}
        </Typography>
        <Typography
          fontWeight="MEDIUM"
          className="text-gray-300 text-sm ml-auto">
          좋아요 {recommentData.likeCount}
        </Typography>
        <View className="absolute top-[-100] right-7 z-[10000]">
          <PopoverMenu
            menu={
              userInfo?.result.nickname === recommentData.writer
                ? PostMyMenuList
                : PostMenuList
            }
            isPopover={isPopover}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PostRecommentContainer;
