import { FlatList, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useState } from 'react';
import Toast from 'react-native-toast-message';
import PopoverMenu from 'components/@common/Popover/PopoverMenu/PopoverMenu';
import usePopover from 'hooks/usePopover';
import { InputField } from 'components/@common/InputField/InputField';
import PostUserProfile from 'components/screens/MoimBoardStackScreens/postDetail/PostUserProfile';
import PostInfoContainer from 'components/screens/MoimBoardStackScreens/postDetail/PostInfoContainer';
import PostCommentContainer from 'components/screens/MoimBoardStackScreens/postDetail/PostCommentContainer';
import { MoimPostStackNavigationProp, MoimPostStackRouteProp } from 'navigators/types';
import usePost from 'hooks/queries/MoimBoard/usePost';
import { Typography } from 'components/@common/Typography/Typography';
import { useGetMyProfile } from 'hooks/queries/MyScreen/useGetProfile';

// const testImages = [
//      "https://images.unsplash.com/photo-1704304660865-4c2ba1514289?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8",
//      "https://images.unsplash.com/photo-1722941600508-1c89628da11f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzNXx8fGVufDB8fHx8fA%3D%3D",
//      "https://images.unsplash.com/photo-1722525900762-a1969eb9372a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1NHx8fGVufDB8fHx8fA%3D%3D"
// ];

interface MoimPostDetailScreenProps {
    route: MoimPostStackRouteProp;
    navigation: MoimPostStackNavigationProp;
}

const MoimPostDetailScreen = ({route, navigation}: MoimPostDetailScreenProps) => {
    const { id, postId } = route.params;
    const { isPopover, handlePopover } = usePopover();
    const {
        useGetMoimPostDetail, 
        useGetInfiniteMoimPostComment,
        postWriteCommentMutation,
        postWriteRecommentMutation,
        likeMoimPostMutation
    } = usePost();
    const { data, isPending, isError, refetch: postRefetch } = useGetMoimPostDetail(id, postId);
    const { 
        data: comments,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage,
        refetch
    } = useGetInfiniteMoimPostComment(id, postId);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [comment, setComment] = useState('');
    const [recomment, setRecomment] = useState('');
    const [commentId, setCommentId] = useState(null);
    const { data: userInfo } = useGetMyProfile();

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

    const handleUpdateCommentId = (commentId: any) => {
        setCommentId(commentId);
    };

    const handleWriteComment = () => {
        if (id && postId && comment) {
            postWriteCommentMutation.mutate({
                moimId: id,
                postId: postId,
                content: comment
            }, {
                onSuccess: data => {
                    console.log(data);
                    refetch();
                    setComment('');
                },
                onError: error => {
                    Toast.show({
                        type: 'error',
                        text1: error?.response?.data.message || '댓글 작성 중 에러가 발생했습니다.',
                        visibilityTime: 2000,
                        position: 'bottom',
                    });
                }
            });
        }
    };

    const handleWriteRecomment = () => {
        if (id && postId && recomment && commentId) {
            postWriteRecommentMutation.mutate({
                moimId: id,
                commentId: commentId,
                postId: postId,
                content: recomment
            },{
                onSuccess: data => {
                    console.log(data);
                    refetch();
                    setRecomment('');
                    handleUpdateCommentId(null);
                },
                onError: error => {
                    console.error(error);
                    Toast.show({
                        type: 'error',
                        text1: error?.response?.data.message || '대댓글 작성 중 에러가 발생했습니다.',
                        visibilityTime: 2000,
                        position: 'bottom',
                    });
                }
            });
        }
    };

    const handleMoimPostLike = () => {
        likeMoimPostMutation.mutate({
            postId: postId
        }, {
            onSuccess: () => {
                postRefetch();
            },
            onError: error => {
                console.error(error);
                Toast.show({
                    type: 'error',
                    text1: error?.response?.data.message || '대댓글 좋아요 중 에러가 발생했습니다.',
                    visibilityTime: 2000,
                    position: 'bottom',
                });
            }
        });
    };

    if (isPending) {
        return <Typography fontWeight='BOLD' className=''>로딩 중</Typography>;
    }

    if (isError) {
        return <Typography fontWeight='BOLD' className=''>에러입니다.</Typography>;
    }

    const PostMenuList = [
        {
            title: '신고하기',
            onPress: () => {}            
        },
        {
            title: '차단하기',
            onPress: () => {}            
        },
    ];

    const PostMyMenuList = [
        {
            title: '수정하기',
            onPress: () => navigation.navigate('MOIM_POST_EDIT', { id })            
        },
        {
            title: '삭제하기',
            onPress: () => {}       
        },
    ];

    return (
        <KeyboardAvoidingView
            keyboardVerticalOffset={Platform.OS === 'ios' ? 200 : 70}
            behavior="padding"
            className='flex-1'
        >
                <FlatList 
                    data={comments?.pages.flat() || []}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <FlatList 
                            data={item.moimPreviewList}
                            renderItem={({item}) => (
                                <PostCommentContainer targetCommentId={commentId} handleUpdateCommentId={handleUpdateCommentId} commentData={item} />
                            )}
                        />
                    )}
                    contentContainerStyle={{
                        padding: 15,
                    }}
                    ListHeaderComponent={() => (
                        <>
                            <PostUserProfile
                                handlePopover={handlePopover}
                                writer={data?.writer}
                                updatedAt={data?.updateAt}
                            />
                            <PostInfoContainer
                                postImages={data?.imageKeyNames} 
                                title={data?.title}
                                content={data?.content}
                                commentCount={data?.commentCount}
                                likeCount={data?.likeCount}
                                isLike={data?.isLike}
                                handleMoimPostLike={handleMoimPostLike}
                            />
                        </>
                    )}
                    onEndReached={handleEndReached}
                    onEndReachedThreshold={0.5}
                    refreshing={isRefreshing}
                    onRefresh={handleRefresh}
                />
                <View className='absolute top-14 right-6'>
                    <PopoverMenu menu={userInfo?.result.nickname === data?.writer ? PostMyMenuList : PostMenuList} isPopover={isPopover} />
                </View>

            <View className='items-center justify-between flex-row p-3'>
                <View className='w-[90%]'>
                    <InputField value={commentId ? recomment : comment} onChangeText={text => commentId ? setRecomment(text) : setComment(text)} className='flex-3' placeholder='댓글을 입력해주세요.' touched />
                </View>
                <TouchableOpacity className='m-3' onPress={commentId ? handleWriteRecomment : handleWriteComment}>
                    <Ionicons name="send" size={25} color={'#00F0A1'} style={{ transform: [{ rotate: '-45deg' }] }} />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

export default MoimPostDetailScreen;