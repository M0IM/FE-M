import {View, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Typography} from 'components/@common/Typography/Typography';
import ImagesSlider from '../ImagesSlider';

interface PostInfoContainerProps {
  postImages?: string[];
  title?: string | '';
  content?: string | '';
  commentCount?: number;
  likeCount?: number;
  isLike?: boolean;
  handleMoimPostLike: () => void;
}

const PostInfoContainer = ({
  postImages,
  title,
  content,
  commentCount,
  likeCount,
  isLike,
  handleMoimPostLike,
}: PostInfoContainerProps) => {
  const isImages =
    postImages && postImages?.length > 0 && postImages[0]?.split('com/')[1]
      ? true
      : false;

  return (
    <>
      <View className="flex flex-col pl-1 px-4">
        <Typography fontWeight="BOLD" className="text-base text-dark-800">
          {title}
        </Typography>
        <Typography fontWeight="MEDIUM" className="text-sm text-dark-800 mt-2">
          {content}
        </Typography>
        {isImages && <ImagesSlider height={400} images={postImages} />}
      </View>

      <View className="flex flex-row items-center py-3 border-gray-200 border-b-[0.5px] mt-2 px-1.5">
        <Typography fontWeight="LIGHT" className="text-gray-300 text-xs">
          댓글 {commentCount}
        </Typography>
        <Typography fontWeight="LIGHT" className="text-gray-300 text-xs ml-3">
          좋아요 {likeCount}
        </Typography>
        <TouchableOpacity className="ml-auto" onPress={handleMoimPostLike}>
          {isLike ? (
            <Ionicons name="heart" color={'#00F0A1'} size={25} />
          ) : (
            <Ionicons name="heart-outline" color={'#C9CCD1'} size={25} />
          )}
        </TouchableOpacity>
      </View>
    </>
  );
};

export default PostInfoContainer;
