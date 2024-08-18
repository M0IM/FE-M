import { View, Pressable, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Avatar from 'components/@common/Avatar/Avatar';
import { Typography } from 'components/@common/Typography/Typography';
import PopoverMenu from 'components/@common/Popover/PopoverMenu/PopoverMenu';
import usePopover from 'hooks/usePopover';
import { TPostCommentDto } from 'types/dtos/post';
import PostRecommentContainer from './PostRecommentContainer';

interface PostCommentContainerProps {
    commentData: TPostCommentDto;
    handleUpdateCommentId: (commentId: any) => void;
    targetCommentId?: number | null;
}

const PostCommentContainer = ({
    commentData,
    handleUpdateCommentId,
    targetCommentId
}: PostCommentContainerProps) => {
    const { isPopover, handlePopover } = usePopover();

    // TODO: 본인이 작성한 글인지 확인 가능해지면 수정
    const PostMenuList = [
        {
            title: '신고하기',
            onPress: () => console.log(1)          
        },
        {
            title: '채팅하기',
            onPress: () => console.log(2)            
        },
        {
            title: '차단하기',
            onPress: () => console.log(3)            
        },
    ];

    return (
        <View className='flex flex-col my-2'>
            <View className='flex flex-col border-b-[0.5px] border-gray-200 pb-4' style={{ backgroundColor: targetCommentId === commentData.commentId ? 'rgba(255, 0, 0, 0.4)' : 'white' }}>
                <View className='flex flex-row items-center'>
                    <Avatar size='XS' uri={commentData?.profileImage} />
                    <View className='flex flex-col justify-center ml-2'>
                        <Typography fontWeight='MEDIUM' className='text-dark-800 text-xs'>{commentData?.writer}</Typography>
                        <Typography fontWeight='MEDIUM' className='text-gray-300 text-xs'>{commentData?.createAt}</Typography>
                    </View>
                    <View className='flex flex-row gap-x-2 ml-auto'>
                        <Pressable onPress={handlePopover}>
                            <Ionicons name='ellipsis-vertical' size={15} color={'#C9CCD1'} />
                        </Pressable>
                        <Pressable onPress={() => handleUpdateCommentId(commentData.commentId)}>
                            <Ionicons name='chatbubble-outline' size={15} color={'#C9CCD1'} />
                        </Pressable>
                        <Pressable>
                            <Ionicons name='heart' size={15} color={'#00F0A1'} />
                        </Pressable>
                    </View>
                </View>
                <Typography fontWeight='MEDIUM' className='text-dark-800 text-sm mt-3 pl-1'>{commentData?.content}</Typography>
                <Typography fontWeight='MEDIUM' className='text-gray-300 text-sm ml-auto'>좋아요 {commentData?.likeCount}</Typography>
            </View>
            <FlatList 
                data={commentData?.commentResponseDTOList}
                renderItem={({item}) => (
                    <PostRecommentContainer recommentData={item} />
                )}
            />
            <View className='absolute top-[-160] right-10'>
                <PopoverMenu menu={PostMenuList} isPopover={isPopover} />
            </View>
        </View>
    );
};

export default PostCommentContainer;