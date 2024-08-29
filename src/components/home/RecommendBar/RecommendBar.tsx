import {
  View,
  TouchableOpacity,
  TouchableOpacityProps,
  Image,
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Typography} from 'components/@common/Typography/Typography';

interface RecommendBarProps extends TouchableOpacityProps {
  profileImg?: string;
}

const RecommendBar = ({profileImg, ...props}: RecommendBarProps) => (
  <TouchableOpacity
    className="flex bg-gray-100 flex-row p-5 items-center justify-center rounded-3xl"
    {...props}>
    {profileImg ? (
      <Image
        source={{uri: profileImg}}
        width={35}
        height={35}
        className="rounded-full mr-3"
      />
    ) : (
      <View className="mr-2">
        <Ionicons name="person-circle" color="#E9ECEF" size={40} />
      </View>
    )}
    <View className="flex flex-col justify-center">
      <Typography
        fontWeight="MEDIUM"
        className="text-dark-900"
        numberOfLines={1}>
        여러분의 관심사를 알려주세요!
      </Typography>
      <Typography
        fontWeight="MEDIUM"
        className="text-gray-500 text-xs mt-[2px]"
        numberOfLines={1}>
        관심 분야를 설정하면 정확한 추천이 표시돼요.
      </Typography>
    </View>
    <View className="ml-auto">
      <Ionicons name="chevron-forward" color="#E9ECEF" size={30} />
    </View>
  </TouchableOpacity>
);

export default RecommendBar;
