import {Typography} from 'components/@common/Typography/Typography';
import {View, Image, TouchableOpacity} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

const testImg =
  'https://images.unsplash.com/photo-1724075683150-365324dfe146?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8';

const MoimFeedPreview = () => {
  const Card = (
    <TouchableOpacity
      activeOpacity={0.8}
      className="bg-gray-100 rounded-lg flex-1">
      <Image
        source={{uri: testImg}}
        className="w-full h-[200px] rounded-tl-lg rounded-tr-lg"
      />
      <View className="flex flex-col p-3">
        <Typography
          fontWeight="BOLD"
          className="text-dark-800 text-base"
          numberOfLines={1}>
          MoimFeedPreviewMoimFeedPreviewMoimFeedPreviewMoimFeedPreview
        </Typography>
        <Typography fontWeight="MEDIUM" className="text-gray-600 text-sm">
          이건 소개임
        </Typography>
        <View className="flex flex-row items-center mt-4">
          <Typography
            fontWeight="MEDIUM"
            className="text-gray-400 text-xs mr-2">
            2분 전
          </Typography>
          <Ionicons
            name="heart-outline"
            color={'#9EA4AA'}
            style={{marginLeft: 'auto', marginRight: 5}}
          />
          <Typography fontWeight="MEDIUM" className="text-gray-400 text-xs">
            13
          </Typography>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex flex-col gap-y-3">
      <Typography className="text-lg mb-2 text-dark-800" fontWeight={'BOLD'}>
        여러 모임을 둘러보세요
      </Typography>
      {Card}

      <View className="flex flex-row gap-x-3">
        {Card}
        {Card}
      </View>

      <View className="flex flex-row gap-x-3">
        {Card}
        {Card}
      </View>
    </View>
  );
};

export default MoimFeedPreview;
