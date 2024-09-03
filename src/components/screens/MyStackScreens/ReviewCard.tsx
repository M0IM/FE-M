import {View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {Typography} from '../../@common/Typography/Typography.tsx';
import {TMembersReviewDTO} from 'types/dtos/user.ts';

export function ReviewCard({review}: {review: TMembersReviewDTO}) {
  const {content, rating} = review;

  return (
    <View className="flex-row mb-4">
      <Ionicons
        name="person-outline"
        size={20}
        color={'#26282b'}
        style={{marginRight: 10}}
      />
      <View className="w-0 h-0 border-t-[10px] border-t-white border-r-[20px] border-r-gray-100 border-b-[10px] border-b-white mr-[-2px]" />
      <View className="flex-1 bg-gray-100 p-4 relative rounded-3xl rounded-tl-none">
        <View className="flex-row items-center mb-2">
          {[...Array(5)].map((_, index) => (
            <Ionicons
              key={index}
              name={'star'}
              size={15}
              color={index < rating ? '#FFD700' : '#e0e0e0'}
            />
          ))}
        </View>
        <Typography
          fontWeight={'MEDIUM'}
          className="text-gray-900 text-sm font-medium">
          {content}
        </Typography>
      </View>
    </View>
  );
}
