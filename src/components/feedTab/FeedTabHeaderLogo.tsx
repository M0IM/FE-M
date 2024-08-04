import {FeedTabNavigationProp} from '../../navigators/types';
import {Image, Pressable} from 'react-native';

export function FeedTabHeaderLogo(navigation: FeedTabNavigationProp) {
  return (
    <Pressable
      onPress={() => navigation.navigate('FEED_HOME')}
      className="p-1 active:bg-hover rounded-2xl">
      <Image
        className="w-8 h-8 p-5"
        source={require('assets/logos/logo-green.png')}
      />
    </Pressable>
  );
}
