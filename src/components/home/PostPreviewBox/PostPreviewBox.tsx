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
  const [showAll, setShowAll] = useState(false);

  const initialPostCount = 4;

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const postsToShow = showAll ? allPosts : allPosts?.slice(0, initialPostCount);

  useEffect(() => {
    if (allPosts.length < 5) {
      setShowAll(true);
    }
  }, [allPosts]);

  return (
    <View className="flex flex-col px-7 py-3 rounded-3xl bg-gray-50 border-gray-100 border-[1px]">
      {postsToShow?.map((moimItem, index) => (
        <View key={index}>
          {moimItem.moimPostPreviewDTOList.length < 1 ? (
            <></>
          ) : (
            <View className="flex flex-col py-4">
              <Typography className="text-base" fontWeight="MEDIUM">
                {moimItem.moimTitle}
              </Typography>
              <AllMoimPost
                postList={moimItem.moimPostPreviewDTOList}
                moimId={moimItem.moimId}
              />
            </View>
          )}
        </View>
      ))}

      {allPosts && allPosts.length > initialPostCount && (
        <TouchableOpacity
          onPress={toggleShowAll}
          className="flex flex-row items-center gap-x-3 mt-2 self-center">
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
