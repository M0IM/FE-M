import {TouchableOpacity} from 'react-native';
import {Typography} from 'components/@common/Typography/Typography';
import {ScreenContainer} from 'components/ScreenContainer';
import {
  MoimManagementNavigationProp,
  MoimManagementRouteProp,
} from 'navigators/types';

interface MoimManageListScreenProps {
  route: MoimManagementRouteProp;
  navigation: MoimManagementNavigationProp;
}

const MoimManageListScreen = ({
  route,
  navigation,
}: MoimManageListScreenProps) => {
  const id = route.params?.id;

  return (
    <ScreenContainer>
      <TouchableOpacity
        className="m-3 mt-6"
        onPress={() => navigation.navigate('PERMISSION_MANAGEMENT', {id})}>
        <Typography fontWeight="BOLD" className="text-lg text-dark-800 ">
          멤버 권한 수정
        </Typography>
      </TouchableOpacity>
      <TouchableOpacity
        className="m-3"
        onPress={() => navigation.navigate('JOIN_MANAGEMENT', {id})}>
        <Typography fontWeight="BOLD" className="text-lg text-dark-800">
          가입 관리
        </Typography>
      </TouchableOpacity>
      <TouchableOpacity
        className="m-3"
        onPress={() =>
          navigation.navigate('DELEGATION_AUTHORITY_SCREEN', {id})
        }>
        <Typography fontWeight="BOLD" className="text-lg text-dark-800">
          모임장 위임
        </Typography>
      </TouchableOpacity>
      <TouchableOpacity
        className="m-3"
        onPress={() => navigation.navigate('MOIM_INFO_EDIT', {id})}>
        <Typography fontWeight="BOLD" className="text-lg text-dark-800">
          모임 정보 수정
        </Typography>
      </TouchableOpacity>
    </ScreenContainer>
  );
};

export default MoimManageListScreen;
