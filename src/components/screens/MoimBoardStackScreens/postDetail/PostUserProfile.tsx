import {View, Pressable} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Avatar from 'components/@common/Avatar/Avatar';
import {Typography} from 'components/@common/Typography/Typography';

interface PostUserProfileProps {
  handlePopover: () => void;
  writer?: string;
  updatedAt?: string;
  profileImage?: string;
}

const PostUserProfile = ({
  handlePopover,
  writer,
  updatedAt,
  profileImage,
}: PostUserProfileProps) => {
  return (
    <View className="flex flex-row mt-2 items-center mb-2">
      <Avatar uri={profileImage} />
      <View className="flex flex-col justify-center ml-2">
        {writer && (
          <Typography fontWeight="MEDIUM" className="text-dark-800 text-xs">
            {writer}
          </Typography>
        )}
        {updatedAt && (
          <Typography fontWeight="MEDIUM" className="text-gray-300 text-xs">
            {updatedAt}
          </Typography>
        )}
      </View>
      <Pressable className="ml-auto" onPress={handlePopover}>
        <Ionicons name="ellipsis-vertical" size={25} color={'#1D2002'} />
      </Pressable>
    </View>
  );
};

export default PostUserProfile;
