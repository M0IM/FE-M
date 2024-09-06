import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {Typography} from 'components/@common/Typography/Typography';
import AllMoimPost from 'components/screens/FeedTabScreens/AllMoimPost';

import {TMoimAllPostsPreviews} from 'types/dtos/moim';

interface PostPreviewBoxProps {
  allPosts: TMoimAllPostsPreviews[];
  postList?: any;
}

const PostPreviewBox = ({allPosts}: PostPreviewBoxProps) => {
  const filteredPosts = allPosts.filter(
    post => post.moimPostPreviewDTOList.length > 0,
  );
  const [showAll, setShowAll] = useState(false);

  const initialPostCount = 4;

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const postsToShow = showAll
    ? filteredPosts
    : filteredPosts?.slice(0, initialPostCount);

  useEffect(() => {
    if (filteredPosts.length < 5) {
      setShowAll(true);
    }
  }, [filteredPosts]);

  return (
    <View className="flex flex-col">
      <View className="flex flex-col px-7 py-3 rounded-tl-3xl rounded-tr-3xl bg-gray-50 border-gray-100 border-[1px] border-b-0">
        {postsToShow?.map((moimItem, index) => (
          <View key={index}>
            <View className="flex flex-col py-4">
              <Typography className="text-base" fontWeight="MEDIUM">
                {moimItem.moimTitle}
              </Typography>
              <AllMoimPost
                postList={moimItem.moimPostPreviewDTOList}
                moimId={moimItem.moimId}
              />
            </View>
          </View>
        ))}
      </View>
      {filteredPosts && filteredPosts.length > initialPostCount && (
        <TouchableOpacity
          onPress={toggleShowAll}
          activeOpacity={0.8}
          className="flex flex-row w-full p-3 rounded-bl-3xl rounded-br-3xl justify-center items-center self-center bg-gray-50 border-gray-100 border-[1px] border-t-0">
          <Typography fontWeight="BOLD" className="text-gray-500 text-xs">
            {showAll ? '숨기기' : '더보기'}
          </Typography>
          <Ionicons
            name="chevron-up"
            size={15}
            color={'#72787F'}
            style={!showAll ? {transform: [{rotate: '180deg'}]} : {}}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PostPreviewBox;
