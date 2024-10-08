import {TouchableOpacity} from 'react-native';
import {RouteProp} from '@react-navigation/native';

import {Typography} from 'components/@common/Typography/Typography';
import {ScreenContainer} from 'components/ScreenContainer';

import {
  MoimManagementNavigationProp,
  MoimManagementParamList,
} from 'navigators/types';
import {MOIM_ROLE} from 'types/enums';

import useTodoStore from 'stores/useTodoStore.ts';
import useMoim from 'hooks/useMoim.ts';

interface MoimManageListScreenProps {
  route: RouteProp<MoimManagementParamList, 'MOIM_MANAGE_LIST'>;
  navigation: MoimManagementNavigationProp;
}

const MoimManageListScreen = ({
  route,
  navigation,
}: MoimManageListScreenProps) => {
  const params = route?.params;
  const id = params.id;
  // TODO: 관리자 권한 불러오는 API
  const {useGetMyMoimRole} = useMoim();
  const {data: role} = useGetMyMoimRole(id);
  const {setIsEditMode} = useTodoStore();

  if (!id) {
    return <></>;
  }

  return (
    <ScreenContainer>
      <TouchableOpacity
        className="m-3 mt-6"
        onPress={() => navigation.navigate('PERMISSION_MANAGEMENT', {id})}>
        <Typography fontWeight="BOLD" className="text-lg text-dark-800 ">
          모임 멤버 관리
        </Typography>
      </TouchableOpacity>
      <TouchableOpacity
        className="m-3"
        onPress={() => navigation.navigate('JOIN_MANAGEMENT', {id})}>
        <Typography fontWeight="BOLD" className="text-lg text-dark-800">
          가입 관리
        </Typography>
      </TouchableOpacity>
      {role?.moimRole === MOIM_ROLE.OWNER ? (
        <TouchableOpacity
          className="m-3"
          onPress={() =>
            navigation.navigate('DELEGATION_AUTHORITY_SCREEN', {id})
          }>
          <Typography fontWeight="BOLD" className="text-lg text-dark-800">
            모임장 위임
          </Typography>
        </TouchableOpacity>
      ) : null}
      {role?.moimRole === MOIM_ROLE.OWNER ? (
        <TouchableOpacity
          className="m-3"
          onPress={() => navigation.navigate('MOIM_OUT_MEMBER', {id})}>
          <Typography fontWeight="BOLD" className="text-lg text-dark-800">
            모임 멤버 탈퇴
          </Typography>
        </TouchableOpacity>
      ) : null}
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
      {role?.moimRole === MOIM_ROLE.OWNER ? (
        <TouchableOpacity
          className="m-3"
          onPress={() => navigation.navigate('MOIM_INFO_EDIT', {id})}>
          <Typography fontWeight="BOLD" className="text-lg text-dark-800">
            모임 정보 수정
          </Typography>
        </TouchableOpacity>
      ) : null}
    </ScreenContainer>
  );
};

export default MoimManageListScreen;
