import {View} from 'react-native';
import React, {useEffect} from 'react';
import Toast from 'react-native-toast-message';
import {CompositeNavigationProp} from '@react-navigation/native';

import {Typography} from 'components/@common/Typography/Typography';
import usePost from 'hooks/queries/MoimBoard/usePost';
import {useGetMyProfile} from 'hooks/queries/MyScreen/useGetProfile';
import {queryClient} from 'containers/TanstackQueryContainer';
import {
  MoimPostStackNavigationProp,
  MyStackNavigationProp,
} from 'navigators/types';
import PostUserProfile from './PostUserProfile';
import {formatKoreanDate} from 'utils';
import PostInfoContainer from './PostInfoContainer';

interface PostInfoProps {
  id?: number;
  postId?: number;
  navigation: CompositeNavigationProp<
    MoimPostStackNavigationProp,
    MyStackNavigationProp
  >;
  isRefreshing: boolean;
}

const PostInfo = ({id, postId, navigation, isRefreshing}: PostInfoProps) => {
  const {
    useGetMoimPostDetail,
    likeMoimPostMutation,
    deleteMoimPostMutation,
    reportMoimPostMutation,
    blockMoimPostMutation,
    useGetUnReadUser,
    confirmAnnouncementPostMutation,
  } = usePost();
  const {
    data,
    isPending,
    isError,
    refetch: postRefetch,
  } = useGetMoimPostDetail(id, postId);
  const {data: unReadUsers} = useGetUnReadUser(id, postId);
  const {data: userInfo} = useGetMyProfile();

  useEffect(() => {
    const refetch = async () => {
      if (isRefreshing) {
        await postRefetch();
      }
    };
    refetch();
  }, [isRefreshing]);

  const handleMoimPostLike = () => {
    if (postId) {
      likeMoimPostMutation.mutate(
        {
          postId: postId,
        },
        {
          onError: error => {
            console.error(error);
            Toast.show({
              type: 'error',
              text1:
                error?.response?.data.message ||
                '게시글 좋아요 중 에러가 발생했습니다.',
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
    }
  };

  const handleReportMoimPost = () => {
    if (id && postId) {
      reportMoimPostMutation.mutate(
        {
          moimId: id,
          postId,
        },
        {
          onSuccess: () => {
            Toast.show({
              type: 'success',
              text1: '게시글이 신고되었습니다.',
              visibilityTime: 2000,
              position: 'bottom',
            });
          },
          onError: error => {
            Toast.show({
              type: 'error',
              text1:
                error?.response?.data.message ||
                '게시글 신고 중 에러가 발생했습니다.',
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
    }
  };

  const handleBlockMoimPost = () => {
    if (id && postId) {
      blockMoimPostMutation.mutate(
        {
          moimId: id,
          postId,
        },
        {
          onSuccess: () => {
            navigation.goBack();
            Toast.show({
              type: 'success',
              text1: '게시글이 차단되었습니다.',
              visibilityTime: 2000,
              position: 'bottom',
            });
          },
          onError: error => {
            Toast.show({
              type: 'error',
              text1:
                error?.response?.data.message ||
                '게시글 차단 중 에러가 발생했습니다.',
              visibilityTime: 2000,
              position: 'bottom',
            });
          },
          // TODO: 반환 데이터 변경되면 적용
          // onSettled: () => {
          //   queryClient.invalidateQueries({
          //     queryKey: ['moim', 'post', data.postType, id],
          //   });
          // }
        },
      );
    }
  };

  const handleConfirmPost = () => {
    if (postId) {
      confirmAnnouncementPostMutation.mutate(
        {
          postId,
        },
        {
          onSuccess: () => {
            Toast.show({
              type: 'success',
              text1: '게시글이 읽음 처리 되었습니다.',
              visibilityTime: 2000,
              position: 'bottom',
            });
          },
          onError: error => {
            Toast.show({
              type: 'error',
              text1:
                error?.response?.data.message ||
                '게시글 읽음 처리 중 에러가 발생했습니다.',
              visibilityTime: 2000,
              position: 'bottom',
            });
          },
        },
      );
    }
  };

  const handleUpdateMoimPost = () => {
    if (id && postId) {
      navigation.navigate('MOIM_POST_EDIT', {id, postId});
    }
  };

  const handleDeleteMoimPost = () => {
    if (data?.moimPostId) {
      deleteMoimPostMutation.mutate(
        {
          postId: data?.moimPostId,
        },
        {
          onSuccess: () => {
            navigation.goBack();
            Toast.show({
              type: 'success',
              text1: '게시글이 삭제되었습니다.',
              visibilityTime: 2000,
              position: 'bottom',
            });
          },
          onError: error => {
            Toast.show({
              type: 'error',
              text1:
                error?.response?.data.message ||
                '게시글 삭제 중 에러가 발생했습니다.',
              visibilityTime: 2000,
              position: 'bottom',
            });
          },
          // TODO: 반환 데이터 변경되면 적용
          // onSettled: () => {
          //   queryClient.invalidateQueries({
          //     queryKey: ['moim', 'post', data.postType, id],
          //   });
          // }
        },
      );
    }
  };

  const AnnouncementPostMenuList = [
    {
      title: '게시글 읽음 표시',
      onPress: () => handleConfirmPost(),
    },
    {
      title: '게시글 신고',
      onPress: () => handleReportMoimPost(),
    },
    {
      title: '게시글 차단',
      onPress: () => handleBlockMoimPost(),
    },
  ];

  const PostMenuList = [
    {
      title: '게시글 신고',
      onPress: () => handleReportMoimPost(),
    },
    {
      title: '게시글 차단',
      onPress: () => handleBlockMoimPost(),
    },
  ];

  const PostMyMenuList = [
    {
      title: '게시글 수정',
      onPress: () => handleUpdateMoimPost(),
    },
    {
      title: '게시글 삭제',
      onPress: () => handleDeleteMoimPost(),
    },
  ];

  const AnnouncementPostMyMenuList = [
    {
      title: '게시글 읽음 표시',
      onPress: () => handleConfirmPost(),
    },
    {
      title: '게시글 수정',
      onPress: () => handleUpdateMoimPost(),
    },
    {
      title: '게시글 삭제',
      onPress: () => handleDeleteMoimPost(),
    },
  ];

  if (isPending) {
    return (
      <Typography fontWeight="BOLD" className="">
        로딩 중
      </Typography>
    );
  }

  if (isError) {
    return (
      <Typography fontWeight="BOLD" className="">
        에러입니다.
      </Typography>
    );
  }

  return (
    <View className="pb-0 pt-4 px-4">
      <PostUserProfile
        writer={data?.writer}
        updatedAt={data?.updateAt && formatKoreanDate(new Date(data?.updateAt))}
        profileImage={data?.profileImage}
        PostMenuList={
          data?.postType === 'ANNOUNCEMENT'
            ? AnnouncementPostMenuList
            : PostMenuList
        }
        PostMyMenuList={
          data?.postType === 'ANNOUNCEMENT'
            ? AnnouncementPostMyMenuList
            : PostMyMenuList
        }
        isWriter={userInfo?.result.nickname === data?.writer}
        onPress={() =>
          navigation.navigate('MOIM_MEMBER_PROFILE', {
            id: data?.writerId as number,
            userName: data?.writer ? data?.writer : '프로필',
          })
        }
      />
      <PostInfoContainer
        postImages={data?.imageKeyNames}
        title={data?.title}
        content={data?.content}
        commentCount={data?.commentCount}
        likeCount={data?.likeCount}
        isLike={data?.isLike}
        unReadUsers={unReadUsers}
        handleMoimPostLike={handleMoimPostLike}
      />
    </View>
  );
};

export default PostInfo;
