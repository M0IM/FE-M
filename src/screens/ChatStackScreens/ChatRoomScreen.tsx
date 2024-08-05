import {useLayoutEffect, useState} from 'react';
import {
  Keyboard,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';

import Avatar from 'components/@common/Avatar/Avatar.tsx';
import {ScreenContainer} from 'components/ScreenContainer.tsx';
import {Typography} from 'components/@common/Typography/Typography.tsx';
import {ChatStackNavigationProp, ChatStackRouteProp} from 'navigators/types';

interface IChatRoomScreenProps {
  route: ChatStackRouteProp;
  navigation: ChatStackNavigationProp;
}

const messages = [
  {
    id: 1,
    email: 'dydals3440@gmail.com',
    message:
      '야호 고구마! 야호 고구마! 야호 고구마! 야호 고구마! 야호 고구마! 야호 고구마! 야호 고구마!',
    uri: 'https://images.unsplash.com/photo-1662317167813-fdc305e87d92?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 2,
    name: '안예원',
    email: 'yewonahn@naver.com',
    message: '야호야호',
    uri: 'https://images.unsplash.com/photo-1662317167813-fdc305e87d92?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 3,
    name: '차준환',
    email: 'musoyou1085@gmail.com',
    message: '차준환 스프링 파트장',
    uri: 'https://images.unsplash.com/photo-1662317167813-fdc305e87d92?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 4,
    name: '차다인',
    email: 'daindaind@naver.com',
    message: '🚘다인 동생 🚘준환',
    uri: 'https://images.unsplash.com/photo-1662317167813-fdc305e87d92?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 5,
    email: 'dydals3440@gmail.com',
    message:
      '야호 고구마! 야호 고구마! 야호 고구마! 야호 고구마! 야호 고구마! 야호 고구마! 야호 고구마!야호 고구마! 야호 고구마! 야호 고구마! 야호 고구마! 야호 고구마! 야호 고구마! 야호 고구마!' +
      '야호 고구마! 야호 고구마! 야호 고구마! 야호 고구마! 야호 고구마! 야호 고구마! 야호 고구마!' +
      '야호 고구마! 야호 고구마! 야호 고구마! 야호 고구마! 야호 고구마! 야호 고구마! 야호 고구마!',
    uri: 'https://images.unsplash.com/photo-1662317167813-fdc305e87d92?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

export default function ChatRoomScreen({navigation}: IChatRoomScreenProps) {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '채팅방',
      headerBackTitleVisible: false,
      headerTitleAlign: 'left',
      headerTitle: () => (
        <View className="flex-row items-center gap-x-2.5">
          <Avatar size={'SM'} />
          <Typography className={'text-black'} fontWeight={'BOLD'}>
            {/* parameter를 id가 아닌 체팅방 제목으로 받아서 route.params.name 으로? */}
            채팅방 제목
          </Typography>
        </View>
      ),
    });
  }, [navigation]);
  const [text, setText] = useState<string>('');
  const handleSendMessage = () => {
    if (!text) return;
    console.log(text);
    setText('');
    Keyboard.dismiss();
  };

  return (
    <ScreenContainer
      keyboardVerticalOffset={60}
      fixedBottomComponent={
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-row items-center justify-center gap-2">
            <TextInput
              className="flex-1 bg-gray-100 rounded-xl py-3 px-2"
              value={text}
              onChangeText={text => setText(text)}
              placeholder={'메세지를 입력해주세요.'}
              onSubmitEditing={handleSendMessage}
            />
            <TouchableOpacity onPress={handleSendMessage} activeOpacity={0.5}>
              <IonIcons name={'send'} size={18} color={'#00F0A1'} />
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      }>
      {messages.map(({message, id, email, uri, name}) => {
        // 추후 수정.
        return email === 'dydals3440@gmail.com' ? (
          <View
            key={id}
            className="relative p-4 bg-gray-200 self-end rounded-l-3xl rounded-br-3xl mr-4 mb-5 max-w-[80%]">
            <Typography fontWeight={'MEDIUM'}>{message}</Typography>
          </View>
        ) : (
          <View
            key={id}
            className="relative p-4 bg-green-300 self-start rounded-2xl ml-4 mb-5 max-w-[80%]">
            <Avatar uri={uri} className="absolute -top-5 -left-5" />
            <Typography
              className="absolute -top-4 left-5 ml-1 text-xs"
              fontWeight={'BOLD'}>
              {name}
            </Typography>
            <Typography fontWeight={'MEDIUM'}>{message}</Typography>
          </View>
        );
      })}
    </ScreenContainer>
  );
}
