import Avatar from 'components/@common/Avatar/Avatar';
import { Typography } from 'components/@common/Typography/Typography';
import { View, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface PostUserProfileProps {
    handlePopover: () => void;
}

const PostUserProfile = ({ handlePopover }: PostUserProfileProps) => {
  return (
    <View className='flex flex-row mt-2 items-center'>
        <Avatar />
        <View className='flex flex-col justify-center ml-2'>
            <Typography fontWeight='MEDIUM' className='text-dark-800 text-xs'>다라/차다인</Typography>
            <Typography fontWeight='MEDIUM' className='text-gray-300 text-xs'>2024년 5월 17일 오후 2:00 </Typography>
        </View>
        <Pressable className='ml-auto' onPress={handlePopover} >
            <Ionicons name='ellipsis-vertical' size={25} color={'#1D2002'} />
        </Pressable>
    </View>
  );
};

export default PostUserProfile;