import { MoimManagementRouteProp } from 'navigators/types';
import { View, Text } from 'react-native';

interface PermissionManageScreenProps {
  route: MoimManagementRouteProp;
}

const PermissionManageScreen = ({route}: PermissionManageScreenProps) => {
  const moimId = route.params.id;
  console.log('moimId: ', moimId);
  
  return (
    <View>
      <Text>PermissionManageScreen</Text>
    </View>
  );
};

export default PermissionManageScreen;