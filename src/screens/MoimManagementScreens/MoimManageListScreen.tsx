import { CustomButton } from 'components/@common/CustomButton/CustomButton';
import { MoimManagementNavigationProp } from 'navigators/types';
import { View, Text } from 'react-native';

interface MoimManageListScreenProps {
  navigation: MoimManagementNavigationProp;
}

const MoimManageListScreen = ({ navigation }: MoimManageListScreenProps) => {
  return (
    <View>
      <CustomButton label='권한 수정으로 이동' onPress={() => navigation.navigate('PERMISSION_MANAGEMENT', { id: 1 })} />
      <Text>MoimManageListScreen</Text>
    </View>
  );
};

export default MoimManageListScreen;