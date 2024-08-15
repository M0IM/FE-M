import {Text, View} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {Typography} from '../../@common/Typography/Typography.tsx';

import {TMembersReviewDTO} from 'types/dtos/user.ts';

export function ReviewCard({review}: {review: TMembersReviewDTO}) {
  const {content, rating} = review;

  return (
    <View className="w-full h-20 flex-row items-center gap-x-4">
      <IonIcons name={'person'} size={23} color={'#C9CCD1'} />
      <View className="flex-col gap-y-1">
        <View className="flex-row items-center gap-x-1">
          <IonIcons name={'star'} size={13} color={'#FFD700'} />
          <Typography className="text-[3px]" fontWeight={'MEDIUM'}>
            {rating}
          </Typography>
        </View>
        <Text numberOfLines={1}>{content}</Text>
      </View>
    </View>
  );
}
