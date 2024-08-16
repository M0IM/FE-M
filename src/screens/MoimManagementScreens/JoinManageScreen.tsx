import { TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Avatar from 'components/@common/Avatar/Avatar';
import { InputField } from 'components/@common/InputField/InputField';
import { Typography } from 'components/@common/Typography/Typography';
import { ScreenContainer } from 'components/ScreenContainer';
import { MoimManagementRouteProp } from 'navigators/types';

const testUserData = [
  {
    id: 1,
    profileImg: '',
    username: '차다인',
  },
  {
    id: 2,
    profileImg: '',
    username: '차다인',
  },
  {
    id: 3,
    profileImg: '',
    username: '차다인',
  }
];

interface JoinManageScreenProps {
  route: MoimManagementRouteProp;
}

const JoinManageScreen = ({route}: JoinManageScreenProps) => {
  const moimdId = route.params.id;
  console.log('moimId: ', moimdId);

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
          <Avatar uri={item.profileImg} />
          <Typography fontWeight='MEDIUM' className='text-dark-800 text-sm ml-3'>{item.username}</Typography>
          <View className='flex flex-row ml-auto'>
            <TouchableOpacity className='p-2 px-4 rounded-xl bg-gray-200 mr-2'>
              <Typography fontWeight='MEDIUM' className='text-gray-600 text-xs'>반려</Typography>
            </TouchableOpacity>
            <TouchableOpacity className='p-2 px-4 rounded-xl bg-gray-200'>
              <Typography fontWeight='MEDIUM' className='text-gray-600 text-xs'>승인</Typography>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScreenContainer>
  );
};

export default JoinManageScreen;