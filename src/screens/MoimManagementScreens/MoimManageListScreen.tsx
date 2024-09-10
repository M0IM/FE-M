import {TouchableOpacity} from 'react-native';
import {Typography} from 'components/@common/Typography/Typography';
import {ScreenContainer} from 'components/ScreenContainer';
import {
  MoimManagementNavigationProp,
  MoimManagementRouteProp,
} from 'navigators/types';
import useTodoStore from 'stores/useTodoStore.ts';

interface MoimManageListScreenProps {
  route: MoimManagementRouteProp;
  navigation: MoimManagementNavigationProp;
}

const MoimManageListScreen = ({
  route,
  navigation,
}: MoimManageListScreenProps) => {
  const id = route.params?.id;
  const {setIsEditMode} = useTodoStore();

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
        onPress={() => navigation.navigate('MOIM_OUT_MEMBER', {id})}>
        <Typography fontWeight="BOLD" className="text-lg text-dark-800">
          모임 멤버 탈퇴
        </Typography>
      </TouchableOpacity>
      <TouchableOpacity
        className="m-3"
        onPress={() => {
          setIsEditMode(false);
          navigation.navigate('MOIM_CREATE_TODO', {id});
        }}>
        <Typography fontWeight="BOLD" className="text-lg text-dark-800">
          모임 멤버 할 일 배정
        </Typography>
      </TouchableOpacity>
      <TouchableOpacity
        className="m-3"
        onPress={() => navigation.navigate('MOIM_GET_TODO', {id})}>
        <Typography fontWeight="BOLD" className="text-lg text-dark-800">
          모임 할 일 확인
        </Typography>
      </TouchableOpacity>
      <TouchableOpacity
        className="m-3"
        onPress={() => navigation.navigate('MOIM_ASSIGNMENT_TODO', {id})}>
        <Typography fontWeight="BOLD" className="text-lg text-dark-800">
          내가 할당한 할 일 확인
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
