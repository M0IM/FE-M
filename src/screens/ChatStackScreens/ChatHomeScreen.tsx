import {FlatList, SafeAreaView, View} from 'react-native';

import {Typography} from 'components/@common/Typography/Typography.tsx';
import {SwipableChatEvent} from '../../components/swipableChatEvent/SwipableChatEvent.tsx';
import {useState} from 'react';
import {useGetChatRooms} from '../../hooks/queries/ChatHomeScreen/useGetChatRooms.ts';

export default function ChatHomeScreen() {
  const {
    data: chats,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isPending,
    isError,
  } = useGetChatRooms();

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  if (isPending || isError) {
    return <></>;
  }
  return (
    <SafeAreaView className={'flex-1 bg-white '}>
      <View className="px-5">
        <Typography className="text-xl mt-5" fontWeight={'BOLD'}>
          내가 참여한 채팅방
        </Typography>
        <FlatList
          data={chats.pages.flatMap(chat => chat.chatRoomResponses)}
          renderItem={({item}) => {
            return (
              <SwipableChatEvent
                chatRoomId={item.chatRoomId}
                title={item.title}
                imageKeyName={item.imageKeyName}
              />
            );
          }}
          keyExtractor={item => String(item?.chatRoomId)}
          numColumns={1}
          contentContainerStyle={{paddingHorizontal: 30, gap: 10}}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
          scrollIndicatorInsets={{right: 1}}
          indicatorStyle={'black'}
        />
      </View>
    </SafeAreaView>
  );
}
