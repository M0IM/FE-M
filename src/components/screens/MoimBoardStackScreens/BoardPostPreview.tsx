import { TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import Avatar from 'components/@common/Avatar/Avatar';
import Label from 'components/@common/Label/Label';
import { Typography } from 'components/@common/Typography/Typography';
import { POST_TYPES } from 'constants/screens/MoimBoardStackScreens/PostList';
import { MoimPostStackNavigationProp } from 'navigators/types';
import { TMoimPreviewListDto } from 'types/dtos/post';

interface BoardPostPreviewProps {
  postPreview: TMoimPreviewListDto;
  navigation: MoimPostStackNavigationProp
}

const BoardPostPreview = ({
  navigation,
  postPreview
}: BoardPostPreviewProps) => {
  const postTypeLabel = POST_TYPES.find(type => type.key === postPreview.postType)?.label;

  return (
    <TouchableOpacity onPress={() => navigation.navigate('MOIM_POST_DETAIL', {id: 1})} activeOpacity={0.8} className='flex flex-col border-gray-200 border-[0.5px] p-4 rounded-lg'>
      <View className='flex flex-row items-center'>
        <Avatar size='XS' />
        <Typography fontWeight='MEDIUM' className='text-dark-800 text-xs ml-2'>{postPreview.writer}</Typography>
        {postTypeLabel && <Label label={postTypeLabel} style='ml-auto' color='main' />}
        </View>
        <View className='flex flex-col mt-3'>
        <Typography fontWeight='BOLD' className='text-dark-800 text-sm'>{postPreview.title}</Typography>
        <Typography fontWeight='LIGHT' className='text-dark-800 text-sm mt-1'>{postPreview.content}</Typography>
      </View>

      <View className='flex flex-row items-end mt-3'>
        <Typography fontWeight='MEDIUM' className='text-gray-400 text-xs'>{postPreview.createAt}</Typography>
        <Typography fontWeight='MEDIUM' className='text-gray-400 text-xs ml-3'>댓글 {postPreview.commentCount}</Typography>
        <Typography fontWeight='MEDIUM' className='text-gray-400 text-xs ml-3'>좋아요 {postPreview.likeCount}</Typography>
      </View>
    </TouchableOpacity>
  );
};

export default BoardPostPreview;