import { AppInfoStackRouteProp } from 'navigators/types';
import { View, Text } from 'react-native';

interface AppInfoDetailScreenProps {
    route: AppInfoStackRouteProp;
}

const AppInfoDetailScreen = ({ route }: AppInfoDetailScreenProps) => {
    console.log(route.params?.id);
  return (
    <View>
      <Text>AppInfoDetailScreen</Text>
    </View>
  );
};

export default AppInfoDetailScreen;