import {View, TouchableOpacityProps, TouchableOpacity} from 'react-native';
import React from 'react';
import {Typography} from 'components/@common/Typography/Typography';
import FastImage from 'react-native-fast-image';

import {TMoimDTOResponse} from 'types/dtos/moim.ts';
import DefaultIcon from 'components/@common/DefaultIcon/DefaultIcon';

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
        <View className="flex flex-col justify-center items-center w-[120] h-[120] rounded-[30px] bg-gray-100">
          <DefaultIcon height={50} width={50} />
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
