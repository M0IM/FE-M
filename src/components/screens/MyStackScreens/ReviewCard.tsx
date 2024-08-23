import {Text, View} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {Typography} from '../../@common/Typography/Typography.tsx';

import {TMembersReviewDTO} from 'types/dtos/user.ts';
import Ionicons from 'react-native-vector-icons/Ionicons';

export function ReviewCard({review}: {review: TMembersReviewDTO}) {
  const {content, rating} = review;

  return (
    <View className="bg-white p-4 rounded-lg shadow-md mb-4">
      <View className="flex-row items-center mb-2">
        {[...Array(5)].map((_, index) => (
          <Ionicons
            key={index}
            name={'star'}
            size={20}
            color={index < rating ? '#FFD700' : '#e0e0e0'} // 채워진 별과 빈 별 색상
          />
        ))}
      </View>
      <Typography
        fontWeight={'BOLD'}
        className="text-gray-900 text-base font-medium">
        {content}
      </Typography>
    </View>
  );
}
