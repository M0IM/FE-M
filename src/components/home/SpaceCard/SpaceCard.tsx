import {View, TouchableOpacityProps, TouchableOpacity} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Typography} from 'components/@common/Typography/Typography';
import {TMoimDTOResponse} from 'types/dtos/moim.ts';
import FastImage from 'react-native-fast-image';

interface SpaceCardProps extends TouchableOpacityProps {
  item?: TMoimDTOResponse;
}

const SpaceCard = ({item, ...props}: SpaceCardProps) => {
  return (
    <TouchableOpacity
      {...props}
      activeOpacity={0.8}
      className="flex flex-col items-center gap-3 w-[140]">
      {item?.profileImageUrl ? (
        <FastImage
          source={{uri: item?.profileImageUrl}}
          className="w-[120px] h-[120px] rounded-[30px]"
          resizeMode={FastImage.resizeMode.cover}
        />
      ) : (
        <View className="flex flex-col justify-center items-center w-[120] h-[100] rounded-[30px] bg-gray-100">
          <Ionicons name="home" color="#E9ECEF" size={50} />
        </View>
      )}
      <Typography
        fontWeight="MEDIUM"
        className="text-dark-800"
        numberOfLines={1}>
        {item?.title}
      </Typography>
    </TouchableOpacity>
  );
};

export default SpaceCard;
