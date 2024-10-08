import {Alert, SafeAreaView, View} from 'react-native';
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
import PostInfoSkeleton from './skeleton/PostInfoSkeleton';
import useMoimPostStore from 'stores/useMoimPostStore';
import useThrottle from 'hooks/useThrottle';

interface PostInfoProps {
  id: number;
  postId: number;
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
  const {setPostInfo} = useMoimPostStore();

  useEffect(() => {
    const refetch = async () => {
      if (isRefreshing) {
        await postRefetch();
      }
    };
    refetch();
  }, [isRefreshing]);

  useEffect(() => {
    if (data) {
      setPostInfo(data);
    }
  }, [data]);

  const handleMoimPostLike = useThrottle(() => {
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
  }, 2 * 1000);

  const handleReportMoimPost = useThrottle(() => {
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
  });

  const handleBlockMoimPost = useThrottle(() => {
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
  });

  const handleConfirmPost = useThrottle(() => {
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
            queryClient.invalidateQueries({
              queryKey: ['unReadUsers', id, postId],
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
  });

  const handleUpdateMoimPost = () => {
    if (id && postId) {
      navigation.navigate('MOIM_POST_EDIT', {id, postId});
    }
  };

  const handleDeleteMoimPost = useThrottle(() => {
    if (data?.moimPostId) {
      deleteMoimPostMutation.mutate(
        {
          postId: data?.moimPostId,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ['moim', 'post', 'ALL'],
            });
            queryClient.invalidateQueries({
              queryKey: ['moim', 'post', data?.postType],
            });
            navigation.goBack();
            Toast.show({
              type: 'success',
              text1: '게시글이 삭제되었습니다.',
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
  });

  const AnnouncementPostMenuList = [
    {
      title: '게시글 읽음 표시',
      onPress: () => {
        unReadUsers && unReadUsers.length <= 0
          ? Toast.show({
              type: 'error',
              text1: '읽을 사람이 없습니다.',
              visibilityTime: 2000,
              position: 'bottom',
            })
          : handleConfirmPost();
      },
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
      onPress: () => {
        unReadUsers && unReadUsers.length <= 0
          ? Toast.show({
              type: 'error',
              text1: '읽을 사람이 없습니다.',
              visibilityTime: 2000,
              position: 'bottom',
            })
          : handleConfirmPost();
      },
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
      <SafeAreaView>
        <PostInfoSkeleton />
      </SafeAreaView>
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
          data?.postType === 'ANNOUNCEMENT' &&
          unReadUsers?.some(user => user.userId === userInfo?.result.userId)
            ? AnnouncementPostMenuList
            : PostMenuList
        }
        PostMyMenuList={
          data?.postType === 'ANNOUNCEMENT' &&
          unReadUsers?.some(user => user.userId === userInfo?.result.userId)
            ? AnnouncementPostMyMenuList
            : PostMyMenuList
        }
        isWriter={userInfo?.result.nickname === data?.writer}
        onPress={() => {
          if (data?.writerId !== null && data?.writer !== null) {
            navigation.navigate('MOIM_MEMBER_PROFILE', {
              id: data?.writerId as number,
              userName: data?.writer ? data?.writer : '프로필',
            });
          } else {
            Alert.alert('탈퇴 또는 차단 된 유저입니다.');
          }
        }}
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
