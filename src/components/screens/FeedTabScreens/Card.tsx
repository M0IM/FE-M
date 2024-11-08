import {useNavigation} from '@react-navigation/native';
import {View, TouchableOpacity, Image} from 'react-native';

import DefaultIcon from 'components/@common/DefaultIcon/DefaultIcon';
import {Typography} from 'components/@common/Typography/Typography';
import {HomeStackNavigationProp} from 'navigators/types';
import {TMoimPreviewListDTO} from 'types/dtos/moim';
import {detailDate} from 'utils';

const Card = ({item}: {item: TMoimPreviewListDTO}) => {
  const navigation = useNavigation<HomeStackNavigationProp>();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className="bg-gray-100 rounded-lg flex-1"
      key={item.moimPostId}
      onPress={() =>
        navigation.navigate('MOIM_STACK', {
          screen: 'MOIM_SPACE',
          params: {
            id: item?.moimId,
          },
        })
      }>
      {item?.moimImageUrl ? (
        <Image
          source={{uri: item.moimImageUrl}}
          className="w-full h-[200px] rounded-tl-lg rounded-tr-lg"
        />
      ) : (
        <View className="flex flex-col items-center justify-center w-full h-[200px] rounded-tl-lg rounded-tr-lg">
          <DefaultIcon height={75} width={75} />
        </View>
      )}
      <View className="flex flex-col p-3 flex-1">
        <View className="flex-1">
          <Typography
            fontWeight="BOLD"
            className="text-dark-800 text-base"
            numberOfLines={1}>
            {item.title}
          </Typography>
          <Typography
            fontWeight="MEDIUM"
            className="text-gray-600 text-sm"
            numberOfLines={3}>
            {item.content}
          </Typography>
        </View>
        <View className="flex flex-row items-center">
          <Typography
            fontWeight="MEDIUM"
            className="text-gray-400 text-xs mr-2 mt-2">
            {detailDate(new Date(item.createAt))}
          </Typography>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Card;
