import {Text, View} from 'react-native';
import CatSvg from 'assets/icons/cat.svg';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function FeedHomeScreen() {
  return (
    <View>
      <Text>FEED_HOME 화면입니다.</Text>
      <CatSvg width={200} height={200} fill="#fff" />
      <Text>HI</Text>
      <Icon name="delete" size={32} color="red" />
    </View>
  );
}
