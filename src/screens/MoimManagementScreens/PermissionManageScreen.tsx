import Avatar from 'components/@common/Avatar/Avatar';
import { InputField } from 'components/@common/InputField/InputField';
import Label from 'components/@common/Label/Label';
import { Typography } from 'components/@common/Typography/Typography';
import { ScreenContainer } from 'components/ScreenContainer';
import { MoimManagementRouteProp } from 'navigators/types';
import { View, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const testUserData = [
  {
    id: 1,
    username: '차다인',
    role: '모임장',
    isPermissioned: true,
  },
  {
    id: 2,
    username: '차다인',
    role: '관리자',
    isPermissioned: true,
  },
  {
    id: 3,
    username: '차다인',
    role: '부원',
    isPermissioned: false,
  }
];

interface PermissionManageScreenProps {
  route: MoimManagementRouteProp;
}

const PermissionManageScreen = ({route}: PermissionManageScreenProps) => {
  const moimId = route.params.id;
  console.log('moimId: ', moimId);
  
  return (
    <ScreenContainer>
      <View className='flex flex-row items-center justify-between mt-5'>
        <View className='w-[90%]'>
          <InputField touched placeholder='멤버 검색' />
        </View>
        <TouchableOpacity>
          <Ionicons name="search" size={27} color={"#1D2002"} />
        </TouchableOpacity>
      </View>

      {testUserData.map((item) => (
        <View key={item.id} className='flex flex-row items-center'>
          <Avatar />
          <Typography fontWeight='MEDIUM' className='text-dark-800 text-sm ml-3 mr-3'>{item.username}</Typography>
          {item.role !== '모임장' && <Label label={item.role} color="dark" />}
          <TouchableOpacity className='p-2 rounded-xl bg-gray-200 ml-auto'>
            <Typography fontWeight='MEDIUM' className='text-gray-500 text-xs'>{item.isPermissioned ? '권한 취소' : '권한 부여'}</Typography>
          </TouchableOpacity>
        </View>
      ))}
    </ScreenContainer>
  );
};

export default PermissionManageScreen;