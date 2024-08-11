import { RevokeMoimStackRouteProp } from 'navigators/types';
import { View, Text } from 'react-native';

interface RevokeMoimDetailScreenProps {
  route: RevokeMoimStackRouteProp;
}

const RevokeMoimDetailScreen = ({ route }: RevokeMoimDetailScreenProps) => {
  console.log(route.params?.id);
  return (
    <View>
      <Text>RevokeMoimDetailScreen</Text>
    </View>
  );
};

export default RevokeMoimDetailScreen;