import {useEffect, useLayoutEffect, useState} from 'react';
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';

import Avatar from 'components/@common/Avatar/Avatar.tsx';
import {Typography} from 'components/@common/Typography/Typography.tsx';
import {ChatStackNavigationProp, ChatStackRouteProp} from 'navigators/types';
import {useGetInfiniteChatList} from '../../hooks/queries/ChatHomeScreen/useGetChatList.ts';
import useAuth from '../../hooks/queries/AuthScreen/useAuth.ts';
import useSocketService from '../../hooks/useSocketService.ts';

interface IChatRoomScreenProps {
  route: ChatStackRouteProp;
  navigation: ChatStackNavigationProp;
}

export default function ChatRoomScreen({
  navigation,
  route,
}: IChatRoomScreenProps) {
  const {getProfileQuery} = useAuth();
  const me = getProfileQuery.data?.result.userId;
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState<string>('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const {
    data: chats,
    fetchPreviousPage,
    hasNextPage,
    isFetchingPreviousPage,
    refetch,
    isPending,
    isError,
  } = useGetInfiniteChatList(route.params?.id as number);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '채팅방',
      headerBackTitleVisible: false,
      headerTitleAlign: 'left',
      headerTitle: () => (
        <View className="flex-row items-center gap-x-2.5">
          <Avatar size={'SM'} />
          <Typography className={'text-black'} fontWeight={'BOLD'}>
            {'채팅방 제목'}
          </Typography>
        </View>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const chatRoomId = route.params?.id as number;

    // Handler for incoming WebSocket messages
    const onMessageReceived = (newMessage: any) => {
      setMessages(prevMessages => [...prevMessages, newMessage]);
    };

    // Subscribe to WebSocket messages
    useSocketService.on('CHAT_MESSAGE', onMessageReceived);

    // Send an initial message indicating user has entered the chat
    const messageData = {
      chatType: 'ENTER',
      content: '입장',
      chatRoomId,
      imageKeyName: null,
    };
    useSocketService.send(messageData);

    // Cleanup function to remove WebSocket message listener
    // return () => {
    //   useSocketService.removeListener('CHAT_MESSAGE', onMessageReceived);
    // };
  }, [route.params?.id]);

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingPreviousPage) {
      fetchPreviousPage();
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  const handleSendMessage = () => {
    if (input.trim() === '') return; // Avoid sending empty messages

    const rawMessage = {
      chatType: 'TALK',
      content: input,
      chatRoomId: route.params?.id,
      imageKeyName: null,
    };
    useSocketService.send(rawMessage);

    setInput('');
    Keyboard.dismiss();
  };

  if (isPending || isError) {
    return <></>; // Consider adding an error or loading state here
  }

  // Combine initial chat messages with new messages
  const allMessages = [
    ...chats.pages.flatMap(page => page.chatResponseList),
    ...messages,
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={90}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <FlatList
              data={allMessages}
              renderItem={({item}) => (
                <View className="mt-5">
                  {me !== item.senderDTO.senderId ? (
                    <View className="p-4 bg-main self-start rounded-2xl mr-4 mb-5 max-w-[80%] relative">
                      <Avatar uri={item.senderDTO.senderProfile} />
                      <Typography fontWeight={'LIGHT'}>
                        {item.content}
                      </Typography>
                    </View>
                  ) : (
                    <View className="p-4 bg-gray-300 self-end rounded-2xl mr-4 mb-1 max-w-[80%] relative">
                      <Typography fontWeight={'LIGHT'}>
                        {item.content}
                      </Typography>
                    </View>
                  )}
                </View>
              )}
              keyExtractor={item => String(item.chatId)}
              numColumns={1}
              contentContainerStyle={{
                paddingHorizontal: 30,
                gap: 10,
              }}
              onEndReached={handleEndReached}
              onEndReachedThreshold={0.5}
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              scrollIndicatorInsets={{right: 1}}
              indicatorStyle={'black'}
            />
            <View className="flex-row items-center w-full p-4">
              <TextInput
                value={input}
                onChangeText={text => setInput(text)}
                placeholder="메시지를 입력해주세요."
                className="flex-1 b-0 h-10 mr-4 border-gray-100 bg-gray-200 border-0.5 p-3 color-gray-600 rounded-3xl"
                onSubmitEditing={handleSendMessage} // Send message on Enter key press
              />
              <TouchableOpacity onPress={handleSendMessage} activeOpacity={0.5}>
                <IonIcons name={'send'} size={24} color={'#00F0A1'} />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
