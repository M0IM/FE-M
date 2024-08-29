import {View, TouchableOpacityProps} from 'react-native';

import {Typography} from 'components/@common/Typography/Typography';
import AllMoimPost from 'components/screens/FeedTabScreens/AllMoimPost';

import {TMoimAllPostsPreviews} from 'types/dtos/moim';

interface PostPreviewBoxProps extends TouchableOpacityProps {
  allPosts?: TMoimAllPostsPreviews[];
  postList?: any;
}

const PostPreviewBox = ({allPosts}: PostPreviewBoxProps) => {
  return (
    <View className="flex flex-col px-7 py-2 rounded-3xl bg-gray-50 border-gray-100 border-[1px]">
      {allPosts?.map((moimItem, index) => (
        <View key={index} className="flex flex-col py-4">
          <Typography className="text-base" fontWeight="MEDIUM">
            {moimItem.moimTitle}
          </Typography>
          <AllMoimPost
            postList={moimItem.moimPostPreviewDTOList}
            moimId={moimItem.moimId}
          />
        </View>
      ))}
    </View>
  );
};

export default PostPreviewBox;
