import {View, Pressable} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Avatar from 'components/@common/Avatar/Avatar';
import {Typography} from 'components/@common/Typography/Typography';
import PopoverMenu from 'components/@common/Popover/PopoverMenu/PopoverMenu';
import usePopover from 'hooks/usePopover';

interface PostUserProfileProps {
  writer?: string;
  updatedAt?: string;
  profileImage?: string;
  PostMenuList: any;
  PostMyMenuList: any;
  isWriter: boolean;
}

const PostUserProfile = ({
  writer,
  updatedAt,
  profileImage,
  PostMenuList,
  PostMyMenuList,
  isWriter,
}: PostUserProfileProps) => {
  const {isPopover, handlePopover} = usePopover();

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
        <PopoverMenu
          menu={isWriter ? PostMyMenuList : PostMenuList}
          isPopover={isPopover}
          onPress={handlePopover}>
          <Ionicons name="ellipsis-vertical" size={25} color={'#1D2002'} />
        </PopoverMenu>
      </Pressable>
    </View>
  );
};

export default PostUserProfile;
