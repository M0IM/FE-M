import {useNavigation} from '@react-navigation/native';

import {ScreenContainer} from 'components/ScreenContainer.tsx';
import ProfileBar from 'components/me/ProfileBar/ProfileBar.tsx';

import {MyStackNavigationProp} from 'navigators/types';

export default function ProfilesScreen() {
  const navigation = useNavigation<MyStackNavigationProp>();
  return (
    <ScreenContainer>
      <ProfileBar
        username={'김용민'}
        label={'모임장'}
        onPress={() =>
          navigation.navigate('MY_DETAIL_PROFILE', {
            id: 1,
          })
        }
      />
      <ProfileBar username={'안예원'} label={'야호'} />
      <ProfileBar username={'김준환'} label={'차준환'} />
      <ProfileBar username={'차다인'} label={'차굴렁'} />
    </ScreenContainer>
  );
}
