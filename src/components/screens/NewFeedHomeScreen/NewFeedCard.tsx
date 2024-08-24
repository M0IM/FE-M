import {TouchableOpacity, TouchableOpacityProps, View} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import moment from 'moment/moment';
import {Typography} from '../../@common/Typography/Typography.tsx';
import Avatar from '../../@common/Avatar/Avatar.tsx';

import {TMoimPreviewListDto} from 'types/dtos/post.ts';

interface INewFeedCardProps extends TouchableOpacityProps {
  item: TMoimPreviewListDto;
}

export function NewFeedCard({item, ...props}: INewFeedCardProps) {
  return (
    <>
      <TouchableOpacity className="bg-white" activeOpacity={0.8} {...props}>
        {/*HEADER*/}
        <View className="p-3 flex-row items-center gap-2">
          <Avatar
            uri={item.profileImage}
            className="w-12 aspect-square rounded-full"
          />
          <Typography className="text-md" fontWeight={'BOLD'}>
            {item.title}
          </Typography>
        </View>
        <FastImage
          source={{uri: item.profileImage}}
          className="w-full aspect-[4/3]"
          resizeMode={FastImage.resizeMode.cover}
        />
      </TouchableOpacity>
      {/*ICONS*/}
      <View style={{flexDirection: 'row', padding: 16, width: '100%', gap: 12}}>
        <View className="flex-row items-center justify-center">
          <Ionicons name={'heart'} size={20} />
          <Typography className="ml-2" fontWeight={'BOLD'} numberOfLines={1}>
            {item.likeCount > 99 ? '99+' : item.likeCount}
          </Typography>
        </View>
        <View className="flex-row items-center justify-center">
          <Ionicons name={'chatbubble-outline'} size={20} />
          <Typography className="ml-2" fontWeight={'BOLD'} numberOfLines={1}>
            {item.commentCount > 99 ? '99+' : item.commentCount}
          </Typography>
        </View>
        {/*<Ionicons name={'send'} size={20} />*/}
        <Ionicons name={'bookmark'} size={20} style={{marginLeft: 'auto'}} />
      </View>
      <View className="flex-col gap-2 px-4">
        <View className="flex-row items-center">
          <Ionicons name={'person'} size={20} />
          <Typography className="ml-2" fontWeight={'BOLD'} numberOfLines={1}>
            {item.writer}
          </Typography>
        </View>
        <Typography
          fontWeight={'BOLD'}
          numberOfLines={1}
          className="text-gray-600">
          {item.content}
        </Typography>
        <Typography className="text-gray-500" fontWeight={'LIGHT'}>
          {moment(item.createAt).fromNow()}
        </Typography>
      </View>
    </>
  );
}
