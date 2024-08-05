import {ScreenContainer} from 'components/ScreenContainer.tsx';
import {Typography} from 'components/@common/Typography/Typography.tsx';
import {ChatStackRouteProp} from '../../navigators/types';
import {TextInput, View} from 'react-native';
import {CustomButton} from '../../components/@common/CustomButton/CustomButton.tsx';

interface IChatRoomScreenProps {
  route: ChatStackRouteProp;
}

export default function ChatRoomScreen({route}: IChatRoomScreenProps) {
  return (
    <ScreenContainer
      keyboardVerticalOffset={90}
      fixedBottomComponent={
        <TextInput placeholder={'메세지를 입력해주세요.'} />
      }>
      <Typography fontWeight={'BOLD'}>{route.params?.id}번 채팅방</Typography>
    </ScreenContainer>
  );
}
