import { View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Typography } from 'components/@common/Typography/Typography';
import ImagesSlider from '../ImagesSlider';

// TODO: 이미지 타입 수정 필요
interface PostInfoContainerProps {
    postImages?: string[];
}

const PostInfoContainer = ({postImages}: PostInfoContainerProps) => {
  return (
    <>
        <View className='flex flex-col pl-1'>
            <Typography fontWeight='BOLD' className='text-base text-dark-800'>매주 월요일 정기 스터디</Typography>
            <Typography fontWeight='MEDIUM' className='text-sm text-dark-800 mt-2'>여러분 무조건 참여해야 하는 활동 중 하나입니다. 따라서 워크북을 꾸준히
            하시길 바랍니다.</Typography>

            {postImages && postImages.length && <ImagesSlider height={400} images={postImages} />}
        </View>

        {/* 게시글 정보 (댓글, 좋아요) & 좋아요 버튼 */}
        <View className='flex flex-row items-center py-3 border-gray-200 border-b-[0.5px]'>
            <Typography fontWeight='LIGHT' className='text-gray-300 text-xs'>댓글 0</Typography>
            <Typography fontWeight='LIGHT' className='text-gray-300 text-xs ml-3'>좋아요 0</Typography>
            <TouchableOpacity className='ml-auto'>
                <Ionicons name='heart-outline' color={'#C9CCD1'} size={25} />
            </TouchableOpacity>
        </View>
    </>
  );
};

export default PostInfoContainer;