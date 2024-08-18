import { FlatList, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useState } from 'react';
import PopoverMenu from 'components/@common/Popover/PopoverMenu/PopoverMenu';
import usePopover from 'hooks/usePopover';
import { InputField } from 'components/@common/InputField/InputField';
import PostUserProfile from 'components/screens/MoimBoardStackScreens/postDetail/PostUserProfile';
import PostInfoContainer from 'components/screens/MoimBoardStackScreens/postDetail/PostInfoContainer';
import PostCommentContainer from 'components/screens/MoimBoardStackScreens/postDetail/PostCommentContainer';
import { MoimPostStackNavigationProp, MoimPostStackRouteProp } from 'navigators/types';
import usePost from 'hooks/queries/MoimBoard/usePost';
import { Typography } from 'components/@common/Typography/Typography';

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
    const { useGetMoimPostDetail, useGetInfiniteMoimPostComment } = usePost();
    const { data, isPending, isError } = useGetMoimPostDetail(id, postId);
    const { 
        data: comments,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage,
        refetch
    } = useGetInfiniteMoimPostComment(id, postId);
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

    if (isPending) {
        return <Typography fontWeight='BOLD' className=''>로딩 중</Typography>;
    }

    if (isError) {
        return <Typography fontWeight='BOLD' className=''>에러입니다.</Typography>;
    }

    // TODO: 본인이 작성한 글인지 확인 가능해지면 수정
    const PostMenuList = [
        {
            title: '신고하기',
            onPress: () => {}            
        },
        {
            title: '채팅하기',
            onPress: () => {}            
        },
        {
            title: '차단하기',
            onPress: () => {}            
        },
        {
            title: '수정하기',
            onPress: () => navigation.navigate('MOIM_POST_EDIT', { id })            
        }
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
                                <PostCommentContainer commentData={item} />
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
                            />
                        </>
                    )}
                    onEndReached={handleEndReached}
                    onEndReachedThreshold={0.5}
                    refreshing={isRefreshing}
                    onRefresh={handleRefresh}
                />
                <View className='absolute top-14 right-6'>
                    <PopoverMenu menu={PostMenuList} isPopover={isPopover} />
                </View>

            <View className='items-center justify-between flex-row p-3'>
                <View className='w-[90%]'>
                    <InputField className='flex-3' placeholder='댓글을 입력해주세요.' touched />
                </View>
                <TouchableOpacity className='m-3'>
                    <Ionicons name="send" size={25} color={'#00F0A1'} style={{ transform: [{ rotate: '-45deg' }] }} />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

export default MoimPostDetailScreen;