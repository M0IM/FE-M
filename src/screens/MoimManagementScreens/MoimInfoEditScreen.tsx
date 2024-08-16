import { MoimManagementRouteProp } from 'navigators/types';
import { View, Text } from 'react-native';

interface MoimInfoEditScreenProps {
  route: MoimManagementRouteProp;
}

const MoimInfoEditScreen = ({route}: MoimInfoEditScreenProps) => {
  const moimdId = route.params.id;
  console.log('moimId: ', moimdId);

  return (
    <View>
      <Text>MoimInfoEditScreen</Text>
    </View>
  );
};

export default MoimInfoEditScreen;