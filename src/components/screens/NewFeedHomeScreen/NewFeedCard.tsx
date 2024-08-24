import {TouchableOpacity, TouchableOpacityProps, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Typography} from '../../@common/Typography/Typography.tsx';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment/moment';
import {TMoimPreviewListDto} from '../../../types/dtos/post.ts';

interface INewFeedCardProps extends TouchableOpacityProps {
  item: TMoimPreviewListDto;
}

export function NewFeedCard({item, ...props}: INewFeedCardProps) {
  console.log(item.postType);
  return (
    <TouchableOpacity
      className="flex-row items-center bg-white rounded-lg shadow-sm p-4 relative"
      {...props}>
      <FastImage
        source={{uri: item.profileImage}}
        className="rounded-lg w-[80px] h-[80px]"
        resizeMode={FastImage.resizeMode.cover}
      />
      <View className="flex-col ml-2 gap-y-2 flex-1">
        <View className="flex-row">
          <Typography
            numberOfLines={1}
            className="text-lg w-3/4"
            fontWeight="BOLD">
            {item.title}
          </Typography>
          <View className="flex-row items-center justify-center gap-x-2">
            <View className="flex-row items-center">
              <Ionicons name={'heart'} color={'#00F0A1'} />
              <Typography fontWeight={'BOLD'}>{item.likeCount}</Typography>
            </View>
            <View className="flex-row items-center">
              <Ionicons name={'chatbubble'} color={'#00F0A1'} />
              <Typography fontWeight={'BOLD'}>
                {item.commentCount > 99 ? '99+' : item.commentCount}
              </Typography>
            </View>
          </View>
        </View>
        <View className="flex-row gap-x-2 items-center">
          <Typography
            numberOfLines={1}
            className="text-gray-500"
            fontWeight="LIGHT">
            {item.writer}
          </Typography>
          <Typography
            numberOfLines={1}
            className="text-gray-500"
            fontWeight="LIGHT">
            {moment(item.createAt).fromNow()}
          </Typography>
        </View>
        <Typography
          numberOfLines={1}
          className="text-gray-600"
          fontWeight="LIGHT">
          {item.content}
        </Typography>
      </View>
    </TouchableOpacity>
  );
}
