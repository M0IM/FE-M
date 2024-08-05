import {useNavigation} from '@react-navigation/native';
import {ChatStackNavigationProp} from '../../navigators/types';
import {TouchableOpacity, View} from 'react-native';
import {Typography} from '../@common/Typography/Typography.tsx';
import {Swipeable} from 'react-native-gesture-handler';
import Avatar from '../@common/Avatar/Avatar.tsx';

interface IChatEventProps {
  item: {id: number; name: string};
}

export function SwipableChatEvent({item}: IChatEventProps) {
  const navigation = useNavigation<ChatStackNavigationProp>();

  const rightSwipe = () => {
    return (
      <View
        className={
          'flex-row w-[50%] bg-green-300 h-full items-center justify-center'
        }>
        <TouchableOpacity
          className={
            'bg-error flex-1 h-full items-center justify-center text-white'
          }>
          <Typography className={'text-white'} fontWeight={'MEDIUM'}>
            나가기
          </Typography>
        </TouchableOpacity>
        <TouchableOpacity
          className={
            'bg-gray-500 flex-1 h-full items-center justify-center text-white'
          }>
          <Typography className={'text-white'} fontWeight={'MEDIUM'}>
            알림 끄기
          </Typography>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <Swipeable
      containerStyle={{
        width: '100%',
        height: 80,
        justifyContent: 'center',
        marginTop: 10,
      }}
      dragOffsetFromLeftEdge={10}
      renderRightActions={rightSwipe}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('CHAT_ROOM', {
            id: item.id,
          })
        }
        className="flex-row items-center w-full gap-x-1.5">
        <Avatar size={'MD'} />
        <Typography fontWeight={'MEDIUM'}>{item.name}</Typography>
      </TouchableOpacity>
    </Swipeable>
  );
}
