import {Text, View} from 'react-native';
import {CustomButton} from '../../components/@common/CustomButton/CustomButton.tsx';
import useAuth from '../../hooks/queries/AuthScreen/useAuth.ts';
import Toast from 'react-native-toast-message';
import {removeEncryptStorage} from '../../utils';
import {queryKeys, storageKeys} from '../../constants/storageKeys/keys.ts';

export default function MyHomeScreen() {
  const {logoutMutation} = useAuth();
  const handlePressLogout = () => {
    logoutMutation.mutate(null, {
      onSuccess: data => {
        Toast.show({
          type: 'success',
          text1: data.isSuccess && '로그아웃에 성공하였습니다.',
          visibilityTime: 2000,
          position: 'bottom',
        });
      },
      onError: error => {
        console.log(error);
      },
    });
  };
  return (
    <View>
      <CustomButton label={'LOGOUT'} onPress={handlePressLogout} />
      <Text>My Home Screen</Text>
    </View>
  );
}
