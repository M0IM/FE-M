import {View, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {FlatList} from 'react-native-gesture-handler';

import {Typography} from 'components/@common/Typography/Typography';
import Avatar from 'components/@common/Avatar/Avatar';

import ImagesSlider from '../ImagesSlider';
import {TUnReadUserDTO} from 'types/dtos/post';
import {MoimPostStackNavigationProp} from 'navigators/types';

interface PostInfoContainerProps {
  postImages?: string[];
  title?: string | '';
  content?: string | '';
  commentCount?: number;
  likeCount?: number;
  isLike?: boolean;
  handleMoimPostLike: () => void;
  unReadUsers?: TUnReadUserDTO[];
}

const PostInfoContainer = ({
  postImages,
  title,
  content,
  commentCount,
  likeCount,
  isLike,
  handleMoimPostLike,
  unReadUsers,
}: PostInfoContainerProps) => {
  const navigation = useNavigation<MoimPostStackNavigationProp>();
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

      {unReadUsers && unReadUsers?.length > 0 && (
        <View className="flex flex-col px-3 border-t-[1px] border-b-[1px] border-gray-100 mt-6 py-4">
          <Typography
            fontWeight="MEDIUM"
            className="flex text-sm text-gray-400 ml-1">
            {`안 읽은 사람 (${unReadUsers.length}명)`}
          </Typography>
          <FlatList
            horizontal
            data={unReadUsers}
            renderItem={({item}) => (
              <Avatar
                uri={item.imageKeyName}
                onPress={() =>
                  navigation.navigate('MOIM_MEMBER_PROFILE', {
                    id: item.userId,
                    userName: item.nickname,
                  })
                }
                size="XS"
              />
            )}
            contentContainerStyle={{
              marginTop: 10,
              gap: 3,
              paddingLeft: 4,
            }}
          />
        </View>
      )}

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
