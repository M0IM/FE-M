import Avatar from 'components/@common/Avatar/Avatar';
import PopoverMenu from 'components/@common/Popover/PopoverMenu/PopoverMenu';
import { Typography } from 'components/@common/Typography/Typography';
import usePopover from 'hooks/usePopover';
import { View, Pressable, TouchableWithoutFeedback } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TPostRecommentDto } from 'types/dtos/post';

interface PostRecommentContainerProps {
    recommentData: TPostRecommentDto;
}

const PostRecommentContainer = ({
    recommentData
}: PostRecommentContainerProps) => {
    const { isPopover, handlePopover } = usePopover();

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
    ];

    return (
        <TouchableWithoutFeedback onPress={() => isPopover && handlePopover()}>
            <View className='flex flex-col border-b-[0.5px] border-gray-200 bg-gray-50 py-4 pl-5'>
                <View className='flex flex-row items-center'>
                    <Avatar size='XS' uri={recommentData.profileImage} />
                    <View className='flex flex-col justify-center ml-2'>
                        <Typography fontWeight='MEDIUM' className='text-dark-800 text-xs'>{recommentData.writer}</Typography>
                        <Typography fontWeight='MEDIUM' className='text-gray-300 text-xs'>{recommentData.createAt}</Typography>
                    </View>
                    <View className='flex flex-row gap-x-2 ml-auto'>
                        <Pressable onPress={handlePopover}>
                            <Ionicons name='ellipsis-vertical' size={15} color={'#C9CCD1'} />
                        </Pressable>
                        <Pressable>
                            <Ionicons name='heart' size={15} color={'#00F0A1'} />
                        </Pressable>
                    </View>
                </View>
                <Typography fontWeight='MEDIUM' className='text-dark-800 text-sm mt-3 pl-1'>{recommentData.content}</Typography>
                <Typography fontWeight='MEDIUM' className='text-gray-300 text-sm ml-auto'>좋아요 {recommentData.likeCount}</Typography>
                <View className='absolute top-[-140] right-10 z-[10000]'>
                    <PopoverMenu menu={PostMenuList} isPopover={isPopover} />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default PostRecommentContainer;