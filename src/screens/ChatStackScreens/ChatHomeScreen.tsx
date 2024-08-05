import {FlatList, SafeAreaView, View} from 'react-native';

import {Typography} from 'components/@common/Typography/Typography.tsx';
import {SwipableChatEvent} from '../../components/swipableChatEvent/SwipableChatEvent.tsx';

const chatData = [
  {id: 1, name: '안녕하세요'},
  {id: 2, name: '안녕하세요'},
  {id: 3, name: '안녕하세요'},
];

export default function ChatHomeScreen() {
  return (
    <SafeAreaView className={'flex-1 bg-white '}>
      <View className="px-5">
        <Typography className="text-xl mt-5" fontWeight={'BOLD'}>
          내가 참여하고 있는 채팅방 ({chatData.length})
        </Typography>
        <FlatList
          data={chatData}
          renderItem={({item}) => {
            return <SwipableChatEvent item={item} />;
          }}
          keyExtractor={item => String(item.id)}
          contentContainerStyle={{
            gap: 5,
          }}
        />
      </View>
    </SafeAreaView>
  );
}
