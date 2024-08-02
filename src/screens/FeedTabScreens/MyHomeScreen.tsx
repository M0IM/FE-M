import {Text, View} from 'react-native';
import {CustomButton} from '../../components/@common/CustomButton/CustomButton.tsx';
import useAuth from '../../hooks/queries/AuthScreen/useAuth.ts';
import Toast from 'react-native-toast-message';
import {queryClient} from '../../containers/TanstackQueryContainer.tsx';
import {getEncryptStorage} from '../../utils';
import {storageKeys} from '../../constants/storageKeys/keys.ts';
import {useEffect, useState} from 'react';

export default function MyHomeScreen() {
  const {logoutMutation} = useAuth();
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  useEffect(() => {
    const getToken = async () => {
      const accessToken = await getEncryptStorage(storageKeys.ACCESS_TOKEN);
      const refreshToken = await getEncryptStorage(storageKeys.REFRESH_TOKEN);

      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
    };
    getToken();
  }, []);

  console.log(accessToken, refreshToken);

  const handlePressLogout = () => {
    logoutMutation.mutate(null, {
      onSuccess: data => {
        Toast.show({
          type: 'success',
          text1: data && '로그아웃에 성공하였습니다.',
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
