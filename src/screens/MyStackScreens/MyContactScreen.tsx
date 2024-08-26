import {Image, TouchableOpacity, View} from 'react-native';
import Toast from 'react-native-toast-message';

import {ScreenContainer} from 'components/ScreenContainer.tsx';
import {Typography} from 'components/@common/Typography/Typography.tsx';
import Clipboard from '@react-native-clipboard/clipboard';

export default function MyContactScreen() {
  const copyToClipboard = async () => {
    Clipboard.setString('moim2moim@gmail.com');
    Toast.show({
      type: 'success',
      text1: '클립보드에 복사되었습니다.',
      visibilityTime: 2000,
      position: 'bottom',
    });
  };

  return (
    <ScreenContainer>
      <View className="flex flex-col flex-1 justify-center items-center">
        <Typography fontWeight="BOLD" className="text-2xl text-dark-800 mb-4">
          문의하기
        </Typography>
        <Typography fontWeight="MEDIUM" className="text-base text-gray-600">
          더 나은 서비스를 제공하기 위해
        </Typography>
        <Typography fontWeight="MEDIUM" className="text-base text-gray-600">
          moim이 노력하겠습니다.
        </Typography>

        <Image
          className="w-24 h-24 p-5 my-12"
          source={require('assets/logos/logo-green.png')}
        />

        <Typography fontWeight="MEDIUM" className="text-base text-gray-600">
          서비스 오류, 건의 사항 등의 경우
        </Typography>
        <Typography fontWeight="MEDIUM" className="text-base text-gray-600">
          아래 이메일로 문의하시길 바랍니다.
        </Typography>
        <TouchableOpacity
          className="flex flex-col items-center bg-gray-100 rounded-lg p-5 mt-8"
          onPress={copyToClipboard}>
          <Typography fontWeight="BOLD" className="text-lg text-gray-500 8">
            moim2moim@gmail.com
          </Typography>
          <Typography
            fontWeight="MEDIUM"
            className="text-xs text-gray-400 mt-[2px]">
            클릭하면 클립보드에 복사됩니다.
          </Typography>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
}
