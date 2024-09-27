import {TouchableOpacity, TouchableOpacityProps, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import moment from 'moment/moment';
import NoImage from 'assets/images/NoImageLogo.png';
import {useNavigation} from '@react-navigation/native';

import {Typography} from '../../@common/Typography/Typography.tsx';
import Avatar from '../../@common/Avatar/Avatar.tsx';
import {HomeStackNavigationProp} from 'navigators/types/index.ts';
import {TMoimIntroduceListDTO} from 'types/dtos/moim.ts';

interface INewFeedCardProps extends TouchableOpacityProps {
  item: TMoimIntroduceListDTO;
}

export function NewFeedCard({item, ...props}: INewFeedCardProps) {
  const navigation = useNavigation<HomeStackNavigationProp>();
  return (
    <>
      <TouchableOpacity className="bg-white" activeOpacity={0.8} {...props}>
        {item.moimImageUrl ? (
          <FastImage
            source={{uri: item.moimImageUrl}}
            className="w-full aspect-[4/2] rounded-2xl relative"
            resizeMode={FastImage.resizeMode.cover}
          />
        ) : (
          <FastImage
            source={NoImage}
            className="w-full aspect-[4/2] rounded-2xl relative"
            resizeMode={FastImage.resizeMode.cover}
          />
        )}

        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.4)']}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '100%',
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16,
          }}>
          <View className="flex-col gap-2 px-4 absolute bottom-0 pb-4">
            <View className="flex-row items-center">
              <Avatar
                uri={item.ownerProfileImageUrl}
                onPress={() =>
                  navigation.navigate('USER_DETAIL_PROFILE', {
                    screen: 'USER_PROFILE',
                    params: {
                      id: item.writerId,
                      userName: item.writer,
                    },
                  })
                }
              />
              <Typography
                className="ml-2 text-white"
                fontWeight={'BOLD'}
                numberOfLines={1}>
                {item.writer}
              </Typography>
            </View>
            <Typography
              fontWeight={'BOLD'}
              numberOfLines={1}
              className="text-white">
              {item.content}
            </Typography>
            <Typography className="text-white" fontWeight={'LIGHT'}>
              {moment(item.createAt).fromNow()}
            </Typography>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </>
  );
}
