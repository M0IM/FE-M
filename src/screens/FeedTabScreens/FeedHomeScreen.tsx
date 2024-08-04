import {Text, View} from 'react-native';
import CatSvg from 'assets/icons/cat.svg';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import {SocialButton} from '../../components/@common/SocialButton/SocialButton.tsx';
import {Logo} from '../../components/@common/Logo/Logo.tsx';

export default function FeedHomeScreen() {
  return (
    <View className={'bg-white flex-1'}>
      <Text className="footnote">FEED_HOME 화면입니다.</Text>
      <CatSvg width={200} height={200} fill="#fff" />
      <Text className="text-warning">HI</Text>
      <Icon name="delete" size={32} color="red" />
      <SocialButton provider={'KAKAO'} size={'SM'} />
      <Logo size={'LG'} background={'BACKGROUND'} />
      <Logo background={'TRANSPARENT'} />
    </View>
  );
}
