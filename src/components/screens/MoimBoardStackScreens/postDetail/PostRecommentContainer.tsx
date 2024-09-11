import {View, Pressable, Alert} from 'react-native';
import Toast from 'react-native-toast-message';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Avatar from 'components/@common/Avatar/Avatar';
import PopoverMenu from 'components/@common/Popover/PopoverMenu/PopoverMenu';
import {Typography} from 'components/@common/Typography/Typography';

import usePost from 'hooks/queries/MoimBoard/usePost';
import {useGetMyProfile} from 'hooks/queries/MyScreen/useGetProfile';
import usePopover from 'hooks/usePopover';

import {TPostRecommentDto} from 'types/dtos/post';
import {COMMENT_STATUS} from 'types/enums';
import {queryClient} from 'containers/TanstackQueryContainer';
import {formatKoreanDate} from 'utils';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {
  MoimPostStackNavigationProp,
  MyStackNavigationProp,
} from 'navigators/types';

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
  const isDeleted = recommentData?.commentStatus === COMMENT_STATUS.DELETED;
  const isBlocked =
    !isDeleted &&
    recommentData?.writer === null &&
    recommentData?.content === null;

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
            Toast.show({
              type: 'success',
              text1: isBlocked
                ? '대댓글 차단이 취소되었습니다.'
                : '대댓글이 차단되었습니다.',
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
      title: '대댓글 신고',
      onPress: () => handleReportRecomment(),
    },
    {
      title: isBlocked ? '대댓글 차단 취소' : '대댓글 차단',
      onPress: () => handleBlockRecomment(),
    },
  ];

  const PostMyMenuList = [
    {
      title: '대댓글 삭제',
      onPress: () => handleDeleteRecomment(),
    },
  ];

  return (
    <View className="flex flex-col border-b-[0.5px] border-gray-200 bg-gray-50 py-4 px-4 ml-3">
      <View className="flex flex-row items-center">
        <Avatar
          size="XS"
          uri={recommentData.profileImage}
          onPress={() => {
            if (recommentData.writer !== null) {
              navigation.navigate('MOIM_MEMBER_PROFILE', {
                id: recommentData.writerId as number,
                userName: recommentData.writer
                  ? recommentData.writer
                  : '프로필',
              });
            } else {
              Alert.alert('접근할 수 없는 유저입니다.');
            }
          }}
        />
        <View className="flex flex-col justify-center ml-2">
          <Typography fontWeight="MEDIUM" className="text-dark-800 text-xs">
            {recommentData.writer ?? '알 수 없는 사용자'}
          </Typography>
          <Typography fontWeight="MEDIUM" className="text-gray-300 text-xs">
            {formatKoreanDate(new Date(recommentData?.createAt))}
          </Typography>
        </View>
        {!isBlocked && (
          <View className="flex flex-row gap-x-2 ml-auto">
            <Pressable onPress={handlePopover}>
              <PopoverMenu
                menu={
                  userInfo?.result.nickname === recommentData?.writer
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
        )}
      </View>
      <Typography
        fontWeight="MEDIUM"
        className={
          isBlocked
            ? 'text-gray-500 text-sm mt-3 pl-2'
            : 'text-dark-800 text-sm mt-3 pl-2'
        }>
        {isBlocked ? '차단된 댓글입니다.' : recommentData.content}
      </Typography>
      <Typography fontWeight="MEDIUM" className="text-gray-300 text-sm ml-auto">
        좋아요 {recommentData.likeCount}
      </Typography>
    </View>
  );
};

export default PostRecommentContainer;
