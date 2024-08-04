import {ScreenContainer} from 'components/ScreenContainer.tsx';
import {Pressable} from 'react-native';
import {MyStackNavigationProp, MyStackRouteProp} from '../../navigators/types';
import Avatar from 'components/@common/Avatar/Avatar.tsx';
import {Typography} from 'components/@common/Typography/Typography.tsx';

interface IMyDetailProfileScreenProps {
  route: MyStackRouteProp;
  navigation: MyStackNavigationProp;
}

export default function MyDetailProfileScreen({
  route,
  navigation,
}: IMyDetailProfileScreenProps) {
  return (
    <ScreenContainer>
      <Pressable
        onPress={() => {
          navigation.navigate('MY_PROFILE_EDIT', {
            id: Number(route.params?.id),
          });
        }}
        className="flex-row items-center gap-2 active:bg-hover">
        <Avatar size={'MD'} />
        <Typography fontWeight={'BOLD'}>차준환</Typography>
        <Typography fontWeight={'BOLD'}>
          클릭시 내프로필 수정페이지로 이동합니다.
        </Typography>
      </Pressable>
    </ScreenContainer>
  );
}
