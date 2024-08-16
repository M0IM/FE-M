import { MoimManagementRouteProp } from 'navigators/types';
import { View, Text } from 'react-native';

interface JoinManageScreenProps {
  route: MoimManagementRouteProp;
}

const JoinManageScreen = ({route}: JoinManageScreenProps) => {
  const moimdId = route.params.id;
  console.log('moimId: ', moimdId);

  return (
    <View>
      <Text>JoinManageScreen</Text>
    </View>
  );
};

export default JoinManageScreen;